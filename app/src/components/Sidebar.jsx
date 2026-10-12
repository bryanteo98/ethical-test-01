import { useState } from "react";
import Asterisk from './Asterisk.jsx';
import { I } from './Icons.jsx';

export function Bell({
  count,
  notifications = [],
  onNotificationClick,
  showZero = false,
  interactive = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'absolute', top: 18, right: 32, zIndex: 20 }}>
      <button
        type="button"
        aria-label={`Notifications: ${count}`}
        aria-expanded={isOpen}
        onClick={() => interactive && setIsOpen((open) => !open)}
        disabled={!interactive}
        style={{
          width: 36, height: 36, background: 'transparent', color: 'var(--dark)',
          display: 'grid', placeItems: 'center', border: 0,
          cursor: interactive ? 'pointer' : 'default', overflow: 'visible',
          position: 'relative',
        }}
      >
        <span style={{
          width: 36, height: 36, background: 'var(--cream-2)', color: 'var(--dark)',
          display: 'grid', placeItems: 'center',
          clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
        }}>
          <I.bell />
        </span>
        {(showZero || count > 0) && (
          <span style={{
            position: 'absolute', top: -5, right: -8, zIndex: 1,
            background: 'var(--orange)', color: 'var(--cream)',
            font: '700 9px/1 Manrope, sans-serif', padding: '3px 5px',
            minWidth: 16, textAlign: 'center',
          }}>{count}</span>
        )}
      </button>
      {interactive && isOpen && (
        <div style={{
          position: 'absolute', top: 44, right: 0, width: 300, maxWidth: 'calc(100vw - 32px)',
          padding: 16, background: 'var(--cream)', color: 'var(--dark)',
          border: '1px solid var(--hairline)', borderTop: '2px solid var(--orange)',
          boxShadow: '0 12px 32px rgba(35,31,32,0.18)',
        }}>
          <div style={{ font: '700 11px/1.4 Manrope, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Partner approvals
          </div>
          {notifications.length === 0 ? (
            <div style={{ font: '500 12px/1.5 Manrope, sans-serif', color: 'var(--muted)' }}>
              No partner approvals pending.
            </div>
          ) : notifications.map((notification) => (
            <button
              key={notification.id ?? notification.email ?? notification.company_name}
              type="button"
              onClick={() => {
                onNotificationClick?.(notification);
                setIsOpen(false);
              }}
              style={{
                display: 'block', width: '100%', padding: '10px 0', textAlign: 'left',
                background: 'transparent', border: 0, borderTop: '1px solid var(--hairline)',
                color: 'var(--dark)', cursor: 'pointer', font: '600 12px/1.4 Manrope, sans-serif',
              }}
            >
              {notification.company_name || 'Unnamed company'}
              <span style={{ display: 'block', marginTop: 3, color: 'var(--muted)', font: '500 10px/1.4 Manrope, sans-serif' }}>
                {notification.email} · {notification.status || 'Pending'} — review
              </span>
            </button>
          ))}
        </div>
      )}
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
