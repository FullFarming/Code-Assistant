import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "공문번호는 어떻게 발급받나요?",
    a: "공문을 작성한 후, 부서장에게 승인 요청 메일을 보내면 WPR 김지성 대리가 공문번호를 회신해 드립니다. 자세한 절차는 WPR 메뉴의 '공문번호' 말풍선을 참고하세요."
  },
  {
    q: "명함 추가 주문은 어떻게 하나요?",
    a: "Printrobo 사이트(printrobo.co.kr/sps/cushmanwakefield)에서 로그인 후 템플릿을 선택하여 직접 주문할 수 있습니다. ID/PW는 WPR 메뉴의 '명함' 말풍선에서 확인하세요."
  },
  {
    q: "계약서 원본은 어떻게 열람하나요?",
    a: "WPR 김지성 대리에게 메일로 열람 요청을 하시면 됩니다. 스캔본 또는 실물 수령 중 선택 가능합니다."
  },
  {
    q: "화환 신청 절차가 궁금해요.",
    a: "보산플라워(bosanflower.com)에서 상품을 확인한 후 신청서를 작성하고, 팀장 승인을 받은 뒤 Reception Emma Song에게 제출하시면 됩니다."
  },
  {
    q: "국내/해외 출장 신청은 누구에게 하나요?",
    a: "현재 정혜은 대리의 업무를 김지성 대리가 대행하고 있습니다. 출장 신청서를 작성하고 승인을 받은 뒤 김지성 대리(gina.kim@cushwake.com)에게 제출하시면 됩니다."
  },
  {
    q: "법인차량은 어떻게 예약하나요?",
    a: "'롯데렌터카 비즈카' 앱을 설치하고 법인 연결 후, 앱에서 서울파이낸스센터를 검색하여 차량을 예약할 수 있습니다. 업무 시간 내 업무 용도로만 이용 가능합니다."
  },
  {
    q: "락커 비밀번호를 잊어버렸어요.",
    a: "마스터 비밀번호(⊞ + 마스터PW + ⊞)로 해제할 수 있습니다. 단, 마스터 비밀번호 사용 시 기존 유저 비밀번호는 삭제됩니다. 배터리 방전 시 Micro 5핀 케이블로 연결하여 해제하세요."
  },
  {
    q: "Glosign 전자서명은 어떻게 하나요?",
    a: "Glosign 접속 → 계약 시작하기 → 파일 업로드 → 비대면 계약 선택 → 결재자 설정 → 날인 위치 지정 → 최종 확인 순으로 진행합니다. 법인인감 날인 권한자는 권희원 이사입니다."
  },
  {
    q: "Workday Supplier 등록은 어떻게 하나요?",
    a: "Workday에서 Supplier 검색 → 없으면 Create Supplier → 정보 입력 → Tax ID 확인 → Submit 순서로 진행합니다. WPR 메뉴에서 상세 절차를 확인하세요."
  },
  {
    q: "Solstice 회의실 무선 연결은 어떻게 하나요?",
    a: "회의실 모니터에 표시된 IP를 브라우저에 입력하거나 Solstice 앱을 설치하여 연결할 수 있습니다. 앱 설치 후 Share Screen으로 화면을 공유하세요."
  },
  {
    q: "Canteen Room 예약은 어떻게 하나요?",
    a: "Outlook 캘린더에서 Canteen Room을 검색하여 예약할 수 있습니다. 자세한 절차는 WPR 메뉴를 참고하세요."
  },
  {
    q: "프린터(Printix) 설정은 어떻게 하나요?",
    a: "Printix 클라이언트를 설치하고 회사 이메일로 로그인하면 자동으로 프린터가 연결됩니다. 인쇄 시 Printix로 출력 후 프린터에서 ID카드를 태그하여 수령하세요."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-page" data-testid="faq-page">
      <div className="faq-container">
        <div className="faq-header-section">
          <h1 className="faq-title" data-testid="faq-title">자주 묻는 질문</h1>
          <p className="faq-subtitle">업무 관련 궁금한 점을 빠르게 확인하세요</p>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div
              className={`faq-item${openIndex === i ? " open" : ""}`}
              key={i}
              data-testid={`faq-item-${i}`}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                data-testid={`faq-toggle-${i}`}
              >
                <span className="faq-q-badge">Q</span>
                <span className="faq-q-text">{item.q}</span>
                <span className="faq-arrow">{openIndex === i ? "−" : "+"}</span>
              </button>
              <div className={`faq-answer${openIndex === i ? " visible" : ""}`}>
                <span className="faq-a-badge">A</span>
                <span className="faq-a-text">{item.a}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
