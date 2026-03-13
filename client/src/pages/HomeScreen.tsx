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

export default function HomeScreen({ onOpenDepartment, activeDeptId }: Props) {
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

  const dateStr = currentTime.toLocaleDateString("ko-KR", {
    weekday: "long",
    month: "long",
    day: "numeric",
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

      <div className="home-clock" data-testid="home-clock">
        <div className="clock-time">{timeStr}</div>
        <div className="clock-date">{dateStr}</div>
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
