import { useState, useCallback, useRef, useEffect, useReducer } from "react";
import { DATA, type TaskData, type CautionItem } from "@/data/tasks";
import { persons, type Person } from "@/data/persons";
import { searchIndex, searchTasks, type SearchableTask } from "@/data/searchIndex";
import { DEPARTMENTS } from "@/data/departments";
import HomeScreen from "@/pages/HomeScreen";
import HomeIndicator from "@/components/HomeIndicator";
const siriImg = "/siri-icon.png";

type ViewMode = "home" | "app";
type TabType = "messenger" | "tasks";

type SiriPhase = 'idle' | 'opening' | 'active' | 'searching' | 'navigating' | 'closing';

interface SiriState {
  phase: SiriPhase;
  query: string;
  results: SearchableTask[];
  clickedKey: string | null;
}

type SiriAction =
  | { type: 'OPEN' }
  | { type: 'OPENED' }
  | { type: 'CLOSE' }
  | { type: 'CLOSED' }
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_RESULTS'; payload: SearchableTask[] }
  | { type: 'NAVIGATE'; payload: string };

const initialSiriState: SiriState = {
  phase: 'idle', query: '', results: [], clickedKey: null,
};

function siriReducer(state: SiriState, action: SiriAction): SiriState {
  switch (action.type) {
    case 'OPEN': return { ...state, phase: 'opening' };
    case 'OPENED': return { ...state, phase: 'active' };
    case 'CLOSE': return { ...state, phase: 'closing', query: '', results: [] };
    case 'CLOSED': return { ...state, phase: 'idle', clickedKey: null };
    case 'SET_QUERY': return { ...state, query: action.payload, phase: action.payload ? 'searching' : 'active' };
    case 'SET_RESULTS': return { ...state, results: action.payload };
    case 'NAVIGATE': return { ...state, phase: 'navigating', clickedKey: action.payload };
    default: return state;
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text: string, query: string): any {
  if (!query) return text;
  try {
    const parts = text.split(new RegExp(`(${escapeRegex(query)})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={i} className="siri-result-highlight">{part}</span>
        : part
    );
  } catch {
    return text;
  }
}

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
  { key: "nda_review", icon: "🔒", label: "NDA Review", category: "Legal", categoryColor: "#8B5CF6", gradient: "linear-gradient(135deg, #F3E8FF, #DDD6FE)" },
  { key: "contract_review", icon: "📋", label: "Contract Review", category: "Legal", categoryColor: "#8B5CF6", gradient: "linear-gradient(135deg, #F3E8FF, #DDD6FE)", wide: true },
  { key: "contract_seal", icon: "🖊️", label: "날인 및 보관", category: "날인", categoryColor: "#8B5CF6", gradient: "linear-gradient(135deg, #F3E8FF, #DDD6FE)" },
  { key: "compliance", icon: "⚖️", label: "Compliance", category: "Compliance", categoryColor: "#8B5CF6", gradient: "linear-gradient(135deg, #F3E8FF, #DDD6FE)" },
];

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("home");
  const [activeTab, setActiveTab] = useState<TabType>("messenger");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const panelBodyRef = useRef<HTMLDivElement>(null);
  const siriInputRef = useRef<HTMLInputElement>(null);
  const [siri, siriDispatch] = useReducer(siriReducer, initialSiriState);

  const isSiriActive = siri.phase !== 'idle';

  const handleGoHome = useCallback(() => {
    setPanelOpen(false);
    setActiveKey(null);
    setExpandedDetails(new Set());
    setSelectedPerson(null);
    siriDispatch({ type: 'CLOSE' });
    setTimeout(() => siriDispatch({ type: 'CLOSED' }), 300);
    setViewMode("home");
  }, []);

  useEffect(() => {
    if (!siri.query.trim()) {
      siriDispatch({ type: 'SET_RESULTS', payload: [] });
      return;
    }
    const timer = setTimeout(() => {
      const found = searchTasks(siri.query, searchIndex);
      siriDispatch({ type: 'SET_RESULTS', payload: found });
    }, 150);
    return () => clearTimeout(timer);
  }, [siri.query]);

  useEffect(() => {
    if (siri.phase === 'active') {
      setTimeout(() => siriInputRef.current?.focus(), 360);
    }
  }, [siri.phase]);

  const handleSiriToggle = useCallback(() => {
    if (siri.phase === 'idle') {
      siriDispatch({ type: 'OPEN' });
      setTimeout(() => siriDispatch({ type: 'OPENED' }), 150);
    } else if (siri.phase !== 'opening' && siri.phase !== 'closing') {
      siriDispatch({ type: 'CLOSE' });
      setTimeout(() => siriDispatch({ type: 'CLOSED' }), 300);
    }
  }, [siri.phase]);

  const handleSiriNavigate = useCallback((taskKey: string) => {
    siriDispatch({ type: 'NAVIGATE', payload: taskKey });
    setTimeout(() => {
      setSelectedPerson(null);
      setActiveKey(taskKey);
      setPanelOpen(true);
      setExpandedDetails(new Set());
      setIsNavigating(true);
      setTimeout(() => setIsNavigating(false), 300);
      setTimeout(() => {
        if (panelBodyRef.current) panelBodyRef.current.scrollTop = 0;
      }, 50);
      siriDispatch({ type: 'CLOSE' });
      setTimeout(() => siriDispatch({ type: 'CLOSED' }), 300);
    }, 180);
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

  const navTitle = activeTab === "messenger" ? "WPR Team" : "WPR 업무 가이드";

  const handleSelectPerson = useCallback((p: Person) => {
    setPanelOpen(false);
    setActiveKey(null);
    setExpandedDetails(new Set());
    setSelectedPerson(p);
  }, []);

  const hasSlideOpen = !!panelOpen || !!selectedPerson;
  const isAppMode = viewMode === "app";

  return (
    <div className={`iphone-page${hasSlideOpen ? " slide-active" : ""}`} data-testid="iphone-page">
      <div className={`iphone-frame${isSiriActive ? " siri-dimmed" : ""}`} data-testid="iphone-frame">
        <div className="iphone-notch" data-testid="dynamic-island">
          <div className="dynamic-island">
            <div className="di-video-circle">
              <video src="/dynamic-island-video.mp4" autoPlay loop muted playsInline data-testid="di-video" />
            </div>
          </div>
        </div>

        {viewMode === "home" && (
          <HomeScreen onOpenTeams={() => setViewMode("app")} />
        )}

        {isAppMode && (
          <>
        <div className="iphone-nav-bar" data-testid="nav-bar">
          <span className="iphone-nav-title">{navTitle}</span>
        </div>

        <div className={`iphone-content${isNavigating ? " navigating" : ""}${isSiriActive ? " siri-blurred" : ""}`} data-testid="iphone-content">
          <div className={`tab-view${activeTab === "messenger" ? " active" : ""}`}>
            <MessengerList onSelectPerson={handleSelectPerson} selectedPersonId={selectedPerson?.id ?? null} />
          </div>
          <div className={`tab-view${activeTab === "tasks" ? " active" : ""}`}>
            <BentoGrid onSelectTask={openPanel} />
          </div>
        </div>

        {isSiriActive && (
          <div
            className="siri-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleSiriToggle();
            }}
            data-testid="siri-overlay"
          >
            <div className="siri-popup" data-testid="siri-popup">
              {!siri.query && (
                <div className="siri-popup-hint" data-testid="siri-hint">
                  <span className="siri-hint-icon">🔍</span>
                  <span>업무명, 담당자, 카테고리로 검색하세요</span>
                </div>
              )}
              {siri.query && siri.results.length === 0 && (
                <div className="siri-popup-empty" data-testid="siri-empty">
                  <span className="siri-empty-icon">🌀</span>
                  <span className="siri-empty-text">검색 결과가 없어요</span>
                  <span className="siri-empty-hint">다른 키워드로 검색해보세요</span>
                </div>
              )}
              {siri.results.length > 0 && (
                <div className="siri-results-list" role="listbox" aria-label="검색 결과" data-testid="siri-results-list">
                  <div className="siri-results-header">
                    <span>{siri.results.length}개 업무 발견</span>
                  </div>
                  {siri.results.map((task, idx) => (
                    <button
                      key={task.key}
                      className={`siri-result-card${siri.clickedKey === task.key ? " clicked" : ""}`}
                      style={{ animationDelay: `${idx * 40}ms` }}
                      onClick={() => handleSiriNavigate(task.key)}
                      role="option"
                      data-testid={`siri-result-${task.key}`}
                    >
                      <div className="siri-result-left">
                        <div className="siri-result-icon-wrap">
                          <span className="siri-result-icon">{task.icon}</span>
                        </div>
                        <div className="siri-result-text">
                          <span className="siri-result-name">{highlightText(task.label, siri.query)}</span>
                          <span className="siri-result-owner">{task.ownerName}</span>
                        </div>
                      </div>
                      <div className="siri-result-right">
                        <span className={`siri-result-badge badge-${task.badge}`}>{task.badge}</span>
                        <span className="siri-result-chevron">›</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="siri-float-search" data-testid="siri-float-search">
              <div className="siri-search-bar">
                <span className="siri-search-icon-left">🔍</span>
                <input
                  ref={siriInputRef}
                  type="search"
                  className="siri-search-input"
                  placeholder="업무 검색..."
                  value={siri.query}
                  onChange={(e) => siriDispatch({ type: 'SET_QUERY', payload: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') handleSiriToggle();
                  }}
                  inputMode="search"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="업무 검색어 입력"
                  data-testid="siri-search-input"
                />
                {siri.query ? (
                  <button
                    className="siri-search-clear"
                    onClick={() => siriDispatch({ type: 'SET_QUERY', payload: '' })}
                    aria-label="검색어 지우기"
                    data-testid="siri-search-clear"
                  >✕</button>
                ) : (
                  <button
                    className="siri-search-cancel"
                    onClick={handleSiriToggle}
                    data-testid="siri-search-cancel"
                  >취소</button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bottom-tab-bar" data-testid="bottom-tab-bar">
          <button
            className={`tab-item${!isSiriActive && activeTab === "messenger" ? " active" : ""}`}
            onClick={() => { if (isSiriActive) handleSiriToggle(); handleTabChange("messenger"); }}
            data-testid="tab-messenger"
          >
            <svg className="tab-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6.5L3 18.5V15H4a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2v2.086L8.914 14H16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
            </svg>
            <span className="tab-label">팀원</span>
          </button>
          <button
            className={`siri-tab-button${isSiriActive ? " siri-on" : ""}`}
            onClick={handleSiriToggle}
            aria-label={isSiriActive ? "검색 닫기" : "Siri 검색 열기"}
            aria-expanded={isSiriActive}
            data-testid="siri-button"
          >
            <img src={siriImg} alt="Siri" className="siri-tab-img" />
          </button>
          <button
            className={`tab-item${!isSiriActive && activeTab === "tasks" ? " active" : ""}`}
            onClick={() => { if (isSiriActive) handleSiriToggle(); handleTabChange("tasks"); }}
            data-testid="tab-tasks"
          >
            <svg className="tab-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.414L11.586 2H6zm0 1h5v4a1 1 0 0 0 1 1h4v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm6 .707L14.293 7H12V3.707zM7 9h6v1H7V9zm0 2.5h6v1H7v-1zm0 2.5h4v1H7v-1z"/>
            </svg>
            <span className="tab-label">업무목록</span>
          </button>
        </div>

        <HomeIndicator onTap={handleGoHome} />
          </>
        )}
      </div>

      <div className={`side-panel${panelOpen ? " task-open" : ""}`} data-testid="side-panel">
        {activeData && panelOpen && (
          <div className="sp-task" data-testid="task-slide">
            <div className="ts-header" data-testid="ts-header">
              <div className="ts-header-top">
                <button className="ts-back" onClick={closePanel} data-testid="back-btn">
                  ← 뒤로
                </button>
                <OwnerChip owner={activeData.owner} />
              </div>
              <div className="ts-title-wrap">
                <span className="ts-icon">{activeData.icon}</span>
                <span className="ts-title" data-testid="panel-title">{activeData.label}</span>
              </div>
            </div>
            <div className="ts-body" ref={panelBodyRef} data-testid="panel-body">
              <div className="chat-timestamp" data-testid="chat-timestamp">Today</div>
              <div className="msg-bubble msg-bubble--other" data-testid="msg-bubble-bot">
                {activeData.label} 업무 가이드를 안내해 드릴게요 😊
              </div>
              <div className="msg-bubble msg-bubble--self" data-testid="msg-bubble-user">
                네, 알려주세요!
              </div>
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
              {activeData.cautionList && activeData.cautionList.length > 0 && (
                <>
                  <hr className="sec-div" />
                  <CautionList items={activeData.cautionList} />
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
            <div className="compose-bar" data-testid="compose-bar">
              <div className="compose-input-wrap">
                <div
                  className="compose-input"
                  contentEditable
                  data-placeholder="Type a message"
                  suppressContentEditableWarning
                  data-testid="compose-input"
                  role="textbox"
                  aria-label="메시지 입력"
                />
              </div>
              <button className="compose-send" data-testid="compose-send" aria-label="전송">
                ▶
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={`person-overlay${selectedPerson ? " open" : ""}`} data-testid="person-overlay">
        {selectedPerson && (
          <PersonDetailSlide
            person={selectedPerson}
            onBack={closePersonDetail}
            onSelectTask={(key) => {
              setSelectedPerson(null);
              openPanel(key);
            }}
          />
        )}
      </div>
    </div>
  );
}


const TEAMS_AVATAR_COLORS = [
  "#6264A7", "#7B7B3F", "#C4314B", "#7B83EB", "#8B6F4E", "#4F6B52",
  "#B24B6F", "#0078D4", "#69797E",
];

function getAvatarColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return TEAMS_AVATAR_COLORS[Math.abs(hash) % TEAMS_AVATAR_COLORS.length];
}

function getInitials(nameEn: string): string {
  return nameEn.split(" ").map(w => w[0] ?? "").join("").slice(0, 2).toUpperCase();
}

function OwnerChip({ owner }: { owner: { name: string; nameKo: string } }) {
  const person = persons.find(p => p.nameEn === owner.name);
  const avatarColor = person?.color ?? "#6264A7";
  return (
    <div className="owner-chip" data-testid="owner-chip">
      <div className="owner-chip-avatar-wrap">
        <div className="owner-chip-avatar" style={{ background: avatarColor }}>
          {getInitials(owner.name)}
        </div>
        <div className="owner-chip-dot" />
      </div>
      <span className="owner-chip-name">{owner.nameKo}</span>
    </div>
  );
}

const AVAILABLE_CHANNELS = new Set(["wpr"]);

function MessengerList({ onSelectPerson, selectedPersonId }: {
  onSelectPerson: (p: Person) => void;
  selectedPersonId: string | null;
}) {
  const [activeFilter, setActiveFilter] = useState<string>("Chats");

  return (
    <div className="messenger-list" data-testid="messenger-list">
      <div className="messenger-filter-pills">
        {["Unread", "Channels", "Chats"].map((f) => (
          <button
            key={f}
            className={`pill-btn${activeFilter === f ? " pill-active" : ""}`}
            onClick={() => setActiveFilter(f)}
            data-testid={`filter-pill-${f}`}
          >
            {f}
          </button>
        ))}
      </div>

      {activeFilter === "Channels" ? (
        <div className="channels-inline" data-testid="channels-list">
          <div className="messenger-section-label" data-testid="section-label-channels">▾ Departments</div>
          {DEPARTMENTS.map((dept) => {
            const isAvailable = AVAILABLE_CHANNELS.has(dept.id);
            return (
              <button
                key={dept.id}
                className={`channel-item${!isAvailable ? " channel-disabled" : ""}`}
                onClick={isAvailable ? () => setActiveFilter("Chats") : undefined}
                disabled={!isAvailable}
                data-testid={`channel-${dept.id}`}
              >
                <div className="channel-icon" style={{ background: dept.iconBg }}>
                  <span>{dept.icon}</span>
                </div>
                <div className="channel-info">
                  <div className="channel-name">{dept.name}</div>
                  <div className="channel-desc">{dept.description}</div>
                </div>
                {isAvailable ? (
                  <span className="channel-chevron">›</span>
                ) : (
                  <span className="channel-soon">준비 중</span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <>
          <div className="messenger-section-label" data-testid="section-label-favorites">▾ Favorites</div>
          <div className="messenger-card mc-self" data-testid="person-card-self">
            <div className="mc-avatar-wrap">
              <div className="mc-avatar mc-avatar--cw">CW</div>
              <span className="mc-status-badge mc-status-badge--away" />
            </div>
            <div className="mc-info">
              <div className="mc-name">C&amp;W Korea/KOR</div>
              <div className="mc-desc">Cushman &amp; Wakefield WPR</div>
            </div>
          </div>
          <div className="messenger-section-label" data-testid="section-label-chats">▾ Chats</div>
          {persons.map((person) => {
            const avatarColor = getAvatarColor(person.id);
            const displayName = `${person.nameEn}/${person.region}`;
            const isActive = selectedPersonId === person.id;
            return (
              <button
                key={person.id}
                className={`messenger-card${isActive ? " active" : ""}`}
                onClick={() => onSelectPerson(person)}
                data-testid={`person-card-${person.id}`}
              >
                <div className="mc-avatar-wrap">
                  <div className="mc-avatar" style={{ background: avatarColor }}>
                    {person.nameEn.charAt(0)}{person.nameEn.split(" ")[1]?.charAt(0) ?? ""}
                  </div>
                  <span className="mc-status-badge" />
                </div>
                <div className="mc-info">
                  <div className="mc-name">{displayName}</div>
                  <div className="mc-desc">{person.description}</div>
                </div>
                <span className="mc-chevron">›</span>
              </button>
            );
          })}
        </>
      )}
    </div>
  );
}

function PersonDetailSlide({ person, onBack, onSelectTask }: {
  person: Person;
  onBack: () => void;
  onSelectTask: (taskKey: string) => void;
}) {
  const avatarColor = getAvatarColor(person.id);
  return (
    <div className="pds-inner" data-testid="person-detail">
      <div className="pds-header">
        <button className="pds-back" onClick={onBack} data-testid="person-back-btn">← 뒤로</button>
        <div className="pds-profile">
          <div className="pds-avatar" style={{ background: avatarColor }}>
            {person.nameEn.charAt(0)}{person.nameEn.split(" ")[1]?.charAt(0) ?? ""}
            <span className="pds-avatar-badge" />
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

function CautionList({ items }: { items: CautionItem[] }) {
  return (
    <div className="caution-list" data-testid="caution-list">
      {items.map((section, i) => (
        <div className="caution-section" key={i}>
          <div className="caution-title">{section.title}</div>
          <ul className="caution-items">
            {section.items.map((item, j) => (
              <li key={j} className="caution-item">{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
