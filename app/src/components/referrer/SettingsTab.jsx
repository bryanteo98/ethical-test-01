import { PageHead } from "../Sidebar.jsx";

export default function SettingsTab({ user }) {
  return <><PageHead title="Settings" sub="Update your profile and payout details." /><div className="detail-card"><div className="detail-card-head">Profile</div><div className="detail-card-body"><div className="detail-row"><div className="k">Full Name</div><div className="v">{user.name}</div></div><div className="detail-row"><div className="k">Email</div><div className="v">{user.email}</div></div><div className="detail-row"><div className="k">Phone</div><div className="v">{user.phone}</div></div><div className="detail-row"><div className="k">Tier</div><div className="v">Gold (60%)</div></div><div className="detail-row"><div className="k">Bank</div><div className="v">Maybank · ****8821</div></div></div></div></>;
}
