export interface Figure {
  figureNumber: string;  // 図番 例: '1-01', '4-21'
  title: string;         // MLIT公式図面名称
  categoryNum: number;   // 1〜9
  subcategory: string;   // 小分類
  pdfVolume: number;     // 参照PDF巻（2〜6）※1巻は総則のみ
}

// PDFのURLと収録内容（実PDFから確認済み）
export const PDF_VOLUMES: Record<number, { url: string; label: string }> = {
  1: { url: 'https://www.mlit.go.jp/common/001157902.pdf', label: '建築工事標準詳細図（1）総則' },
  2: { url: 'https://www.mlit.go.jp/common/001126046.pdf', label: '建築工事標準詳細図（2）床・壁' },
  3: { url: 'https://www.mlit.go.jp/common/001126048.pdf', label: '建築工事標準詳細図（3）天井・建具' },
  4: { url: 'https://www.mlit.go.jp/common/001126049.pdf', label: '建築工事標準詳細図（4）屋上防水・水回り' },
  5: { url: 'https://www.mlit.go.jp/common/001126050.pdf', label: '建築工事標準詳細図（5）断熱・サイン' },
  6: { url: 'https://www.mlit.go.jp/common/001126051.pdf', label: '建築工事標準詳細図（6）外構' },
};

export interface Category {
  num: number;
  label: string;
}

export const CATEGORIES: Category[] = [
  { num: 1, label: '各種床仕上げ・トラフ・排水溝・グリストラップ・屋内防水' },
  { num: 2, label: '各種壁仕上げ・軽量鉄骨壁下地・ALCパネル間仕切壁・地下二重壁' },
  { num: 3, label: '各種天井仕上げ・カーテンボックス・開口補強' },
  { num: 4, label: '建具形状寸法・建具取合い・シャッター' },
  { num: 5, label: '屋上防水・屋上各部取合い・雨水排水' },
  { num: 6, label: '水回り諸室・和室各部' },
  { num: 7, label: '断熱・階段・煙突' },
  { num: 8, label: '仕上げユニット・サイン' },
  { num: 9, label: '外構' },
];

// MLIT公式図面一覧（令和4年版）
// 実PDFから確認済みの巻割り当て：
//   2巻 = カテゴリ1（床）＋カテゴリ2（壁）
//   3巻 = カテゴリ3（天井）＋カテゴリ4（建具）
//   4巻 = カテゴリ5（屋上防水）＋カテゴリ6（水回り）
//   5巻 = カテゴリ7（断熱・階段・煙突）＋カテゴリ8（サイン）
//   6巻 = カテゴリ9（外構）
export const FIGURES: Figure[] = [
  // 1. 床 → 2巻
  { figureNumber: '1-01', title: '床：仕上げ', categoryNum: 1, subcategory: '床：仕上げ', pdfVolume: 2 },
  { figureNumber: '1-02', title: '床：仕上げ', categoryNum: 1, subcategory: '床：仕上げ', pdfVolume: 2 },
  { figureNumber: '1-21', title: 'トラフ', categoryNum: 1, subcategory: 'トラフ', pdfVolume: 2 },
  { figureNumber: '1-22', title: '排水溝、グリストラップ', categoryNum: 1, subcategory: '排水溝、グリストラップ', pdfVolume: 2 },
  { figureNumber: '1-31', title: '屋内防水', categoryNum: 1, subcategory: '屋内防水', pdfVolume: 2 },

  // 2. 壁 → 2巻
  { figureNumber: '2-01', title: '壁：仕上げ', categoryNum: 2, subcategory: '壁：仕上げ', pdfVolume: 2 },
  { figureNumber: '2-02', title: '壁：仕上げ', categoryNum: 2, subcategory: '壁：仕上げ', pdfVolume: 2 },
  { figureNumber: '2-03', title: '壁：仕上げ', categoryNum: 2, subcategory: '壁：仕上げ', pdfVolume: 2 },
  { figureNumber: '2-04', title: '壁：仕上げ', categoryNum: 2, subcategory: '壁：仕上げ', pdfVolume: 2 },
  { figureNumber: '2-11', title: '壁取合い：床－幅木－壁', categoryNum: 2, subcategory: '壁取合い', pdfVolume: 2 },
  { figureNumber: '2-12', title: '壁取合い：腰壁', categoryNum: 2, subcategory: '壁取合い', pdfVolume: 2 },
  { figureNumber: '2-13', title: '壁取合い：化粧合板壁', categoryNum: 2, subcategory: '壁取合い', pdfVolume: 2 },
  { figureNumber: '2-21', title: '軽量鉄骨壁下地：下地張りのない場合', categoryNum: 2, subcategory: '軽量鉄骨壁下地', pdfVolume: 2 },
  { figureNumber: '2-22', title: '軽量鉄骨壁下地：下地張りのある場合', categoryNum: 2, subcategory: '軽量鉄骨壁下地', pdfVolume: 2 },
  { figureNumber: '2-23', title: '軽量鉄骨壁下地：遮音壁の場合', categoryNum: 2, subcategory: '軽量鉄骨壁下地', pdfVolume: 2 },
  { figureNumber: '2-24', title: '軽量鉄骨壁下地：各部取合い', categoryNum: 2, subcategory: '軽量鉄骨壁下地', pdfVolume: 2 },
  { figureNumber: '2-31', title: 'ALCパネル：間仕切壁', categoryNum: 2, subcategory: 'ALCパネル', pdfVolume: 2 },
  { figureNumber: '2-41', title: '地下二重壁', categoryNum: 2, subcategory: '地下二重壁', pdfVolume: 2 },

  // 3. 天井 → 3巻
  { figureNumber: '3-01', title: '天井：仕上げ', categoryNum: 3, subcategory: '天井：仕上げ', pdfVolume: 3 },
  { figureNumber: '3-11', title: '天井取合い：壁－天井', categoryNum: 3, subcategory: '天井取合い', pdfVolume: 3 },
  { figureNumber: '3-12', title: '天井取合い：下がり壁', categoryNum: 3, subcategory: '天井取合い', pdfVolume: 3 },
  { figureNumber: '3-21', title: '軽量鉄骨天井下地', categoryNum: 3, subcategory: '軽量鉄骨天井下地', pdfVolume: 3 },
  { figureNumber: '3-31', title: 'カーテンボックス：鋼製、アルミニウム製', categoryNum: 3, subcategory: 'カーテンボックス', pdfVolume: 3 },
  { figureNumber: '3-32', title: 'カーテンボックス：木製、カーテン受け板', categoryNum: 3, subcategory: 'カーテンボックス', pdfVolume: 3 },
  { figureNumber: '3-41', title: '天井開口部下地補強：照明器具、その他', categoryNum: 3, subcategory: '天井開口部下地補強', pdfVolume: 3 },
  { figureNumber: '3-42', title: '天井開口部下地補強：天井吹出し口、天井点検口', categoryNum: 3, subcategory: '天井開口部下地補強', pdfVolume: 3 },

  // 4. 建具 → 3巻
  { figureNumber: '4-01', title: '建具：形状寸法', categoryNum: 4, subcategory: '建具：形状寸法', pdfVolume: 3 },
  { figureNumber: '4-11', title: '建具取合い：木製建具（コンクリート壁の場合）', categoryNum: 4, subcategory: '建具取合い：木製建具', pdfVolume: 3 },
  { figureNumber: '4-12', title: '建具取合い：木製建具（軽量鉄骨壁の場合）', categoryNum: 4, subcategory: '建具取合い：木製建具', pdfVolume: 3 },
  { figureNumber: '4-13', title: '建具取合い：木製建具（直張り工法およびALCパネルの場合）', categoryNum: 4, subcategory: '建具取合い：木製建具', pdfVolume: 3 },
  { figureNumber: '4-21', title: '建具取合い：標準型鋼製建具', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-22', title: '建具取合い：鋼製建具、鋼製軽量建具', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-23', title: '建具取合い：鋼製建具、鋼製軽量建具（直張り工法の場合）', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-24', title: '建具取合い：鋼製建具、鋼製軽量建具（軽量鉄骨壁の場合）', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-25', title: '建具取合い：鋼製建具、鋼製軽量建具（ALCパネルの場合）', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-31', title: '建具取合い：内部用くつずり等', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-41', title: '建具取合い：鋼製建具（外部用）（内部直張り工法の場合）', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-42', title: '建具取合い：鋼製建具（外部用）（内部打放し仕上げの場合）', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-43', title: '建具取合い：簡易気密型鋼製建具（外部用）（内部直張り工法の場合）', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-44', title: '建具取合い：簡易気密型鋼製建具（外部用）（内部打放し仕上げの場合）', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-45', title: '建具取合い：簡易気密型鋼製建具（内部用）', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-46', title: '建具取合い：簡易気密型鋼製軽量建具（内部用）', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-47', title: '建具取合い：防火戸（90度開き）', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-48', title: '建具取合い：防火戸（180度開き）', categoryNum: 4, subcategory: '建具取合い：鋼製建具', pdfVolume: 3 },
  { figureNumber: '4-49', title: 'シャッター：防火・防煙シャッター', categoryNum: 4, subcategory: 'シャッター', pdfVolume: 3 },
  { figureNumber: '4-51', title: '建具取合い：窓', categoryNum: 4, subcategory: '建具取合い：窓', pdfVolume: 3 },
  { figureNumber: '4-52', title: '建具取合い：窓（カーテンボックス、ダクト等と取合う場合）', categoryNum: 4, subcategory: '建具取合い：窓', pdfVolume: 3 },
  { figureNumber: '4-53', title: '建具取合い：二重窓', categoryNum: 4, subcategory: '建具取合い：窓', pdfVolume: 3 },
  { figureNumber: '4-54', title: '建具取合い：窓（樹脂製建具）', categoryNum: 4, subcategory: '建具取合い：窓', pdfVolume: 3 },
  { figureNumber: '4-55', title: '建具取合い：二重窓（改修）（樹脂製建具）', categoryNum: 4, subcategory: '建具取合い：窓', pdfVolume: 3 },

  // 5. 屋上防水 → 4巻
  { figureNumber: '5-01', title: '屋根保護防水断熱工法', categoryNum: 5, subcategory: '屋根保護防水断熱工法', pdfVolume: 4 },
  { figureNumber: '5-02', title: '屋根保護防水工法', categoryNum: 5, subcategory: '屋根保護防水工法', pdfVolume: 4 },
  { figureNumber: '5-03', title: '屋根露出防水工法', categoryNum: 5, subcategory: '屋根露出防水工法', pdfVolume: 4 },
  { figureNumber: '5-04', title: '屋根露出防水絶縁断熱工法（アスファルト防水）', categoryNum: 5, subcategory: '屋根露出防水工法', pdfVolume: 4 },
  { figureNumber: '5-05', title: '屋根露出防水絶縁断熱工法', categoryNum: 5, subcategory: '屋根露出防水工法', pdfVolume: 4 },
  { figureNumber: '5-11', title: '屋上取合い：塔屋等の建具取合い', categoryNum: 5, subcategory: '屋上取合い', pdfVolume: 4 },
  { figureNumber: '5-21', title: '屋上取合い：点検口、換気塔', categoryNum: 5, subcategory: '屋上取合い', pdfVolume: 4 },
  { figureNumber: '5-22', title: '屋上取合い：管類、屋上基礎', categoryNum: 5, subcategory: '屋上取合い', pdfVolume: 4 },
  { figureNumber: '5-23', title: '屋上取合い：手すり', categoryNum: 5, subcategory: '屋上取合い', pdfVolume: 4 },
  { figureNumber: '5-31', title: '縦どいの形式', categoryNum: 5, subcategory: '雨水排水', pdfVolume: 4 },
  { figureNumber: '5-32', title: 'ルーフドレイン及び縦どい：配管用炭素鋼管 白管', categoryNum: 5, subcategory: '雨水排水', pdfVolume: 4 },
  { figureNumber: '5-33', title: 'ルーフドレイン及び縦どい：硬質ポリ塩化ビニル管', categoryNum: 5, subcategory: '雨水排水', pdfVolume: 4 },

  // 6. 水回り・和室 → 4巻
  { figureNumber: '6-11', title: '湯沸室', categoryNum: 6, subcategory: '湯沸室', pdfVolume: 4 },
  { figureNumber: '6-21', title: '洗面所・便所：衛生器具配置', categoryNum: 6, subcategory: '洗面所・便所', pdfVolume: 4 },
  { figureNumber: '6-22', title: '便所：一般便房', categoryNum: 6, subcategory: '洗面所・便所', pdfVolume: 4 },
  { figureNumber: '6-23', title: '便所：車いす使用者用簡易型便房', categoryNum: 6, subcategory: '洗面所・便所', pdfVolume: 4 },
  { figureNumber: '6-24', title: '便所：オストメイト用設備を有する便房、乳幼児連れに配慮した便房', categoryNum: 6, subcategory: '洗面所・便所', pdfVolume: 4 },
  { figureNumber: '6-25', title: '便所：車いす使用者用便房', categoryNum: 6, subcategory: '洗面所・便所', pdfVolume: 4 },
  { figureNumber: '6-26', title: '便所：車椅子使用者用便房', categoryNum: 6, subcategory: '洗面所・便所', pdfVolume: 4 },
  { figureNumber: '6-27', title: '便所：引き戸（車いす使用者用便房）', categoryNum: 6, subcategory: '洗面所・便所', pdfVolume: 4 },
  { figureNumber: '6-28', title: '便所：手すり、ライニング', categoryNum: 6, subcategory: '洗面所・便所', pdfVolume: 4 },
  { figureNumber: '6-29', title: '便所：汚垂石', categoryNum: 6, subcategory: '洗面所・便所', pdfVolume: 4 },
  { figureNumber: '6-31', title: '浴室：コンクリート浴槽等', categoryNum: 6, subcategory: '浴室・脱衣室', pdfVolume: 4 },
  { figureNumber: '6-32', title: '脱衣室：脱衣箱', categoryNum: 6, subcategory: '浴室・脱衣室', pdfVolume: 4 },
  { figureNumber: '6-41', title: '和室：出入口回り', categoryNum: 6, subcategory: '和室各部', pdfVolume: 4 },
  { figureNumber: '6-42', title: '和室：出入口回り（ポリスチレンフォーム床下地材の場合）', categoryNum: 6, subcategory: '和室各部', pdfVolume: 4 },
  { figureNumber: '6-43', title: '和室：壁回り', categoryNum: 6, subcategory: '和室各部', pdfVolume: 4 },
  { figureNumber: '6-44', title: '和室：壁回り（ポリスチレンフォーム床下地材の場合）', categoryNum: 6, subcategory: '和室各部', pdfVolume: 4 },
  { figureNumber: '6-45', title: '床取合い：上がりがまち', categoryNum: 6, subcategory: '和室各部', pdfVolume: 4 },
  { figureNumber: '6-46', title: '和室：押入れ', categoryNum: 6, subcategory: '和室各部', pdfVolume: 4 },

  // 7. 断熱・階段・煙突 → 5巻
  { figureNumber: '7-01', title: '断熱：断熱材打込み', categoryNum: 7, subcategory: '断熱', pdfVolume: 5 },
  { figureNumber: '7-11', title: '階段：階段 平面、断面', categoryNum: 7, subcategory: '階段', pdfVolume: 5 },
  { figureNumber: '7-12', title: '階段：階段（手すり子のある場合）', categoryNum: 7, subcategory: '階段', pdfVolume: 5 },
  { figureNumber: '7-13', title: '階段：階段（手すり腰壁のある場合）', categoryNum: 7, subcategory: '階段', pdfVolume: 5 },
  { figureNumber: '7-21', title: '煙突：鋼製ユニット煙突', categoryNum: 7, subcategory: '煙突', pdfVolume: 5 },

  // 8. 仕上げユニット・サイン → 5巻
  { figureNumber: '8-01', title: '防煙垂れ壁', categoryNum: 8, subcategory: '防煙垂れ壁', pdfVolume: 5 },
  { figureNumber: '8-11', title: '木製カウンター', categoryNum: 8, subcategory: '木製ユニット', pdfVolume: 5 },
  { figureNumber: '8-12', title: '木製コーナーガード、ウッドデッキ', categoryNum: 8, subcategory: '木製ユニット', pdfVolume: 5 },
  { figureNumber: '8-13', title: '木製ファンコイルユニットカバー', categoryNum: 8, subcategory: '木製ユニット', pdfVolume: 5 },
  { figureNumber: '8-21', title: 'くつふきマット', categoryNum: 8, subcategory: 'くつふきマット等', pdfVolume: 5 },
  { figureNumber: '8-22', title: 'くつ洗い流し', categoryNum: 8, subcategory: 'くつふきマット等', pdfVolume: 5 },
  { figureNumber: '8-31', title: '雑金物：タラップ', categoryNum: 8, subcategory: '雑金物', pdfVolume: 5 },
  { figureNumber: '8-41', title: 'サイン：庁舎名サイン（壁付）、誘導サイン', categoryNum: 8, subcategory: 'サイン', pdfVolume: 5 },
  { figureNumber: '8-42', title: 'サイン：総合案内板', categoryNum: 8, subcategory: 'サイン', pdfVolume: 5 },
  { figureNumber: '8-43', title: 'サイン：室名札', categoryNum: 8, subcategory: 'サイン', pdfVolume: 5 },
  { figureNumber: '8-44', title: 'サイン：室内用図記号、誘導サイン（天吊型）', categoryNum: 8, subcategory: 'サイン', pdfVolume: 5 },

  // 9. 外構 → 6巻
  { figureNumber: '9-01', title: '植栽：支柱形式', categoryNum: 9, subcategory: '植栽', pdfVolume: 6 },
  { figureNumber: '9-02', title: '植栽：支柱形式', categoryNum: 9, subcategory: '植栽', pdfVolume: 6 },
  { figureNumber: '9-11', title: '側溝、街きょ、縁石', categoryNum: 9, subcategory: '側溝・桝・マンホール', pdfVolume: 6 },
  { figureNumber: '9-12', title: '側溝、側溝桝、街きょ桝', categoryNum: 9, subcategory: '側溝・桝・マンホール', pdfVolume: 6 },
  { figureNumber: '9-13', title: 'ガソリントラップ桝', categoryNum: 9, subcategory: '側溝・桝・マンホール', pdfVolume: 6 },
  { figureNumber: '9-14', title: '雨水桝、集水桝', categoryNum: 9, subcategory: '側溝・桝・マンホール', pdfVolume: 6 },
  { figureNumber: '9-15', title: '雨水マンホール', categoryNum: 9, subcategory: '側溝・桝・マンホール', pdfVolume: 6 },
  { figureNumber: '9-16', title: 'トラップマンホール', categoryNum: 9, subcategory: '側溝・桝・マンホール', pdfVolume: 6 },
  { figureNumber: '9-17', title: '浸透施設', categoryNum: 9, subcategory: '浸透施設', pdfVolume: 6 },
  { figureNumber: '9-21', title: '構内舗装断面：車道部', categoryNum: 9, subcategory: '構内舗装', pdfVolume: 6 },
  { figureNumber: '9-22', title: '構内舗装断面：歩道部', categoryNum: 9, subcategory: '構内舗装', pdfVolume: 6 },
  { figureNumber: '9-23', title: '構内舗装断面：歩道部', categoryNum: 9, subcategory: '構内舗装', pdfVolume: 6 },
  { figureNumber: '9-25', title: '駐車場：車止め', categoryNum: 9, subcategory: '駐車場', pdfVolume: 6 },
  { figureNumber: '9-31', title: '門：両開き戸', categoryNum: 9, subcategory: '門', pdfVolume: 6 },
  { figureNumber: '9-32', title: '門：引き戸', categoryNum: 9, subcategory: '門', pdfVolume: 6 },
  { figureNumber: '9-33', title: '門：両開き戸', categoryNum: 9, subcategory: '門', pdfVolume: 6 },
  { figureNumber: '9-34', title: '門：片開き戸', categoryNum: 9, subcategory: '門', pdfVolume: 6 },
  { figureNumber: '9-35', title: '門：引き戸', categoryNum: 9, subcategory: '門', pdfVolume: 6 },
  { figureNumber: '9-42', title: '擁壁（法令等による規定の対象外の場合）', categoryNum: 9, subcategory: '擁壁', pdfVolume: 6 },
];
