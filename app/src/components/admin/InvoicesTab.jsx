import { PageHead } from "../Sidebar.jsx";
import StatusPill from "../StatusPill.jsx";

export default function InvoicesTab() {
  return (
    <>
      <PageHead title="Invoices" sub="Fee submissions from partners." />
      <table className="tbl">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Partner</th>
            <th>Lead</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="strong">INV-1042</td>
            <td>TechVision Sdn Bhd</td>
            <td>Razif Hakim</td>
            <td>RM 4,500.00</td>
            <td>
              <StatusPill status="completed" />
            </td>
          </tr>
          <tr>
            <td className="strong">INV-1043</td>
            <td>LexPro Legal</td>
            <td>Farah Liana</td>
            <td>RM 6,800.00</td>
            <td>
              <StatusPill status="submitted" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
