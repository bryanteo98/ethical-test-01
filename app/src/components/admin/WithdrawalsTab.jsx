import { PageHead } from "../Sidebar.jsx";
import StatusPill from "../StatusPill.jsx";

export default function WithdrawalsTab({ showToast }) {
  return (
    <>
      <PageHead title="Withdrawals" sub="Pending and processed payouts." />
      <table className="tbl">
        <thead>
          <tr>
            <th>Referrer</th>
            <th>Amount</th>
            <th>Bank</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="strong">Ahmad Rizal</td>
            <td>RM 5,500.00</td>
            <td>Maybank ****8821</td>
            <td>
              <StatusPill status="pending" />
            </td>
            <td>
              <span
                style={{ color: "var(--orange)", cursor: "pointer" }}
                onClick={() => showToast("Withdrawal approved")}
              >
                Approve →
              </span>
            </td>
          </tr>
          <tr>
            <td className="strong">Siti Nora</td>
            <td>RM 1,200.00</td>
            <td>CIMB ****4412</td>
            <td>
              <StatusPill status="completed" />
            </td>
            <td className="muted">Done</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
