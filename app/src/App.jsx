import { useState, useEffect } from 'react';
import Landing from './components/Landing.jsx';
import { Login, Register } from './components/Auth.jsx';
import ReferrerApp from './components/dashboards/ReferrerApp.jsx';
import PartnerApp from './components/dashboards/PartnerApp.jsx';
import AdminApp from './components/dashboards/AdminApp.jsx';

const TWEAK_DEFAULTS = {
  logoX: 620,
  logoY: -17,
  logoSize: 567,
  logoOpacity: 0.18,
};

function DemoNav({ page, setPage }) {
  const items = [
    { id: 'landing',  label: 'Landing'  },
    { id: 'login',    label: 'Sign In'  },
    { id: 'register', label: 'Register' },
    { id: 'referrer', label: 'Referrer' },
    { id: 'partner',  label: 'Partner'  },
    { id: 'admin',    label: 'Admin'    },
  ];
  return (
    <div className="demo-nav">
      {items.map(it => (
        <button
          key={it.id}
          className={page === it.id ? 'active' : ''}
          onClick={() => setPage(it.id)}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function Toast({ message }) {
  return (
    <div className={`toast ${message ? 'show' : ''}`}>
      <span className="dot" />{message}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('landing');
  const [toast, setToast] = useState(null);
  const [tweaks] = useState(TWEAK_DEFAULTS);

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  useEffect(() => {
    const onKey = e => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === '1') setPage('landing');
      if (e.key === '2') setPage('login');
      if (e.key === '3') setPage('register');
      if (e.key === '4') setPage('referrer');
      if (e.key === '5') setPage('partner');
      if (e.key === '6') setPage('admin');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {page === 'landing'  && <Landing setPage={setPage} />}
      {page === 'login'    && <Login    setPage={setPage} showToast={showToast} onAuth={role => setPage(role)} tweaks={tweaks} />}
      {page === 'register' && <Register setPage={setPage} showToast={showToast} tweaks={tweaks} />}
      {page === 'referrer' && <ReferrerApp onSignOut={() => { showToast('Signed out'); setPage('landing'); }} showToast={showToast} />}
      {page === 'partner'  && <PartnerApp  onSignOut={() => { showToast('Signed out'); setPage('landing'); }} showToast={showToast} />}
      {page === 'admin'    && <AdminApp    onSignOut={() => { showToast('Signed out'); setPage('landing'); }} showToast={showToast} />}

      <DemoNav page={page} setPage={setPage} />
      <Toast message={toast} />
    </>
  );
}
