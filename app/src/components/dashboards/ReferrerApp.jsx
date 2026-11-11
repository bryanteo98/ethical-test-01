import { useEffect, useState } from "react";
import Sidebar, { Bell } from "../Sidebar.jsx";
import Field from "../Field.jsx";
import { I } from "../Icons.jsx";
import { getEthicalLeadsByReferrer } from "../api/getData.js";
import { createEthicalLead } from "../api/setData.js";
import DashboardTab from "../referrer/DashboardTab.jsx";
import LeadsTab from "../referrer/LeadsTab.jsx";
import HistoryTab from "../referrer/HistoryTab.jsx";
import SettingsTab from "../referrer/SettingsTab.jsx";

function parseLeadDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toLeadViewModel(lead) {
  const joinedAt =
    [lead.joined_at, lead.created_at, lead.submitted_at]
      .map(parseLeadDate)
      .find(Boolean) ?? null;

  return {
    client: lead.full_name,
    company: lead.company,
    svc: lead.service_category,
    partner: lead.partner_name || "—",
    status: String(lead.status || "pending").toLowerCase(),
    joinedAt,
    date: joinedAt ? joinedAt.toLocaleDateString("en-GB") : "—",
  };
}

function AddLeadModal({ onClose, onSave, isSaving }) {
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
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            className="action primary"
            style={{ flex: 1 }}
            onClick={() => {
              if (client.trim() && company.trim() && svc.trim()) {
                onSave({ client, company, svc });
              }
            }}
            disabled={isSaving}
          >
            {isSaving ? "Submitting..." : "Submit"}
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
  const [leads, setLeads] = useState([]);
  const [isSavingLead, setIsSavingLead] = useState(false);
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

  useEffect(() => {
    let isCurrent = true;

    const fetchLeads = async () => {
      if (currentUser?.id == null) {
        setLeads([]);
        return;
      }

      try {
        const records = await getEthicalLeadsByReferrer(currentUser.id);
        if (isCurrent) setLeads((records ?? []).map(toLeadViewModel));
      } catch (error) {
        console.error("Failed to fetch referrer leads:", error);
        if (isCurrent) {
          setLeads([]);
          showToast(error.message || "Unable to load your leads");
        }
      }
    };

    fetchLeads();
    return () => {
      isCurrent = false;
    };
  }, [currentUser?.id, showToast]);

  const openAddLead = () => setShowAdd(true);
  const saveLead = async ({ client, company, svc }) => {
    setIsSavingLead(true);
    try {
      const savedLead = await createEthicalLead({
        referrerId: currentUser?.id,
        fullName: client,
        company,
        serviceCategory: svc,
      });
      setLeads((currentLeads) => [toLeadViewModel(savedLead), ...currentLeads]);
      setShowAdd(false);
      showToast("Lead submitted — pending verification");
    } catch (error) {
      console.error("Failed to submit referrer lead:", error);
      showToast(error.message || "Unable to submit lead");
    } finally {
      setIsSavingLead(false);
    }
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
          <AddLeadModal
            onClose={() => setShowAdd(false)}
            onSave={saveLead}
            isSaving={isSavingLead}
          />
        )}
      </main>
    </div>
  );
}
