import { PageHead } from "../Sidebar.jsx";

export default function VouchersTab() {
  return <><PageHead title="Vouchers" sub="Promotional codes and incentives." /><table className="tbl"><thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Used / Cap</th><th>Expires</th></tr></thead><tbody><tr><td className="strong">WELCOME50</td><td>Referrer Boost</td><td>+5%</td><td>22 / 100</td><td className="muted">31 Mar 2026</td></tr><tr><td className="strong">PARTNER-Q1</td><td>Partner Bonus</td><td>RM 500</td><td>4 / 20</td><td className="muted">30 Apr 2026</td></tr></tbody></table></>;
}
