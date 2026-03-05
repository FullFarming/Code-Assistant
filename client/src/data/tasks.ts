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
  flow: string[];
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
    flow: ["공문 작성","승인 요청 메일","공문번호 회신","번호 기재","글로싸인 날인"],
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
    ],
    note: "📌 담당자: WPR Gina Kim"
  },

  명함: {
    icon: "💳", label: "명함 신청 방법", badge: "행정",
    owner: { icon: "💁‍♀️", name: "Emma Song", nameKo: "Emma Song", team: "Reception", contact: "emma.song@cushwake.com" },
    flow: ["신규직원 WPR 처리","사이트 로그인","템플릿 선택","승인메일 전달","3~5일 배송"],
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
      {
        n: 4, title: "승인 메일 → Emma Song에게 전달",
        desc: "신청 완료 후 받은 승인 메일을 리셉션 Emma Song에게 전달합니다.",
        email: {
          to: "Emma Song (emma.song@cushwake.com)",
          subject: "[명함 신청] [이름] 명함 주문 요청",
          body: "안녕하세요 Emma님,\n\n명함 신청 승인 메일을 전달 드립니다.\n\n■ 신청자   : [이름 / 직급 / 부서]\n■ 요청사항 : [특이사항, 없으면 '없음']\n\n감사합니다.",
          attach: "명함 신청 승인 메일 (시스템 자동발송 원문 전달)"
        }
      },
      { n: 5, title: "배송 (3~5일 이내)", desc: "주문 완료 후 3~5일 이내 사무실로 배송됩니다.", detail: null }
    ],
    note: "📌 담당자: Reception Emma Song"
  },

  계약서: {
    icon: "📁", label: "보관계약서 열람", badge: "행정",
    owner: { icon: "👩‍💼", name: "Gina Kim", nameKo: "김지성 대리", team: "WPR", contact: "gina.kim@cushwake.com" },
    flow: ["Gina Kim 메일 요청","형태 선택 (스캔/실물)","계약서 수령"],
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
    note: "📌 담당자: WPR Gina Kim"
  },

  화환: {
    icon: "🌸", label: "화환 신청 방법", badge: "지원",
    owner: { icon: "💁‍♀️", name: "Emma Song", nameKo: "Emma Song", team: "Reception", contact: "emma.song@cushwake.com" },
    flow: ["상품 확인 (보산플라워)","신청서 작성","팀장 승인","Emma Song 전달"],
    steps: [
      { n: 1, title: "화환 상품 확인", desc: '<a href="http://bosanflower.com/main/main.php" target="_blank" rel="noopener noreferrer" style="color:#1976d2">bosanflower.com</a> 에서 원하는 상품을 확인합니다.', detail: null },
      { n: 2, title: "화환 신청서 작성", desc: "신청서 바로가기 링크를 통해 작성합니다. (*표시 항목 필수)", detail: null },
      { n: 3, title: "소속 팀장 승인", desc: "소속 부서 팀장의 승인을 진행합니다.", detail: null },
      { n: 4, title: "Reception Emma Song에게 제출", desc: "승인 완료 후 Emma Song에게 전달하면 신청이 완료됩니다.", detail: null }
    ],
    note: "📌 주말·긴급 건: Emma Song에게 직접 연락 | 담당자: Reception Emma Song"
  },

  국내출장: {
    icon: "🚄", label: "국내 출장 신청", badge: "지원",
    owner: { icon: "🧳", name: "Hannah Jeong", nameKo: "정혜은 대리", team: "WPR", contact: "hannah.jeong@cushwake.com" },
    flow: ["신청서 작성","팀장·대표 승인","Hannah에 제출","예약 완료 수령"],
    steps: [
      { n: 1, title: "국내 출장 신청서 작성", desc: "국내 출장 신청서 링크를 통해 작성합니다.", detail: null },
      { n: 2, title: "팀장님 및 대표님 승인", desc: "", detail: null },
      {
        n: 3, title: "WPR Hannah 대리에게 제출",
        desc: "승인 완료 후 Hannah 대리에게 승인 내역 및 지원 요청사항을 전달합니다.",
        email: {
          to: "Hannah (WPR) (hannah.jeong@cushwake.com)",
          subject: "[국내출장] [이름] / [출장지] / [기간]",
          body: "안녕하세요 Hannah님,\n\n국내 출장 승인이 완료되어 지원 요청 드립니다.\n\n■ 출장자    : [이름 / 직급 / 부서]\n■ 출장지    : [목적지]\n■ 출장기간  : [YYYY.MM.DD ~ YYYY.MM.DD]\n■ 출장 목적 : [내용]\n\n[지원 요청사항]\n- 호텔  : □ 필요  □ 불필요\n- 교통편 : □ KTX  □ 항공  □ 기타\n\n감사합니다.",
          attach: "국내출장_신청서_승인완료.pdf"
        }
      },
      { n: 4, title: "예약 완료 메일 수령", desc: "여행사를 통해 호텔·교통편 예약 완료 후 내역을 메일로 수령합니다.", detail: null }
    ],
    note: "📌 담당자: WPR Hannah 대리"
  },

  해외출장: {
    icon: "✈️", label: "해외 출장 신청", badge: "지원 · APAC",
    owner: { icon: "🧳", name: "Hannah Jeong", nameKo: "정혜은 대리", team: "WPR", contact: "hannah.jeong@cushwake.com" },
    flow: ["신청서 작성","팀장·대표 승인","APAC 승인 (Hannah)","항공·호텔 예약","확인 수령"],
    steps: [
      { n: 1, title: "해외 출장 신청서 작성", desc: "", detail: null },
      { n: 2, title: "팀장님 및 대표님 국내 승인", desc: "", detail: null },
      {
        n: 3, title: "WPR Hannah를 통해 APAC 승인",
        desc: "Travel Requisition Form + 대표님 승인 내역 필요",
        email: {
          to: "Hannah (WPR) (hannah.jeong@cushwake.com)",
          subject: "[해외출장 APAC승인] [이름] / [국가] / [기간]",
          body: "안녕하세요 Hannah님,\n\n해외 출장 국내 승인이 완료되어 APAC 승인 요청 드립니다.\n\n■ 출장자    : [이름 / 직급 / 부서]\n■ 출장국가  : [국가명 / 도시]\n■ 출장기간  : [YYYY.MM.DD ~ YYYY.MM.DD]\n■ 출장 목적 : [내용]\n■ 항공편    : □ Economy  □ Premium Economy  □ Business\n\nTravel Requisition Form 및 대표님 승인 내역 첨부합니다.\n\n감사합니다.",
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
    note: "📌 담당자: WPR Hannah 대리"
  },

  락커: {
    icon: "🔐", label: "락커 사용 방법 (ML81PA)", badge: "시설",
    owner: { icon: "🔑", name: "Self-Service", nameKo: "자가 처리", team: "—" },
    flow: [],
    infoGrid: [
      { title: "🔒 잠글 때 (일회성)", items: ["문 닫고 비밀번호(4자리) 입력","솔도~ + 적색 LED 3회 → 완료","5~12자리: ⊞ + PW + ⊞"] },
      { title: "🔓 열 때 (일회성)", items: ["등록 비밀번호 입력","도미솔~ + 녹색 LED 3회","⚠️ 해제 후 비밀번호 자동 삭제"] },
      { title: "🔒 잠글 때 (영구성)", items: ["문 닫으면 자동 잠김","솔도~ + 적색 LED 3회"] },
      { title: "🔓 열 때 (영구성)", items: ["등록 비밀번호 입력","도미솔~ + 녹색 LED 3회"] },
      { title: "🔑 마스터 비밀번호", items: ["⊞ + 마스터PW + ⊞","⚠️ 사용 시 유저PW 삭제됨"] },
      { title: "🔋 배터리 방전 시", items: ["Micro 5핀 케이블 앞면 연결","비밀번호 입력 → 해제 후 교체"] }
    ],
    steps: [],
    note: "📌 공장 출하: 일회성 모드 | A/S: 1644-3461"
  },

  인감: {
    icon: "🖊️", label: "비대면 인감 날인 (Glosign)", badge: "시설",
    owner: { icon: "🖊️", name: "Grace Kwon", nameKo: "권희원 이사", team: "WPR", contact: "grace.kwon@ap.cushwake.com" },
    flow: ["계약 시작하기","파일 업로드","계약명 입력","비대면 선택","결재자 설정","날인 위치","최종 확인"],
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
    note: "📌 법인인감 권한자: 권희원 이사 | glosign.com | 신규직원: Reception 대행"
  },

  법인차량: {
    icon: "🚗", label: "법인차량 이용", badge: "시설 · 커넥트프로",
    owner: { icon: "🧳", name: "Hannah Jeong", nameKo: "정혜은 대리", team: "WPR", contact: "hannah.jeong@cushwake.com" },
    flow: ["앱 설치 및 법인 연결","차량 예약","승인 확인","차량 이용","운행일지 작성","사용 종료"],
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
        ["사고 발생","Hannah 대리에게 즉시 연락"]
      ]
    },
    note: "📌 이용 범위: 업무 시간 내·업무 용도만 / 출퇴근 불가 | 담당자: WPR Hannah 대리"
  },

  supplier: {
    icon: "💼", label: "Workday Supplier 등록", badge: "IT · 5-Step",
    owner: { icon: "👥", name: "WPR Team", nameKo: "WPR Team", team: "WPR" },
    flow: ["5가지 서류 준비","Create Supplier Request","필수항목 입력","연락처 입력","서류 첨부","제출·승인"],
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
    note: "📌 담당자: WPR팀 문의"
  },

  solstice: {
    icon: "🖥️", label: "Solstice 화면 공유", badge: "IT · 무선",
    owner: { icon: "💻", name: "IT Team", nameKo: "IT Team", team: "IT" },
    flow: ["SolsticeClient 실행","IP 입력","KEY 입력","Desktop 클릭","공유 완료"],
    steps: [
      { n: 1, title: "Solstice Client Application 실행", desc: "파일 탐색기 → Shared (T:) → General → SolsticeClient 폴더 → SolsticeClient.exe 실행", detail: null },
      { n: 2, title: "Enter IP 탭에서 IP 입력", desc: 'IP: <strong>10.196.72.101</strong> 입력 후 [Go] 클릭', detail: null },
      { n: 3, title: "회의실 화면에 표시된 KEY 번호 입력", desc: "TV 화면 좌측에 표시되는 4자리 숫자 KEY", detail: null },
      { n: 4, title: "[Desktop] 클릭 → 화면 공유 완료", desc: "공유 중단: 상단 바에서 [공유중단] 클릭", detail: null }
    ],
    note: "📌 CWKCorp IP: 10.196.72.101 | CWKGuest IP: 10.196.78.31"
  },

  canteen: {
    icon: "📹", label: "Canteen 회의실 Teams Room", badge: "IT · 하이브리드",
    owner: { icon: "📹", name: "WPR Team", nameKo: "WPR Team", team: "WPR" },
    flow: ["미팅 생성 + 회의실 초대","옵션 설정","Crestron에서 참가","AirMedia 공유"],
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
    note: "📌 회의실 이메일: KORSeoul.CanteenRM@cushwake.com"
  },

  printix: {
    icon: "🖨️", label: "Printix 인쇄 방법", badge: "IT · Cloud",
    owner: { icon: "💻", name: "IT Team", nameKo: "IT Team", team: "IT" },
    flow: ["앱 설치","Microsoft 로그인","PC 프린터 설정","인쇄 명령","QR 스캔 → 인쇄"],
    steps: [
      { n: 1, title: "스마트폰 앱 설치", desc: "App Store / Play Store에서 <strong>'Printix app'</strong> 검색 → 설치", detail: null },
      { n: 2, title: "Microsoft로 로그인", desc: "[Sign in with Microsoft] → CWK 이메일 계정으로 로그인", detail: null },
      { n: 3, title: "PC 프린터 설정 (최초 1회)", desc: "Printix Client 아이콘 우클릭 → [Printers] → <strong>Printix Anywhere (Seoul-Korea)</strong> → [Add]", detail: null },
      { n: 4, title: "PC에서 인쇄 명령", desc: '프린터: <strong>Printix Anywhere (Seoul-Korea)</strong> 선택 → 인쇄', detail: null },
      { n: 5, title: "앱 → QR 스캔 → 인쇄 완료", desc: "Printix 앱 인쇄 목록 → 파일 선택(꾹 누름) → [Scan] → [Scan QR] → 복합기 QR 스캔", detail: null }
    ],
    note: "📌 스캔 방법은 기존과 동일 | 문제 발생 시 IT팀 문의"
  }
};
