import { useState, useEffect } from "react";
import { DEPARTMENTS } from "@/data/departments";
import FolderIcon from "@/components/FolderIcon";
import DockBar from "@/components/DockBar";
import HomeIndicator from "@/components/HomeIndicator";

interface Props {
  onOpenDepartment: (deptId: string) => void;
  activeDeptId?: string;
}

const AVAILABLE_DEPTS = new Set(["wpr"]);

function SignalBars() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="7" width="3" height="5" rx="0.8" fill="white"/>
      <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.8" fill="white"/>
      <rect x="9" y="2" width="3" height="10" rx="0.8" fill="white"/>
      <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="white"/>
    </svg>
  );
}

function BatteryIcon({ level = 55 }: { level?: number }) {
  return (
    <div className="hs-battery">
      <div className="hs-battery-body">
        <div className="hs-battery-fill" style={{ width: `${level}%` }} />
      </div>
      <div className="hs-battery-tip" />
    </div>
  );
}

export default function HomeScreen({ onOpenDepartment }: Props) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="home-screen" data-testid="home-screen">
      <video
        className="home-wallpaper-video"
        src="/home-wallpaper.mp4"
        autoPlay
        loop
        muted
        playsInline
        data-testid="home-wallpaper-video"
      />

      <div className="hs-status-bar" data-testid="home-status-bar">
        <span className="hs-time">{timeStr}</span>
        <div className="hs-di-space" />
        <div className="hs-status-icons">
          <SignalBars />
          <span className="hs-5g">5G</span>
          <BatteryIcon level={55} />
        </div>
      </div>

      <div className="home-app-grid" data-testid="home-app-grid">
        {DEPARTMENTS.map((dept) => (
          <FolderIcon
            key={dept.id}
            dept={dept}
            onClick={() => onOpenDepartment(dept.id)}
            disabled={!AVAILABLE_DEPTS.has(dept.id)}
          />
        ))}
      </div>

      <DockBar />
      <HomeIndicator />
    </div>
  );
}
