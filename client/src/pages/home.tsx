import { useState, useCallback, useRef } from "react";
import { DATA, type TaskData } from "@/data/tasks";
import { persons, type Person } from "@/data/persons";

const FAQ_ITEMS = [
  { q: "공문번호는 어떻게 발급받나요?", a: "공문을 작성한 후, 부서장에게 승인 요청 메일을 보내면 WPR 김지성 대리가 공문번호를 회신해 드립니다. 자세한 절차는 WPR 메뉴의 '공문번호' 말풍선을 참고하세요." },
  { q: "명함 추가 주문은 어떻게 하나요?", a: "Printrobo 사이트(printrobo.co.kr/sps/cushmanwakefield)에서 로그인 후 템플릿을 선택하여 직접 주문할 수 있습니다. ID/PW는 WPR 메뉴의 '명함' 말풍선에서 확인하세요." },
  { q: "계약서 원본은 어떻게 열람하나요?", a: "WPR 김지성 대리에게 메일로 열람 요청을 하시면 됩니다. 스캔본 또는 실물 수령 중 선택 가능합니다." },
  { q: "화환 신청 절차가 궁금해요.", a: "보산플라워(bosanflower.com)에서 상품을 확인한 후 신청서를 작성하고, 팀장 승인을 받은 뒤 Reception Emma Song에게 제출하시면 됩니다." },
  { q: "국내/해외 출장 신청은 누구에게 하나요?", a: "현재 정혜은 대리의 업무를 김지성 대리가 대행하고 있습니다. 출장 신청서를 작성하고 승인을 받은 뒤 김지성 대리(gina.kim@cushwake.com)에게 제출하시면 됩니다." },
  { q: "법인차량은 어떻게 예약하나요?", a: "'롯데렌터카 비즈카' 앱을 설치하고 법인 연결 후, 앱에서 서울파이낸스센터를 검색하여 차량을 예약할 수 있습니다. 업무 시간 내 업무 용도로만 이용 가능합니다." },
  { q: "락커 비밀번호를 잊어버렸어요.", a: "마스터 비밀번호(⊞ + 마스터PW + ⊞)로 해제할 수 있습니다. 단, 마스터 비밀번호 사용 시 기존 유저 비밀번호는 삭제됩니다. 배터리 방전 시 Micro 5핀 케이블로 연결하여 해제하세요." },
  { q: "Glosign 전자서명은 어떻게 하나요?", a: "Glosign 접속 → 계약 시작하기 → 파일 업로드 → 비대면 계약 선택 → 결재자 설정 → 날인 위치 지정 → 최종 확인 순으로 진행합니다. 법인인감 날인 권한자는 권희원 이사입니다." },
  { q: "Workday Supplier 등록은 어떻게 하나요?", a: "Workday에서 Supplier 검색 → 없으면 Create Supplier → 정보 입력 → Tax ID 확인 → Submit 순서로 진행합니다. WPR 메뉴에서 상세 절차를 확인하세요." },
  { q: "Solstice 회의실 무선 연결은 어떻게 하나요?", a: "회의실 모니터에 표시된 IP를 브라우저에 입력하거나 Solstice 앱을 설치하여 연결할 수 있습니다. 앱 설치 후 Share Screen으로 화면을 공유하세요." },
  { q: "Canteen Room 예약은 어떻게 하나요?", a: "Outlook 캘린더에서 Canteen Room을 검색하여 예약할 수 있습니다. 자세한 절차는 WPR 메뉴를 참고하세요." },
  { q: "프린터(Printix) 설정은 어떻게 하나요?", a: "Printix 클라이언트를 설치하고 회사 이메일로 로그인하면 자동으로 프린터가 연결됩니다. 인쇄 시 Printix로 출력 후 프린터에서 ID카드를 태그하여 수령하세요." },
];

type TabType = "messenger" | "tasks" | "faq";

interface BentoItem {
  key: string;
  icon: string;
  label: string;
  category: string;
  categoryColor: string;
  gradient: string;
  wide?: boolean;
}

const BENTO_ITEMS: BentoItem[] = [
  { key: "공문번호", icon: "📄", label: "공문번호 발급", category: "행정", categoryColor: "#C41230", gradient: "linear-gradient(135deg, #FFF9E6, #FDEFC8)" },
  { key: "해외출장", icon: "✈️", label: "해외 출장", category: "지원", categoryColor: "#F59E0B", gradient: "linear-gradient(135deg, #E3F2FD, #BBDEFB)", wide: true },
  { key: "국내출장", icon: "🚄", label: "국내 출장", category: "지원", categoryColor: "#F59E0B", gradient: "linear-gradient(135deg, #E3F2FD, #BBDEFB)", wide: true },
  { key: "명함", icon: "💳", label: "명함 신청", category: "행정", categoryColor: "#C41230", gradient: "linear-gradient(135deg, #FFF9E6, #FDEFC8)" },
  { key: "계약서", icon: "📁", label: "보관계약서", category: "행정", categoryColor: "#C41230", gradient: "linear-gradient(135deg, #FFF9E6, #FDEFC8)" },
  { key: "화환", icon: "🌸", label: "화환 신청", category: "지원", categoryColor: "#F59E0B", gradient: "linear-gradient(135deg, #FFF3E0, #FFE0B2)" },
  { key: "락커", icon: "🔐", label: "락커 사용", category: "시설", categoryColor: "#10B981", gradient: "linear-gradient(135deg, #E0F2F1, #B2DFDB)" },
  { key: "supplier", icon: "💼", label: "Supplier", category: "IT", categoryColor: "#3B82F6", gradient: "linear-gradient(135deg, #E8EAF6, #C5CAE9)", wide: true },
  { key: "인감", icon: "🖊️", label: "비대면 인감 날인", category: "시설", categoryColor: "#10B981", gradient: "linear-gradient(135deg, #E0F2F1, #B2DFDB)" },
  { key: "법인차량", icon: "🚗", label: "법인차량", category: "시설", categoryColor: "#10B981", gradient: "linear-gradient(135deg, #E0F2F1, #B2DFDB)" },
  { key: "solstice", icon: "🖥️", label: "Solstice", category: "IT", categoryColor: "#3B82F6", gradient: "linear-gradient(135deg, #E8EAF6, #C5CAE9)" },
  { key: "canteen", icon: "📹", label: "Canteen Room", category: "IT", categoryColor: "#3B82F6", gradient: "linear-gradient(135deg, #E8EAF6, #C5CAE9)" },
  { key: "printix", icon: "🖨️", label: "Printix", category: "IT", categoryColor: "#3B82F6", gradient: "linear-gradient(135deg, #E8EAF6, #C5CAE9)" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("messenger");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const panelBodyRef = useRef<HTMLDivElement>(null);

  const activeData = activeKey ? DATA[activeKey] : null;

  const openPanel = useCallback((key: string) => {
    setActiveKey(key);
    setPanelOpen(true);
    setExpandedDetails(new Set());
    setTimeout(() => {
      if (panelBodyRef.current) panelBodyRef.current.scrollTop = 0;
    }, 50);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setActiveKey(null);
    setExpandedDetails(new Set());
  }, []);

  const closePersonDetail = useCallback(() => {
    setSelectedPerson(null);
  }, []);

  const handleTabChange = useCallback((tab: TabType) => {
    if (panelOpen) {
      setPanelOpen(false);
      setTimeout(() => {
        setActiveKey(null);
        setExpandedDetails(new Set());
        setSelectedPerson(null);
        setActiveTab(tab);
      }, 300);
    } else {
      setSelectedPerson(null);
      setActiveTab(tab);
    }
  }, [panelOpen]);

  const toggleDetail = useCallback((id: string) => {
    setExpandedDetails(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleCopy = useCallback((field: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

  const navTitle = activeTab === "messenger" ? "WPR Team" : activeTab === "tasks" ? "WPR 업무 가이드" : "자주 묻는 질문";

  const hasSlideOpen = !!(selectedPerson || panelOpen);

  return (
    <div className={`iphone-page${hasSlideOpen ? " slide-active" : ""}`} data-testid="iphone-page">
      <div className="iphone-frame" data-testid="iphone-frame">
        <div className="iphone-notch" data-testid="dynamic-island">
          <div className="dynamic-island" />
        </div>

        <div className="iphone-nav-bar" data-testid="nav-bar">
          <span className="iphone-nav-title">{navTitle}</span>
        </div>

        <div className="iphone-content" data-testid="iphone-content">
          <div className={`tab-view${activeTab === "messenger" ? " active" : ""}`}>
            <MessengerList
              onSelectPerson={setSelectedPerson}
            />
          </div>
          <div className={`tab-view${activeTab === "tasks" ? " active" : ""}`}>
            <BentoGrid onSelectTask={openPanel} />
          </div>
          <div className={`tab-view${activeTab === "faq" ? " active" : ""}`}>
            <FaqList openIndex={faqOpen} onToggle={(i) => setFaqOpen(faqOpen === i ? null : i)} />
          </div>
        </div>

        <div className="bottom-tab-bar" data-testid="bottom-tab-bar">
          <button
            className={`tab-item${activeTab === "messenger" ? " active" : ""}`}
            onClick={() => handleTabChange("messenger")}
            data-testid="tab-messenger"
          >
            <span className="tab-icon">💬</span>
            <span className="tab-label">팀원</span>
          </button>
          <button
            className={`tab-item${activeTab === "tasks" ? " active" : ""}`}
            onClick={() => handleTabChange("tasks")}
            data-testid="tab-tasks"
          >
            <span className="tab-icon">📋</span>
            <span className="tab-label">업무목록</span>
          </button>
          <button
            className={`tab-item${activeTab === "faq" ? " active" : ""}`}
            onClick={() => handleTabChange("faq")}
            data-testid="tab-faq"
          >
            <span className="tab-icon">❓</span>
            <span className="tab-label">FAQ</span>
          </button>
        </div>

        <div className="iphone-home-indicator" />
      </div>

      <div className={`side-panel${selectedPerson ? " open" : ""}${panelOpen ? " task-open" : ""}`} data-testid="side-panel">
        {selectedPerson && !panelOpen && (
          <PersonDetailSlide
            person={selectedPerson}
            onBack={closePersonDetail}
            onSelectTask={(key) => {
              openPanel(key);
            }}
          />
        )}
        {activeData && panelOpen && (
          <div className="sp-task" data-testid="task-slide">
            <div className="ts-header" data-testid="ts-header">
              <button className="ts-back" onClick={closePanel} data-testid="back-btn">
                ← 뒤로
              </button>
              <div className="ts-title-wrap">
                <span className="ts-icon">{activeData.icon}</span>
                <span className="ts-title" data-testid="panel-title">{activeData.label}</span>
              </div>
            </div>
            <div className="ts-body" ref={panelBodyRef} data-testid="panel-body">
              <OwnerCard owner={activeData.owner} />
              {activeData.flow && activeData.flow.length > 0 && (
                <div className="flow-timeline" data-testid="flow-timeline">
                  {activeData.flow.map((item, idx) => (
                    <div className="flow-node" key={idx}>
                      <div className={`flow-dot${idx === 0 ? " first" : ""}${idx === activeData.flow.length - 1 ? " last" : ""}`} />
                      <span className="flow-text">{item}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeData.steps.length > 0 && (
                <div className="steps-container">
                  {activeData.steps.map((step) => {
                    const detailId = `${activeKey}-step-${step.n}`;
                    const isExpanded = expandedDetails.has(detailId);
                    return (
                      <div className="step" key={step.n} data-testid={`step-${step.n}`}>
                        <div className="step-num">{step.n}</div>
                        <div className="step-body">
                          <div className="step-title">{step.title}</div>
                          {step.desc && (
                            <div className="step-desc" dangerouslySetInnerHTML={{ __html: step.desc }} />
                          )}
                          {step.detail && (
                            <>
                              <button
                                className="expand-btn"
                                onClick={() => toggleDetail(detailId)}
                                data-testid={`expand-btn-${step.n}`}
                              >
                                {isExpanded ? "▲ 닫기" : "▶ 상세 보기"}
                              </button>
                              <div
                                className={`expand-detail${isExpanded ? " open" : ""}`}
                                dangerouslySetInnerHTML={{ __html: step.detail }}
                              />
                            </>
                          )}
                          {step.email && (
                            <EmailBox
                              email={step.email}
                              stepKey={`${activeKey}-${step.n}`}
                              copiedField={copiedField}
                              onCopy={handleCopy}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {activeData.infoGrid && (
                <>
                  <hr className="sec-div" />
                  <InfoGrid cards={activeData.infoGrid} />
                </>
              )}
              {activeData.table && (
                <>
                  <hr className="sec-div" />
                  <PolicyTable table={activeData.table} />
                </>
              )}
              {activeData.warn && (
                <div className="warn">
                  <span>⚠️</span>
                  <div>{activeData.warn}</div>
                </div>
              )}
              {activeData.note && (
                <div className="note" data-testid="note">{activeData.note}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MessengerList({ onSelectPerson }: { onSelectPerson: (p: Person) => void }) {
  return (
    <div className="messenger-list" data-testid="messenger-list">
      {persons.map((person) => (
        <button
          key={person.id}
          className="messenger-card"
          onClick={() => onSelectPerson(person)}
          data-testid={`person-card-${person.id}`}
        >
          <div className="mc-avatar" style={{ background: `${person.color}20`, color: person.color }}>
            {person.avatarInitial}
          </div>
          <div className="mc-info">
            <div className="mc-name">{person.name} {person.title}</div>
            <div className="mc-name-en">{person.nameEn}</div>
            <div className="mc-desc">{person.description}</div>
          </div>
          <span className="mc-chevron">›</span>
        </button>
      ))}
    </div>
  );
}

function PersonDetailSlide({ person, onBack, onSelectTask }: {
  person: Person;
  onBack: () => void;
  onSelectTask: (taskKey: string) => void;
}) {
  return (
    <div className="pds-inner" data-testid="person-detail">
      <div className="pds-header">
        <button className="pds-back" onClick={onBack} data-testid="person-back-btn">← 뒤로</button>
        <div className="pds-profile">
          <div className="pds-avatar" style={{ background: `${person.color}20`, color: person.color }}>
            {person.avatarInitial}
          </div>
          <div>
            <div className="pds-name">{person.name} {person.title}</div>
            <div className="pds-name-en">{person.nameEn}</div>
            <div className="pds-desc">{person.description}</div>
          </div>
        </div>
      </div>
      <div className="pds-tasks">
        <div className="pds-section-title">담당 업무 ({person.responsibilities.length})</div>
        {person.responsibilities.length === 0 && (
          <div className="pds-empty">담당 업무가 없습니다 (총괄 관리)</div>
        )}
        {person.responsibilities.map((resp, idx) => {
          const taskExists = !!DATA[resp.taskKey];
          return (
            <button
              key={resp.taskKey}
              className="pds-task-item"
              onClick={() => taskExists && onSelectTask(resp.taskKey)}
              disabled={!taskExists}
              data-testid={`rr-item-${resp.taskKey}`}
            >
              <div className="pds-task-num" style={{ background: `${person.color}18`, color: person.color }}>
                {idx + 1}
              </div>
              <div className="pds-task-text">
                <div className="pds-task-label">{resp.label}</div>
                <div className="pds-task-desc">{resp.description}</div>
              </div>
              <span className="pds-task-arrow" style={{ color: taskExists ? person.color : "#C7C7CC" }}>
                {taskExists ? "›" : "—"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BentoGrid({ onSelectTask }: { onSelectTask: (key: string) => void }) {
  return (
    <div className="bento-grid" data-testid="bento-grid">
      {BENTO_ITEMS.map((item) => (
        <button
          key={item.key}
          className={`bento-card${item.wide ? " bento-card--wide" : ""}`}
          style={{ background: item.gradient }}
          onClick={() => onSelectTask(item.key)}
          data-testid={`bento-${item.key}`}
        >
          <span className="bento-emoji">{item.icon}</span>
          <span className="bento-label">{item.label}</span>
          <span className="bento-badge" style={{ background: `${item.categoryColor}18`, color: item.categoryColor }}>
            {item.category}
          </span>
        </button>
      ))}
    </div>
  );
}

function FaqList({ openIndex, onToggle }: { openIndex: number | null; onToggle: (i: number) => void }) {
  return (
    <div className="faq-ios-list" data-testid="faq-list">
      {FAQ_ITEMS.map((item, i) => (
        <div className={`faq-ios-item${openIndex === i ? " open" : ""}`} key={i} data-testid={`faq-item-${i}`}>
          <button className="faq-ios-q" onClick={() => onToggle(i)} data-testid={`faq-toggle-${i}`}>
            <span className="faq-ios-q-icon">Q.</span>
            <span className="faq-ios-q-text">{item.q}</span>
            <span className="faq-ios-arrow">{openIndex === i ? "▲" : "›"}</span>
          </button>
          <div className={`faq-ios-a${openIndex === i ? " visible" : ""}`}>
            <span className="faq-ios-a-icon">A.</span>
            <span>{item.a}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function OwnerCard({ owner }: { owner: TaskData["owner"] }) {
  return (
    <div className="owner-card" data-testid="owner-card">
      <div className="owner-icon">{owner.icon}</div>
      <div className="owner-info">
        <div className="owner-name">
          {owner.nameKo} <span>{owner.name}</span>
        </div>
        <div className="owner-team">{owner.team}</div>
        {owner.contact && (
          <a className="owner-contact" href={`mailto:${owner.contact}`}>
            {owner.contact}
          </a>
        )}
      </div>
    </div>
  );
}

const WPR_STAFF: Record<string, { nameKo: string; email: string }> = {
  "Gina Kim": { nameKo: "김지성 대리", email: "gina.kim@cushwake.com" },
  "Emma Song": { nameKo: "송진영 사원", email: "emma.song@cushwake.com" },
  "Grace Kwon": { nameKo: "권희원 이사", email: "grace.kwon@ap.cushwake.com" },
  "Noel Kim": { nameKo: "김경만 과장", email: "noel.kim@cushwake.com" },
  "Hannah Jeong": { nameKo: "정혜은 대리", email: "hannah.jeong@cushwake.com" },
};

function HighlightStaff({ text }: { text: string }) {
  const staffNames = Object.keys(WPR_STAFF);
  const parts: { type: "text" | "staff"; value: string; staffKey?: string }[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    let earliestIdx = remaining.length;
    let matchedName = "";
    for (const name of staffNames) {
      const idx = remaining.indexOf(name);
      if (idx !== -1 && idx < earliestIdx) {
        earliestIdx = idx;
        matchedName = name;
      }
    }
    if (matchedName && earliestIdx < remaining.length) {
      if (earliestIdx > 0) parts.push({ type: "text", value: remaining.slice(0, earliestIdx) });
      parts.push({ type: "staff", value: matchedName, staffKey: matchedName });
      remaining = remaining.slice(earliestIdx + matchedName.length);
    } else {
      parts.push({ type: "text", value: remaining });
      remaining = "";
    }
  }
  return (
    <>
      {parts.map((p, i) =>
        p.type === "staff" && p.staffKey ? (
          <a key={i} className="staff-badge" href={`mailto:${WPR_STAFF[p.staffKey].email}`}
            title={`${WPR_STAFF[p.staffKey].nameKo} — ${WPR_STAFF[p.staffKey].email}`}
            data-testid={`staff-badge-${p.staffKey}`}>
            {p.value}
          </a>
        ) : (
          <span key={i}>{p.value}</span>
        )
      )}
    </>
  );
}

function EmailBox({ email, stepKey, copiedField, onCopy }: {
  email: NonNullable<TaskData["steps"][0]["email"]>;
  stepKey: string;
  copiedField: string | null;
  onCopy: (field: string, text: string) => void;
}) {
  const fullText = `받는 사람: ${email.to}\n${email.cc ? `참조: ${email.cc}\n` : ""}제목: ${email.subject}\n\n${email.body}`;
  const copyId = (f: string) => `${stepKey}-${f}`;
  return (
    <div className="email-box" data-testid={`email-box-${stepKey}`}>
      <div className="email-header">
        <span>✉️ Outlook 메일 작성 예시</span>
        <button className={`email-copy-btn${copiedField === copyId("all") ? " copied" : ""}`}
          onClick={() => onCopy(copyId("all"), fullText)} data-testid={`copy-all-${stepKey}`}>
          {copiedField === copyId("all") ? "✓ 복사됨" : "전체 복사"}
        </button>
      </div>
      <div className="email-meta">
        <div className="email-row">
          <span className="email-label">받는 사람</span>
          <span className="email-value"><HighlightStaff text={email.to} /></span>
          <button className={`email-copy-sm${copiedField === copyId("to") ? " copied" : ""}`}
            onClick={() => onCopy(copyId("to"), email.to)} data-testid={`copy-to-${stepKey}`}>
            {copiedField === copyId("to") ? "✓" : "복사"}
          </button>
        </div>
        {email.cc && (
          <div className="email-row">
            <span className="email-label">참조</span>
            <span className="email-value"><HighlightStaff text={email.cc} /></span>
            <button className={`email-copy-sm${copiedField === copyId("cc") ? " copied" : ""}`}
              onClick={() => onCopy(copyId("cc"), email.cc!)} data-testid={`copy-cc-${stepKey}`}>
              {copiedField === copyId("cc") ? "✓" : "복사"}
            </button>
          </div>
        )}
        <div className="email-row">
          <span className="email-label">제목</span>
          <span className="email-value">{email.subject}</span>
          <button className={`email-copy-sm${copiedField === copyId("subject") ? " copied" : ""}`}
            onClick={() => onCopy(copyId("subject"), email.subject)} data-testid={`copy-subject-${stepKey}`}>
            {copiedField === copyId("subject") ? "✓" : "복사"}
          </button>
        </div>
      </div>
      <div className="email-body-content">
        {email.body}
        <button className={`email-body-copy-btn${copiedField === copyId("body") ? " copied" : ""}`}
          onClick={() => onCopy(copyId("body"), email.body)} data-testid={`copy-body-${stepKey}`}>
          {copiedField === copyId("body") ? "✓ 복사됨" : "본문 복사"}
        </button>
      </div>
      {email.attach && (
        <div className="email-attach">
          <span className="attach-tag">첨부</span>
          {email.attach}
        </div>
      )}
    </div>
  );
}

function InfoGrid({ cards }: { cards: NonNullable<TaskData["infoGrid"]> }) {
  return (
    <div className="info-grid" data-testid="info-grid">
      {cards.map((card, i) => (
        <div className="info-card" key={i}>
          <div className="info-card-title">{card.title}</div>
          <ul>{card.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

function PolicyTable({ table }: { table: NonNullable<TaskData["table"]> }) {
  return (
    <table className="ptable" data-testid="policy-table">
      <thead>
        <tr>{table.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {table.rows.map((row, i) => (
          <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}
