interface Props {
  onClick: () => void;
}

export default function TeamsIcon({ onClick }: Props) {
  return (
    <button
      className="folder-icon"
      onClick={onClick}
      data-testid="folder-teams"
    >
      <div className="folder-icon-bg teams-icon-bg">
        <svg width="34" height="34" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="teams-body" x1="12" y1="18" x2="30" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7B83EB"/>
              <stop offset="100%" stopColor="#5B5FC7"/>
            </linearGradient>
            <linearGradient id="teams-head" x1="18" y1="4" x2="22" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9BA0F5"/>
              <stop offset="100%" stopColor="#7B83EB"/>
            </linearGradient>
            <linearGradient id="teams-small" x1="30" y1="8" x2="40" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7B83EB" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#5B5FC7" stopOpacity="0.5"/>
            </linearGradient>
          </defs>
          <circle cx="19" cy="11" r="5.5" fill="url(#teams-head)"/>
          <rect x="8" y="20" width="22" height="16" rx="4" fill="url(#teams-body)"/>
          <circle cx="33" cy="14" r="4" fill="url(#teams-small)"/>
          <rect x="28" y="22" width="14" height="12" rx="3.5" fill="url(#teams-small)"/>
        </svg>
      </div>
      <span className="folder-icon-label">Teams</span>
    </button>
  );
}
