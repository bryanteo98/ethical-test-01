/* ───────── Dashboards: Referrer / Partner / Admin ─────────
   Loaded as a separate babel file. Components attached to window. */

const { useState: useStateD, useEffect: useEffectD, useMemo: useMemoD } = React;

/* tiny inline icons */
const I = {
  grid: ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="0.5" y="0.5" width="5.5" height="5.5" stroke="currentColor"/><rect x="8" y="0.5" width="5.5" height="5.5" stroke="currentColor"/><rect x="0.5" y="8" width="5.5" height="5.5" stroke="currentColor"/><rect x="8" y="8" width="5.5" height="5.5" stroke="currentColor"/></svg>,
  swap: ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 4h11M9 1l3 3-3 3M13 10H2M5 13l-3-3 3-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  hist: ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor"/><path d="M7 3v4l2.5 2" stroke="currentColor" strokeLinecap="round"/></svg>,
  cog:  ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="currentColor"/><path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.8 2.8l1.4 1.4M9.8 9.8l1.4 1.4M2.8 11.2l1.4-1.4M9.8 4.2l1.4-1.4" stroke="currentColor"/></svg>,
  doc:  ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 1h6L11.5 4v9h-9z" stroke="currentColor"/><path d="M8.5 1v3h3" stroke="currentColor"/></svg>,
  user: ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="currentColor"/><path d="M2 13c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor"/></svg>,
  cash: ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="0.5" y="2.5" width="13" height="9" stroke="currentColor"/><circle cx="7" cy="7" r="2" stroke="currentColor"/></svg>,
  tag:  ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1h6l6 6-6 6-6-6V1z" stroke="currentColor"/><circle cx="4" cy="4" r="1" stroke="currentColor"/></svg>,
  out:  ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 1H1v12h8M5 7h8M10 4l3 3-3 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  bell: ()=> <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a4 4 0 0 0-4 4v3l-1 2h10l-1-2v-3a4 4 0 0 0-4-4z" stroke="currentColor" strokeLinejoin="round"/><path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" stroke="currentColor"/></svg>,
  eye:  ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" stroke="currentColor"/><circle cx="7" cy="7" r="1.5" stroke="currentColor"/></svg>,
  edit: ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11l-1 2 2-1 8-8-1-1-8 8z" stroke="currentColor" strokeLinejoin="round"/></svg>,
  arrow:()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  trophy:()=>(<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M9 5h10v6a5 5 0 0 1-10 0V5z" stroke="currentColor"/><path d="M9 7H6c0 3 2 4 3 4M19 7h3c0 3-2 4-3 4M11 18v3h6v-3M9 23h10" stroke="currentColor"/></svg>),
  download:()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M3 6l4 3 4-3M1 12h12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  plus: ()=> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};

const StatusPill = ({status}) => (
  <span className={`status ${status}`}>{status}</span>
);

/* Sidebar shell shared by 3 roles */
const Sidebar = ({nav, active, onNav, user, onSignOut}) => (
  <aside className="sidebar">
    <div className="sb-brand">
      <div className="logo-row" style={{textDecoration:'none'}}>
        <Asterisk size={16} color="var(--orange)"/>
        <span className="logo-word">Ethical</span>
      </div>
      <div className="more-than">More than a network</div>
    </div>
    <div className="sb-user">
      <div className="sb-avatar">{user.initial}</div>
      <div>
        <div className="nm">{user.name}</div>
        <div className="role">{user.role}</div>
      </div>
      {user.tier && <div className="tier">{user.tier}</div>}
    </div>
    <nav className="sb-nav">
      {nav.map((it,i)=>(
        <div key={it.id}
             className={`sb-item ${active===it.id?'active':''}`}
             onClick={()=>onNav(it.id)}>
          <div className="num">{String(i+1).padStart(2,'0')}</div>
          <div className="ic">{it.icon()}</div>
          <div>{it.label}</div>
        </div>
      ))}
    </nav>
    <div className="sb-signout" onClick={onSignOut}>
      <div style={{width:40, textAlign:'center'}}><I.out/></div>
      Sign Out
    </div>
  </aside>
);

const PageHead = ({title, sub, right}) => (
  <div className="page-head">
    <div>
      <h1 className="page-title">{title}</h1>
      <p className="page-sub">{sub}</p>
    </div>
    {right}
  </div>
);

const Bell = ({count}) => (
  <div style={{position:'absolute', top:18, right:32, cursor:'pointer'}}>
    <div style={{
      width:36, height:36, background:'var(--cream-2)', color:'var(--dark)',
      display:'grid', placeItems:'center',
      clipPath:'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
      position:'relative',
    }}>
      <I.bell/>
      {count>0 && (
        <span style={{
          position:'absolute', top:-6, right:-10,
          background:'var(--orange)', color:'var(--cream)',
          font:'700 9px/1 Manrope, sans-serif', padding:'3px 5px',
          minWidth:16, textAlign:'center',
        }}>{count}</span>
      )}
    </div>
  </div>
);

/* ═════════════ REFERRER DASHBOARD ═════════════ */
const ReferrerApp = ({onSignOut, showToast}) => {
  const [active, setActive] = useStateD('dashboard');
  const [filter, setFilter] = useStateD('All');
  const [showAdd, setShowAdd] = useStateD(false);
  const [search, setSearch] = useStateD('');
  const [leads, setLeads] = useStateD([
    {client:'Razif Hakim', company:'BizTech Solutions', svc:'IT Consulting', partner:'TechVision Sdn Bhd', status:'completed', date:'10/10/2024'},
    {client:'Farah Liana', company:'Global Traders Sdn', svc:'Corporate Law', partner:'LexPro Legal', status:'ongoing', date:'10/10/2024'},
    {client:'Melissa Wong', company:'Crystal Events', svc:'IT Consulting', partner:'—', status:'pending', date:'10/10/2024'},
    {client:'Ahmad Test', company:'Demo Corp', svc:'Financial Planning', partner:'—', status:'verified', date:'10/10/2024'},
  ]);

  const nav = [
    {id:'dashboard', label:'Dashboard', icon: I.grid},
    {id:'leads',     label:'My Leads',  icon: I.swap},
    {id:'history',   label:'History',   icon: I.hist},
    {id:'settings',  label:'Settings',  icon: I.cog},
  ];

  const user = {name:'Ahmad Rizal', role:'referrer', initial:'A', tier:'GOLD'};

  const visible = leads.filter(l => filter==='All' || l.status===filter.toLowerCase())
                       .filter(l => !search || (l.client+l.company+l.svc).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app">
      <Sidebar nav={nav} active={active} onNav={setActive} user={user} onSignOut={onSignOut}/>
      <main className="main">
        <Bell count={2}/>
        {active==='dashboard' && (
          <>
            <PageHead title="Overview" sub="Welcome back, Ahmad."/>
            <div className="stat-grid">
              <div className="card"><div className="lbl">Total Assets</div><div className="val">RM 8,750.00</div><div className="ftr">All time</div></div>
              <div className="card"><div className="lbl">Total Leads</div><div className="val">14</div><div className="ftr">Referrals made</div></div>
              <div className="card"><div className="lbl">Quarterly Earnings</div><div className="val">RM 5,500.00</div><div className="ftr">This quarter</div></div>
              <div className="card"><div className="lbl">Quarterly Referrals</div><div className="val">11</div><div className="ftr">This quarter</div></div>
            </div>
            <div className="action-row">
              <button className="action primary" onClick={()=>setShowAdd(true)}><I.plus/> Add New Lead</button>
              <button className="action" onClick={()=>showToast('Withdrawal request — RM 5,500 (demo)')}><I.download/> Withdraw</button>
              <button className="action" onClick={()=>{setActive('leads'); setFilter('Ongoing');}}><I.eye/> Check Ongoing</button>
            </div>
            <div className="banner">
              <div className="ic"><I.trophy/></div>
              <div>
                <div className="ttl">Gold Tier Achieved!</div>
                <div className="dsc">Enjoy 60% referrer fee payout on all completed leads.</div>
              </div>
              <div className="dotted"></div>
              <div className="pill">60% rate</div>
            </div>
            <div className="section-title">Recent Leads</div>
            <table className="tbl">
              <thead><tr><th>Client</th><th>Company</th><th>Service</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {leads.slice(0,3).map((l,i)=>(
                  <tr key={i}>
                    <td className="strong">{l.client}</td>
                    <td>{l.company}</td>
                    <td>{l.svc}</td>
                    <td><StatusPill status={l.status}/></td>
                    <td className="muted">{l.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {active==='leads' && (
          <>
            <PageHead title="My Leads" sub="All your submitted referrals."
              right={<button className="action primary" style={{padding:'10px 24px'}} onClick={()=>setShowAdd(true)}><I.plus/> Add New Lead</button>}/>
            <div className="toolbar">
              <div className="ftabs">
                {['All','Pending','Verified','Ongoing','Completed'].map(t=>(
                  <button key={t} className={`ftab ${filter===t?'active':''}`} onClick={()=>setFilter(t)}>{t}</button>
                ))}
              </div>
              <div className="search">
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search leads..."/>
              </div>
            </div>
            <table className="tbl">
              <thead><tr><th>Client & Company</th><th>Service Needed</th><th>Assigned Partner</th><th>Status</th><th>Submitted</th></tr></thead>
              <tbody>
                {visible.map((l,i)=>(
                  <tr key={i}>
                    <td><div className="strong">{l.client}</div><div className="muted" style={{marginTop:4, fontSize:11}}>{l.company}</div></td>
                    <td>{l.svc}</td>
                    <td className="muted">{l.partner}</td>
                    <td><StatusPill status={l.status}/></td>
                    <td className="muted">{l.date}</td>
                  </tr>
                ))}
                {visible.length===0 && <tr><td colSpan="5" className="muted" style={{textAlign:'center', padding:32}}>No leads match this filter.</td></tr>}
              </tbody>
            </table>
          </>
        )}

        {active==='history' && (
          <>
            <PageHead title="History" sub="Closed referrals and earnings ledger."/>
            <table className="tbl">
              <thead><tr><th>Client</th><th>Service</th><th>Earnings</th><th>Date</th></tr></thead>
              <tbody>
                <tr><td className="strong">Razif Hakim</td><td>IT Consulting</td><td>RM 1,500.00</td><td className="muted">10/10/2024</td></tr>
                <tr><td className="strong">Lim Chong</td><td>Software Dev</td><td>RM 2,200.00</td><td className="muted">02/09/2024</td></tr>
                <tr><td className="strong">Nina Yap</td><td>Corporate Law</td><td>RM 1,800.00</td><td className="muted">22/08/2024</td></tr>
              </tbody>
            </table>
          </>
        )}

        {active==='settings' && (
          <>
            <PageHead title="Settings" sub="Update your profile and payout details."/>
            <div className="detail-card">
              <div className="detail-card-head">Profile</div>
              <div className="detail-card-body">
                <div className="detail-row"><div className="k">Full Name</div><div className="v">Ahmad Rizal</div></div>
                <div className="detail-row"><div className="k">Email</div><div className="v">ahmad@demo.com</div></div>
                <div className="detail-row"><div className="k">Phone</div><div className="v">0123456789</div></div>
                <div className="detail-row"><div className="k">Tier</div><div className="v">Gold (60%)</div></div>
                <div className="detail-row"><div className="k">Bank</div><div className="v">Maybank · ****8821</div></div>
              </div>
            </div>
          </>
        )}

        {showAdd && (
          <AddLeadModal onClose={()=>setShowAdd(false)} onSave={(lead)=>{
            setLeads([{...lead, status:'pending', date:new Date().toLocaleDateString('en-GB'), partner:'—'}, ...leads]);
            setShowAdd(false);
            showToast('Lead submitted — pending verification');
          }}/>
        )}
      </main>
    </div>
  );
};

const AddLeadModal = ({onClose, onSave}) => {
  const [client, setClient] = useStateD('');
  const [company, setCompany] = useStateD('');
  const [svc, setSvc] = useStateD('');
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3>Add New Lead</h3>
        <p style={{marginTop:6, color:'var(--muted)', font:'400 13px/1.4 Manrope, sans-serif'}}>Submit a new referral for verification.</p>
        <div style={{marginTop:18}}>
          <Field label="Client Name" value={client} onChange={setClient} placeholder="Razif Hakim" required/>
          <Field label="Company" value={company} onChange={setCompany} placeholder="BizTech Solutions" required/>
          <Field label="Service Needed" value={svc} onChange={setSvc} placeholder="IT Consulting" required/>
        </div>
        <div style={{display:'flex', gap:12, marginTop:24}}>
          <button className="action" style={{flex:1, background:'transparent', border:'1px solid var(--dark)'}} onClick={onClose}>Cancel</button>
          <button className="action primary" style={{flex:1}}
            onClick={()=>{ if(client && company && svc) onSave({client, company, svc}); }}>Submit</button>
        </div>
      </div>
    </div>
  );
};

/* ═════════════ PARTNER DASHBOARD ═════════════ */
const PartnerApp = ({onSignOut, showToast}) => {
  const [active, setActive] = useStateD('dashboard');
  const [selected, setSelected] = useStateD(0);
  const [filter, setFilter] = useStateD('All');

  const nav = [
    {id:'dashboard', label:'Dashboard',      icon: I.grid},
    {id:'leads',     label:'Assigned Leads', icon: I.swap},
    {id:'invoices',  label:'Invoices',       icon: I.cash},
    {id:'settings',  label:'Settings',       icon: I.cog},
  ];
  const user = {name:'TechVision Sdn Bhd', role:'Partner', initial:'T'};

  const leads = [
    {client:'Razif Hakim', company:'BizTech Solutions', email:'razif@biztech.my', svc:'IT Consulting', referrer:'Ahmad Rizal', status:'completed', date:'10/10/2024', detail:'Lorem Ipsum is simply dummy text…'},
    {client:'Farah Liana', company:'Global Traders Sdn Bhd', email:'farah@globaltraders.my', svc:'Corporate Law', referrer:'Ahmad Rizal', status:'ongoing', date:'10/10/2024', detail:'Lorem Ipsum is simply dummy text…'},
    {client:'Lim Chong', company:'Crystal Events', email:'lim@crystal.my', svc:'Software Dev', referrer:'Siti Nora', status:'ongoing', date:'12/11/2024', detail:'Custom CRM build for events business.'},
  ];
  const visible = leads.filter(l => filter==='All' || l.status===filter.toLowerCase());

  return (
    <div className="app">
      <Sidebar nav={nav} active={active} onNav={setActive} user={user} onSignOut={onSignOut}/>
      <main className="main">
        <Bell count={1}/>
        {active==='dashboard' && (
          <>
            <PageHead title="Overview" sub="Welcome back, Partner."/>
            <div className="stat-grid">
              <div className="card"><div className="lbl">Assigned Leads</div><div className="val">3</div><div className="ftr">Active assignments</div></div>
              <div className="card"><div className="lbl">Need Response</div><div className="val orange">2</div><div className="ftr">Incoming leads</div></div>
              <div className="card"><div className="lbl">Ongoing</div><div className="val">1</div><div className="ftr">Processing</div></div>
              <div className="card"><div className="lbl">Completed</div><div className="val">1</div><div className="ftr">Successfully closed</div></div>
            </div>
            <div className="action-row" style={{gridTemplateColumns:'1fr 1fr'}}>
              <button className="action" onClick={()=>setActive('leads')}><I.user/> Assigned Leads — view & manage all leads</button>
              <button className="action" onClick={()=>setActive('invoices')}><I.doc/> Invoices — fees requests & submissions</button>
            </div>
            <div className="section-title">Active Assigned Leads</div>
            <table className="tbl">
              <thead><tr><th>Client</th><th>Details</th><th>Referred By</th><th>Status</th><th>Assigned</th></tr></thead>
              <tbody>
                {leads.map((l,i)=>(
                  <tr key={i}>
                    <td><div className="strong">{l.client}</div><div className="muted" style={{marginTop:4, fontSize:11}}>{l.company}</div></td>
                    <td className="muted">{l.detail}</td>
                    <td>{l.referrer}</td>
                    <td><StatusPill status={l.status}/></td>
                    <td className="muted">{l.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="detail-card-head" style={{marginTop:32}}>Company Documents</div>
            <div className="doc-row">
              <div className="doc" onClick={()=>showToast('Downloading Company Profile…')}>Company Profile</div>
              <div className="doc" onClick={()=>showToast('Downloading Brand Guidelines…')}>Brand Guidelines</div>
              <div className="doc" onClick={()=>showToast('Downloading Referrer Playbook…')}>Referrer Playbook</div>
            </div>
          </>
        )}

        {active==='leads' && (
          <>
            <PageHead title="Assigned Leads" sub="Review and manage leads assigned to your organisation."/>
            <div className="ftabs">
              {['All','Accepted','Ongoing','Completed','Declined'].map(t=>(
                <button key={t} className={`ftab ${filter===t?'active':''}`} onClick={()=>setFilter(t)}>{t}</button>
              ))}
            </div>
            <table className="tbl">
              <thead><tr><th>Client & Company</th><th>Service</th><th>Referrer</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {visible.map((l,i)=>{
                  const idx = leads.indexOf(l);
                  return (
                    <tr key={i} onClick={()=>setSelected(idx)} style={{cursor:'pointer', background: selected===idx?'rgba(255,85,0,0.06)':undefined}}>
                      <td><div className="strong">{l.client}</div><div className="muted" style={{marginTop:4, fontSize:11}}>{l.company}</div></td>
                      <td>{l.svc}</td>
                      <td>{l.referrer}</td>
                      <td><StatusPill status={l.status}/></td>
                      <td><span style={{color:'var(--orange)', cursor:'pointer'}}><I.eye/> &nbsp;<I.edit/></span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="detail-card">
              <div className="detail-card-head">Lead Detail — {leads[selected].client}</div>
              <div className="detail-card-body">
                <div className="detail-row"><div className="k">Client</div><div className="v">{leads[selected].client}</div></div>
                <div className="detail-row"><div className="k">Company</div><div className="v">{leads[selected].company}</div></div>
                <div className="detail-row"><div className="k">Email</div><div className="v">{leads[selected].email}</div></div>
                <div className="detail-row"><div className="k">Service</div><div className="v">{leads[selected].svc}</div></div>
                <div className="detail-row"><div className="k">Status</div><div className="v"><StatusPill status={leads[selected].status}/></div></div>
                <button className="action primary" style={{marginTop:16, width:'auto', padding:'12px 24px'}}
                  onClick={()=>showToast('Invoice draft generated for ' + leads[selected].client)}>
                  <I.doc/> Generate Invoice — fees submission
                </button>
              </div>
            </div>
          </>
        )}

        {active==='invoices' && (
          <>
            <PageHead title="Invoices" sub="Fee requests and submission history."/>
            <table className="tbl">
              <thead><tr><th>Invoice #</th><th>Lead</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                <tr><td className="strong">INV-1042</td><td>Razif Hakim</td><td>RM 4,500.00</td><td><StatusPill status="completed"/></td><td className="muted">10/10/2024</td></tr>
                <tr><td className="strong">INV-1043</td><td>Farah Liana</td><td>RM 6,800.00</td><td><StatusPill status="submitted"/></td><td className="muted">22/11/2024</td></tr>
              </tbody>
            </table>
          </>
        )}

        {active==='settings' && (
          <>
            <PageHead title="Settings" sub="Organisation profile and contact details."/>
            <div className="detail-card">
              <div className="detail-card-head">Organisation</div>
              <div className="detail-card-body">
                <div className="detail-row"><div className="k">Company</div><div className="v">TechVision Sdn Bhd</div></div>
                <div className="detail-row"><div className="k">Contact</div><div className="v">David Lim</div></div>
                <div className="detail-row"><div className="k">Email</div><div className="v">partner@demo.com</div></div>
                <div className="detail-row"><div className="k">Services</div><div className="v">IT Consulting · Software Dev</div></div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

/* ═════════════ ADMIN DASHBOARD ═════════════ */
const AdminApp = ({onSignOut, showToast}) => {
  const [active, setActive] = useStateD('overview');
  const [usersTab, setUsersTab] = useStateD('All');

  const nav = [
    {id:'overview',    label:'Overview',    icon: I.grid},
    {id:'users',       label:'Users',       icon: I.user},
    {id:'leads',       label:'Leads',       icon: I.swap},
    {id:'invoices',    label:'Invoices',    icon: I.doc},
    {id:'vouchers',    label:'Vouchers',    icon: I.tag},
    {id:'withdrawals', label:'Withdrawals', icon: I.cash},
    {id:'settings',    label:'Settings',    icon: I.cog},
  ];
  const user = {name:'Admin', role:'Administrator', initial:'A'};

  // chart points
  const chartPts = useMemoD(()=>[10,18,16,28,32,26,40,38,46,52,48,58,54,62],[]);
  const chartW = 600, chartH = 100;
  const max = Math.max(...chartPts);
  const path = chartPts.map((v,i)=>{
    const x = (i/(chartPts.length-1))*chartW;
    const y = chartH - (v/max)*chartH;
    return `${i===0?'M':'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="app">
      <Sidebar nav={nav} active={active} onNav={setActive} user={user} onSignOut={onSignOut}/>
      <main className="main">
        <Bell count={3}/>
        {active==='overview' && (
          <>
            <PageHead title="Platform Overview" sub="Welcome back, Admin."/>
            <div className="stat-grid">
              <div className="card"><div className="lbl">Total Referrers</div><div className="val">120</div><div className="ftr">Registered</div></div>
              <div className="card"><div className="lbl">Active Partners</div><div className="val">8</div><div className="ftr">Vetted & approved</div></div>
              <div className="card"><div className="lbl">Total Leads</div><div className="val">1200</div><div className="ftr">All time</div></div>
              <div className="card"><div className="lbl">Revenue Distributed</div><div className="val">RM 9,250</div><div className="ftr">All time</div></div>
            </div>

            <div style={{margin:'16px 0'}}>
              <div className="action-required" onClick={()=>{setActive('leads'); showToast('Showing leads awaiting verification');}}>
                <I.user/>
                <div>
                  <div className="lbl">Action Required</div>
                  <div className="msg">1 lead awaiting verification</div>
                </div>
                <div className="arr"><I.arrow/></div>
              </div>
              <div className="action-required" onClick={()=>{setActive('leads'); showToast('Showing verified leads awaiting partner');}}>
                <I.user/>
                <div>
                  <div className="lbl">Action Required</div>
                  <div className="msg">1 verified lead awaiting partner assignment</div>
                </div>
                <div className="arr"><I.arrow/></div>
              </div>
            </div>

            <div className="breakdown">
              <div className="breakdown-head">
                <div>Lead Status Breakdown</div><div>Revenue</div>
              </div>
              <div className="breakdown-body">
                <div className="bd-stats">
                  <div><div className="bd-stat-num orange">1</div><div className="bd-stat-lbl">Pending</div></div>
                  <div><div className="bd-stat-num">403</div><div className="bd-stat-lbl">Verified</div></div>
                  <div><div className="bd-stat-num">18</div><div className="bd-stat-lbl">Ongoing</div></div>
                  <div><div className="bd-stat-num">385</div><div className="bd-stat-lbl">Completed</div></div>
                </div>
                <div className="chart">
                  <svg viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
                    {Array.from({length:14}).map((_,i)=>(<line key={i} x1={(i/13)*chartW} y1="0" x2={(i/13)*chartW} y2={chartH} stroke="rgba(243,243,233,0.05)"/>))}
                    <path d={path} fill="none" stroke="var(--orange)" strokeWidth="2"/>
                    <path d={`${path} L${chartW},${chartH} L0,${chartH} Z`} fill="rgba(255,85,0,0.1)"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="section-title" style={{marginTop:24}}>Recent Activity</div>
            <table className="tbl">
              <thead><tr><th>Lead / Client</th><th>Action</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td><div className="strong">Razif Hakim</div><div className="muted" style={{fontSize:11, marginTop:4}}>BizTech Solutions</div></td><td>Lead Completed</td><td className="muted">20 Nov 2025</td><td><StatusPill status="completed"/></td><td><span style={{color:'var(--cream)', opacity:0.6, cursor:'pointer'}}><I.eye/> <I.edit/></span></td></tr>
                <tr><td><div className="strong">Farah Liana</div><div className="muted" style={{fontSize:11, marginTop:4}}>Global Traders</div></td><td>Invoice Submitted</td><td className="muted">10 Dec 2025</td><td><StatusPill status="submitted"/></td><td><span style={{color:'var(--cream)', opacity:0.6, cursor:'pointer'}}><I.eye/> <I.edit/></span></td></tr>
                <tr><td><div className="strong">Melissa Wong</div><div className="muted" style={{fontSize:11, marginTop:4}}>Crystal Events</div></td><td>New Lead</td><td className="muted">15 Dec 2025</td><td><StatusPill status="pending"/></td><td><span style={{color:'var(--cream)', opacity:0.6, cursor:'pointer'}}><I.eye/> <I.edit/></span></td></tr>
              </tbody>
            </table>
          </>
        )}

        {active==='users' && (
          <>
            <PageHead title="Users" sub="Manage referrers and partners on the platform."/>
            <div className="ftabs">
              {['All','Referrers','Partners'].map(t=>(
                <button key={t} className={`ftab ${usersTab===t?'active':''}`} onClick={()=>setUsersTab(t)}>{t}</button>
              ))}
            </div>
            {(usersTab==='All' || usersTab==='Referrers') && <>
              <div className="section-title">Referrers</div>
              <table className="tbl">
                <thead><tr><th>Name / Email</th><th>Phone</th><th>Tier</th><th>Total Leads</th><th>Balance</th><th></th></tr></thead>
                <tbody>
                  <tr><td><div className="strong">Ahmad Rizal</div><div className="muted" style={{fontSize:11, marginTop:4}}>ahmad@demo.com</div></td><td>0123456789</td><td>Gold</td><td>14</td><td className="strong">RM 8,750.00</td><td><span style={{color:'var(--orange)', cursor:'pointer'}} onClick={()=>showToast('Edit Ahmad Rizal')}>Edit →</span></td></tr>
                  <tr><td><div className="strong">Siti Nora</div><div className="muted" style={{fontSize:11, marginTop:4}}>siti@demo.com</div></td><td>0129876543</td><td>Silver</td><td>4</td><td className="strong">RM 1,200.00</td><td><span style={{color:'var(--orange)', cursor:'pointer'}} onClick={()=>showToast('Edit Siti Nora')}>Edit →</span></td></tr>
                </tbody>
              </table>
            </>}
            {(usersTab==='All' || usersTab==='Partners') && <>
              <div className="section-title" style={{marginTop:24}}>Partners</div>
              <table className="tbl">
                <thead><tr><th>Company / Contact</th><th>Services</th><th>Approval</th><th>Joined</th><th>Actions</th></tr></thead>
                <tbody>
                  <tr><td><div className="strong">TechVision Sdn Bhd</div><div className="muted" style={{fontSize:11, marginTop:4}}>David Lim</div></td><td>IT Consulting, Software Dev</td><td><StatusPill status="approved"/></td><td className="muted">10 Dec 2025</td><td><span style={{color:'var(--orange)', cursor:'pointer'}}>Edit →</span></td></tr>
                  <tr><td><div className="strong">LexPro Legal Associates</div><div className="muted" style={{fontSize:11, marginTop:4}}>Priya Sharma</div></td><td>Corporate Law, Compliance</td><td><StatusPill status="approved"/></td><td className="muted">10 Dec 2025</td><td><span style={{color:'var(--orange)', cursor:'pointer'}}>Edit →</span></td></tr>
                  <tr><td><div className="strong">FinanceWise Advisory</div><div className="muted" style={{fontSize:11, marginTop:4}}>Kevin Tan</div></td><td>Financial Planning, Tax</td><td><StatusPill status="pending"/></td><td className="muted">10 Dec 2025</td><td><span style={{color:'var(--orange)', cursor:'pointer'}} onClick={()=>showToast('FinanceWise Advisory approved')}>Approve →</span></td></tr>
                </tbody>
              </table>
            </>}
          </>
        )}

        {active==='leads' && (
          <>
            <PageHead title="Leads" sub="All leads across the platform."/>
            <table className="tbl">
              <thead><tr><th>Client</th><th>Referrer</th><th>Partner</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                <tr><td className="strong">Razif Hakim</td><td>Ahmad Rizal</td><td>TechVision</td><td><StatusPill status="completed"/></td><td className="muted">10/10/2024</td></tr>
                <tr><td className="strong">Farah Liana</td><td>Ahmad Rizal</td><td>LexPro Legal</td><td><StatusPill status="ongoing"/></td><td className="muted">10/10/2024</td></tr>
                <tr><td className="strong">Melissa Wong</td><td>Siti Nora</td><td>—</td><td><StatusPill status="pending"/></td><td className="muted">10/10/2024</td></tr>
              </tbody>
            </table>
          </>
        )}

        {active==='invoices' && (
          <>
            <PageHead title="Invoices" sub="Fee submissions from partners."/>
            <table className="tbl">
              <thead><tr><th>Invoice</th><th>Partner</th><th>Lead</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td className="strong">INV-1042</td><td>TechVision Sdn Bhd</td><td>Razif Hakim</td><td>RM 4,500.00</td><td><StatusPill status="completed"/></td></tr>
                <tr><td className="strong">INV-1043</td><td>LexPro Legal</td><td>Farah Liana</td><td>RM 6,800.00</td><td><StatusPill status="submitted"/></td></tr>
              </tbody>
            </table>
          </>
        )}

        {active==='vouchers' && (
          <>
            <PageHead title="Vouchers" sub="Promotional codes and incentives."/>
            <table className="tbl">
              <thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Used / Cap</th><th>Expires</th></tr></thead>
              <tbody>
                <tr><td className="strong">WELCOME50</td><td>Referrer Boost</td><td>+5%</td><td>22 / 100</td><td className="muted">31 Mar 2026</td></tr>
                <tr><td className="strong">PARTNER-Q1</td><td>Partner Bonus</td><td>RM 500</td><td>4 / 20</td><td className="muted">30 Apr 2026</td></tr>
              </tbody>
            </table>
          </>
        )}

        {active==='withdrawals' && (
          <>
            <PageHead title="Withdrawals" sub="Pending and processed payouts."/>
            <table className="tbl">
              <thead><tr><th>Referrer</th><th>Amount</th><th>Bank</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td className="strong">Ahmad Rizal</td><td>RM 5,500.00</td><td>Maybank ****8821</td><td><StatusPill status="pending"/></td><td><span style={{color:'var(--orange)', cursor:'pointer'}} onClick={()=>showToast('Withdrawal approved')}>Approve →</span></td></tr>
                <tr><td className="strong">Siti Nora</td><td>RM 1,200.00</td><td>CIMB ****4412</td><td><StatusPill status="completed"/></td><td className="muted">Done</td></tr>
              </tbody>
            </table>
          </>
        )}

        {active==='settings' && (
          <>
            <PageHead title="Settings" sub="Platform configuration."/>
            <div className="detail-card">
              <div className="detail-card-head">Platform</div>
              <div className="detail-card-body">
                <div className="detail-row"><div className="k">Default Tier</div><div className="v">Silver (40%)</div></div>
                <div className="detail-row"><div className="k">Gold Threshold</div><div className="v">10 closed leads / quarter</div></div>
                <div className="detail-row"><div className="k">Region</div><div className="v">Kuala Lumpur, MY</div></div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

Object.assign(window, { ReferrerApp, PartnerApp, AdminApp });
