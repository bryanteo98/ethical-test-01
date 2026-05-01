import { useState } from 'react';
import Sidebar, { Bell, PageHead } from '../Sidebar.jsx';
import StatusPill from '../StatusPill.jsx';
import Field from '../Field.jsx';
import { I } from '../Icons.jsx';

function AddLeadModal({ onClose, onSave }) {
  const [client, setClient] = useState('');
  const [company, setCompany] = useState('');
  const [svc, setSvc] = useState('');
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Add New Lead</h3>
        <p style={{ marginTop: 6, color: 'var(--muted)', font: '400 13px/1.4 Manrope, sans-serif' }}>Submit a new referral for verification.</p>
        <div style={{ marginTop: 18 }}>
          <Field label="Client Name" value={client} onChange={setClient} placeholder="Razif Hakim" required />
          <Field label="Company" value={company} onChange={setCompany} placeholder="BizTech Solutions" required />
          <Field label="Service Needed" value={svc} onChange={setSvc} placeholder="IT Consulting" required />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button className="action" style={{ flex: 1, background: 'transparent', border: '1px solid var(--dark)' }} onClick={onClose}>Cancel</button>
          <button className="action primary" style={{ flex: 1 }}
            onClick={() => { if (client && company && svc) onSave({ client, company, svc }); }}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default function ReferrerApp({ onSignOut, showToast }) {
  const [active, setActive] = useState('dashboard');
  const [filter, setFilter] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [leads, setLeads] = useState([
    { client: 'Razif Hakim',  company: 'BizTech Solutions',   svc: 'IT Consulting',     partner: 'TechVision Sdn Bhd', status: 'completed', date: '10/10/2024' },
    { client: 'Farah Liana',  company: 'Global Traders Sdn',  svc: 'Corporate Law',     partner: 'LexPro Legal',       status: 'ongoing',   date: '10/10/2024' },
    { client: 'Melissa Wong', company: 'Crystal Events',      svc: 'IT Consulting',     partner: '—',                  status: 'pending',   date: '10/10/2024' },
    { client: 'Ahmad Test',   company: 'Demo Corp',           svc: 'Financial Planning', partner: '—',                 status: 'verified',  date: '10/10/2024' },
  ]);

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: I.grid },
    { id: 'leads',     label: 'My Leads',  icon: I.swap },
    { id: 'history',   label: 'History',   icon: I.hist },
    { id: 'settings',  label: 'Settings',  icon: I.cog  },
  ];
  const user = { name: 'Ahmad Rizal', role: 'referrer', initial: 'A', tier: 'GOLD' };

  const visible = leads
    .filter(l => filter === 'All' || l.status === filter.toLowerCase())
    .filter(l => !search || (l.client + l.company + l.svc).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app">
      <Sidebar nav={nav} active={active} onNav={setActive} user={user} onSignOut={onSignOut} />
      <main className="main">
        <Bell count={2} />

        {active === 'dashboard' && (
          <>
            <PageHead title="Overview" sub="Welcome back, Ahmad." />
            <div className="stat-grid">
              <div className="card"><div className="lbl">Total Assets</div><div className="val">RM 8,750.00</div><div className="ftr">All time</div></div>
              <div className="card"><div className="lbl">Total Leads</div><div className="val">14</div><div className="ftr">Referrals made</div></div>
              <div className="card"><div className="lbl">Quarterly Earnings</div><div className="val">RM 5,500.00</div><div className="ftr">This quarter</div></div>
              <div className="card"><div className="lbl">Quarterly Referrals</div><div className="val">11</div><div className="ftr">This quarter</div></div>
            </div>
            <div className="action-row">
              <button className="action primary" onClick={() => setShowAdd(true)}><I.plus /> Add New Lead</button>
              <button className="action" onClick={() => showToast('Withdrawal request — RM 5,500 (demo)')}><I.download /> Withdraw</button>
              <button className="action" onClick={() => { setActive('leads'); setFilter('Ongoing'); }}><I.eye /> Check Ongoing</button>
            </div>
            <div className="banner">
              <div className="ic"><I.trophy /></div>
              <div>
                <div className="ttl">Gold Tier Achieved!</div>
                <div className="dsc">Enjoy 60% referrer fee payout on all completed leads.</div>
              </div>
              <div className="dotted" />
              <div className="pill">60% rate</div>
            </div>
            <div className="section-title">Recent Leads</div>
            <table className="tbl">
              <thead><tr><th>Client</th><th>Company</th><th>Service</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {leads.slice(0, 3).map((l, i) => (
                  <tr key={i}>
                    <td className="strong">{l.client}</td>
                    <td>{l.company}</td>
                    <td>{l.svc}</td>
                    <td><StatusPill status={l.status} /></td>
                    <td className="muted">{l.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {active === 'leads' && (
          <>
            <PageHead title="My Leads" sub="All your submitted referrals."
              right={<button className="action primary" style={{ padding: '10px 24px' }} onClick={() => setShowAdd(true)}><I.plus /> Add New Lead</button>} />
            <div className="toolbar">
              <div className="ftabs">
                {['All', 'Pending', 'Verified', 'Ongoing', 'Completed'].map(t => (
                  <button key={t} className={`ftab ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
                ))}
              </div>
              <div className="search">
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..." />
              </div>
            </div>
            <table className="tbl">
              <thead><tr><th>Client &amp; Company</th><th>Service Needed</th><th>Assigned Partner</th><th>Status</th><th>Submitted</th></tr></thead>
              <tbody>
                {visible.map((l, i) => (
                  <tr key={i}>
                    <td><div className="strong">{l.client}</div><div className="muted" style={{ marginTop: 4, fontSize: 11 }}>{l.company}</div></td>
                    <td>{l.svc}</td>
                    <td className="muted">{l.partner}</td>
                    <td><StatusPill status={l.status} /></td>
                    <td className="muted">{l.date}</td>
                  </tr>
                ))}
                {visible.length === 0 && <tr><td colSpan="5" className="muted" style={{ textAlign: 'center', padding: 32 }}>No leads match this filter.</td></tr>}
              </tbody>
            </table>
          </>
        )}

        {active === 'history' && (
          <>
            <PageHead title="History" sub="Closed referrals and earnings ledger." />
            <table className="tbl">
              <thead><tr><th>Client</th><th>Service</th><th>Earnings</th><th>Date</th></tr></thead>
              <tbody>
                <tr><td className="strong">Razif Hakim</td><td>IT Consulting</td><td>RM 1,500.00</td><td className="muted">10/10/2024</td></tr>
                <tr><td className="strong">Lim Chong</td><td>Software Dev</td><td>RM 2,200.00</td><td className="muted">02/09/2024</td></tr>
                <tr><td className="strong">Nina Yap</td><td>Corporate Law</td><td>RM 1,800.00</td><td className="muted">22/08/2024</td></tr>
              </tbody>
            </table>
          </>
        )}

        {active === 'settings' && (
          <>
            <PageHead title="Settings" sub="Update your profile and payout details." />
            <div className="detail-card">
              <div className="detail-card-head">Profile</div>
              <div className="detail-card-body">
                <div className="detail-row"><div className="k">Full Name</div><div className="v">Ahmad Rizal</div></div>
                <div className="detail-row"><div className="k">Email</div><div className="v">ahmad@demo.com</div></div>
                <div className="detail-row"><div className="k">Phone</div><div className="v">0123456789</div></div>
                <div className="detail-row"><div className="k">Tier</div><div className="v">Gold (60%)</div></div>
                <div className="detail-row"><div className="k">Bank</div><div className="v">Maybank · ****8821</div></div>
              </div>
            </div>
          </>
        )}

        {showAdd && (
          <AddLeadModal onClose={() => setShowAdd(false)} onSave={lead => {
            setLeads([{ ...lead, status: 'pending', date: new Date().toLocaleDateString('en-GB'), partner: '—' }, ...leads]);
            setShowAdd(false);
            showToast('Lead submitted — pending verification');
          }} />
        )}
      </main>
    </div>
  );
}
