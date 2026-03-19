export interface SearchableTask {
  key: string;
  label: string;
  badge: string;
  icon: string;
  keywords: string[];
  ownerName: string;
  ownerEn: string;
}

export const searchIndex: SearchableTask[] = [
  {
    key: '공문번호', label: '공문번호 발급', badge: '행정', icon: '📄',
    keywords: ['공문', '번호', '발급', '공식문서', '날인', '승인', '문서번호'],
    ownerName: '김지성 대리', ownerEn: 'gina kim',
  },
  {
    key: '명함', label: '명함 신청', badge: '행정', icon: '💳',
    keywords: ['명함', '비즈니스카드', '카드', '이름', '인쇄', '제작'],
    ownerName: '송진영 사원', ownerEn: 'emma song',
  },
  {
    key: '계약서', label: '보관계약서', badge: '행정', icon: '📁',
    keywords: ['계약', '계약서', '보관', '서류', '문서', '열람', '사본'],
    ownerName: '김지성 대리', ownerEn: 'gina kim',
  },
  {
    key: '화환', label: '화환 신청', badge: '지원', icon: '🌸',
    keywords: ['화환', '꽃', '경조사', '결혼', '장례', '축하', '부의'],
    ownerName: '송진영 사원', ownerEn: 'emma song',
  },
  {
    key: '국내출장', label: '국내 출장', badge: '지원', icon: '🚄',
    keywords: ['출장', '국내', 'ktx', '교통', '숙박', '정산', '경비', '기차', '국내출장'],
    ownerName: '김지성 대리', ownerEn: 'gina kim',
  },
  {
    key: '해외출장', label: '해외 출장', badge: '지원', icon: '✈️',
    keywords: ['출장', '해외', '항공', '비자', '여권', '외국', '해외출장', '호텔', '환율'],
    ownerName: '김지성 대리', ownerEn: 'gina kim',
  },
  {
    key: '락커', label: '락커 사용', badge: '시설', icon: '🔐',
    keywords: ['락커', '사물함', '보관함', 'locker', '자물쇠', '열쇠'],
    ownerName: '김지성 대리', ownerEn: 'gina kim',
  },
  {
    key: '인감', label: '비대면 인감 날인', badge: '시설', icon: '🖊️',
    keywords: ['인감', '날인', 'glosign', '전자서명', '서명', '도장', '비대면'],
    ownerName: '김경만 과장', ownerEn: 'noel kim',
  },
  {
    key: '법인차량', label: '법인차량', badge: '시설', icon: '🚗',
    keywords: ['차량', '법인차', '회사차', '자동차', '예약', '운전', '차'],
    ownerName: '송진영 사원', ownerEn: 'emma song',
  },
  {
    key: 'supplier', label: 'Supplier 등록', badge: 'IT', icon: '💼',
    keywords: ['supplier', '공급업체', '거래처', 'workday', '등록', '벤더', 'vendor'],
    ownerName: '김지성 대리', ownerEn: 'gina kim',
  },
  {
    key: 'solstice', label: 'Solstice', badge: 'IT', icon: '🖥️',
    keywords: ['solstice', '화면공유', '미러링', '프레젠테이션', '무선', '디스플레이'],
    ownerName: '김경만 과장', ownerEn: 'noel kim',
  },
  {
    key: 'canteen', label: 'Canteen Room', badge: 'IT', icon: '📹',
    keywords: ['canteen', '회의실', '화상회의', 'teams', '영상통화', '미팅룸', '칸틴'],
    ownerName: '김경만 과장', ownerEn: 'noel kim',
  },
  {
    key: 'printix', label: 'Printix', badge: 'IT', icon: '🖨️',
    keywords: ['printix', '프린트', '출력', '인쇄', '프린터', '복합기', '스캔'],
    ownerName: '김경만 과장', ownerEn: 'noel kim',
  },
  {
    key: 'wpr_overview', label: 'WPR 총괄', badge: '총괄', icon: '🏢',
    keywords: ['총괄', 'wpr', '관리', '권희원', 'grace', '이사', '팀장'],
    ownerName: '권희원 이사', ownerEn: 'grace kwon',
  },
  {
    key: 'nda_review', label: 'NDA Review', badge: 'Legal', icon: '🔒',
    keywords: ['nda', '비밀유지', '약정서', '비밀', 'non-disclosure', 'confidential', '체크리스트', '기밀'],
    ownerName: '권희원 이사', ownerEn: 'grace kwon',
  },
  {
    key: 'contract_review', label: 'Contract Review', badge: 'Legal', icon: '📋',
    keywords: ['계약', 'contract', '리뷰', '검토', '표준계약', '고객사양식', 'legal', '법률', '계약서검토'],
    ownerName: '권희원 이사', ownerEn: 'grace kwon',
  },
  {
    key: 'compliance', label: 'Compliance', badge: 'Compliance', icon: '⚖️',
    keywords: ['compliance', '컴플라이언스', '윤리', '규정', '준수', 'ethics', 'fcpa', 'anti-corruption', '부패방지'],
    ownerName: '권희원 이사', ownerEn: 'grace kwon',
  },
];

export function searchTasks(query: string, tasks: SearchableTask[]): SearchableTask[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return tasks
    .filter(task => {
      if (task.label.toLowerCase().includes(q)) return true;
      if (task.key.toLowerCase().includes(q)) return true;
      if (task.keywords.some(kw => kw.toLowerCase().includes(q))) return true;
      if (task.ownerName.toLowerCase().includes(q)) return true;
      if (task.ownerEn.toLowerCase().includes(q)) return true;
      if (task.badge.toLowerCase().includes(q)) return true;
      return false;
    })
    .slice(0, 6);
}
