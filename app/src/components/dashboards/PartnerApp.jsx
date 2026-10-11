import { useState } from "react";
import Sidebar, { Bell } from "../Sidebar.jsx";
import { I } from "../Icons.jsx";
import DashboardTab from "../partner/DashboardTab.jsx";
import LeadsTab from "../partner/LeadsTab.jsx";
import InvoicesTab from "../partner/InvoicesTab.jsx";
import SettingsTab from "../partner/SettingsTab.jsx";

export default function PartnerApp({ onSignOut, showToast }) {
  const [active, setActive] = useState("dashboard");
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
  const user = { name: "TechVision Sdn Bhd", role: "Partner", initial: "T" };

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
            onViewLeads={() => setActive("leads")}
            onViewInvoices={() => setActive("invoices")}
            showToast={showToast}
          />
        )}
        {active === "leads" && <LeadsTab leads={leads} showToast={showToast} />}
        {active === "invoices" && <InvoicesTab />}
        {active === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}
