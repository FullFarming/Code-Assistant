import { useState, useCallback, useRef, useEffect } from "react";
import { DATA, type TaskData } from "@/data/tasks";
import introVideo from "@assets/그림_기반_애니메이션_영상_제작_1772682936965.mp4";

const FOLDERS = [
  { key: "공문번호", icon: "📄", label: "공문번호\n발급", color: "#fff9e6" },
  { key: "명함", icon: "💳", label: "명함 신청", color: "#e8f5e9" },
  { key: "계약서", icon: "📁", label: "보관계약서", color: "#fff3e0" },
  { key: "화환", icon: "🌸", label: "화환 신청", color: "#fce4ec" },
  { key: "국내출장", icon: "🚄", label: "국내 출장", color: "#e3f2fd" },
  { key: "해외출장", icon: "✈️", label: "해외 출장", color: "#ede7f6" },
  { key: "락커", icon: "🔐", label: "락커 사용", color: "#e8eaf6" },
  { key: "인감", icon: "🖊️", label: "인감 날인", color: "#f3e5f5" },
  { key: "법인차량", icon: "🚗", label: "법인차량", color: "#e0f2f1" },
  { key: "supplier", icon: "💼", label: "Supplier", color: "#fff8e1" },
  { key: "solstice", icon: "🖥️", label: "Solstice", color: "#e1f5fe" },
  { key: "canteen", icon: "📹", label: "Canteen\nRoom", color: "#fbe9e7" },
  { key: "printix", icon: "🖨️", label: "Printix", color: "#f9fbe7" },
];

export default function Home() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const panelBodyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }, []);

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
    setTimeout(() => {
      setActiveKey(null);
      setExpandedDetails(new Set());
    }, 350);
  }, []);

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

  return (
    <div className={`stage${panelOpen ? " panel-open" : ""}`} data-testid="stage">
      <div className="left-panel" data-testid="left-panel">
        <div className="video-container">
          <video ref={videoRef} autoPlay loop muted playsInline className="bg-video" data-testid="intro-video">
            <source src={introVideo} type="video/mp4" />
          </video>
        </div>

        <div className="monitor-overlay" data-testid="monitor-overlay">
          <div className="overlay-screen">
            <div className="overlay-titlebar">
              <div className="overlay-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="overlay-title">WPR 업무 가이드</span>
            </div>
            <div className="folder-grid" data-testid="folder-grid">
              {FOLDERS.map((f) => (
                <button
                  key={f.key}
                  className={`folder-btn${activeKey === f.key ? " active" : ""}`}
                  onClick={() => openPanel(f.key)}
                  data-testid={`folder-${f.key}`}
                >
                  <div className="folder-icon" style={{ background: f.color }}>
                    {f.icon}
                  </div>
                  <span className="folder-label">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`slide-panel${panelOpen ? " open" : ""}`} data-testid="slide-panel">
        {activeData && (
          <>
            <div className="panel-header">
              <button className="back-btn" onClick={closePanel} data-testid="back-btn">
                목록으로
              </button>
              <div className="panel-title-wrap">
                <span className="panel-icon">{activeData.icon}</span>
                <span className="panel-title" data-testid="panel-title">{activeData.label}</span>
              </div>
              <span className="panel-badge">{activeData.badge}</span>
            </div>
            <div className="panel-body" ref={panelBodyRef} data-testid="panel-body">
              <OwnerCard owner={activeData.owner} />
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
          </>
        )}
      </div>
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
  "Emma Song": { nameKo: "Emma Song", email: "emma.song@cushwake.com" },
  "Grace Kwon": { nameKo: "권희원 이사", email: "grace.kwon@ap.cushwake.com" },
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
      if (earliestIdx > 0) {
        parts.push({ type: "text", value: remaining.slice(0, earliestIdx) });
      }
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
          <a
            key={i}
            className="staff-badge"
            href={`mailto:${WPR_STAFF[p.staffKey].email}`}
            title={`${WPR_STAFF[p.staffKey].nameKo} — ${WPR_STAFF[p.staffKey].email}`}
            data-testid={`staff-badge-${p.staffKey}`}
          >
            {p.value}
          </a>
        ) : (
          <span key={i}>{p.value}</span>
        )
      )}
    </>
  );
}

function EmailBox({
  email,
  stepKey,
  copiedField,
  onCopy,
}: {
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
        <button
          className={`email-copy-btn${copiedField === copyId("all") ? " copied" : ""}`}
          onClick={() => onCopy(copyId("all"), fullText)}
          data-testid={`copy-all-${stepKey}`}
        >
          {copiedField === copyId("all") ? "✓ 복사됨" : "전체 복사"}
        </button>
      </div>
      <div className="email-meta">
        <div className="email-row">
          <span className="email-label">받는 사람</span>
          <span className="email-value"><HighlightStaff text={email.to} /></span>
          <button
            className={`email-copy-sm${copiedField === copyId("to") ? " copied" : ""}`}
            onClick={() => onCopy(copyId("to"), email.to)}
            data-testid={`copy-to-${stepKey}`}
          >
            {copiedField === copyId("to") ? "✓" : "복사"}
          </button>
        </div>
        {email.cc && (
          <div className="email-row">
            <span className="email-label">참조</span>
            <span className="email-value"><HighlightStaff text={email.cc} /></span>
            <button
              className={`email-copy-sm${copiedField === copyId("cc") ? " copied" : ""}`}
              onClick={() => onCopy(copyId("cc"), email.cc!)}
              data-testid={`copy-cc-${stepKey}`}
            >
              {copiedField === copyId("cc") ? "✓" : "복사"}
            </button>
          </div>
        )}
        <div className="email-row">
          <span className="email-label">제목</span>
          <span className="email-value">{email.subject}</span>
          <button
            className={`email-copy-sm${copiedField === copyId("subject") ? " copied" : ""}`}
            onClick={() => onCopy(copyId("subject"), email.subject)}
            data-testid={`copy-subject-${stepKey}`}
          >
            {copiedField === copyId("subject") ? "✓" : "복사"}
          </button>
        </div>
      </div>
      <div className="email-body-content">
        {email.body}
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
          <ul>
            {card.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function PolicyTable({ table }: { table: NonNullable<TaskData["table"]> }) {
  return (
    <table className="ptable" data-testid="policy-table">
      <thead>
        <tr>
          {table.headers.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
