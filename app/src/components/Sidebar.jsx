import Asterisk from './Asterisk.jsx';
import { I } from './Icons.jsx';

export function Bell({ count }) {
  return (
    <div style={{ position: 'absolute', top: 18, right: 32, cursor: 'pointer' }}>
      <div style={{
        width: 36, height: 36, background: 'var(--cream-2)', color: 'var(--dark)',
        display: 'grid', placeItems: 'center',
        clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
        position: 'relative',
      }}>
        <I.bell />
        {count > 0 && (
          <span style={{
            position: 'absolute', top: -6, right: -10,
            background: 'var(--orange)', color: 'var(--cream)',
            font: '700 9px/1 Manrope, sans-serif', padding: '3px 5px',
            minWidth: 16, textAlign: 'center',
          }}>{count}</span>
        )}
      </div>
    </div>
  );
}

export function PageHead({ title, sub, right }) {
  return (
    <div className="page-head">
      <div>
        <h1 className="page-title">{title}</h1>
        <p className="page-sub">{sub}</p>
      </div>
      {right}
    </div>
  );
}

export default function Sidebar({ nav, active, onNav, user, onSignOut }) {
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="logo-row">
          <Asterisk size={16} color="var(--orange)" />
          <span className="logo-word">Ethical</span>
        </div>
        <div className="more-than">More than a network</div>
      </div>
      <div className="sb-user">
        <div className="sb-avatar">{user.initial}</div>
        <div>
          <div className="nm">{user.name}</div>
          <div className="role">{user.role}</div>
        </div>
        {user.tier && <div className="tier-badge">{user.tier}</div>}
      </div>
      <nav className="sb-nav">
        {nav.map((it, i) => (
          <div
            key={it.id}
            className={`sb-item ${active === it.id ? 'active' : ''}`}
            onClick={() => onNav(it.id)}
          >
            <div className="num">{String(i + 1).padStart(2, '0')}</div>
            <div className="ic">{it.icon()}</div>
            <div>{it.label}</div>
          </div>
        ))}
      </nav>
      <div className="sb-signout" onClick={onSignOut}>
        <div style={{ width: 40, textAlign: 'center' }}><I.out /></div>
        Sign Out
      </div>
    </aside>
  );
}
