import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { XMLParser } from 'fast-xml-parser';
import ShousetsuZuSearch from './ShousetsuZuSearch';

// --- Utility Functions ---

const kanjiToNumber = (kanji: string): number | null => {
    if (!kanji || typeof kanji !== 'string') return null;

    const kanjiMap: { [key: string]: number } = {
        '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9,
    };

    let total = 0;
    let kanjiStr = kanji;

    let parts = kanjiStr.split('千');
    if (parts.length > 1) {
        const numPart = parts[0];
        const num = numPart ? (kanjiMap[numPart] || 1) : 1;
        total += num * 1000;
        kanjiStr = parts[1];
    }

    parts = kanjiStr.split('百');
    if (parts.length > 1) {
        const numPart = parts[0];
        const num = numPart ? (kanjiMap[numPart] || 1) : 1;
        total += num * 100;
        kanjiStr = parts[1];
    }

    parts = kanjiStr.split('十');
    if (parts.length > 1) {
        const numPart = parts[0];
        const num = numPart ? (kanjiMap[numPart] || 1) : 1;
        total += num * 10;
        kanjiStr = parts[1];
    }

    if (kanjiStr) {
        const num = kanjiMap[kanjiStr];
        if (num) {
            total += num;
        } else {
            if (kanji.length > 0 && total === 0) return null;
        }
    }

    if (kanji.length > 0 && total === 0) return null;

    return total;
};

const getTextFromNode = (node: any): string => {
  if (!node) return "";
  if (typeof node === 'string') return node;
  if (typeof node === 'object' && node !== null) {
    return Object.values(node).map(getTextFromNode).join('');
  }
  return "";
};

const getArticleNumber = (articleTitleNode: any): number | null => {
    const titleText = getTextFromNode(articleTitleNode);
    if (!titleText) return null;
    const match = titleText.match(/^第([一二三四五六七八九十百千]+)条/);
    if (match && match[1]) {
        return kanjiToNumber(match[1]);
    }
    return null;
};

const asArray = (value: any) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

// --- Tab Types ---
type TabKey = 'kijunho' | 'shousetsuzu';

// --- Main App Component ---
function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('shousetsuzu');

  // 建築基準法 state
  const [law, setLaw] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchedTerm, setLastSearchedTerm] = useState('');
  const [lawLoaded, setLawLoaded] = useState(false);

  useEffect(() => {
    if (activeTab === 'kijunho' && !lawLoaded) {
      setIsLoading(true);
      fetch('/kenchikukijun.xml')
        .then(response => {
          if (!response.ok) throw new Error('法令XMLファイルの読み込みに失敗しました。');
          return response.text();
        })
        .then(xmlText => {
          const parser = new XMLParser({ ignoreAttributes: false, textNodeName: "#text" });
          const jsonObj = parser.parse(xmlText);
          if (!jsonObj.Law || !jsonObj.Law.LawBody) {
            throw new Error('XMLの形式が法令データとして正しくありません。');
          }
          setLaw(jsonObj.Law);
          setLawLoaded(true);
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [activeTab, lawLoaded]);

  const handleSearch = () => {
    if (!law) return;

    const term = searchTerm.trim();
    setLastSearchedTerm(term);

    if (!term) {
      setSearchResults([]);
      return;
    }

    const results: any[] = [];
    const lowerCaseTerm = term.toLowerCase();

    let searchNumber: number | null = null;
    const parsedArabic = parseInt(term, 10);
    if (!isNaN(parsedArabic) && String(parsedArabic) === term) {
        searchNumber = parsedArabic;
    } else {
        const kanjiTerm = term.replace(/条$/, '');
        const parsedKanji = kanjiToNumber(kanjiTerm);
        if(parsedKanji !== null) {
            searchNumber = parsedKanji;
        }
    }

    const chapters = asArray(law.LawBody.MainProvision.Chapter);

    for (const chapter of chapters) {
      const sections = asArray(chapter.Section);
      for (const section of sections) {
        const articles = asArray(section.Article);
        for (const article of articles) {
          let match = false;

          if (searchNumber !== null) {
            const articleNum = getArticleNumber(article.ArticleTitle);
            if (articleNum !== null && articleNum === searchNumber) {
              match = true;
            }
          } else {
            const articleTitleText = getTextFromNode(article.ArticleTitle);
            if (articleTitleText.toLowerCase().includes(lowerCaseTerm)) {
              match = true;
            }

            if (!match) {
                const paragraphs = asArray(article.Paragraph);
                for (const paragraph of paragraphs) {
                    const sentenceText = getTextFromNode(paragraph.ParagraphSentence?.Sentence);
                    if (sentenceText.toLowerCase().includes(lowerCaseTerm)) {
                        match = true;
                        break;
                    }
                }
            }
          }

          if (match) {
            results.push({ chapter, section, article });
          }
        }
      }
    }
    setSearchResults(results);
  };

  const renderParagraphs = (article: any) => {
    const paragraphs = asArray(article.Paragraph);
    return paragraphs.map((p: any, i: number) => {
      if (!p) return null;
      const sentenceText = getTextFromNode(p.ParagraphSentence?.Sentence);
      return (
        <p key={i} className="card-text">
          <strong>{getTextFromNode(p.ParagraphNum)}</strong>. {sentenceText}
        </p>
      );
    });
  };

  return (
    <div className="container-fluid px-3 px-md-4 mt-4">
      {/* ナビゲーションタブ */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'shousetsuzu' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('shousetsuzu')}
          >
            🏗️ 建築工事標準詳細図
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'kijunho' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('kijunho')}
          >
            📖 建築基準法 条文
          </button>
        </li>
      </ul>

      {/* 建築工事標準詳細図タブ */}
      {activeTab === 'shousetsuzu' && <ShousetsuZuSearch />}

      {/* 建築基準法タブ */}
      {activeTab === 'kijunho' && (
        <div>
          <h1 className="mb-4">建築基準法 条文検索</h1>
          {isLoading && <p>法令データを読み込んでいます...</p>}
          {error && <div className="alert alert-danger">エラー: {error}</div>}
          {!isLoading && !error && (
            <>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="条文番号（例: 13, 十三条）やキーワードを入力"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                />
                <button className="btn btn-primary" type="button" onClick={handleSearch}>
                  検索
                </button>
              </div>
              <div>
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-header">
                        {getTextFromNode(result.chapter.ChapterTitle)} - {getTextFromNode(result.section.SectionTitle)}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{getTextFromNode(result.article.ArticleTitle)}</h5>
                        {renderParagraphs(result.article)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>{lastSearchedTerm ? `「${lastSearchedTerm}」の検索結果が見つかりませんでした。` : '検索キーワードを入力してください。'}</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
