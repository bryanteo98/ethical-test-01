import { PageHead } from "../Sidebar.jsx";
import StatusPill from "../StatusPill.jsx";

export default function LeadsTab() {
  return <><PageHead title="Leads" sub="All leads across the platform." /><table className="tbl"><thead><tr><th>Client</th><th>Referrer</th><th>Partner</th><th>Status</th><th>Date</th></tr></thead><tbody><tr><td className="strong">Razif Hakim</td><td>Ahmad Rizal</td><td>TechVision</td><td><StatusPill status="completed" /></td><td className="muted">10/10/2024</td></tr><tr><td className="strong">Farah Liana</td><td>Ahmad Rizal</td><td>LexPro Legal</td><td><StatusPill status="ongoing" /></td><td className="muted">10/10/2024</td></tr><tr><td className="strong">Melissa Wong</td><td>Siti Nora</td><td>—</td><td><StatusPill status="pending" /></td><td className="muted">10/10/2024</td></tr></tbody></table></>;
}
