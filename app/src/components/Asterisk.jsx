export default function Asterisk({ size = 16, color = 'currentColor', stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ color }}>
      <line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"/>
      <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"/>
      <line x1="2.93" y1="2.93" x2="13.07" y2="13.07" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"/>
      <line x1="13.07" y1="2.93" x2="2.93" y2="13.07" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"/>
    </svg>
  );
}
