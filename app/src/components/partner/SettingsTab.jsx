import { PageHead } from "../Sidebar.jsx";

export default function SettingsTab() {
  return <><PageHead title="Settings" sub="Organisation profile and contact details." /><div className="detail-card"><div className="detail-card-head">Organisation</div><div className="detail-card-body"><div className="detail-row"><div className="k">Company</div><div className="v">TechVision Sdn Bhd</div></div><div className="detail-row"><div className="k">Contact</div><div className="v">David Lim</div></div><div className="detail-row"><div className="k">Email</div><div className="v">partner@demo.com</div></div><div className="detail-row"><div className="k">Services</div><div className="v">IT Consulting · Software Dev</div></div></div></div></>;
}
