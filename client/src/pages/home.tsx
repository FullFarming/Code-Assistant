import { useState, useCallback, useRef, useEffect } from "react";
import { BUBBLES, DATA, type TaskData } from "@/data/tasks";
import introVideo from "@assets/그림_기반_애니메이션_영상_제작_1772682936965.mp4";

export default function Home() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const monitorBodyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  }, []);

  const activeData = activeKey ? DATA[activeKey] : null;

  const handleBubbleClick = useCallback((key: string) => {
    if (key === activeKey) return;
    setIsTransitioning(true);
    setExpandedDetails(new Set());
    setTimeout(() => {
      setActiveKey(key);
      setIsTransitioning(false);
      if (monitorBodyRef.current) {
        monitorBodyRef.current.scrollTop = 0;
      }
    }, 200);
  }, [activeKey]);

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

  const handleDismiss = useCallback(() => {
    if (!activeKey) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveKey(null);
      setIsTransitioning(false);
      setExpandedDetails(new Set());
    }, 200);
  }, [activeKey]);

  return (
      <div className={`stage${activeKey ? "" : " full-video"}`}>
        <div className="left-panel" onClick={handleDismiss} data-testid="left-panel">
          <div className={`video-bg${activeKey ? " blurred" : ""}`}>
            <video ref={videoRef} autoPlay loop muted playsInline data-testid="intro-video">
              <source src={introVideo} type="video/mp4" />
            </video>
          </div>
          <div className="hatching" />
          <div className="bubble-cloud">
            {BUBBLES.map((b) => (
              <button
                key={b.key}
                className={`bubble ${b.floatClass}${activeKey === b.key ? " active" : ""}`}
                style={{
                  top: b.top,
                  ...(b.left ? { left: b.left } : {}),
                  ...(b.right ? { right: b.right } : {}),
                }}
                onClick={(e) => { e.stopPropagation(); handleBubbleClick(b.key); }}
                aria-pressed={activeKey === b.key}
                data-testid={`bubble-${b.key}`}
              >
                <svg className="bubble-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M 60,130 C 30,130 20,100 35,80 C 20,50 60,30 80,50 C 90,20 140,20 150,50 C 180,40 190,80 165,100 C 180,120 160,140 140,130 C 110,150 80,150 60,130 Z" />
                </svg>
                <span className="bubble-label">{b.emoji} {b.text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="right-panel">
          {!activeData ? (
            <div className="empty-state" data-testid="empty-state">
              <div className="big-arrow">👈</div>
              <p>왼쪽의 말풍선을 클릭하면<br />상세 가이드가 여기에 표시됩니다</p>
            </div>
          ) : (
            <div className={`monitor-wrap ${isTransitioning ? "hidden" : "visible"}`} data-testid="monitor-wrap">
              <div className="monitor">
                <div className="monitor-titlebar">
                  <div className="monitor-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="monitor-icon">{activeData.icon}</span>
                  <span className="monitor-label" data-testid="monitor-label">{activeData.label}</span>
                  <span className="monitor-badge">{activeData.badge}</span>
                </div>
                <div className="monitor-body" ref={monitorBodyRef} data-testid="monitor-body">
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
                </div>
              </div>
              <div className="monitor-stand">
                <div className="monitor-neck" />
                <div className="monitor-base" />
              </div>
            </div>
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

function FlowRow({ flow }: { flow: string[] }) {
  if (!flow || flow.length === 0) return null;
  return (
    <div className="flow-row" data-testid="flow-row">
      {flow.map((step, i) => (
        <span key={i}>
          <span className="flow-item">{step}</span>
          {i < flow.length - 1 && <span className="flow-arrow">→</span>}
        </span>
      ))}
    </div>
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
          <span className="email-value">{email.to}</span>
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
            <span className="email-value">{email.cc}</span>
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
