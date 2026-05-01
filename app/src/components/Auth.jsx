import { useState } from 'react';
import Asterisk from './Asterisk.jsx';
import Field from './Field.jsx';

export function AuthLeft({ mode, setPage }) {
  return (
    <div className="auth-left">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <a href="#" className="logo-row" onClick={e => { e.preventDefault(); setPage('landing'); }}>
          <Asterisk size={16} color="var(--orange)" />
          <span className="logo-word">Ethical</span>
        </a>
        <div className="more-than">More than a network</div>
      </div>

      <div className="heading-block">
        {mode === 'login' ? (
          <>
            <h1>Welcome <span className="it">back.</span></h1>
            <p className="lede">Sign in to manage your referrals, leads and earnings — picking up exactly where you left off.</p>
          </>
        ) : (
          <>
            <h1>Join the <span className="it">network.</span></h1>
            <p className="lede">Start referring, start earning. Approval typically within 48&nbsp;hours.</p>
          </>
        )}
      </div>

      {mode === 'register' && (
        <div className="tiers">
          {[
            { n: '01', name: 'Silver Tier',     d: 'Start earning referral fees immediately upon approval.' },
            { n: '02', name: 'Gold Tier',       d: 'Unlock higher rates by hitting quarterly milestones.' },
            { n: '03', name: 'Partner Network', d: 'Access curated professional services for your clients.' },
          ].map(t => (
            <div className="tier" key={t.n}>
              <div className="num">{t.n}</div>
              <div className="name">{t.name}</div>
              <div className="desc">{t.d}</div>
            </div>
          ))}
        </div>
      )}

      <div className="footnote">
        <span>est. MMXXIV</span>
        <span>KUL · MY</span>
      </div>
    </div>
  );
}

export function AuthRight({ children }) {
  return (
    <div className="auth-right">
      <div className="emblem-watermark" style={{
        right: '-5%',
        top: '50%',
        width: '65vh',
        height: '65vh',
        transform: 'translateY(-50%)',
      }}>
        <img src="/ethical-icon.svg" alt="" />
      </div>
      {children}
    </div>
  );
}

const DEMO_ACCOUNTS = {
  'ahmad@demo.com':   { pw: 'demo123', role: 'referrer' },
  'partner@demo.com': { pw: 'demo123', role: 'partner' },
  'admin@demo.com':   { pw: 'demo123', role: 'admin' },
};

export function Login({ setPage, showToast, onAuth }) {
  const [email, setEmail] = useState('ahmad@demo.com');
  const [pw, setPw] = useState('demo123');
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = 'Required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Invalid email';
    if (!pw) e.pw = 'Required';
    else if (pw.length < 6) e.pw = 'Min 6 characters';
    return e;
  };

  const onSubmit = e => {
    e.preventDefault();
    const err = validate();
    setErrs(err);
    if (Object.keys(err).length) return;
    const acct = DEMO_ACCOUNTS[email.toLowerCase()];
    if (!acct || acct.pw !== pw) {
      setErrs({ pw: 'Invalid email or password' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(`Signed in as ${acct.role}`);
      onAuth(acct.role);
    }, 900);
  };

  return (
    <div className="page active">
      <div className="auth">
        <AuthLeft mode="login" setPage={setPage} />
        <AuthRight>
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className="form-eyebrow"><span className="dot" />Member access</div>
            <h2>Sign In</h2>
            <p className="sub">Enter your credentials to access your account.</p>

            <Field label="Email" name="email" type="email"
              value={email} onChange={setEmail}
              placeholder="ahmad@demo.com" error={errs.email} required />
            <Field label="Password" name="password" type="password"
              value={pw} onChange={setPw}
              placeholder="••••••••" error={errs.pw} required />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, gap: 12 }}>
              <div style={{ font: '500 10px/1.4 Manrope, sans-serif', color: 'rgba(46,46,46,0.5)', letterSpacing: '0.04em' }}>
                Demo: <b style={{ color: 'var(--dark)' }}>ahmad@demo.com</b> · <b style={{ color: 'var(--dark)' }}>partner@demo.com</b> · <b style={{ color: 'var(--dark)' }}>admin@demo.com</b>&nbsp;<span style={{ color: 'rgba(46,46,46,0.4)' }}>(pw: demo123)</span>
              </div>
              <a href="#" onClick={e => { e.preventDefault(); showToast('Reset link sent (demo)'); }}
                style={{ font: '600 11px/1 Manrope, sans-serif', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                Forgot password?
              </a>
            </div>

            <button className={`submit ${loading ? 'loading' : ''}`} type="submit">
              {loading ? 'Signing in…' : <><span>Sign In</span> <span className="arrow">→</span></>}
            </button>

            <p className="submit-helper">
              Don't have an account? <a href="#" onClick={e => { e.preventDefault(); setPage('register'); }}>Register</a>
            </p>
          </form>
        </AuthRight>
      </div>
    </div>
  );
}

export function Register({ setPage, showToast }) {
  const [role, setRole] = useState('referrer');
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [phone, setPhone]   = useState('');
  const [pw, setPw]         = useState('');
  const [company, setCompany] = useState('');
  const [errs, setErrs]     = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Required';
    if (!email) e.email = 'Required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Invalid email';
    if (!phone) e.phone = 'Required';
    else if (!/^[0-9 +()-]{8,}$/.test(phone)) e.phone = 'Invalid phone';
    if (!pw) e.pw = 'Required';
    else if (pw.length < 6) e.pw = 'Min 6 characters';
    if (role === 'partner' && !company.trim()) e.company = 'Required';
    return e;
  };

  const onSubmit = e => {
    e.preventDefault();
    const err = validate();
    setErrs(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Application received — review in 24–48h');
    }, 1200);
  };

  return (
    <div className="page active">
      <div className="auth">
        <AuthLeft mode="register" setPage={setPage} />
        <AuthRight>
          <form className="auth-form wide" onSubmit={onSubmit} noValidate>
            <div className="form-eyebrow"><span className="dot" />New application</div>
            <h2>Create Account</h2>
            <p className="sub">Choose your role to get started — you can switch later in settings.</p>

            <div className="tabs" role="tablist">
              <button type="button" role="tab" aria-selected={role === 'referrer'}
                className={`tab ${role === 'referrer' ? 'active' : ''}`}
                onClick={() => setRole('referrer')}>Referrer</button>
              <button type="button" role="tab" aria-selected={role === 'partner'}
                className={`tab ${role === 'partner' ? 'active' : ''}`}
                onClick={() => setRole('partner')}>Partner</button>
            </div>

            <div className="field-row">
              <Field label="Full Name" name="name"
                value={name} onChange={setName}
                placeholder={role === 'referrer' ? 'Ahmad Rizal' : 'Director of Operations'}
                error={errs.name} required />
              <Field label="Email" name="email" type="email"
                value={email} onChange={setEmail}
                placeholder="ahmad@email.com" error={errs.email} required />
            </div>

            <div className="field-row">
              <Field label="Phone" name="phone" type="tel"
                value={phone} onChange={setPhone}
                placeholder="0123456789" error={errs.phone} required />
              <Field label="Password" name="password" type="password"
                value={pw} onChange={setPw}
                placeholder="••••••••" error={errs.pw} required />
            </div>

            {role === 'partner' && (
              <Field label="Company" name="company"
                value={company} onChange={setCompany}
                placeholder="TechVision Sdn Bhd"
                error={errs.company} required />
            )}

            <button className={`submit ${loading ? 'loading' : ''}`} type="submit">
              {loading ? 'Submitting…' : <><span>Create Account</span> <span className="arrow">→</span></>}
            </button>

            <p className="submit-helper">
              Already have an account? <a href="#" onClick={e => { e.preventDefault(); setPage('login'); }}>Sign In</a>
            </p>
          </form>
        </AuthRight>
      </div>
    </div>
  );
}
