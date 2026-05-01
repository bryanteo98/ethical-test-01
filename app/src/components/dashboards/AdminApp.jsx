import { useState, useMemo } from 'react';
import Sidebar, { Bell, PageHead } from '../Sidebar.jsx';
import StatusPill from '../StatusPill.jsx';
import { I } from '../Icons.jsx';

export default function AdminApp({ onSignOut, showToast }) {
  const [active, setActive] = useState('overview');
  const [usersTab, setUsersTab] = useState('All');

  const nav = [
    { id: 'overview',    label: 'Overview',    icon: I.grid },
    { id: 'users',       label: 'Users',       icon: I.user },
    { id: 'leads',       label: 'Leads',       icon: I.swap },
    { id: 'invoices',    label: 'Invoices',    icon: I.doc  },
    { id: 'vouchers',    label: 'Vouchers',    icon: I.tag  },
    { id: 'withdrawals', label: 'Withdrawals', icon: I.cash },
    { id: 'settings',    label: 'Settings',    icon: I.cog  },
  ];
  const user = { name: 'Admin', role: 'Administrator', initial: 'A' };

  const chartPts = useMemo(() => [10, 18, 16, 28, 32, 26, 40, 38, 46, 52, 48, 58, 54, 62], []);
  const chartW = 600, chartH = 100;
  const max = Math.max(...chartPts);
  const path = chartPts.map((v, i) => {
    const x = (i / (chartPts.length - 1)) * chartW;
    const y = chartH - (v / max) * chartH;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="app">
      <Sidebar nav={nav} active={active} onNav={setActive} user={user} onSignOut={onSignOut} />
      <main className="main">
        <Bell count={3} />

        {active === 'overview' && (
          <>
            <PageHead title="Platform Overview" sub="Welcome back, Admin." />
            <div className="stat-grid">
              <div className="card"><div className="lbl">Total Referrers</div><div className="val">120</div><div className="ftr">Registered</div></div>
              <div className="card"><div className="lbl">Active Partners</div><div className="val">8</div><div className="ftr">Vetted &amp; approved</div></div>
              <div className="card"><div className="lbl">Total Leads</div><div className="val">1200</div><div className="ftr">All time</div></div>
              <div className="card"><div className="lbl">Revenue Distributed</div><div className="val">RM 9,250</div><div className="ftr">All time</div></div>
            </div>

            <div style={{ margin: '16px 0' }}>
              <div className="action-required" onClick={() => { setActive('leads'); showToast('Showing leads awaiting verification'); }}>
                <I.user />
                <div>
                  <div className="lbl">Action Required</div>
                  <div className="msg">1 lead awaiting verification</div>
                </div>
                <div className="arr"><I.arrow /></div>
              </div>
              <div className="action-required" onClick={() => { setActive('leads'); showToast('Showing verified leads awaiting partner'); }}>
                <I.user />
                <div>
                  <div className="lbl">Action Required</div>
                  <div className="msg">1 verified lead awaiting partner assignment</div>
                </div>
                <div className="arr"><I.arrow /></div>
              </div>
            </div>

            <div className="breakdown">
              <div className="breakdown-head">
                <div>Lead Status Breakdown</div><div>Revenue</div>
              </div>
              <div className="breakdown-body">
                <div className="bd-stats">
                  <div><div className="bd-stat-num orange">1</div><div className="bd-stat-lbl">Pending</div></div>
                  <div><div className="bd-stat-num">403</div><div className="bd-stat-lbl">Verified</div></div>
                  <div><div className="bd-stat-num">18</div><div className="bd-stat-lbl">Ongoing</div></div>
                  <div><div className="bd-stat-num">385</div><div className="bd-stat-lbl">Completed</div></div>
                </div>
                <div className="chart">
                  <svg viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <line key={i} x1={(i / 13) * chartW} y1="0" x2={(i / 13) * chartW} y2={chartH} stroke="rgba(243,243,233,0.05)" />
                    ))}
                    <path d={path} fill="none" stroke="var(--orange)" strokeWidth="2" />
                    <path d={`${path} L${chartW},${chartH} L0,${chartH} Z`} fill="rgba(255,85,0,0.1)" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="section-title" style={{ marginTop: 24 }}>Recent Activity</div>
            <table className="tbl">
              <thead><tr><th>Lead / Client</th><th>Action</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr>
                  <td><div className="strong">Razif Hakim</div><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>BizTech Solutions</div></td>
                  <td>Lead Completed</td><td className="muted">20 Nov 2025</td>
                  <td><StatusPill status="completed" /></td>
                  <td><span style={{ color: 'var(--cream)', opacity: 0.6, cursor: 'pointer' }}><I.eye />&nbsp;<I.edit /></span></td>
                </tr>
                <tr>
                  <td><div className="strong">Farah Liana</div><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>Global Traders</div></td>
                  <td>Invoice Submitted</td><td className="muted">10 Dec 2025</td>
                  <td><StatusPill status="submitted" /></td>
                  <td><span style={{ color: 'var(--cream)', opacity: 0.6, cursor: 'pointer' }}><I.eye />&nbsp;<I.edit /></span></td>
                </tr>
                <tr>
                  <td><div className="strong">Melissa Wong</div><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>Crystal Events</div></td>
                  <td>New Lead</td><td className="muted">15 Dec 2025</td>
                  <td><StatusPill status="pending" /></td>
                  <td><span style={{ color: 'var(--cream)', opacity: 0.6, cursor: 'pointer' }}><I.eye />&nbsp;<I.edit /></span></td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {active === 'users' && (
          <>
            <PageHead title="Users" sub="Manage referrers and partners on the platform." />
            <div className="ftabs">
              {['All', 'Referrers', 'Partners'].map(t => (
                <button key={t} className={`ftab ${usersTab === t ? 'active' : ''}`} onClick={() => setUsersTab(t)}>{t}</button>
              ))}
            </div>
            {(usersTab === 'All' || usersTab === 'Referrers') && <>
              <div className="section-title">Referrers</div>
              <table className="tbl">
                <thead><tr><th>Name / Email</th><th>Phone</th><th>Tier</th><th>Total Leads</th><th>Balance</th><th></th></tr></thead>
                <tbody>
                  <tr>
                    <td><div className="strong">Ahmad Rizal</div><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>ahmad@demo.com</div></td>
                    <td>0123456789</td><td>Gold</td><td>14</td><td className="strong">RM 8,750.00</td>
                    <td><span style={{ color: 'var(--orange)', cursor: 'pointer' }} onClick={() => showToast('Edit Ahmad Rizal')}>Edit →</span></td>
                  </tr>
                  <tr>
                    <td><div className="strong">Siti Nora</div><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>siti@demo.com</div></td>
                    <td>0129876543</td><td>Silver</td><td>4</td><td className="strong">RM 1,200.00</td>
                    <td><span style={{ color: 'var(--orange)', cursor: 'pointer' }} onClick={() => showToast('Edit Siti Nora')}>Edit →</span></td>
                  </tr>
                </tbody>
              </table>
            </>}
            {(usersTab === 'All' || usersTab === 'Partners') && <>
              <div className="section-title" style={{ marginTop: 24 }}>Partners</div>
              <table className="tbl">
                <thead><tr><th>Company / Contact</th><th>Services</th><th>Approval</th><th>Joined</th><th>Actions</th></tr></thead>
                <tbody>
                  <tr>
                    <td><div className="strong">TechVision Sdn Bhd</div><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>David Lim</div></td>
                    <td>IT Consulting, Software Dev</td><td><StatusPill status="approved" /></td><td className="muted">10 Dec 2025</td>
                    <td><span style={{ color: 'var(--orange)', cursor: 'pointer' }}>Edit →</span></td>
                  </tr>
                  <tr>
                    <td><div className="strong">LexPro Legal Associates</div><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>Priya Sharma</div></td>
                    <td>Corporate Law, Compliance</td><td><StatusPill status="approved" /></td><td className="muted">10 Dec 2025</td>
                    <td><span style={{ color: 'var(--orange)', cursor: 'pointer' }}>Edit →</span></td>
                  </tr>
                  <tr>
                    <td><div className="strong">FinanceWise Advisory</div><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>Kevin Tan</div></td>
                    <td>Financial Planning, Tax</td><td><StatusPill status="pending" /></td><td className="muted">10 Dec 2025</td>
                    <td><span style={{ color: 'var(--orange)', cursor: 'pointer' }} onClick={() => showToast('FinanceWise Advisory approved')}>Approve →</span></td>
                  </tr>
                </tbody>
              </table>
            </>}
          </>
        )}

        {active === 'leads' && (
          <>
            <PageHead title="Leads" sub="All leads across the platform." />
            <table className="tbl">
              <thead><tr><th>Client</th><th>Referrer</th><th>Partner</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                <tr><td className="strong">Razif Hakim</td><td>Ahmad Rizal</td><td>TechVision</td><td><StatusPill status="completed" /></td><td className="muted">10/10/2024</td></tr>
                <tr><td className="strong">Farah Liana</td><td>Ahmad Rizal</td><td>LexPro Legal</td><td><StatusPill status="ongoing" /></td><td className="muted">10/10/2024</td></tr>
                <tr><td className="strong">Melissa Wong</td><td>Siti Nora</td><td>—</td><td><StatusPill status="pending" /></td><td className="muted">10/10/2024</td></tr>
              </tbody>
            </table>
          </>
        )}

        {active === 'invoices' && (
          <>
            <PageHead title="Invoices" sub="Fee submissions from partners." />
            <table className="tbl">
              <thead><tr><th>Invoice</th><th>Partner</th><th>Lead</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td className="strong">INV-1042</td><td>TechVision Sdn Bhd</td><td>Razif Hakim</td><td>RM 4,500.00</td><td><StatusPill status="completed" /></td></tr>
                <tr><td className="strong">INV-1043</td><td>LexPro Legal</td><td>Farah Liana</td><td>RM 6,800.00</td><td><StatusPill status="submitted" /></td></tr>
              </tbody>
            </table>
          </>
        )}

        {active === 'vouchers' && (
          <>
            <PageHead title="Vouchers" sub="Promotional codes and incentives." />
            <table className="tbl">
              <thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Used / Cap</th><th>Expires</th></tr></thead>
              <tbody>
                <tr><td className="strong">WELCOME50</td><td>Referrer Boost</td><td>+5%</td><td>22 / 100</td><td className="muted">31 Mar 2026</td></tr>
                <tr><td className="strong">PARTNER-Q1</td><td>Partner Bonus</td><td>RM 500</td><td>4 / 20</td><td className="muted">30 Apr 2026</td></tr>
              </tbody>
            </table>
          </>
        )}

        {active === 'withdrawals' && (
          <>
            <PageHead title="Withdrawals" sub="Pending and processed payouts." />
            <table className="tbl">
              <thead><tr><th>Referrer</th><th>Amount</th><th>Bank</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr>
                  <td className="strong">Ahmad Rizal</td><td>RM 5,500.00</td><td>Maybank ****8821</td>
                  <td><StatusPill status="pending" /></td>
                  <td><span style={{ color: 'var(--orange)', cursor: 'pointer' }} onClick={() => showToast('Withdrawal approved')}>Approve →</span></td>
                </tr>
                <tr>
                  <td className="strong">Siti Nora</td><td>RM 1,200.00</td><td>CIMB ****4412</td>
                  <td><StatusPill status="completed" /></td>
                  <td className="muted">Done</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {active === 'settings' && (
          <>
            <PageHead title="Settings" sub="Platform configuration." />
            <div className="detail-card">
              <div className="detail-card-head">Platform</div>
              <div className="detail-card-body">
                <div className="detail-row"><div className="k">Default Tier</div><div className="v">Silver (40%)</div></div>
                <div className="detail-row"><div className="k">Gold Threshold</div><div className="v">10 closed leads / quarter</div></div>
                <div className="detail-row"><div className="k">Region</div><div className="v">Kuala Lumpur, MY</div></div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
