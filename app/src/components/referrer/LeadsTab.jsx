import { useState } from "react";
import { PageHead } from "../Sidebar.jsx";
import StatusPill from "../StatusPill.jsx";
import { I } from "../Icons.jsx";

export default function LeadsTab({ leads, onAddLead, initialFilter = "All" }) {
  const [filter, setFilter] = useState(initialFilter);
  const [search, setSearch] = useState("");
  const visible = leads.filter((lead) => filter === "All" || lead.status === filter.toLowerCase()).filter((lead) => !search || (lead.client + lead.company + lead.svc).toLowerCase().includes(search.toLowerCase()));
  return <><PageHead title="My Leads" sub="All your submitted referrals." right={<button className="action primary" style={{ padding: "10px 24px" }} onClick={onAddLead}><I.plus /> Add New Lead</button>} /><div className="toolbar"><div className="ftabs">{["All", "Pending", "Verified", "Ongoing", "Completed"].map((tab) => <button key={tab} className={`ftab ${filter === tab ? "active" : ""}`} onClick={() => setFilter(tab)}>{tab}</button>)}</div><div className="search"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search leads..." /></div></div><table className="tbl"><thead><tr><th>Client &amp; Company</th><th>Service Needed</th><th>Assigned Partner</th><th>Status</th><th>Submitted</th></tr></thead><tbody>{visible.map((lead, index) => <tr key={index}><td><div className="strong">{lead.client}</div><div className="muted" style={{ marginTop: 4, fontSize: 11 }}>{lead.company}</div></td><td>{lead.svc}</td><td className="muted">{lead.partner}</td><td><StatusPill status={lead.status} /></td><td className="muted">{lead.date}</td></tr>)}{visible.length === 0 && <tr><td colSpan="5" className="muted" style={{ textAlign: "center", padding: 32 }}>No leads match this filter.</td></tr>}</tbody></table></>;
}
