const DOCK_APPS = [
  { id: "phone", emoji: "📞", label: "전화", color: "#34C759" },
  { id: "messages", emoji: "💬", label: "메세지", color: "#34C759" },
  { id: "safari", emoji: "🌐", label: "Safari", color: "#007AFF" },
];

export default function DockBar() {
  return (
    <div className="dock-container">
      <div className="dock-bar">
        {DOCK_APPS.map((app) => (
          <button key={app.id} className="dock-app" data-testid={`dock-${app.id}`}>
            <div
              className="dock-app-icon"
              style={{ background: app.color }}
            >
              <span>{app.emoji}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
