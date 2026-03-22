export interface EmailTemplate {
  to: string;
  cc?: string;
  subject: string;
  body: string;
  attach?: string;
}

export interface Step {
  n: number;
  title: string;
  desc: string;
  detail?: string | null;
  email?: EmailTemplate | null;
}

export interface InfoCard {
  title: string;
  items: string[];
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface Owner {
  icon: string;
  name: string;
  nameKo: string;
  team: string;
  contact?: string;
}

export interface CautionItem {
  title: string;
  items: string[];
}

export interface TaskData {
  icon: string;
  label: string;
  badge: string;
  owner: Owner;
  steps: Step[];
  infoGrid?: InfoCard[];
  table?: TableData;
  warn?: string;
  note?: string;
  cautionList?: CautionItem[];
}

export interface BubbleConfig {
  key: string;
  emoji: string;
  text: string;
  top: string;
  left?: string;
  right?: string;
  floatClass: "float-a" | "float-b" | "float-c";
}

export const BUBBLES: BubbleConfig[] = [
  { key: "공문번호", emoji: "📄", text: "공문번호 발급", top: "3%", left: "5%", floatClass: "float-a" },
  { key: "명함", emoji: "💳", text: "명함 신청", top: "3%", right: "6%", floatClass: "float-b" },
  { key: "계약서", emoji: "📁", text: "보관계약서", top: "17%", left: "2%", floatClass: "float-c" },
  { key: "화환", emoji: "🌸", text: "화환 신청", top: "17%", right: "3%", floatClass: "float-a" },
  { key: "국내출장", emoji: "🚄", text: "국내 출장", top: "31%", left: "5%", floatClass: "float-b" },
  { key: "해외출장", emoji: "✈️", text: "해외 출장", top: "31%", right: "4%", floatClass: "float-c" },
  { key: "락커", emoji: "🔐", text: "락커 사용", top: "45%", left: "2%", floatClass: "float-a" },
  { key: "인감", emoji: "✍️", text: "전자 계약", top: "45%", right: "2%", floatClass: "float-b" },
  { key: "법인차량", emoji: "🚗", text: "법인차량", top: "58%", left: "4%", floatClass: "float-c" },
  { key: "supplier", emoji: "💼", text: "Supplier", top: "58%", right: "5%", floatClass: "float-a" },
  { key: "solstice", emoji: "🖥️", text: "Solstice", top: "71%", left: "3%", floatClass: "float-b" },
  { key: "canteen", emoji: "📹", text: "Canteen Room", top: "71%", right: "3%", floatClass: "float-c" },
  { key: "printix", emoji: "🖨️", text: "Printix", top: "83%", left: "30%", floatClass: "float-a" },
];

export const DATA: Record<string, TaskData> = {
  공문번호: {
    icon: "📄", label: "공문번호 발급", badge: "행정",
    owner: { icon: "👩‍💼", name: "Gina Kim", nameKo: "김지성 대리", team: "WPR", contact: "gina.kim@cushwake.com" },
    steps: [
      {
        n: 1, title: "공문 작성",
        desc: "공문 양식에 맞게 내용을 작성합니다. 공문번호 란은 <strong>빈칸</strong>으로 두세요.",
        detail: null
      },
      {
        n: 2, title: "승인 요청 메일 발송",
        desc: "부서장(To), 관련자(cc), WPR Gina Kim(cc)에게 발송합니다.",
        email: {
          to: "부서장",
          cc: "관련자, Gina Kim (gina.kim@cushwake.com)",
          subject: "[승인요청] 공문번호 발급 – [공문명] / [날짜]",
          body: "안녕하세요,\n\n[공문명]에 대한 공문번호 발급 승인을 요청드립니다.\n\n■ 공문 목적   : [내용 기재]\n■ 수신처     : [기관/회사명]\n■ 발신 예정일 : [날짜]\n\n검토 및 승인 부탁드립니다.\n승인 후 Gina Kim께서 공문번호를 회신해 주실 예정입니다.\n\n감사합니다.",
          attach: "[공문명]_초안.pdf"
        }
      },
      {
        n: 3, title: "공문번호 회신 수령",
        desc: "승인 완료 후 <strong>Gina Kim</strong>이 메일로 공문번호를 회신합니다.",
        detail: null
      },
      {
        n: 4, title: "번호 기재 후 글로싸인 날인",
        desc: "회신받은 번호를 기재한 뒤 <strong>Glosign</strong>을 통해 법인인감 날인을 요청합니다.",
        detail: "→ 비대면 전자 계약 절차는 ✍️ 비대면 전자 계약(Glosign) 항목을 참고하세요."
      }
    ]
  },

  명함: {
    icon: "💳", label: "명함 신청 방법", badge: "행정",
    owner: { icon: "💁‍♀️", name: "Emma Song", nameKo: "송진영 사원", team: "Reception", contact: "emma.song@cushwake.com" },
    steps: [
      { n: 1, title: "신규 직원 명함", desc: "신규 입사자 명함은 <strong>WPR팀(Emma Song)</strong>에서 우선 신청하여 준비합니다.", detail: null },
      {
        n: 2, title: "추가 명함 – 사이트 접속",
        desc: '<a href="https://www.printrobo.co.kr/sps/cushmanwakefield/" target="_blank" rel="noopener noreferrer" style="color:#1976d2">printrobo.co.kr/sps/cushmanwakefield</a><br><strong>ID:</strong> CWK1234 &nbsp; <strong>PW:</strong> cw123456',
        detail: null
      },
      {
        n: 3, title: "템플릿 선택 및 내용 입력",
        desc: "왼쪽 템플릿 리스트 → 명함작성 접속 → 내용 기재 후 시안 검토 → [다음]",
        detail: '부서 아래 그룹명이 필요한 경우 <strong>그룹명 추가 템플릿 (2번째)</strong>을 사용하세요.'
      },
      { n: 4, title: "배송 (3~5일 이내)", desc: "주문 완료 후 3~5일 이내 사무실로 배송됩니다.", detail: null }
    ]
  },

  계약서: {
    icon: "📁", label: "보관계약서 열람", badge: "행정",
    owner: { icon: "👩‍💼", name: "Gina Kim", nameKo: "김지성 대리", team: "WPR", contact: "gina.kim@cushwake.com" },
    steps: [
      {
        n: 1, title: "Gina Kim에게 열람 요청 메일",
        desc: "연도·월·고객사명을 구체적으로 기재하여 요청합니다.",
        email: {
          to: "Gina Kim (gina.kim@cushwake.com)",
          subject: "[보관계약서 열람] [고객사명] / [계약년월]",
          body: "안녕하세요 Gina님,\n\n아래 계약서 열람을 요청드립니다.\n\n■ 고객사명  : [고객사명]\n■ 계약년월  : [YYYY년 MM월]\n■ 계약 내용 : [계약 유형]\n■ 필요 사유 : [사유 기재]\n■ 형태 요청 : □ 스캔본  □ 실물\n\n감사합니다."
        }
      },
      {
        n: 2, title: "형태 구분",
        desc: "• <strong>스캔본:</strong> 메일로 수령 가능<br>• <strong>실물:</strong> 별도 안내",
        detail: "보관 중인 계약서는 부서로부터 날인이 완료된 계약서 중 보관 요청을 받아 전달받은 것만 해당됩니다."
      }
    ],
  },

  화환: {
    icon: "🌸", label: "화환 신청 방법", badge: "지원",
    owner: { icon: "💁‍♀️", name: "Emma Song", nameKo: "송진영 사원", team: "Reception", contact: "emma.song@cushwake.com" },
    steps: [
      { n: 1, title: "화환 상품 확인", desc: '<a href="http://bosanflower.com/main/main.php" target="_blank" rel="noopener noreferrer" style="color:#1976d2">bosanflower.com</a> 에서 원하는 상품을 확인합니다.', detail: null },
      { n: 2, title: "화환 신청서 작성", desc: "신청서 바로가기 링크를 통해 작성합니다. (*표시 항목 필수)", detail: null },
      { n: 3, title: "소속 팀장 승인", desc: "소속 부서 팀장의 승인을 진행합니다.", detail: null },
      { n: 4, title: "Reception Emma Song에게 제출", desc: "승인 완료 후 Emma Song에게 전달하면 신청이 완료됩니다.", detail: null }
    ],
  },

  국내출장: {
    icon: "🚄", label: "국내 출장 신청", badge: "지원",
    owner: { icon: "👩‍💼", name: "Gina Kim", nameKo: "김지성 대리", team: "WPR", contact: "gina.kim@cushwake.com" },
    steps: [
      { n: 1, title: "국내 출장 신청서 작성", desc: "국내 출장 신청서 링크를 통해 작성합니다.", detail: null },
      { n: 2, title: "팀장님 및 대표님 승인", desc: "", detail: null },
      {
        n: 3, title: "WPR 김지성 대리에게 제출",
        desc: "승인 완료 후 김지성 대리에게 승인 내역 및 지원 요청사항을 전달합니다.",
        email: {
          to: "Gina Kim (gina.kim@cushwake.com)",
          subject: "[국내출장] [이름] / [출장지] / [기간]",
          body: "안녕하세요 Gina님,\n\n국내 출장 승인이 완료되어 지원 요청 드립니다.\n\n■ 출장자    : [이름 / 직급 / 부서]\n■ 출장지    : [목적지]\n■ 출장기간  : [YYYY.MM.DD ~ YYYY.MM.DD]\n■ 출장 목적 : [내용]\n\n[지원 요청사항]\n- 호텔  : □ 필요  □ 불필요\n- 교통편 : □ KTX  □ 항공  □ 기타\n\n감사합니다.",
          attach: "국내출장_신청서_승인완료.pdf"
        }
      },
      { n: 4, title: "예약 완료 메일 수령", desc: "여행사를 통해 호텔·교통편 예약 완료 후 내역을 메일로 수령합니다.", detail: null }
    ],
  },

  해외출장: {
    icon: "✈️", label: "해외 출장 신청", badge: "지원 · APAC",
    owner: { icon: "👩‍💼", name: "Gina Kim", nameKo: "김지성 대리", team: "WPR", contact: "gina.kim@cushwake.com" },
    steps: [
      { n: 1, title: "해외 출장 신청서 작성", desc: "", detail: null },
      { n: 2, title: "팀장님 및 대표님 국내 승인", desc: "", detail: null },
      {
        n: 3, title: "WPR 김지성 대리를 통해 APAC 승인",
        desc: "Travel Requisition Form + 대표님 승인 내역 필요",
        email: {
          to: "Gina Kim (gina.kim@cushwake.com)",
          subject: "[해외출장 APAC승인] [이름] / [국가] / [기간]",
          body: "안녕하세요 Gina님,\n\n해외 출장 국내 승인이 완료되어 APAC 승인 요청 드립니다.\n\n■ 출장자    : [이름 / 직급 / 부서]\n■ 출장국가  : [국가명 / 도시]\n■ 출장기간  : [YYYY.MM.DD ~ YYYY.MM.DD]\n■ 출장 목적 : [내용]\n■ 항공편    : □ Economy  □ Premium Economy  □ Business\n\nTravel Requisition Form 및 대표님 승인 내역 첨부합니다.\n\n감사합니다.",
          attach: "Travel_Requisition_Form.docx | 대표님_승인내역.pdf"
        }
      },
      { n: 4, title: "항공·호텔 예약 요청", desc: "APAC 승인 후 WPR팀에 예약 요청합니다.", detail: null }
    ],
    infoGrid: [
      { title: "✈️ 항공 규정", items: ["7시간 미만 → Economy만","7시간 이상 → Premium Economy","ED 이상 + 7시간 이상 → Business"] },
      { title: "🏨 호텔 규정", items: ["승인 예산 한도 내 예약","Client 동반 시 동일 호텔 가능"] },
      { title: "🛂 중국 비자", items: ["여행사 대행 신청 가능","최소 2주 전 신청 필수"] }
    ],
  },

  락커: {
    icon: "🔐", label: "락커 사용 방법 (ML81PA)", badge: "시설",
    owner: { icon: "👩‍💼", name: "Gina Kim", nameKo: "김지성 대리", team: "WPR", contact: "gina.kim@cushwake.com" },
    infoGrid: [
      { title: "🔒 잠글 때 (일회성)", items: ["문 닫고 비밀번호(4자리) 입력","솔도~ + 적색 LED 3회 → 완료","5~12자리: ⊞ + PW + ⊞"] },
      { title: "🔓 열 때 (일회성)", items: ["등록 비밀번호 입력","도미솔~ + 녹색 LED 3회","⚠️ 해제 후 비밀번호 자동 삭제"] },
      { title: "🔒 잠글 때 (영구성)", items: ["문 닫으면 자동 잠김","솔도~ + 적색 LED 3회"] },
      { title: "🔓 열 때 (영구성)", items: ["등록 비밀번호 입력","도미솔~ + 녹색 LED 3회"] },
      { title: "🔑 마스터 비밀번호", items: ["⊞ + 마스터PW + ⊞","⚠️ 사용 시 유저PW 삭제됨"] },
      { title: "🔋 배터리 방전 시", items: ["Micro 5핀 케이블 앞면 연결","비밀번호 입력 → 해제 후 교체"] }
    ],
    steps: [],
  },

  인감: {
    icon: "✍️", label: "비대면 전자 계약 (Glosign)", badge: "Legal",
    owner: { icon: "👔", name: "Grace Kwon", nameKo: "권희원 이사", team: "WPR", contact: "grace.kwon@ap.cushwake.com" },
    steps: [
      {
        n: 1,
        title: "Glosign 접속 → [계약 시작하기]",
        desc: "웹브라우저에서 <strong>glosign.com</strong> 접속 후 로그인 → 우측 상단 [계약 시작하기] 클릭",
        detail: null
      },
      {
        n: 2,
        title: "계약서 파일 업로드",
        desc: "지원 형식: <strong>hwp · pdf · jpg · doc · docx</strong> / 최대 10MB",
        detail: "Google Drive, Dropbox에서 직접 불러오기도 가능합니다."
      },
      {
        n: 3,
        title: "계약명 + 메시지 입력 → [다음]",
        desc: "계약명은 상대방에게 표시되므로 정확하게 입력하세요.",
        detail: null
      },
      {
        n: 4,
        title: "[비대면 계약] 선택 → [참여자 추가]",
        desc: "계약 유형에서 <strong>[비대면 계약]</strong>을 선택한 후 서명 참여자를 추가합니다.",
        detail: null
      },
      {
        n: 5,
        title: "서명참여자(법인인감 날인 권한자) 설정",
        desc: "법인인감 날인 권한자를 반드시 포함해야 합니다.",
        detail: '법인인감 날인 권한자: <strong>권희원 이사</strong><br>grace.kwon@ap.cushwake.com / 010-9282-4534'
      },
      {
        n: 6,
        title: "날인 위치 지정 → [다음]",
        desc: "[도장 모양] 클릭 → 계약서 페이지에서 날인 위치 지정",
        detail: "인감증명서·법인등기부등본 첨부 요청 시: [클립 모양] 클릭 → 첨부파일명 입력 후 [요청하기]"
      },
      {
        n: 7,
        title: "[최종 확인] → 전자서명 신청 완료",
        desc: "참여자 정보와 날인 위치를 확인한 후 [신청하기]를 클릭하면 참여자에게 서명 요청 메일이 발송됩니다.",
        detail: null
      }
    ],
    note: "Glosign은 법적 효력이 있는 공인전자서명 플랫폼입니다. 계약서 원본은 Glosign에 자동 보관되며, 완료 후 PDF 다운로드가 가능합니다.",
  },

  법인차량: {
    icon: "🚗", label: "법인차량 이용", badge: "시설 · 커넥트프로",
    owner: { icon: "💁‍♀️", name: "Emma Song", nameKo: "송진영 사원", team: "WPR", contact: "emma.song@cushwake.com" },
    steps: [
      {
        n: 1, title: "앱 설치 및 법인 연결",
        desc: "App Store / Play Store에서 <strong>'롯데렌터카 비즈카'</strong> 설치",
        detail: '• 법인 등록번호: <strong>110114-0194461</strong><br>• 사업자등록번호: <strong>104-81-51299</strong>'
      },
      { n: 2, title: "차량 예약", desc: "전체 메뉴 → 예약하기 → 주차장 검색(서울파이낸스센터) → 차량 선택 → 예약 일정·용도·목적지 입력 → 예약하기", detail: null },
      { n: 3, title: "담당자 승인 완료 확인", desc: "예약/배차 이력에서 승인 완료 상태 확인", detail: null }
    ],
    table: {
      headers: ["항목","내용"],
      rows: [
        ["운행일지","날짜·시간, 목적지·업무내용, 출발/도착 KM, 주행거리, 주유금액"],
        ["주유비","법인카드 결제 후 Expense 청구"],
        ["주차·톨비","Expense 청구 (목적지·업무내용 기재)"],
        ["주차 위치","항상 지하 6층"],
        ["긴급 문제","롯데렌터카 1588-1230"],
        ["사고 발생","김지성 대리에게 즉시 연락"]
      ]
    },
  },

  supplier: {
    icon: "💼", label: "Workday Supplier 등록", badge: "IT · 5-Step",
    owner: { icon: "👩‍💼", name: "Gina Kim", nameKo: "김지성 대리", team: "WPR", contact: "gina.kim@cushwake.com" },
    steps: [
      { n: 0, title: "사전 준비 서류 (5가지 모두 필수)", desc: "① 3rd party 계약서 &nbsp; ② 사업자등록증 &nbsp; ③ 통장사본 &nbsp; ④ 실사설문지 (공식 영문명 기재 필수) &nbsp; ⑤ 3rd Party Risk Assessment DD Form", detail: null },
      { n: 1, title: "Workday 검색창에 'Create Supplier Request'", desc: "", detail: null },
      {
        n: 2, title: "필수항목 입력",
        desc: "<strong>Supplier Name:</strong> 공식 영문 Full Legal Name (특수기호·약어 불가)",
        detail: '예) KEPCO(X) → Korea Electric Power Corporation(O)<br>Cush Co., Ltd(X) → Cush Co Ltd(O)<br><br>• Supplier Category: 업체 성격에 맞게 선택<br>• Tax ID: 사업자등록번호<br>• Justification: 업체 사용 사유'
      },
      {
        n: 3, title: "Contact Information 입력",
        desc: "Phone · Address · Email 필수",
        detail: '⚠️ Effective Date: 오늘 기준 최소 1일 이전 날짜 (미국 시간 기준)'
      },
      { n: 4, title: "첨부서류 5가지 업로드", desc: "농협은행 계좌인 경우 농협중앙회/단위농협 여부를 메모란에 기재", detail: null },
      { n: 5, title: "OK 클릭 → 1·2차 승인 완료 후 사용 가능", desc: "Inactive 상태 또는 승인 지연 시 WPR에 문의 (Compliance 검토 관련)", detail: null }
    ],
  },

  it_coord: {
    icon: "🎧", label: "IT Coordination", badge: "IT",
    owner: { icon: "💻", name: "Noel Kim", nameKo: "김경만 과장", team: "WPR", contact: "noel.kim@cushwake.com" },
    steps: [
      {
        n: 1,
        title: "IT Chat으로 1차 해결",
        desc: '대부분의 IT 이슈는 <strong>Teams 왼쪽 사이드바 → IT Chat</strong>을 통해 빠르게 해결할 수 있습니다.<br><br><img src="/it-chat-icon.png" alt="IT Chat 아이콘" style="width:72px;border-radius:8px;margin:6px 0;display:block;">',
        detail: "IT Chat은 사내 IT 지원팀과 실시간으로 채팅할 수 있는 채널입니다. 비밀번호 재설정, 소프트웨어 설치, VPN 문제 등 대부분의 이슈를 여기서 해결할 수 있습니다."
      },
      {
        n: 2,
        title: "Help-hub에서 셀프 해결",
        desc: 'Teams 왼쪽 사이드바 → <strong>Help-hub</strong>에서 자주 묻는 IT 문제와 가이드 문서를 확인할 수 있습니다.',
        detail: "Help-hub에는 Windows 설정, Office 365 사용법, 네트워크 연결, 장비 관련 FAQ 등 자주 발생하는 IT 문제의 해결 방법이 정리되어 있습니다."
      },
      {
        n: 3,
        title: "설명하기 어려운 문제 → Noel Kim에게 직접 연락",
        desc: '위의 채널로 해결이 어렵거나 문제를 설명하기 어려운 경우 <strong>김경만 과장 (Noel Kim)</strong>에게 직접 연락하세요.',
        detail: "noel.kim@cushwake.com"
      }
    ],
    note: "IT Chat과 Help-hub를 먼저 활용해 주시면 더 빠른 해결이 가능합니다. 긴급한 장비 오류·시스템 접근 불가 문제는 바로 Noel Kim에게 연락해 주세요.",
  },

  solstice: {
    icon: "🖥️", label: "Solstice 화면 공유", badge: "IT · 무선",
    owner: { icon: "💻", name: "Noel Kim", nameKo: "김경만 과장", team: "WPR", contact: "noel.kim@cushwake.com" },
    steps: [
      { n: 1, title: "Solstice Client Application 실행", desc: "파일 탐색기 → Shared (T:) → General → SolsticeClient 폴더 → SolsticeClient.exe 실행", detail: null },
      { n: 2, title: "Enter IP 탭에서 IP 입력", desc: 'IP: <strong>10.196.72.101</strong> 입력 후 [Go] 클릭', detail: null },
      { n: 3, title: "회의실 화면에 표시된 KEY 번호 입력", desc: "TV 화면 좌측에 표시되는 4자리 숫자 KEY", detail: null },
      { n: 4, title: "[Desktop] 클릭 → 화면 공유 완료", desc: "공유 중단: 상단 바에서 [공유중단] 클릭", detail: null }
    ],
  },

  canteen: {
    icon: "📹", label: "Canteen 회의실 Teams Room", badge: "IT · 하이브리드",
    owner: { icon: "💻", name: "Noel Kim", nameKo: "김경만 과장", team: "WPR", contact: "noel.kim@cushwake.com" },
    steps: [
      {
        n: 1, title: "Teams / Outlook 미팅 생성 + 회의실 초대 (필수)",
        desc: '참석자 또는 장소에 추가: <strong>KORSeoul.CanteenRM@cushwake.com</strong>',
        detail: "※ Zoom도 동일 방식으로 One-Touch Join 지원"
      },
      {
        n: 2, title: "미팅 옵션 설정",
        desc: "• Bypass lobby → <strong>People in my org</strong><br>• Admit from lobby → <strong>Organizers, co-organizers</strong>",
        detail: "대규모 미팅 시: 참석자 마이크·카메라 Off 권장"
      },
      { n: 3, title: "Crestron 터치 패널에서 참가", desc: '예약된 미팅 확인 → 보라색 [Join] 버튼 터치<br>※ QR 코드 스캔으로 모바일 참가 가능', detail: null },
      {
        n: 4, title: "AirMedia 화면 공유 (USB-C Puck)",
        desc: "USB-C 포트에 Puck 연결 → 3~5초 → 녹색 LED 점등 → 자동 공유",
        detail: 'Win + P → 복제(Duplicate) 또는 확장(Extend)'
      }
    ],
    warn: "AirMedia 사용 중 Teams '화면 공유' 버튼 클릭 금지 (충돌·에코) | 오디오 설정 임의 변경 금지 | 중요 미팅 전 리허설 권장",
  },

  printix: {
    icon: "🖨️", label: "Printix 인쇄 방법", badge: "IT · Cloud",
    owner: { icon: "💻", name: "Noel Kim", nameKo: "김경만 과장", team: "WPR", contact: "noel.kim@cushwake.com" },
    steps: [
      { n: 1, title: "스마트폰 앱 설치", desc: "App Store / Play Store에서 <strong>'Printix app'</strong> 검색 → 설치", detail: null },
      { n: 2, title: "Microsoft로 로그인", desc: "[Sign in with Microsoft] → CWK 이메일 계정으로 로그인", detail: null },
      { n: 3, title: "PC 프린터 설정 (최초 1회)", desc: "Printix Client 아이콘 우클릭 → [Printers] → <strong>Printix Anywhere (Seoul-Korea)</strong> → [Add]", detail: null },
      { n: 4, title: "PC에서 인쇄 명령", desc: '프린터: <strong>Printix Anywhere (Seoul-Korea)</strong> 선택 → 인쇄', detail: null },
      { n: 5, title: "앱 → QR 스캔 → 인쇄 완료", desc: "Printix 앱 인쇄 목록 → 파일 선택(꾹 누름) → [Scan] → [Scan QR] → 복합기 QR 스캔", detail: null }
    ],
  },

  nda_review: {
    icon: "🔒", label: "NDA Review Process", badge: "Legal",
    owner: { icon: "👔", name: "Grace Kwon", nameKo: "권희원 이사", team: "WPR", contact: "grace.kwon@ap.cushwake.com" },
    steps: [
      {
        n: 1, title: "NDA 초안 작성 + Checklist 확인",
        desc: "NDA 초안을 작성하고 NDA Checklist를 확인합니다.",
        detail: "확인 항목: 준거법 및 관할법원, 비밀정보 정의 범위, 유효기간 및 존속조항, 정보반환/파기 의무"
      },
      {
        n: 2, title: "[Task 1] 팀장에게 검토·승인 요청",
        desc: "소속 팀장에게 NDA 검토 및 승인을 요청합니다.",
        email: {
          to: "[소속 팀장]",
          cc: "[관련자]",
          subject: "[NDA 검토·승인 요청] [고객사명] / NDA 리뷰",
          body: "안녕하세요 [팀장님 성함],\n\n아래 NDA에 대한 검토 및 승인을 요청드립니다.\n\n■ 고객사명   : [고객사명]\n■ 상대방     : [상대방 회사명]\n■ NDA 유형   : □ Mutual  □ One-way\n■ NDA Checklist : 확인 완료\n\n첨부: NDA 초안, NDA Checklist\n\n감사합니다."
        }
      },
      {
        n: 3, title: "[Task 2] Division Head / Grace Kwon에게 진행 승인 요청",
        desc: "팀장 승인 완료 후 <strong>Division Head</strong> 또는 <strong>Grace Kwon</strong>에게 검토 및 진행 승인을 요청합니다.",
        email: {
          to: "Division Head 또는 Grace Kwon (grace.kwon@ap.cushwake.com)",
          cc: "[팀장]",
          subject: "[NDA 진행 승인 요청] [고객사명] / 팀장 승인 완료",
          body: "안녕하세요,\n\n아래 NDA에 대해 팀장 검토·승인이 완료되어 진행 승인을 요청드립니다.\n\n■ 고객사명   : [고객사명]\n■ 상대방     : [상대방 회사명]\n■ NDA 유형   : □ Mutual  □ One-way\n■ 팀장 승인  : 완료 (승인 메일 첨부)\n\n첨부: NDA, 팀장 승인 메일\n\n감사합니다."
        }
      },
    ],
    infoGrid: [
      {
        title: "✅ NDA Checklist",
        items: [
          "준거법 및 관할법원",
          "비밀정보 정의 범위",
          "유효기간 및 존속조항",
          "정보반환/파기 의무"
        ]
      },
      {
        title: "❌ NDA에 포함되면 안 되는 내용",
        items: [
          "면책에 대한 내용",
          "위약벌에 대한 내용"
        ]
      },
      {
        title: "⚠️ 고객사 정보 공개 시",
        items: [
          "고객사와의 NDA를 back to back으로 체결"
        ]
      }
    ],
    warn: "NDA에 면책 또는 위약벌에 대한 내용이 포함되어서는 안 됩니다."
  },

  contract_review: {
    icon: "📋", label: "Contract Review & Legal Coordination", badge: "Legal",
    owner: { icon: "👔", name: "Grace Kwon", nameKo: "권희원 이사", team: "WPR", contact: "grace.kwon@ap.cushwake.com" },
    steps: [
      {
        n: 1, title: "계약서 유형 확인",
        desc: "표준계약서인지, 고객사 양식 또는 표준계약서 내 수정인지 확인합니다.",
        detail: "• <strong>Case A:</strong> 표준계약서 그대로 사용<br>• <strong>Case B:</strong> 고객사 양식 사용 또는 표준계약서 내 수정"
      },
      {
        n: 2, title: "[Step 1] Grace Kwon에게 검토 요청",
        desc: "Case A, Case B 모두 동일하게 Grace Kwon에게 먼저 검토를 요청합니다.",
        email: {
          to: "Grace Kwon (grace.kwon@ap.cushwake.com)",
          cc: "[팀장]",
          subject: "[계약서 검토 요청] [프로젝트명] / [고객사명]",
          body: "Dear Grace,\n\n아래 계약서에 대한 검토를 요청드립니다.\n\n■ 프로젝트명  : [프로젝트명]\n■ 고객사명    : [고객사명]\n■ 계약서 유형 : □ 표준계약서  □ 고객사 양식  □ 표준(수정)\n■ 용역 수수료 : [수수료 구조]\n■ 주요 조건   : [주요 조건 요약]\n\n첨부: 계약서 초안\n\n감사합니다."
        }
      },
      {
        n: 3, title: "[Case B 한정] Grace → APAC Legal 검토",
        desc: "고객사 양식 또는 표준계약서 수정 시, Grace Kwon이 APAC Legal팀에 검토를 요청합니다. APAC Legal 승인 후 Grace가 요청자에게 승인 회신을 합니다.",
        detail: "이 단계는 Grace Kwon이 직접 진행합니다. 요청자는 Grace의 승인 회신을 대기합니다."
      },
      {
        n: 4, title: "[Step 2] 팀장에게 승인 요청",
        desc: "Grace 검토 완료 후, 팀장에게 승인을 요청합니다. <strong>Grace 검토 완료 메일을 반드시 첨부</strong>합니다.",
        email: {
          to: "[소속 팀장]",
          cc: "Grace Kwon, [관련자]",
          subject: "[계약서 승인 요청] [프로젝트명] / [고객사명] — Grace Kwon 검토 완료",
          body: "안녕하세요 [팀장님 성함],\n\n아래 계약서에 대해 Grace Kwon 이사의 검토가 완료되어 승인을 요청드립니다.\n\n■ 프로젝트명  : [프로젝트명]\n■ 고객사명    : [고객사명]\n■ 계약서 유형 : [유형]\n■ Grace 검토  : 완료 (검토 완료 메일 첨부)\n\n첨부: 계약서, Grace Kwon 검토 완료 메일\n\n승인 부탁드립니다.\n\n감사합니다."
        }
      },
      {
        n: 5, title: "[Step 3] Division Head에게 최종 승인 요청",
        desc: "팀장 승인 완료 후, <strong>Division Head (YJ Choi)</strong>에게 최종 승인을 요청합니다.",
        email: {
          to: "YJ Choi (Division Head)",
          cc: "[팀장], Grace Kwon",
          subject: "[계약서 최종 승인] [프로젝트명] / [고객사명]",
          body: "안녕하세요,\n\n아래 계약서에 대해 Grace Kwon 검토 및 팀장 승인이 완료되어 최종 승인을 요청드립니다.\n\n■ 프로젝트명  : [프로젝트명]\n■ 고객사명    : [고객사명]\n■ Grace 검토  : 완료\n■ 팀장 승인   : 완료\n\n첨부: 계약서 최종본, 승인 이력 메일\n\n최종 승인 부탁드립니다.\n\n감사합니다."
        }
      },
      {
        n: 6, title: "날인 절차로 이동",
        desc: "모든 승인 완료 후 <strong>계약서 날인 및 보관</strong> 절차를 진행합니다.",
        detail: "→ 🖊️ 계약서 날인 및 보관 항목을 참고하세요."
      }
    ],
    infoGrid: [
      {
        title: "📝 Case A — 표준계약서",
        items: [
          "Grace Kwon 검토 요청",
          "팀장 승인 요청 (Grace 검토 메일 첨부)",
          "Division Head 최종 승인"
        ]
      },
      {
        title: "📝 Case B — 고객사 양식/수정",
        items: [
          "Grace Kwon 검토 요청",
          "Grace → APAC Legal 검토 (Grace가 진행)",
          "Grace 승인 회신 수령",
          "팀장 승인 요청 (Grace 검토 메일 첨부)",
          "Division Head 최종 승인"
        ]
      }
    ],
    cautionList: [
      {
        title: "⚠️ 중개와 구별 주의",
        items: [
          "계약서 내 중개 (영문 계약서 작성시 brokerage 포함) 및 부동산 중개로 오인할 소지가 있는 업무의 영역 주의. (임대차 계약서 작성, 리뷰, 임차인과 계약 조건 협의 등)",
          "전문자격이 필요한 업무 사항이 포함되지 않도록 유의. (계약서 검토, 재무 자문, 물리적 실사등) 혹은 추후 협의에 따라 전문자격이 필요한 업무 논의 가능 이란 문구 자제.",
          "커미션이라는 용어 대신 용역 수수료 용어 사용.",
          "업무 영역 및 범위는 가능하면 추상적이지 않고 구체적이고 실제적으로 제공하는 업무로 명시. (ex 입주시까지 임차인 관리)"
        ]
      },
      {
        title: "📌 계약서의 구조 — 업무 영역",
        items: [
          "쿠시먼앤드웨이크필드가 실제로 제공하는 업무의 범위를 구체적으로 명시",
          "추상적 표현을 지양하고 실제 제공 업무를 명확하게 기재 (예: '입주 시까지 임차인 관리')",
          "임대차 계약서 작성·리뷰, 임차인과의 계약 조건 협의 등 전문자격이 필요한 업무와 혼동되지 않도록 주의",
          "업무 범위가 모호하면 추후 분쟁 원인이 되므로 가능한 한 구체적으로 작성"
        ]
      },
      {
        title: "📌 계약서의 구조 — Disclaimer",
        items: [
          "쿠시먼은 법률·세무·재무·물리적 실사 등 전문자격이 필요한 업무를 제공하지 않음을 명시",
          "해당 전문 업무에 대한 책임을 지지 않는다는 면책 조항",
          "'추후 협의에 따라 전문자격 업무 논의 가능' 과 같은 문구는 기재하지 않음",
          "전문자격 업무가 포함되지 않도록 업무 영역 작성 단계부터 사전에 검토"
        ]
      },
      {
        title: "📌 계약서의 구조 — 용역 수수료",
        items: [
          "'커미션(Commission)' 대신 반드시 '용역 수수료' 용어 사용",
          "수수료 금액, 지급 시기, 지급 조건을 구체적으로 명시",
          "부가세(VAT) 포함/별도 여부 명확히 기재",
          "성공 보수형의 경우 성공 기준(계약 체결, 잔금 납입 등)을 명확히 정의"
        ]
      },
      {
        title: "📌 계약서의 구조 — 손해배상",
        items: [
          "쿠시먼의 손해배상 책임 상한선(Cap) 설정 필수",
          "책임 한도는 통상 용역 수수료의 일정 배수로 설정",
          "간접 손해·결과적 손해(Consequential Damages) 배제 조항 포함 권장",
          "책임 한도 초과 청구를 방지하기 위해 Grace Kwon 검토 시 확인 요청"
        ]
      },
      {
        title: "📌 계약서의 구조 — 준거법 및 관할 법원",
        items: [
          "계약 분쟁 발생 시 적용되는 법률을 명시 (통상 대한민국 법)",
          "관할 법원을 지정 (통상 서울중앙지방법원)",
          "국제 계약의 경우 국제 중재 조항(예: ICC, SIAC 중재)으로 대체 가능",
          "준거법과 관할 법원이 서로 상충하지 않도록 확인"
        ]
      },
      {
        title: "📌 계약서의 구조 — 컴플라이언스 조항",
        items: [
          "반부패·뇌물방지 조항 포함 필수 (FCPA, UK Bribery Act 등 국제 기준 적용)",
          "데이터 보호(개인정보 처리 방침) 및 이해충돌(COI) 조항 포함",
          "윤리 및 규정 준수 위반 시 계약 해지 사유로 명시 가능",
          "조항 내용 검토 필요 시 Grace Kwon을 통해 APAC Compliance팀에 문의"
        ]
      }
    ]
  },

  contract_seal: {
    icon: "🖊️", label: "계약서 날인 및 보관", badge: "날인",
    owner: {
      icon: "👔", name: "Grace Kwon",
      nameKo: "권희원 이사", team: "WPR",
      contact: "grace.kwon@ap.cushwake.com"
    },
    steps: [
      {
        n: 1, title: "날인 방법 선택",
        desc: "모든 승인 절차 완료 후 아래 두 가지 방법 중 선택합니다.",
        detail: "• <strong>방법 1:</strong> Glosign 비대면 전자 계약<br>• <strong>방법 2:</strong> 실물 날인 (WPR팀 요청)"
      },
      {
        n: 2, title: "[방법 1] Glosign 전자 날인",
        desc: "Glosign 접속 → 계약서 업로드 → 결재자 설정 → 날인 위치 지정 → 완료",
        detail: "서명참여자(법인인감 날인 권한자): <strong>권희원 이사</strong> grace.kwon@ap.cushwake.com"
      },
      {
        n: 3, title: "[방법 2] 실물 날인",
        desc: "WPR팀에 실물 날인을 요청합니다. 대부분 <strong>사용인감</strong>으로 날인되므로 <strong>사용인감계를 작성하여 함께 전달</strong>해야 합니다.",
        detail: null
      },
      {
        n: 4, title: "보관 요청",
        desc: "날인이 전부 완료된 계약서는 <strong>WPR팀(Gina Kim)</strong>에 보관을 요청합니다.",
        email: {
          to: "Gina Kim (gina.kim@cushwake.com)",
          subject: "[계약서 보관 요청] [고객사명] / [프로젝트명]",
          body: "안녕하세요 Gina님,\n\n아래 계약서의 날인이 완료되어 보관을 요청드립니다.\n\n■ 고객사명   : [고객사명]\n■ 프로젝트명 : [프로젝트명]\n■ 날인 방법  : □ Glosign 전자  □ 실물 날인\n■ 계약 기간  : [시작일 ~ 종료일]\n\n첨부: 날인 완료 계약서\n\n감사합니다."
        }
      }
    ],
    warn: "실물 날인 시 사용인감계 미첨부 시 날인이 진행되지 않습니다."
  },

  compliance: {
    icon: "⚖️", label: "Compliance Coordination", badge: "Compliance",
    owner: { icon: "👔", name: "Grace Kwon", nameKo: "권희원 이사", team: "WPR", contact: "grace.kwon@ap.cushwake.com" },
    steps: [
      {
        n: 1, title: "계약서 내 컴플라이언스 조항 확인",
        desc: "계약서에 윤리 및 규정 준수 조항(Ethics & Compliance Clause)이 포함되어 있는지 확인합니다.",
        detail: "Anti-Corruption (FCPA, UK Bribery Act), Data Protection, Conflict of Interest 조항 포함 여부 확인"
      },
      {
        n: 2, title: "Supplier Due Diligence",
        desc: "신규 거래처 등록 시 <strong>3rd Party Risk Assessment DD Form</strong> 작성 필수",
        detail: null
      },
      {
        n: 3, title: "이슈 에스컬레이션",
        desc: "윤리 위반 또는 컴플라이언스 이슈 발견 시 <strong>Grace Kwon</strong>을 통해 APAC Compliance팀에 보고합니다.",
        email: {
          to: "Grace Kwon (grace.kwon@ap.cushwake.com)",
          subject: "[Compliance Issue] [건명] / Escalation Request",
          body: "Dear Grace,\n\nI would like to escalate the following compliance concern.\n\n■ Issue Type  : □ Anti-Corruption  □ COI  □ Data Protection  □ Other\n■ Description : [상세]\n■ Urgency     : □ Immediate  □ Within 1 week  □ Non-urgent\n\nBest regards,"
        }
      }
    ],
  },

  physical_seal: {
    icon: "📝", label: "계약서 실물 날인 및 부대서류 지급", badge: "날인",
    owner: { icon: "💻", name: "Noel Kim", nameKo: "김경만 과장", team: "WPR", contact: "noel.kim@cushwake.com" },
    steps: [
      {
        n: 1, title: "날인 요청 메일 발송",
        desc: "계약서 실물 날인 및 부대서류 지급이 필요한 경우 <strong>Noel Kim</strong>에게 메일로 요청합니다.",
        email: {
          to: "Noel Kim (noel.kim@cushwake.com)",
          cc: "Grace Kwon (grace.kwon@ap.cushwake.com)",
          subject: "[날인 요청] [고객사명] / [계약명] – 실물 날인",
          body: "안녕하세요 Noel님,\n\n아래 계약서의 실물 날인 및 부대서류 지급을 요청드립니다.\n\n■ 고객사명   : [고객사명]\n■ 계약명     : [계약명]\n■ 날인 종류  : □ 계약서 실물 날인  □ 부대서류 날인  □ 법인인감증명서  □ 등기부등본\n■ 필요 수량  : [수량]\n■ 필요 일자  : [날짜]\n\n첨부 서류를 확인 후 처리 부탁드립니다.\n\n감사합니다.",
          attach: "[계약명]_계약서.pdf / 사용인감계(해당 시)"
        }
      },
      {
        n: 2, title: "부대서류 준비 확인",
        desc: "날인 종류에 따라 아래 서류를 준비합니다.",
        detail: "<strong>계약서 실물 날인</strong>: 날인 대상 계약서 원본 + 사용인감계<br><strong>부대서류 날인</strong>: 날인 대상 문서 원본<br><strong>법인인감증명서</strong>: 발급 목적 및 제출처 명시<br><strong>등기부등본</strong>: 용도 및 발급 수량 명시"
      },
      {
        n: 3, title: "날인 완료 후 수령",
        desc: "Noel Kim이 날인 완료 후 회신하면 서류를 수령합니다. 법인인감증명서·등기부등본은 직접 전달 또는 메일 수신 방법을 협의합니다.",
        detail: null
      }
    ],
    warn: "법인인감증명서 및 등기부등본 요청 시 사용 목적과 제출처를 반드시 명시해야 합니다."
  },

  office_repair: {
    icon: "🔧", label: "오피스 시설 수리 지원", badge: "시설",
    owner: { icon: "✈️", name: "Gina Kim", nameKo: "김지성 대리", team: "WPR", contact: "gina.kim@cushwake.com" },
    steps: [
      {
        n: 1, title: "문제 상황 파악 및 기록",
        desc: "오피스 내 시설 문제(파손, 누수, 전기, 냉난방 등) 발생 시 상황을 사진과 함께 기록합니다.",
        detail: "문제 위치(층·구역), 발생 시각, 문제 유형(전기·배관·가구·냉난방·기타)을 메모해두면 빠른 처리에 도움됩니다."
      },
      {
        n: 2, title: "Gina Kim에게 수리 요청",
        desc: "파악한 내용을 <strong>Gina Kim</strong>에게 메일 또는 Teams 메시지로 전달합니다.",
        email: {
          to: "Gina Kim (gina.kim@cushwake.com)",
          subject: "[시설 수리 요청] [위치] / [문제 유형]",
          body: "안녕하세요 Gina님,\n\n오피스 시설 문제 발생으로 수리 지원을 요청드립니다.\n\n■ 발생 위치  : [층 / 구역]\n■ 문제 유형  : □ 전기  □ 배관·누수  □ 가구  □ 냉난방  □ 기타([직접 입력])\n■ 발생 일시  : [날짜 및 시각]\n■ 상세 내용  : [구체적인 상황 설명]\n\n첨부: [현장 사진 (해당 시)]\n\n빠른 처리 부탁드립니다. 감사합니다."
        }
      },
      {
        n: 3, title: "수리 일정 확인 및 협조",
        desc: "Gina Kim이 수리 업체 일정을 조율하면 필요 시 해당 구역 접근을 허용하고 협조합니다.",
        detail: null
      }
    ],
    note: "긴급 상황(누수, 정전 등)은 메일 발송과 동시에 Teams 메시지로도 즉시 알려주세요."
  },

  parking_reg: {
    icon: "🅿️", label: "고객사 주차 등록", badge: "지원",
    owner: { icon: "🌸", name: "Emma Song", nameKo: "송진영 사원", team: "WPR", contact: "emma.song@cushwake.com" },
    steps: [
      {
        n: 1, title: "주차 등록 정보 준비",
        desc: "주차 등록을 위해 아래 두 가지 정보를 반드시 준비합니다.",
        detail: "<strong>필수 정보</strong><br>① 고객사명 (방문 회사 이름)<br>② 차량번호 (예: 12가 3456)<br><br>정보가 누락될 경우 등록이 불가합니다."
      },
      {
        n: 2, title: "Emma Song에게 주차 등록 요청",
        desc: "준비한 정보를 <strong>Emma Song</strong>에게 메일 또는 Teams 메시지로 전달합니다.",
        email: {
          to: "Emma Song (emma.song@cushwake.com)",
          subject: "[주차 등록 요청] [고객사명] / [방문 일자]",
          body: "안녕하세요 Emma님,\n\n고객사 방문 주차 등록을 요청드립니다.\n\n■ 고객사명  : [고객사 이름]\n■ 차량번호  : [차량번호 (예: 12가 3456)]\n■ 방문 일자 : [날짜]\n■ 방문 시간 : [시간 (예: 14:00 ~ 16:00)]\n\n처리 부탁드립니다. 감사합니다."
        }
      },
      {
        n: 3, title: "등록 완료 확인",
        desc: "Emma Song으로부터 등록 완료 회신을 받은 후 고객사에 주차 가능 안내를 전달합니다.",
        detail: null
      }
    ],
    warn: "고객사명과 차량번호 두 가지 정보가 모두 있어야 주차 등록이 가능합니다. 정보 누락 시 등록이 지연됩니다."
  },
};
