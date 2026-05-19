import React, { useState, useMemo } from 'react';
import { FIGURES, CATEGORIES, PDF_VOLUMES, Figure } from './data/shousetsuZuData';

// 検索ハイライト
function hl(text: string, term: string): React.ReactNode {
  if (!term.trim()) return text;
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${esc})`, 'gi'));
  return parts.map((p, i) =>
    p.toLowerCase() === term.toLowerCase()
      ? <mark key={i} className="px-0 bg-warning">{p}</mark>
      : p
  );
}

// PDFモーダル
function PdfModal({ volume, onClose }: { volume: number; onClose: () => void }) {
  const [vol, setVol] = useState(volume);
  const cur = PDF_VOLUMES[vol];

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ position: 'fixed', inset: 0, zIndex: 1050, background: 'rgba(0,0,0,0.75)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded shadow-lg d-flex flex-column"
        style={{ width: '96vw', height: '92vh', maxWidth: 1300 }}>
        {/* ヘッダー */}
        <div className="d-flex align-items-center gap-2 p-2 border-bottom flex-wrap bg-dark text-white rounded-top">
          <strong className="me-2" style={{ whiteSpace: 'nowrap', fontSize: '0.9rem' }}>
            📄 建築工事標準詳細図（令和4年版）国土交通省
          </strong>
          <div className="d-flex gap-1 flex-wrap">
            {Object.entries(PDF_VOLUMES).map(([n]) => (
              <button key={n}
                className={`btn btn-sm ${Number(n) === vol ? 'btn-warning text-dark fw-bold' : 'btn-outline-light'}`}
                onClick={() => setVol(Number(n))}>
                {Number(n)}巻
              </button>
            ))}
          </div>
          <div className="ms-auto d-flex gap-2">
            <a href={cur.url} target="_blank" rel="noopener noreferrer"
              className="btn btn-sm btn-outline-light">↗ 別タブ</a>
            <button className="btn btn-sm btn-danger" onClick={onClose}>✕ 閉じる</button>
          </div>
        </div>
        <div className="px-3 py-1 bg-light border-bottom small text-muted">
          {cur.label}
        </div>
        <div className="flex-grow-1" style={{ overflow: 'hidden' }}>
          <iframe key={vol} src={cur.url} title={cur.label}
            style={{ width: '100%', height: '100%', border: 'none' }} />
        </div>
      </div>
    </div>
  );
}

// カテゴリ名を取得
function getCatLabel(num: number): string {
  const cat = CATEGORIES.find(c => c.num === num);
  return cat ? cat.label : '';
}

// メインコンポーネント
export default function ShousetsuZuSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [input, setInput] = useState('');
  const [openVols, setOpenVols] = useState<Set<number>>(new Set([1]));
  const [pdfVol, setPdfVol] = useState<number | null>(null);

  // 検索フィルタ
  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    if (!q) return FIGURES;
    return FIGURES.filter(f =>
      f.figureNumber.toLowerCase().includes(q) ||
      f.title.toLowerCase().includes(q) ||
      f.subcategory.toLowerCase().includes(q) ||
      getCatLabel(f.categoryNum).toLowerCase().includes(q)
    );
  }, [searchTerm]);

  // 巻ごとにグループ化（カテゴリ→小分類→図）
  const groupedByVol = useMemo(() => {
    return Object.entries(PDF_VOLUMES).map(([nStr, vol]) => {
      const n = Number(nStr);
      const figs = filtered.filter(f => f.pdfVolume === n);
      // カテゴリ→小分類→図 の構造
      const byCat: Record<number, { catLabel: string; bySub: Record<string, Figure[]> }> = {};
      for (const fig of figs) {
        if (!byCat[fig.categoryNum]) {
          byCat[fig.categoryNum] = { catLabel: getCatLabel(fig.categoryNum), bySub: {} };
        }
        const sub = fig.subcategory;
        (byCat[fig.categoryNum].bySub[sub] ??= []).push(fig);
      }
      return { n, vol, byCat, total: figs.length };
    });
  }, [filtered]);

  const totalHits = filtered.length;
  const isSearching = searchTerm !== '';

  const toggleVol = (n: number) => {
    setOpenVols(prev => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };
  const expandAll = () => setOpenVols(new Set([1, 2, 3, 4, 5, 6]));
  const collapseAll = () => setOpenVols(new Set());

  const doSearch = () => {
    setSearchTerm(input.trim());
    if (input.trim()) setOpenVols(new Set([1, 2, 3, 4, 5, 6]));
  };
  const clearSearch = () => {
    setInput('');
    setSearchTerm('');
    setOpenVols(new Set([1]));
  };

  return (
    <>
      {pdfVol !== null && <PdfModal volume={pdfVol} onClose={() => setPdfVol(null)} />}

      {/* 検索バー */}
      <div className="card mb-3 shadow-sm border-0 bg-light">
        <div className="card-body py-3">
          <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
            <h2 className="h5 mb-0">🏛️ 建築工事標準詳細図</h2>
            <span className="badge bg-secondary">令和4年版 · 国土交通省</span>
            <span className="text-muted small ms-1">全{FIGURES.length}図</span>
          </div>
          <div className="input-group">
            <input type="text" className="form-control form-control-lg"
              placeholder="図番・部位名・工種で検索（例: 4-21、防火戸、幅木…）"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') doSearch(); }} />
            <button className="btn btn-primary btn-lg" onClick={doSearch}>検索</button>
            {isSearching && (
              <button className="btn btn-outline-secondary btn-lg" onClick={clearSearch}>クリア</button>
            )}
          </div>
          {isSearching && (
            <div className="mt-2 small text-muted">
              「{searchTerm}」の検索結果：{totalHits}件
            </div>
          )}
        </div>
      </div>

      {/* 開閉コントロール */}
      <div className="d-flex gap-2 mb-3 align-items-center">
        <button className="btn btn-sm btn-outline-secondary" onClick={expandAll}>▼ 全て開く</button>
        <button className="btn btn-sm btn-outline-secondary" onClick={collapseAll}>▲ 全て閉じる</button>
      </div>

      {/* 巻ごとのパネル */}
      {groupedByVol.map(({ n, vol, byCat, total }) => {
        if (isSearching && total === 0 && n !== 1) return null;
        const isOpen = openVols.has(n);

        // 巻ごとの色
        const volColors = ['#1a237e','#1b5e20','#4a148c','#b71c1c','#e65100','#006064'];
        const headerBg = volColors[(n - 1) % volColors.length];

        return (
          <div key={n} className="card mb-3 shadow-sm border-0">
            {/* 巻ヘッダー */}
            <div
              className="card-header d-flex align-items-center gap-3 py-3"
              style={{ background: headerBg, color: 'white', cursor: 'pointer', userSelect: 'none' }}
              onClick={() => toggleVol(n)}
            >
              <span className="fw-bold fs-5" style={{ minWidth: 40 }}>第{n}巻</span>
              <span className="flex-grow-1">{vol.label}</span>
              <span className="badge bg-white text-dark me-2">{total}図</span>
              <button
                className="btn btn-sm btn-light fw-bold"
                style={{ minWidth: 90 }}
                onClick={e => { e.stopPropagation(); setPdfVol(n); }}
              >
                📄 PDFを開く
              </button>
              <span style={{ fontSize: '0.8rem' }}>{isOpen ? '▲' : '▼'}</span>
            </div>

            {/* 目次（展開時） */}
            {isOpen && (
              <div className="card-body p-3">
                {total === 0 && (
                  <p className="text-muted small mb-0">この巻は総則・共通事項のみで個別図番はありません。</p>
                )}
                {Object.entries(byCat)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([catNumStr, { catLabel, bySub }]) => (
                    <div key={catNumStr} className="mb-3">
                      {/* カテゴリ見出し */}
                      <div className="fw-bold mb-2 px-2 py-1 rounded"
                        style={{ background: headerBg + '22', borderLeft: `4px solid ${headerBg}`, fontSize: '0.9rem' }}>
                        {catNumStr}. {catLabel}
                      </div>
                      {/* 小分類・図番 */}
                      {Object.entries(bySub).map(([sub, figs]) => (
                        <div key={sub} className="ms-3 mb-2">
                          <div className="text-muted small fw-bold mb-1">{hl(sub, searchTerm)}</div>
                          <div className="d-flex flex-wrap gap-2">
                            {figs.map(fig => (
                              <button
                                key={fig.figureNumber}
                                className="btn btn-sm btn-outline-dark text-start d-flex align-items-start gap-2"
                                style={{ maxWidth: 360, minWidth: 180 }}
                                onClick={() => setPdfVol(n)}
                                title={`${fig.figureNumber} ${fig.title}\n→ ${vol.label}を開く`}
                              >
                                <span className="badge bg-primary font-monospace flex-shrink-0 mt-1"
                                  style={{ fontSize: '0.75rem' }}>
                                  {hl(fig.figureNumber, searchTerm)}
                                </span>
                                <span className="small text-break">
                                  {hl(fig.title, searchTerm)}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            )}
          </div>
        );
      })}

      {isSearching && totalHits === 0 && (
        <div className="alert alert-warning mt-3">
          「{searchTerm}」に該当する図面が見つかりませんでした。
        </div>
      )}
    </>
  );
}
