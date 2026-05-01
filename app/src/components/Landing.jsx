import { useState, useEffect } from 'react';
import Asterisk from './Asterisk.jsx';

export default function Landing({ setPage }) {
  const stats = [
    { n: '500+',   l: 'Active Referrers' },
    { n: '120+',   l: 'Vetted Partners' },
    { n: 'RM 2m+', l: 'Fees Distributed' },
    { n: '98%',    l: 'Client Satisfaction' },
  ];

  const [showStats, setShowStats] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowStats(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page landing active">
      <nav className="nav">
        <a href="#" className="logo-row" onClick={e => { e.preventDefault(); setPage('landing'); }}>
          <Asterisk size={16} color="var(--orange)" />
          <span className="logo-word">Ethical</span>
        </a>
        <div className="nav-actions">
          <button className="btn" onClick={() => setPage('login')}>Sign In</button>
          <button className="btn primary" onClick={() => setPage('register')}>Get Started</button>
        </div>
      </nav>

      <p className="hero-tagline">{"A dual-engine platform designed to bridge the gap\nbetween high-value connections and capital investment."}</p>
      <p className="hero-collective">An Entrepreneurial Collective</p>

      <div className="ticket-main">
        <div className="ticket-wordmark">Ethical</div>
      </div>

      <div className="ticket-tail" />
      <div className="tail-asterisk">
        <Asterisk size={16} color="currentColor" stroke={1.4} />
      </div>

      <div className="stats-row">
        {stats.map((s, i) => (
          <div className="stat-cell" key={i} style={{
            opacity: showStats ? 1 : 0,
            transform: showStats ? 'translateY(0)' : 'translateY(8px)',
            transition: `opacity 0.5s ${i * 0.08}s, transform 0.5s ${i * 0.08}s`,
          }}>
            <div className="stat-num">{s.n}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="stats-divider" />

      <div className="ticket-emblem-wrap">
        <img src="/ethical-icon.svg" alt="" />
      </div>
      <div className="ticket-tagline">More than a network</div>

      <div className="corner-meta">
        <span className="blink" />Kuala Lumpur · 04/26 · v 1.0
      </div>
    </div>
  );
}
