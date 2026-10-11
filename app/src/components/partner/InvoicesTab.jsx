import { PageHead } from "../Sidebar.jsx";
import StatusPill from "../StatusPill.jsx";

export default function InvoicesTab() {
  return (
    <>
      <PageHead title="Invoices" sub="Fee requests and submission history." />
      <table className="tbl">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Lead</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="strong">INV-1042</td>
            <td>Razif Hakim</td>
            <td>RM 4,500.00</td>
            <td>
              <StatusPill status="completed" />
            </td>
            <td className="muted">10/10/2024</td>
          </tr>
          <tr>
            <td className="strong">INV-1043</td>
            <td>Farah Liana</td>
            <td>RM 6,800.00</td>
            <td>
              <StatusPill status="submitted" />
            </td>
            <td className="muted">22/11/2024</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
