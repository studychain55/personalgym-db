// Scraper configuration for personalgym-db
export const CONFIG = {
  // Rate limiting
  requestDelay: 2000,
  maxRetries: 3,
  retryDelay: 5000,

  // Output
  outputDir: '/Users/80dr/personalgym-db/scripts/scraper/data',
  checkpointFile: '/Users/80dr/personalgym-db/scripts/scraper/data/checkpoint.json',

  // User agent
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
};

// FitMap area codes
export const FITMAP_AREAS = {
  1: '東京都', 2: '神奈川県', 3: '千葉県', 4: '埼玉県', 5: '茨城県',
  6: '栃木県', 7: '群馬県', 8: '北海道', 9: '青森県', 10: '岩手県',
  11: '宮城県', 12: '大阪府', 13: '兵庫県', 14: '京都府', 15: '滋賀県',
  16: '奈良県', 17: '和歌山県', 18: '北海道', 19: '秋田県', 20: '山形県',
  21: '福島県', 22: '新潟県', 23: '富山県', 24: '石川県', 25: '福井県',
  26: '山梨県', 27: '長野県', 28: '岐阜県', 29: '静岡県', 30: '愛知県',
  31: '広島県', 32: '岡山県', 33: '鳥取県', 34: '島根県', 35: '山口県',
  36: '徳島県', 37: '香川県', 38: '愛媛県', 39: '高知県', 40: '福岡県',
  41: '佐賀県', 42: '長崎県', 43: '熊本県', 44: '大分県', 45: '宮崎県',
  46: '鹿児島県', 47: '沖縄県', 48: '三重県',
};

// HotPepper prefecture codes
export const HP_PREFECTURES = {
  'pre01': '北海道', 'pre02': '青森県', 'pre03': '岩手県', 'pre04': '宮城県',
  'pre05': '秋田県', 'pre06': '山形県', 'pre07': '福島県', 'pre08': '茨城県',
  'pre09': '栃木県', 'pre10': '群馬県', 'pre11': '埼玉県', 'pre12': '千葉県',
  'pre13': '東京都', 'pre14': '神奈川県', 'pre15': '新潟県', 'pre16': '富山県',
  'pre17': '石川県', 'pre18': '福井県', 'pre19': '山梨県', 'pre20': '長野県',
  'pre21': '岐阜県', 'pre22': '静岡県', 'pre23': '愛知県', 'pre24': '三重県',
  'pre25': '滋賀県', 'pre26': '京都府', 'pre27': '大阪府', 'pre28': '兵庫県',
  'pre29': '奈良県', 'pre30': '和歌山県', 'pre31': '鳥取県', 'pre32': '島根県',
  'pre33': '岡山県', 'pre34': '広島県', 'pre35': '山口県', 'pre36': '徳島県',
  'pre37': '香川県', 'pre38': '愛媛県', 'pre39': '高知県', 'pre40': '福岡県',
  'pre41': '佐賀県', 'pre42': '長崎県', 'pre43': '熊本県', 'pre44': '大分県',
  'pre45': '宮崎県', 'pre46': '鹿児島県', 'pre47': '沖縄県',
};

// Getfit area slugs
export const GETFIT_AREAS = [
  'tokyo', 'osaka', 'nagoya', 'fukuoka', 'yokohama', 'kyoto', 'kobe',
  'saitama', 'chiba', 'hiroshima', 'sendai', 'sapporo', 'niigata',
  'shizuoka', 'okayama', 'kumamoto', 'kagoshima', 'okinawa', 'kanazawa',
  'nagasaki', 'matsuyama', 'takamatsu', 'nara', 'otsu', 'wakayama',
  'tottori', 'shimane', 'tokushima', 'kochi', 'saga', 'oita', 'miyazaki',
  'aomori', 'akita', 'iwate', 'yamagata', 'fukushima', 'mito',
  'utsunomiya', 'maebashi', 'kofu', 'nagano', 'toyama', 'fukui',
  'gifu', 'tsu', 'takasaki', 'kawasaki', 'machida', 'tachikawa',
  'ikebukuro', 'shinjuku', 'shibuya', 'ginza', 'roppongi', 'akasaka',
  'ebisu', 'meguro', 'gotanda', 'shinagawa', 'ueno', 'akihabara',
  'kinshicho', 'kitasenju', 'omiya', 'urawa', 'funabashi', 'kashiwa',
  'umeda', 'namba', 'tennoji', 'sakai', 'takatsuki',
  'sannomiya', 'nishinomiya', 'himeji',
  'hakata', 'tenjin', 'kokura',
];

// Concierge.diet prefectures
export const CONCIERGE_PREFECTURES = [
  'hokkaido', 'aomori', 'iwate', 'miyagi', 'akita', 'yamagata', 'fukushima',
  'ibaraki', 'tochigi', 'gunma', 'saitama', 'chiba', 'tokyo', 'kanagawa',
  'niigata', 'toyama', 'ishikawa', 'fukui', 'yamanashi', 'nagano',
  'gifu', 'shizuoka', 'aichi', 'mie',
  'shiga', 'kyoto', 'osaka', 'hyogo', 'nara', 'wakayama',
  'tottori', 'shimane', 'okayama', 'hiroshima', 'yamaguchi',
  'tokushima', 'kagawa', 'ehime', 'kochi',
  'fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima', 'okinawa',
];

// Pasona area slugs
export const PASONA_AREAS = [
  'hokkaido', 'aomori', 'iwate', 'akita', 'miyagi', 'yamagata', 'fukushima',
  'ibaraki', 'tochigi', 'gunma', 'saitama', 'chiba', 'tokyo', 'kanagawa',
  'niigata', 'kanazawa', 'toyama', 'fukui', 'yamanashi', 'nagano',
  'gifu', 'shizuoka', 'aichi', 'mie',
  'shiga', 'kyoto', 'osaka', 'hyogo', 'nara', 'wakayama',
  'tottori', 'shimane', 'okayama', 'hiroshima', 'yamaguchi',
  'tokushima', 'kagawa', 'ehime', 'kochi',
  'fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima', 'okinawa',
];
