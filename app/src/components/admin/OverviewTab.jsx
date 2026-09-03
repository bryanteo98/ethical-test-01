import { useMemo } from "react";
import { PageHead } from "../Sidebar.jsx";
import StatusPill from "../StatusPill.jsx";
import { I } from "../Icons.jsx";

export default function OverviewTab({ onNavigate, showToast }) {
  const chartPts = useMemo(() => [10, 18, 16, 28, 32, 26, 40, 38, 46, 52, 48, 58, 54, 62], []);
  const chartW = 600;
  const chartH = 100;
  const max = Math.max(...chartPts);
  const path = chartPts.map((value, index) => {
    const x = (index / (chartPts.length - 1)) * chartW;
    const y = chartH - (value / max) * chartH;
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <>
      <PageHead title="Platform Overview" sub="Welcome back, Admin." />
      <div className="stat-grid">
        <div className="card"><div className="lbl">Total Referrers</div><div className="val">120</div><div className="ftr">Registered</div></div>
        <div className="card"><div className="lbl">Active Partners</div><div className="val">8</div><div className="ftr">Vetted &amp; approved</div></div>
        <div className="card"><div className="lbl">Total Leads</div><div className="val">1200</div><div className="ftr">All time</div></div>
        <div className="card"><div className="lbl">Revenue Distributed</div><div className="val">RM 9,250</div><div className="ftr">All time</div></div>
      </div>
      <div style={{ margin: "16px 0" }}>
        <div className="action-required" onClick={() => { onNavigate("leads"); showToast("Showing leads awaiting verification"); }}><I.user /><div><div className="lbl">Action Required</div><div className="msg">1 lead awaiting verification</div></div><div className="arr"><I.arrow /></div></div>
        <div className="action-required" onClick={() => { onNavigate("leads"); showToast("Showing verified leads awaiting partner"); }}><I.user /><div><div className="lbl">Action Required</div><div className="msg">1 verified lead awaiting partner assignment</div></div><div className="arr"><I.arrow /></div></div>
      </div>
      <div className="breakdown">
        <div className="breakdown-head"><div>Lead Status Breakdown</div><div>Revenue</div></div>
        <div className="breakdown-body"><div className="bd-stats"><div><div className="bd-stat-num orange">1</div><div className="bd-stat-lbl">Pending</div></div><div><div className="bd-stat-num">403</div><div className="bd-stat-lbl">Verified</div></div><div><div className="bd-stat-num">18</div><div className="bd-stat-lbl">Ongoing</div></div><div><div className="bd-stat-num">385</div><div className="bd-stat-lbl">Completed</div></div></div><div className="chart"><svg viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">{Array.from({ length: 14 }).map((_, index) => <line key={index} x1={(index / 13) * chartW} y1="0" x2={(index / 13) * chartW} y2={chartH} stroke="rgba(243,243,233,0.05)" />)}<path d={path} fill="none" stroke="var(--orange)" strokeWidth="2" /><path d={`${path} L${chartW},${chartH} L0,${chartH} Z`} fill="rgba(255,85,0,0.1)" /></svg></div></div>
      </div>
      <div className="section-title" style={{ marginTop: 24 }}>Recent Activity</div>
      <table className="tbl"><thead><tr><th>Lead / Client</th><th>Action</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>
        <tr><td><div className="strong">Razif Hakim</div><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>BizTech Solutions</div></td><td>Lead Completed</td><td className="muted">20 Nov 2025</td><td><StatusPill status="completed" /></td><td><span className="muted"><I.eye /> &nbsp; <I.edit /></span></td></tr>
        <tr><td><div className="strong">Farah Liana</div><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>Global Traders</div></td><td>Invoice Submitted</td><td className="muted">10 Dec 2025</td><td><StatusPill status="submitted" /></td><td><span className="muted"><I.eye /> &nbsp; <I.edit /></span></td></tr>
        <tr><td><div className="strong">Melissa Wong</div><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>Crystal Events</div></td><td>New Lead</td><td className="muted">15 Dec 2025</td><td><StatusPill status="pending" /></td><td><span className="muted"><I.eye /> &nbsp; <I.edit /></span></td></tr>
      </tbody></table>
    </>
  );
}
