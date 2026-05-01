import { useState } from 'react';
import Sidebar, { Bell, PageHead } from '../Sidebar.jsx';
import StatusPill from '../StatusPill.jsx';
import { I } from '../Icons.jsx';

export default function PartnerApp({ onSignOut, showToast }) {
  const [active, setActive] = useState('dashboard');
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState('All');

  const nav = [
    { id: 'dashboard', label: 'Dashboard',      icon: I.grid },
    { id: 'leads',     label: 'Assigned Leads', icon: I.swap },
    { id: 'invoices',  label: 'Invoices',       icon: I.cash },
    { id: 'settings',  label: 'Settings',       icon: I.cog  },
  ];
  const user = { name: 'TechVision Sdn Bhd', role: 'Partner', initial: 'T' };

  const leads = [
    { client: 'Razif Hakim',  company: 'BizTech Solutions',      email: 'razif@biztech.my',        svc: 'IT Consulting', referrer: 'Ahmad Rizal', status: 'completed', date: '10/10/2024', detail: 'Lorem Ipsum is simply dummy text…' },
    { client: 'Farah Liana',  company: 'Global Traders Sdn Bhd', email: 'farah@globaltraders.my',  svc: 'Corporate Law', referrer: 'Ahmad Rizal', status: 'ongoing',   date: '10/10/2024', detail: 'Lorem Ipsum is simply dummy text…' },
    { client: 'Lim Chong',    company: 'Crystal Events',         email: 'lim@crystal.my',          svc: 'Software Dev',  referrer: 'Siti Nora',   status: 'ongoing',   date: '12/11/2024', detail: 'Custom CRM build for events business.' },
  ];
  const visible = leads.filter(l => filter === 'All' || l.status === filter.toLowerCase());

  return (
    <div className="app">
      <Sidebar nav={nav} active={active} onNav={setActive} user={user} onSignOut={onSignOut} />
      <main className="main">
        <Bell count={1} />

        {active === 'dashboard' && (
          <>
            <PageHead title="Overview" sub="Welcome back, Partner." />
            <div className="stat-grid">
              <div className="card"><div className="lbl">Assigned Leads</div><div className="val">3</div><div className="ftr">Active assignments</div></div>
              <div className="card"><div className="lbl">Need Response</div><div className="val orange">2</div><div className="ftr">Incoming leads</div></div>
              <div className="card"><div className="lbl">Ongoing</div><div className="val">1</div><div className="ftr">Processing</div></div>
              <div className="card"><div className="lbl">Completed</div><div className="val">1</div><div className="ftr">Successfully closed</div></div>
            </div>
            <div className="action-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <button className="action" onClick={() => setActive('leads')}><I.user /> Assigned Leads — view &amp; manage all leads</button>
              <button className="action" onClick={() => setActive('invoices')}><I.doc /> Invoices — fees requests &amp; submissions</button>
            </div>
            <div className="section-title">Active Assigned Leads</div>
            <table className="tbl">
              <thead><tr><th>Client</th><th>Details</th><th>Referred By</th><th>Status</th><th>Assigned</th></tr></thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={i}>
                    <td><div className="strong">{l.client}</div><div className="muted" style={{ marginTop: 4, fontSize: 11 }}>{l.company}</div></td>
                    <td className="muted">{l.detail}</td>
                    <td>{l.referrer}</td>
                    <td><StatusPill status={l.status} /></td>
                    <td className="muted">{l.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="detail-card-head" style={{ marginTop: 32 }}>Company Documents</div>
            <div className="doc-row">
              <div className="doc" onClick={() => showToast('Downloading Company Profile…')}>Company Profile</div>
              <div className="doc" onClick={() => showToast('Downloading Brand Guidelines…')}>Brand Guidelines</div>
              <div className="doc" onClick={() => showToast('Downloading Referrer Playbook…')}>Referrer Playbook</div>
            </div>
          </>
        )}

        {active === 'leads' && (
          <>
            <PageHead title="Assigned Leads" sub="Review and manage leads assigned to your organisation." />
            <div className="ftabs">
              {['All', 'Accepted', 'Ongoing', 'Completed', 'Declined'].map(t => (
                <button key={t} className={`ftab ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
              ))}
            </div>
            <table className="tbl">
              <thead><tr><th>Client &amp; Company</th><th>Service</th><th>Referrer</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {visible.map((l, i) => {
                  const idx = leads.indexOf(l);
                  return (
                    <tr key={i} onClick={() => setSelected(idx)} style={{ cursor: 'pointer', background: selected === idx ? 'rgba(255,85,0,0.06)' : undefined }}>
                      <td><div className="strong">{l.client}</div><div className="muted" style={{ marginTop: 4, fontSize: 11 }}>{l.company}</div></td>
                      <td>{l.svc}</td>
                      <td>{l.referrer}</td>
                      <td><StatusPill status={l.status} /></td>
                      <td><span style={{ color: 'var(--orange)', cursor: 'pointer' }}><I.eye />&nbsp;&nbsp;<I.edit /></span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="detail-card">
              <div className="detail-card-head">Lead Detail — {leads[selected].client}</div>
              <div className="detail-card-body">
                <div className="detail-row"><div className="k">Client</div><div className="v">{leads[selected].client}</div></div>
                <div className="detail-row"><div className="k">Company</div><div className="v">{leads[selected].company}</div></div>
                <div className="detail-row"><div className="k">Email</div><div className="v">{leads[selected].email}</div></div>
                <div className="detail-row"><div className="k">Service</div><div className="v">{leads[selected].svc}</div></div>
                <div className="detail-row"><div className="k">Status</div><div className="v"><StatusPill status={leads[selected].status} /></div></div>
                <button className="action primary" style={{ marginTop: 16, width: 'auto', padding: '12px 24px' }}
                  onClick={() => showToast('Invoice draft generated for ' + leads[selected].client)}>
                  <I.doc /> Generate Invoice — fees submission
                </button>
              </div>
            </div>
          </>
        )}

        {active === 'invoices' && (
          <>
            <PageHead title="Invoices" sub="Fee requests and submission history." />
            <table className="tbl">
              <thead><tr><th>Invoice #</th><th>Lead</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                <tr><td className="strong">INV-1042</td><td>Razif Hakim</td><td>RM 4,500.00</td><td><StatusPill status="completed" /></td><td className="muted">10/10/2024</td></tr>
                <tr><td className="strong">INV-1043</td><td>Farah Liana</td><td>RM 6,800.00</td><td><StatusPill status="submitted" /></td><td className="muted">22/11/2024</td></tr>
              </tbody>
            </table>
          </>
        )}

        {active === 'settings' && (
          <>
            <PageHead title="Settings" sub="Organisation profile and contact details." />
            <div className="detail-card">
              <div className="detail-card-head">Organisation</div>
              <div className="detail-card-body">
                <div className="detail-row"><div className="k">Company</div><div className="v">TechVision Sdn Bhd</div></div>
                <div className="detail-row"><div className="k">Contact</div><div className="v">David Lim</div></div>
                <div className="detail-row"><div className="k">Email</div><div className="v">partner@demo.com</div></div>
                <div className="detail-row"><div className="k">Services</div><div className="v">IT Consulting · Software Dev</div></div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
