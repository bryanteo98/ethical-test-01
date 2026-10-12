import { useState } from "react";
import Sidebar, { Bell } from "../Sidebar.jsx";
import { I } from "../Icons.jsx";
import Field from "../Field.jsx";
import { updatePartnerFirstLoginProfile } from "../api/setData.js";
import DashboardTab from "../partner/DashboardTab.jsx";
import LeadsTab from "../partner/LeadsTab.jsx";
import InvoicesTab from "../partner/InvoicesTab.jsx";
import SettingsTab from "../partner/SettingsTab.jsx";

export default function PartnerApp({
  currentUser,
  onUserUpdate,
  onSignOut,
  showToast,
}) {
  const [active, setActive] = useState("dashboard");
  const [profile, setProfile] = useState({
    ssm_no: currentUser?.ssm_no || "",
    industry: currentUser?.industry || "",
    website: currentUser?.website || "",
    contact_no: currentUser?.contact_no || "",
  });
  const [errors, setErrors] = useState({});
  const [savingProfile, setSavingProfile] = useState(false);
  const leads = [
    {
      client: "Razif Hakim",
      company: "BizTech Solutions",
      email: "razif@biztech.my",
      svc: "IT Consulting",
      referrer: "Ahmad Rizal",
      status: "completed",
      date: "10/10/2024",
      detail: "Lorem Ipsum is simply dummy text…",
    },
    {
      client: "Farah Liana",
      company: "Global Traders Sdn Bhd",
      email: "farah@globaltraders.my",
      svc: "Corporate Law",
      referrer: "Ahmad Rizal",
      status: "ongoing",
      date: "10/10/2024",
      detail: "Lorem Ipsum is simply dummy text…",
    },
    {
      client: "Lim Chong",
      company: "Crystal Events",
      email: "lim@crystal.my",
      svc: "Software Dev",
      referrer: "Siti Nora",
      status: "ongoing",
      date: "12/11/2024",
      detail: "Custom CRM build for events business.",
    },
  ];
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: I.grid },
    { id: "leads", label: "Assigned Leads", icon: I.swap },
    { id: "invoices", label: "Invoices", icon: I.cash },
    { id: "settings", label: "Settings", icon: I.cog },
  ];
  const companyName = currentUser?.company_name || "Partner";
  const user = {
    name: companyName,
    role: "Partner",
    initial: companyName.charAt(0).toUpperCase(),
  };

  const requiresProfileSetup =
    currentUser?.first_login === true ||
    String(currentUser?.first_login).toLowerCase() === "true";

  const updateProfileField = (field) => (value) => {
    setProfile((currentProfile) => ({ ...currentProfile, [field]: value }));
  };

  const onProfileSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    Object.entries(profile).forEach(([field, value]) => {
      if (!value.trim()) nextErrors[field] = "Required";
    });
    if (profile.website.trim()) {
      try {
        new URL(profile.website.trim());
      } catch {
        nextErrors.website = "Enter a valid website URL";
      }
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSavingProfile(true);
    try {
      const updatedProfile = await updatePartnerFirstLoginProfile(
        currentUser,
        profile,
      );
      onUserUpdate({ ...currentUser, ...updatedProfile, first_login: false });
      showToast("Partner profile updated");
    } catch (error) {
      setErrors({ form: error.message || "Unable to update your profile" });
    } finally {
      setSavingProfile(false);
    }
  };

  if (requiresProfileSetup) {
    return (
      <div className="page active">
        <div className="auth">
          <div className="auth-left">
            <div className="logo-row">
              <span className="logo-word">Ethical</span>
            </div>
            <div className="heading-block">
              <h1>
                Complete your <span className="it">profile.</span>
              </h1>
              <p className="lede">
                Add your organisation details to continue to your partner
                dashboard.
              </p>
            </div>
          </div>
          <div className="auth-right">
            <form className="auth-form wide" onSubmit={onProfileSubmit} noValidate>
              <div className="form-eyebrow">
                <span className="dot" />
                Partner profile setup
              </div>
              <h2>Organisation Details</h2>
              <p className="sub">
                All fields are required. You only need to complete this once.
              </p>
              <Field
                label="SSM No"
                name="ssm_no"
                value={profile.ssm_no}
                onChange={updateProfileField("ssm_no")}
                placeholder="Company registration number"
                error={errors.ssm_no}
                required
              />
              <Field
                label="Industry"
                name="industry"
                value={profile.industry}
                onChange={updateProfileField("industry")}
                placeholder="e.g. Consulting"
                error={errors.industry}
                required
              />
              <Field
                label="Website URL"
                name="website"
                type="url"
                value={profile.website}
                onChange={updateProfileField("website")}
                placeholder="https://example.com"
                error={errors.website}
              />
              <Field
                label="Contact No"
                name="contact_no"
                type="tel"
                value={profile.contact_no}
                onChange={updateProfileField("contact_no")}
                placeholder="0123456789"
                error={errors.contact_no}
                required
              />
              {errors.form && <div className="field-error">{errors.form}</div>}
              <button
                className={`submit ${savingProfile ? "loading" : ""}`}
                type="submit"
                disabled={savingProfile}
              >
                {savingProfile ? "Updating…" : <>Update <span className="arrow">→</span></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar
        nav={nav}
        active={active}
        onNav={setActive}
        user={user}
        onSignOut={onSignOut}
      />
      <main className="main">
        <Bell count={1} />
        {active === "dashboard" && (
          <DashboardTab
            leads={leads}
            companyName={companyName}
            onViewLeads={() => setActive("leads")}
            onViewInvoices={() => setActive("invoices")}
            showToast={showToast}
          />
        )}
        {active === "leads" && <LeadsTab leads={leads} showToast={showToast} />}
        {active === "invoices" && <InvoicesTab />}
        {active === "settings" && <SettingsTab user={currentUser} />}
      </main>
    </div>
  );
}
