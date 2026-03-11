import type { Department } from "@/data/departments";

interface Props {
  dept: Department;
  onClick: () => void;
  disabled?: boolean;
}

export default function FolderIcon({ dept, onClick, disabled }: Props) {
  return (
    <button
      className={`folder-icon${disabled ? " folder-disabled" : ""}`}
      onClick={disabled ? undefined : onClick}
      data-testid={`folder-${dept.id}`}
    >
      <div
        className="folder-icon-bg"
        style={{ background: dept.iconBg, opacity: disabled ? 0.5 : 1 }}
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
