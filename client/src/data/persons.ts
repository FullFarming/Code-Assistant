export interface Responsibility {
  label: string;
  taskKey: string;
  description: string;
}

export interface Person {
  id: string;
  name: string;
  nameEn: string;
  region: string;
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
    id: "person_grace",
    name: "권희원",
    nameEn: "Grace Kwon",
    region: "KOR",
    title: "이사",
    team: "WPR팀",
    emoji: "👔",
    color: "#8B5CF6",
    avatarInitial: "권",
    description: "Legal & Compliance Coordination",
    responsibilities: [
      {
        label: "NDA Review Process",
        taskKey: "nda_review",
        description: "비밀유지약정서(NDA) 리뷰 절차 안내"
      },
      {
        label: "Contract Review & Legal Coordination",
        taskKey: "contract_review",
        description: "계약서 검토 지원 및 Legal Coordination"
      },
      {
        label: "계약서 날인 및 보관",
        taskKey: "contract_seal",
        description: "Glosign 전자 날인 / 실물 날인 / 보관 절차"
      },
      {
        label: "Compliance Coordination",
        taskKey: "compliance",
        description: "윤리 및 규정 준수 조항 Coordination"
      },
    ],
  },
  {
    id: "person_noel",
    name: "김경만",
    nameEn: "Noel Kim",
    region: "KOR",
    title: "과장",
    team: "WPR팀",
    emoji: "💻",
    color: "#3B82F6",
    avatarInitial: "김",
    description: "IT Support & 문서 날인 담당",
    responsibilities: [
      { label: "IT Coordination", taskKey: "it_coord", description: "IT 이슈 발생 시 IT Chat·Help-hub 안내 및 직접 지원" },
      { label: "비대면 전자 계약 (Glosign)", taskKey: "인감", description: "Glosign 전자서명 절차 안내" },
      { label: "Solstice 화면 공유", taskKey: "solstice", description: "Solstice 무선 화면 공유 설정 지원" },
      { label: "Canteen 회의실 Teams Room", taskKey: "canteen", description: "Canteen 회의실 화상회의 설정" },
      { label: "프린트 (Printix)", taskKey: "printix", description: "사내 Printix 앱 설치 및 출력 안내" },
      { label: "계약서 실물 날인 및 부대서류 지급", taskKey: "physical_seal", description: "계약서 실물 날인, 부대서류 날인, 법인인감증명서·등기부등본 지급" },
    ],
  },
  {
    id: "person_gina",
    name: "김지성",
    nameEn: "Gina Kim",
    region: "KOR",
    title: "대리",
    team: "WPR팀",
    emoji: "✈️",
    color: "#F59E0B",
    avatarInitial: "김",
    description: "Office 관리 및 행정 업무 지원 담당",
    responsibilities: [
      { label: "공문번호 발급", taskKey: "공문번호", description: "사내 공문 번호 발급 및 문서 등록" },
      { label: "보관계약서 열람", taskKey: "계약서", description: "기존 계약서 사본 및 열람 지원" },
      { label: "국내 출장 지원", taskKey: "국내출장", description: "국내 출장 신청·정산 절차 안내" },
      { label: "해외 출장 지원", taskKey: "해외출장", description: "해외 출장 신청, 비자·항공·숙박 안내" },
      { label: "사물함(락커) 이용", taskKey: "락커", description: "사물함 배정 및 이용 안내" },
      { label: "Workday Supplier 등록", taskKey: "supplier", description: "Workday 공급업체 등록 및 승인" },
      { label: "오피스 시설 수리 지원", taskKey: "office_repair", description: "오피스 내 문제 발생 시 수리·유지보수 지원 요청" },
    ],
  },
  {
    id: "person_emma",
    name: "송진영",
    nameEn: "Emma Song",
    region: "KOR",
    title: "사원",
    team: "WPR팀",
    emoji: "🌸",
    color: "#EC4899",
    avatarInitial: "송",
    description: "Receptionist",
    responsibilities: [
      { label: "CWK 명함 신청", taskKey: "명함", description: "임직원 명함 제작 신청 및 수령" },
      { label: "화환 신청", taskKey: "화환", description: "경조사 화환 주문 및 배송 처리" },
      { label: "법인 차량 관리", taskKey: "법인차량", description: "법인 차량 예약 및 사용 안내" },
      { label: "고객사 주차 등록", taskKey: "parking_reg", description: "고객사 방문 차량 주차 등록 (고객사명 + 차량번호 필요)" },
    ],
  },
];
