import { PageHead } from "../Sidebar.jsx";
import StatusPill from "../StatusPill.jsx";
import { I } from "../Icons.jsx";

export default function DashboardTab({
  user,
  leads,
  onAddLead,
  onWithdraw,
  onViewOngoing,
}) {
  return (
    <>
      <PageHead title="Overview" sub={`Welcome back, ${user.name}.`} />
      <div className="stat-grid">
        <div className="card">
          <div className="lbl">Total Assets</div>
          <div className="val">RM 8,750.00</div>
          <div className="ftr">All time</div>
        </div>
        <div className="card">
          <div className="lbl">Total Leads</div>
          <div className="val">14</div>
          <div className="ftr">Referrals made</div>
        </div>
        <div className="card">
          <div className="lbl">Quarterly Earnings</div>
          <div className="val">RM 5,500.00</div>
          <div className="ftr">This quarter</div>
        </div>
        <div className="card">
          <div className="lbl">Quarterly Referrals</div>
          <div className="val">11</div>
          <div className="ftr">This quarter</div>
        </div>
      </div>
      <div className="action-row">
        <button className="action primary" onClick={onAddLead}>
          <I.plus /> Add New Lead
        </button>
        <button className="action" onClick={onWithdraw}>
          <I.download /> Withdraw
        </button>
        <button className="action" onClick={onViewOngoing}>
          <I.eye /> Check Ongoing
        </button>
      </div>
      <div className="banner">
        <div className="ic">
          <I.trophy />
        </div>
        <div>
          <div className="ttl">Gold Tier Achieved!</div>
          <div className="dsc">
            Enjoy 60% referrer fee payout on all completed leads.
          </div>
        </div>
        <div className="dotted" />
        <div className="pill">60% rate</div>
      </div>
      <div className="section-title">Recent Leads</div>
      <table className="tbl">
        <thead>
          <tr>
            <th>Client</th>
            <th>Company</th>
            <th>Service</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.slice(0, 3).map((lead, index) => (
            <tr key={index}>
              <td className="strong">{lead.client}</td>
              <td>{lead.company}</td>
              <td>{lead.svc}</td>
              <td>
                <StatusPill status={lead.status} />
              </td>
              <td className="muted">{lead.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
