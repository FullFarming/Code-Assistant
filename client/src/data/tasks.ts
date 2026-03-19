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
  { key: "인감", emoji: "🖊️", text: "인감 날인", top: "45%", right: "2%", floatClass: "float-b" },
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
        detail: "→ 비대면 인감날인 절차는 🖊️ 인감 날인 항목을 참고하세요."
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
    icon: "🖊️", label: "비대면 인감 날인 (Glosign)", badge: "시설",
    owner: { icon: "💻", name: "Noel Kim", nameKo: "김경만 과장", team: "WPR", contact: "noel.kim@cushwake.com" },
    steps: [
      { n: 1, title: "Glosign 접속 → [계약 시작하기]", desc: "", detail: null },
      { n: 2, title: "계약서 파일 업로드", desc: "hwp, pdf, jpg, doc, docx / 10MB 이하 | Google Drive, DropBox 업로드 가능", detail: null },
      { n: 3, title: "계약명 + 메시지 입력 → [다음]", desc: "", detail: null },
      { n: 4, title: "[비대면 계약] 선택 → [참여자 추가]", desc: "", detail: null },
      {
        n: 5, title: "내부 결재자 설정",
        desc: "결재 1차: 담당 사원 → 결재 2차: 부장",
        detail: '서명참여자 (법인인감 날인 권한자): <strong>권희원 이사</strong><br>grace.kwon@ap.cushwake.com / 010-9282-4534'
      },
      { n: 6, title: "날인 위치 지정", desc: "[도장모양] 클릭 → 계약서 페이지에서 날인 위치 지정 → [다음]", detail: '인감증명서·법인등기부등본 요청 시: [클립모양] 클릭 → 첨부파일명 입력 후 [요청하기]' },
      { n: 7, title: "[최종 확인] → 전자서명 신청 완료", desc: "", detail: null }
    ],
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

  wpr_overview: {
    icon: "🏢", label: "WPR 총괄", badge: "총괄",
    owner: { icon: "👔", name: "Grace Kwon", nameKo: "권희원 이사", team: "WPR", contact: "grace.kwon@ap.cushwake.com" },
    steps: [
      {
        n: 1, title: "WPR팀 전체 업무 총괄",
        desc: "시설·행정·IT 지원 업무 전반의 총괄 관리 및 의사결정",
        detail: null
      },
      {
        n: 2, title: "팀원 업무 배분 및 관리",
        desc: "WPR팀 소속 직원의 업무 배분, 성과 관리, 교육 지원",
        detail: null
      },
      {
        n: 3, title: "APAC 리포팅",
        desc: "APAC 본사에 대한 정기 보고 및 지역 정책 이행 관리",
        detail: null
      }
    ],
  },

  nda_review: {
    icon: "🔒", label: "NDA Review & Process", badge: "Legal",
    owner: { icon: "👔", name: "Grace Kwon", nameKo: "권희원 이사", team: "WPR", contact: "grace.kwon@ap.cushwake.com" },
    steps: [
      {
        n: 1, title: "NDA 초안 작성",
        desc: "담당자가 NDA 초안을 작성합니다. 표준 NDA 양식 사용을 권장합니다.",
        detail: null
      },
      {
        n: 2, title: "팀장 리뷰 (1차)",
        desc: "소속 팀장에게 1차 리뷰를 요청합니다. <strong>NDA Checklist 확인 필수</strong>.",
        detail: "확인 항목: 준거법(Governing Law), 관할법원(Jurisdiction), 비밀정보 정의, 유효기간, 정보반환/파기 의무"
      },
      {
        n: 3, title: "Division Head 또는 Grace Kwon 최종 승인",
        desc: "팀장 리뷰 완료 후 <strong>Division Head</strong> 또는 <strong>Grace Kwon</strong>에게 최종 승인을 요청합니다.",
        email: {
          to: "Grace Kwon (grace.kwon@ap.cushwake.com)",
          cc: "팀장, Division Head (YJ Choi)",
          subject: "[NDA Review] [고객사명] / NDA 최종 승인 요청",
          body: "Dear Grace,\n\nPlease find attached the NDA for your review and final approval.\n\n■ Client Name : [고객사명]\n■ Counterparty : [상대방]\n■ NDA Type : □ Mutual  □ One-way\n■ Team Lead Review : Completed\n■ NDA Checklist : Attached\n\nPlease advise if any amendments are required.\n\nBest regards,"
        }
      },
    ],
    infoGrid: [
      {
        title: "✅ NDA Checklist",
        items: [
          "준거법 (Governing Law) 확인",
          "관할법원 (Jurisdiction) 확인",
          "비밀정보 정의 범위 적정성",
          "유효기간 및 존속조항 확인",
          "정보반환/파기 의무 명시"
        ]
      },
      {
        title: "❌ 포함 금지 항목",
        items: [
          "면책 조항 (Indemnification)",
          "위약벌 (Penalty/Liquidated Damages)"
        ]
      },
      {
        title: "⚠️ 고객사 정보 공개 시",
        items: [
          "고객사와의 NDA를 Back-to-Back으로 체결 필수",
          "동일 수준 비밀유지 의무를 제3자에게 적용"
        ]
      }
    ],
    warn: "NDA에 면책(Indemnification) 또는 위약벌(Penalty) 조항이 포함되어서는 안 됩니다.",
  },

  contract_review: {
    icon: "📋", label: "Contract Review Support & Legal Coordination", badge: "Legal",
    owner: { icon: "👔", name: "Grace Kwon", nameKo: "권희원 이사", team: "WPR", contact: "grace.kwon@ap.cushwake.com" },
    steps: [
      {
        n: 1, title: "계약서 양식 구분",
        desc: "계약서가 <strong>표준계약서</strong>인지, <strong>고객사 양식</strong> 또는 <strong>표준계약서 내 수정</strong>인지 확인합니다.",
        detail: "• 표준계약서 사용 → Case A 절차<br>• 고객사 양식 사용 또는 표준계약서 내용 수정 → Case B 절차"
      },
      {
        n: 2, title: "[Case A] Grace Kwon → 팀장 → Division Head (YJ Choi)",
        desc: "표준계약서를 그대로 사용하는 경우, Grace Kwon이 1차 리뷰 후 팀장 → Division Head 순서로 승인합니다.",
        email: {
          to: "Grace Kwon (grace.kwon@ap.cushwake.com)",
          cc: "팀장",
          subject: "[Contract Review – Standard] [프로젝트명] / [고객사명]",
          body: "Dear Grace,\n\nPlease review the attached standard contract for the following project.\n\n■ Project Name  : [프로젝트명]\n■ Client Name   : [고객사명]\n■ Contract Type : Standard Template\n■ Fee Structure : [용역 수수료 구조]\n■ Key Terms     : [주요 조건 요약]\n\nPlease advise if the contract is ready for Team Lead review.\n\nBest regards,"
        }
      },
      {
        n: 3, title: "[Case B] Grace Kwon → APAC Legal",
        desc: "고객사 양식 사용 또는 표준계약서 내 수정이 있는 경우, Grace Kwon 1차 리뷰 후 <strong>APAC Legal</strong>로 에스컬레이션합니다.",
        email: {
          to: "Grace Kwon (grace.kwon@ap.cushwake.com)",
          cc: "팀장, APAC Legal",
          subject: "[Contract Review – Client Form / Amendment] [프로젝트명] / [고객사명]",
          body: "Dear Grace,\n\nPlease review the attached contract which uses the client's template / contains amendments to our standard form.\n\n■ Project Name     : [프로젝트명]\n■ Client Name      : [고객사명]\n■ Contract Type    : □ Client Template  □ Standard with Amendments\n■ Key Amendments   : [수정사항 요약]\n■ Fee Structure    : [용역 수수료 구조]\n\nAPAC Legal escalation may be required per policy.\n\nBest regards,"
        }
      },
      {
        n: 4, title: "최종 승인 및 체결",
        desc: "모든 리뷰 완료 후 계약서 최종본을 확정하고 <strong>Glosign</strong>을 통해 날인 절차를 진행합니다.",
        detail: "→ 비대면 인감날인 절차는 🖊️ 인감 날인 항목을 참고하세요."
      }
    ],
    infoGrid: [
      {
        title: "📝 Case A — 표준계약서",
        items: [
          "Grace Kwon (1차 리뷰)",
          "팀장 (2차 리뷰)",
          "Division Head / YJ Choi (최종 승인)"
        ]
      },
      {
        title: "📝 Case B — 고객사 양식/수정",
        items: [
          "Grace Kwon (1차 리뷰)",
          "APAC Legal (최종 승인)"
        ]
      }
    ],
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
        n: 2, title: "Supplier Due Diligence (3rd Party Risk)",
        desc: "신규 거래처 등록 시 <strong>3rd Party Risk Assessment DD Form</strong> 작성 및 실사설문지 확인",
        detail: "→ Workday Supplier 등록 절차 내 DD Form 첨부 필수"
      },
      {
        n: 3, title: "Compliance 이슈 발생 시 에스컬레이션",
        desc: "윤리 위반 또는 컴플라이언스 이슈 발견 시 <strong>Grace Kwon</strong>을 통해 APAC Compliance팀에 보고합니다.",
        email: {
          to: "Grace Kwon (grace.kwon@ap.cushwake.com)",
          subject: "[Compliance Issue] [프로젝트명/건명] / Escalation Request",
          body: "Dear Grace,\n\nI would like to escalate the following compliance concern for your review.\n\n■ Project / Matter : [프로젝트명 / 건명]\n■ Issue Type       : □ Anti-Corruption  □ Conflict of Interest  □ Data Protection  □ Other\n■ Description      : [이슈 상세 내용]\n■ Urgency          : □ Immediate  □ Within 1 week  □ Non-urgent\n\nPlease advise on next steps.\n\nBest regards,"
        }
      }
    ],
    infoGrid: [
      {
        title: "⚖️ 필수 컴플라이언스 영역",
        items: [
          "Anti-Corruption (FCPA / UK Bribery Act)",
          "Data Protection & Privacy",
          "Conflict of Interest",
          "Sanctions & Export Controls",
          "Anti-Money Laundering"
        ]
      }
    ],
  },
};
