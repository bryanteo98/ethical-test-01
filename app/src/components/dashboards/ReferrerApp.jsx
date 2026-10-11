import { useState } from "react";
import Sidebar, { Bell } from "../Sidebar.jsx";
import Field from "../Field.jsx";
import { I } from "../Icons.jsx";
import DashboardTab from "../referrer/DashboardTab.jsx";
import LeadsTab from "../referrer/LeadsTab.jsx";
import HistoryTab from "../referrer/HistoryTab.jsx";
import SettingsTab from "../referrer/SettingsTab.jsx";

function AddLeadModal({ onClose, onSave }) {
  const [client, setClient] = useState("");
  const [company, setCompany] = useState("");
  const [svc, setSvc] = useState("");
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <h3>Add New Lead</h3>
        <p
          style={{
            marginTop: 6,
            color: "var(--muted)",
            font: "400 13px/1.4 Manrope, sans-serif",
          }}
        >
          Submit a new referral for verification.
        </p>
        <div style={{ marginTop: 18 }}>
          <Field
            label="Client Name"
            value={client}
            onChange={setClient}
            placeholder="Razif Hakim"
            required
          />
          <Field
            label="Company"
            value={company}
            onChange={setCompany}
            placeholder="BizTech Solutions"
            required
          />
          <Field
            label="Service Needed"
            value={svc}
            onChange={setSvc}
            placeholder="IT Consulting"
            required
          />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button
            className="action"
            style={{
              flex: 1,
              background: "transparent",
              border: "1px solid var(--dark)",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="action primary"
            style={{ flex: 1 }}
            onClick={() => {
              if (client && company && svc) onSave({ client, company, svc });
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReferrerApp({ currentUser, onSignOut, showToast }) {
  const [active, setActive] = useState("dashboard");
  const [initialLeadFilter, setInitialLeadFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [leads, setLeads] = useState([
    {
      client: "Razif Hakim",
      company: "BizTech Solutions",
      svc: "IT Consulting",
      partner: "TechVision Sdn Bhd",
      status: "completed",
      date: "10/10/2024",
    },
    {
      client: "Farah Liana",
      company: "Global Traders Sdn",
      svc: "Corporate Law",
      partner: "LexPro Legal",
      status: "ongoing",
      date: "10/10/2024",
    },
    {
      client: "Melissa Wong",
      company: "Crystal Events",
      svc: "IT Consulting",
      partner: "—",
      status: "pending",
      date: "10/10/2024",
    },
    {
      client: "Ahmad Test",
      company: "Demo Corp",
      svc: "Financial Planning",
      partner: "—",
      status: "verified",
      date: "10/10/2024",
    },
  ]);
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: I.grid },
    { id: "leads", label: "My Leads", icon: I.swap },
    { id: "history", label: "History", icon: I.hist },
    { id: "settings", label: "Settings", icon: I.cog },
  ];
  const user = {
    name: currentUser?.full_name || "Referrer",
    email: currentUser?.email || "",
    phone: currentUser?.phone_no || "",
    role: currentUser?.role || "referrer",
    initial: (currentUser?.full_name || "R").charAt(0).toUpperCase(),
    tier: "GOLD",
  };
  const openAddLead = () => setShowAdd(true);
  const saveLead = (lead) => {
    setLeads([
      {
        ...lead,
        status: "pending",
        date: new Date().toLocaleDateString("en-GB"),
        partner: "—",
      },
      ...leads,
    ]);
    setShowAdd(false);
    showToast("Lead submitted — pending verification");
  };

  const handleNav = (nextPage) => {
    setInitialLeadFilter("All");
    setActive(nextPage);
  };
  const viewOngoing = () => {
    setInitialLeadFilter("Ongoing");
    setActive("leads");
  };

  return (
    <div className="app">
      <Sidebar
        nav={nav}
        active={active}
        onNav={handleNav}
        user={user}
        onSignOut={onSignOut}
      />
      <main className="main">
        <Bell count={2} />
        {active === "dashboard" && (
          <DashboardTab
            user={user}
            leads={leads}
            onAddLead={openAddLead}
            onWithdraw={() => showToast("Withdrawal request — RM 5,500 (demo)")}
            onViewOngoing={viewOngoing}
          />
        )}
        {active === "leads" && (
          <LeadsTab
            leads={leads}
            onAddLead={openAddLead}
            initialFilter={initialLeadFilter}
          />
        )}
        {active === "history" && <HistoryTab />}
        {active === "settings" && <SettingsTab user={user} />}
        {showAdd && (
          <AddLeadModal onClose={() => setShowAdd(false)} onSave={saveLead} />
        )}
      </main>
    </div>
  );
}
