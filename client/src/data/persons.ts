export interface Responsibility {
  label: string;
  taskKey: string;
  description: string;
}

export interface Person {
  id: string;
  name: string;
  title: string;
  team: string;
  emoji: string;
  color: string;
  avatarInitial: string;
  description: string;
  responsibilities: Responsibility[];
}

export const persons: Person[] = [
  {
    id: "person_jisung",
    name: "김지성",
    title: "대리",
    team: "WPR팀",
    emoji: "✈️",
    color: "#F59E0B",
    avatarInitial: "김",
    description: "출장·이동·행사 지원 담당",
    responsibilities: [
      { label: "국내 출장 지원", taskKey: "국내출장", description: "국내 출장 신청·정산 절차 안내" },
      { label: "해외 출장 지원", taskKey: "해외출장", description: "해외 출장 신청, 비자·항공·숙박 안내" },
      { label: "화환 신청", taskKey: "화환", description: "경조사 화환 주문 및 배송 처리" },
      { label: "법인 차량 관리", taskKey: "법인차량", description: "법인 차량 예약 및 사용 안내" },
    ],
  },
  {
    id: "person_sujin",
    name: "이수진",
    title: "주임",
    team: "WPR팀",
    emoji: "📄",
    color: "#6366F1",
    avatarInitial: "이",
    description: "계약·문서·공식 행정 담당",
    responsibilities: [
      { label: "공문번호 발급", taskKey: "공문번호", description: "사내 공문 번호 발급 및 문서 등록" },
      { label: "비대면 계약 (Glosign)", taskKey: "인감", description: "Glosign 전자서명 계약 진행" },
      { label: "보관계약서 열람", taskKey: "계약서", description: "기존 계약서 사본 및 열람 지원" },
    ],
  },
  {
    id: "person_minjun",
    name: "박민준",
    title: "사원",
    team: "WPR팀",
    emoji: "🏢",
    color: "#10B981",
    avatarInitial: "박",
    description: "총무·비품·사무환경 담당",
    responsibilities: [
      { label: "CWK 명함 신청", taskKey: "명함", description: "임직원 명함 제작 신청 및 수령" },
      { label: "CWK 사물함 신청", taskKey: "락커", description: "사물함 배정 신청 및 열쇠 수령" },
      { label: "Canteen Room 안내", taskKey: "canteen", description: "사내 카페테리아 이용 및 예약 안내" },
    ],
  },
  {
    id: "person_haeun",
    name: "정하은",
    title: "주임",
    team: "WPR팀",
    emoji: "💻",
    color: "#3B82F6",
    avatarInitial: "정",
    description: "IT시스템·회의실·장비 담당",
    responsibilities: [
      { label: "Workday Supplier 등록", taskKey: "supplier", description: "Workday 공급업체 등록 및 승인" },
      { label: "프린트 (Printix)", taskKey: "printix", description: "사내 Printix 앱 설치 및 출력 안내" },
      { label: "회의실 영상장비 (Solstice)", taskKey: "solstice", description: "Solstice 화면 공유 설정 지원" },
    ],
  },
];
