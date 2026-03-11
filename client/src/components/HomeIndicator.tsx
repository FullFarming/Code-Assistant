interface Props {
  onTap?: () => void;
}

export default function HomeIndicator({ onTap }: Props) {
  return (
    <div
      className={`home-indicator${onTap ? " tappable" : ""}`}
      onClick={onTap}
      data-testid="home-indicator"
    >
      <div className="home-indicator-bar" />
    </div>
  );
}
