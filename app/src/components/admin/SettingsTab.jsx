import { PageHead } from "../Sidebar.jsx";

export default function SettingsTab() {
  return (
    <>
      <PageHead title="Settings" sub="Platform configuration." />
      <div className="detail-card">
        <div className="detail-card-head">Platform</div>
        <div className="detail-card-body">
          <div className="detail-row">
            <div className="k">Default Tier</div>
            <div className="v">Silver (40%)</div>
          </div>
          <div className="detail-row">
            <div className="k">Gold Threshold</div>
            <div className="v">10 closed leads / quarter</div>
          </div>
          <div className="detail-row">
            <div className="k">Region</div>
            <div className="v">Kuala Lumpur, MY</div>
          </div>
        </div>
      </div>
    </>
  );
}
