import { PageHead } from "../Sidebar.jsx";

export default function SettingsTab({ user = {} }) {
  const displayValue = (value) => value || "—";
  const website = user.website?.trim();
  let websiteHref = "";
  if (website) {
    try {
      const parsedWebsite = new URL(
        /^[a-z][a-z\d+.-]*:/i.test(website) ? website : `https://${website}`,
      );
      if (["http:", "https:"].includes(parsedWebsite.protocol)) {
        websiteHref = parsedWebsite.href;
      }
    } catch {
      // Show invalid URLs as plain text instead of rendering a broken link.
    }
  }

  return (
    <>
      <PageHead
        title="Settings"
        sub="Organisation profile and contact details."
      />
      <div className="detail-card">
        <div className="detail-card-head">Organisation</div>
        <div className="detail-card-body">
          <div className="detail-row">
            <div className="k">Company</div>
            <div className="v">{displayValue(user.company_name)}</div>
          </div>
          <div className="detail-row">
            <div className="k">Contact</div>
            <div className="v">{displayValue(user.owner_name || user.full_name)}</div>
          </div>
          <div className="detail-row">
            <div className="k">Email</div>
            <div className="v">{displayValue(user.email)}</div>
          </div>
          <div className="detail-row">
            <div className="k">Industry</div>
            <div className="v">{displayValue(user.industry)}</div>
          </div>
          <div className="detail-row">
            <div className="k">SSM No</div>
            <div className="v">{displayValue(user.ssm_no)}</div>
          </div>
          <div className="detail-row">
            <div className="k">Website</div>
            <div className="v">
              {websiteHref ? (
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#fff" }}
                >
                  {website}
                </a>
              ) : (
                displayValue(website)
              )}
            </div>
          </div>
          <div className="detail-row">
            <div className="k">Contact No</div>
            <div className="v">{displayValue(user.contact_no)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
