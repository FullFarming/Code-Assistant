import facetimeImg from "@assets/facetime_1773387999668.png";
import messagesImg from "@assets/ios-message_1773387999670.png";
import safariImg from "@assets/safari_1773387999669.png";

const DOCK_APPS = [
  { id: "facetime", img: facetimeImg, label: "FaceTime" },
  { id: "messages", img: messagesImg, label: "메세지" },
  { id: "safari", img: safariImg, label: "Safari" },
];

export default function DockBar() {
  return (
    <div className="dock-container">
      <div className="dock-bar">
        {DOCK_APPS.map((app) => (
          <button key={app.id} className="dock-app" data-testid={`dock-${app.id}`}>
            <img
              src={app.img}
              alt={app.label}
              className="dock-app-img"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
