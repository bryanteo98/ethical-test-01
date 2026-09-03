import { PageHead } from "../Sidebar.jsx";

export default function HistoryTab() {
  return <><PageHead title="History" sub="Closed referrals and earnings ledger." /><table className="tbl"><thead><tr><th>Client</th><th>Service</th><th>Earnings</th><th>Date</th></tr></thead><tbody><tr><td className="strong">Razif Hakim</td><td>IT Consulting</td><td>RM 1,500.00</td><td className="muted">10/10/2024</td></tr><tr><td className="strong">Lim Chong</td><td>Software Dev</td><td>RM 2,200.00</td><td className="muted">02/09/2024</td></tr><tr><td className="strong">Nina Yap</td><td>Corporate Law</td><td>RM 1,800.00</td><td className="muted">22/08/2024</td></tr></tbody></table></>;
}
