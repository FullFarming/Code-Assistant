import type { Department } from "@/data/departments";

const ICON_GRADIENTS: Record<string, string> = {
  wpr: "linear-gradient(145deg, #E8243C 0%, #C41230 45%, #8B0D22 100%)",
  hr:  "linear-gradient(145deg, #4F8BF5 0%, #2563EB 45%, #1A47B0 100%)",
};

interface Props {
  dept: Department;
  onClick: () => void;
  disabled?: boolean;
}

export default function FolderIcon({ dept, onClick, disabled }: Props) {
  const gradient = ICON_GRADIENTS[dept.id] ?? dept.iconBg;

  return (
    <button
      className={`folder-icon${disabled ? " folder-disabled" : ""}`}
      onClick={disabled ? undefined : onClick}
      data-testid={`folder-${dept.id}`}
    >
      <div
        className="folder-icon-bg"
        style={{ background: gradient, opacity: disabled ? 0.5 : 1 }}
      >
        <span className="folder-icon-emoji">{dept.icon}</span>
      </div>
      <span className="folder-icon-label">
        {dept.name}
        {disabled && <span className="folder-soon"> (준비 중)</span>}
      </span>
    </button>
  );
}
