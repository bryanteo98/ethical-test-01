import { useEffect, useState } from "react";
import Sidebar, { Bell } from "../Sidebar.jsx";
import { I } from "../Icons.jsx";
import { getAllEthicalUsers, getAllEthicalPartners } from "../api/getData.js";
import OverviewTab from "../admin/OverviewTab.jsx";
import UsersTab from "../admin/UsersTab.jsx";
import LeadsTab from "../admin/LeadsTab.jsx";
import InvoicesTab from "../admin/InvoicesTab.jsx";
import VouchersTab from "../admin/VouchersTab.jsx";
import WithdrawalsTab from "../admin/WithdrawalsTab.jsx";
import SettingsTab from "../admin/SettingsTab.jsx";

export default function AdminApp({ onSignOut, showToast }) {
  const [active, setActive] = useState("overview");
  const [ethicalUsers, setEthicalUsers] = useState([]);
  const [ethicalPartners, setEthicalPartners] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllEthicalUsers();
        setEthicalUsers(users ?? []);
      } catch (error) {
        console.error("Failed to fetch ethical users:", error);
        setEthicalUsers([]);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const partners = await getAllEthicalPartners();
        setEthicalPartners(partners ?? []);
      } catch (error) {
        console.error("Failed to fetch ethical partners:", error);
        setEthicalPartners([]);
      }
    };

    fetchPartners();
  }, []);

  const nav = [
    { id: "overview", label: "Overview", icon: I.grid },
    { id: "users", label: "Users", icon: I.user },
    { id: "leads", label: "Leads", icon: I.swap },
    { id: "invoices", label: "Invoices", icon: I.doc },
    { id: "vouchers", label: "Vouchers", icon: I.tag },
    { id: "withdrawals", label: "Withdrawals", icon: I.cash },
    { id: "settings", label: "Settings", icon: I.cog },
  ];
  const user = { name: "Admin", role: "Administrator", initial: "A" };

  return (
    <div className="app">
      <Sidebar nav={nav} active={active} onNav={setActive} user={user} onSignOut={onSignOut} />
      <main className="main">
        <Bell count={3} />
        {active === "overview" && <OverviewTab onNavigate={setActive} showToast={showToast} />}
        {active === "users" && <UsersTab ethicalUsers={ethicalUsers} ethicalPartners={ethicalPartners} showToast={showToast} />}
        {active === "leads" && <LeadsTab />}
        {active === "invoices" && <InvoicesTab />}
        {active === "vouchers" && <VouchersTab />}
        {active === "withdrawals" && <WithdrawalsTab showToast={showToast} />}
        {active === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}
