import { useEffect, useState } from "react";
import { PageHead } from "../Sidebar.jsx";

function Pager({ page, totalPages, totalItems, pageSize, onPageChange }) {
  return (
    <div className="pager">
      <div className="pager-info">
        Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalItems)} of {totalItems}
      </div>
      <div className="pager-bar">
        <button className="pager-nav" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button key={pageNumber} className={`pager-btn ${page === pageNumber ? "active" : ""}`} onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          );
        })}
        <button className="pager-nav" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

function UserRow({ user, showToast }) {
  const balance = user.balance != null
    ? `RM ${Number(user.balance).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "RM 0.00";

  return (
    <tr key={user.id ?? `${user.full_name}-${user.phone_no}`}>
      <td>
        <div className="strong">{user.full_name ?? "Unnamed user"}</div>
        <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>
          {user.email ?? "No email"}
        </div>
      </td>
      <td>{user.phone_no ?? "—"}</td>
      <td>{user.tier ?? "—"}</td>
      <td>{user.total_leads ?? 0}</td>
      <td className="strong">{balance}</td>
      <td>
        <span
          style={{ color: "var(--orange)", cursor: "pointer" }}
          onClick={() => showToast(`Edit ${user.full_name ?? "user"}`)}
        >
          Edit →
        </span>
      </td>
    </tr>
  );
}

function ReferrersTable({
  users,
  totalUsers,
  page,
  totalPages,
  pageSize,
  onPageChange,
  showToast,
}) {
  return (
    <>
      <div className="section-title">Referrers</div>
      <table className="tbl">
        <thead>
          <tr><th>Name / Email</th><th>Phone</th><th>Tier</th><th>Total Leads</th><th>Balance</th><th></th></tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id ?? `${user.full_name}-${user.phone_no}`} user={user} showToast={showToast} />
          ))}
        </tbody>
      </table>
      {totalUsers > pageSize && (
        <Pager
          page={page}
          totalPages={totalPages}
          totalItems={totalUsers}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}

function PartnerRow({ partner, formatMonthYear, showToast }) {
  return (
    <tr key={partner.id ?? partner.company_name}>
      <td>
        <div className="strong">
          {partner.company_name ?? "Unnamed company"}
        </div>
        <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>
          {partner.owner_name ?? "—"}
        </div>
      </td>
      <td>{partner.industry ?? "—"}</td>
      <td>
        {partner.status}
        <span className="muted">&nbsp;</span>
      </td>
      <td className="muted">{formatMonthYear(partner.joined_at)}</td>
      <td>
        <span
          style={{ color: "var(--orange)", cursor: "pointer" }}
          onClick={() => showToast(`${partner.company_name ?? "Partner"} edited`)}
        >
          Approved →
        </span>
      </td>
    </tr>
  );
}

function PartnersTable({
  partners,
  totalPartners,
  page,
  totalPages,
  pageSize,
  onPageChange,
  showToast,
}) {
  const formatMonthYear = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString(undefined, { month: "short", year: "numeric" });
  };

  return (
    <>
      <div className="section-title" style={{ marginTop: 24 }}>Partners</div>
      <table className="tbl">
        <thead>
          <tr><th>Company / Contact</th><th>Services</th><th>Approval</th><th>Joined</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {partners.map((partner) => (
            <PartnerRow
              key={partner.id ?? partner.company_name}
              partner={partner}
              formatMonthYear={formatMonthYear}
              showToast={showToast}
            />
          ))}
        </tbody>
      </table>
      {totalPartners > pageSize && (
        <Pager
          page={page}
          totalPages={totalPages}
          totalItems={totalPartners}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}

export default function UsersTab({ ethicalUsers, ethicalPartners, showToast }) {
  const [usersTab, setUsersTab] = useState("All");
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPagePartners, setCurrentPagePartners] = useState(1);
  const pageSize = usersTab === "Referrers" ? 10 : 5;
  const totalPagesUsers = Math.max(
    1,
    Math.ceil(ethicalUsers.length / pageSize),
  );
  const totalPagesPartners = Math.max(
    1,
    Math.ceil(ethicalPartners.length / pageSize),
  );

  useEffect(() => {
    setCurrentPageUsers(1);
    setCurrentPagePartners(1);
  }, [usersTab]);

  useEffect(() => {
    if (currentPageUsers > totalPagesUsers) setCurrentPageUsers(totalPagesUsers);
  }, [currentPageUsers, totalPagesUsers]);

  useEffect(() => {
    if (currentPagePartners > totalPagesPartners) setCurrentPagePartners(totalPagesPartners);
  }, [currentPagePartners, totalPagesPartners]);

  const pagedUsers = ethicalUsers.slice(
    (currentPageUsers - 1) * pageSize,
    currentPageUsers * pageSize,
  );
  const pagedPartners = ethicalPartners.slice(
    (currentPagePartners - 1) * pageSize,
    currentPagePartners * pageSize,
  );

  return (
    <>
      <PageHead title="Users" sub="Manage referrers and partners on the platform." />
      <div className="ftabs">
        {["All", "Referrers", "Partners"].map((tab) => (
          <button
            key={tab}
            className={`ftab ${usersTab === tab ? "active" : ""}`}
            onClick={() => setUsersTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {(usersTab === "All" || usersTab === "Referrers") && (
        <ReferrersTable
          users={pagedUsers}
          totalUsers={ethicalUsers.length}
          page={currentPageUsers}
          totalPages={totalPagesUsers}
          pageSize={pageSize}
          onPageChange={setCurrentPageUsers}
          showToast={showToast}
        />
      )}
      {(usersTab === "All" || usersTab === "Partners") && (
        <PartnersTable
          partners={pagedPartners}
          totalPartners={ethicalPartners.length}
          page={currentPagePartners}
          totalPages={totalPagesPartners}
          pageSize={pageSize}
          onPageChange={setCurrentPagePartners}
          showToast={showToast}
        />
      )}
    </>
  );
}
