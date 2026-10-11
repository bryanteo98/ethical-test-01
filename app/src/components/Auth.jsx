import { useState } from "react";
import Asterisk from "./Asterisk.jsx";
import Field from "./Field.jsx";
import { registerUser, signInUser } from "./api/setData.js";

const ADMIN_LOGIN = {
  email: "admin@gmail.com",
  password: "adminadmin",
  user: { full_name: "Administrator", email: "admin@gmail.com", role: "admin" },
};

export function AuthLeft({ mode, setPage }) {
  return (
    <div className="auth-left">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <a
          href="#"
          className="logo-row"
          onClick={(e) => {
            e.preventDefault();
            setPage("landing");
          }}
        >
          <Asterisk size={16} color="var(--orange)" />
          <span className="logo-word">Ethical</span>
        </a>
        <div className="more-than">More than a network</div>
      </div>

      <div className="heading-block">
        {mode === "login" ? (
          <>
            <h1>
              Welcome <span className="it">back.</span>
            </h1>
            <p className="lede">
              Sign in to manage your referrals, leads and earnings — picking up
              exactly where you left off.
            </p>
          </>
        ) : (
          <>
            <h1>
              Join the <span className="it">network.</span>
            </h1>
            <p className="lede">
              Start referring, start earning. Approval typically within
              48&nbsp;hours.
            </p>
          </>
        )}
      </div>

      {mode === "register" && (
        <div className="tiers">
          {[
            {
              n: "01",
              name: "Silver Tier",
              d: "Start earning referral fees immediately upon approval.",
            },
            {
              n: "02",
              name: "Gold Tier",
              d: "Unlock higher rates by hitting quarterly milestones.",
            },
            {
              n: "03",
              name: "Partner Network",
              d: "Access curated professional services for your clients.",
            },
          ].map((t) => (
            <div className="tier" key={t.n}>
              <div className="num">{t.n}</div>
              <div className="name">{t.name}</div>
              <div className="desc">{t.d}</div>
            </div>
          ))}
        </div>
      )}

      <div className="footnote">
        <span>est. MMXXIV</span>
        <span>KUL · MY</span>
      </div>
    </div>
  );
}

export function AuthRight({ children }) {
  return (
    <div className="auth-right">
      <div
        className="emblem-watermark"
        style={{
          right: "-5%",
          top: "50%",
          width: "65vh",
          height: "65vh",
          transform: "translateY(-50%)",
        }}
      >
        <img src="/ethical-icon.svg" alt="" />
      </div>
      {children}
    </div>
  );
}

export function Login({ setPage, showToast, onAuth }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      e.email = "Invalid email";
    if (!pw) e.pw = "Required";
    else if (pw.length < 6) e.pw = "Min 6 characters";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrs(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    try {
      const user =
        email.trim().toLowerCase() === ADMIN_LOGIN.email &&
        pw === ADMIN_LOGIN.password
          ? ADMIN_LOGIN.user
          : await signInUser({ email, password: pw });
      setLoading(false);
      const role = user.role || "referrer";
      showToast(`Signed in as ${role}`);
      onAuth(user);
    } catch (error) {
      setLoading(false);
      if (error?.code === "INVALID_CREDENTIALS") {
        setErrs({ pw: "Invalid email or password" });
        return;
      }
      setErrs({ form: error.message || "Unable to sign in" });
    }
  };

  return (
    <div className="page active">
      <div className="auth">
        <AuthLeft mode="login" setPage={setPage} />
        <AuthRight>
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className="form-eyebrow">
              <span className="dot" />
              Member access
            </div>
            <h2>Sign In</h2>
            <p className="sub">
              Enter your credentials to access your account.
            </p>

            <Field
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Email"
              error={errs.email}
              required
            />
            <Field
              label="Password"
              name="password"
              type="password"
              value={pw}
              onChange={setPw}
              placeholder="Password"
              error={errs.pw}
              required
            />

            {errs.form && <div className="field-error">{errs.form}</div>}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 6,
                gap: 12,
              }}
            >
              {/* <div style={{ font: '500 10px/1.4 Manrope, sans-serif', color: 'rgba(46,46,46,0.5)', letterSpacing: '0.04em' }}>
                Demo: <b style={{ color: 'var(--dark)' }}>test67@gmail.com</b> · <b style={{ color: 'var(--dark)' }}>partner@demo.com</b> · <b style={{ color: 'var(--dark)' }}>admin@demo.com</b>&nbsp;<span style={{ color: 'rgba(46,46,46,0.4)' }}>(pw: demo123)</span>
              </div> */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Reset link sent (demo)");
                }}
                style={{
                  font: "600 11px/1 Manrope, sans-serif",
                  color: "var(--muted)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                Forgot password?
              </a>
            </div>

            <button
              className={`submit ${loading ? "loading" : ""}`}
              type="submit"
            >
              {loading ? (
                "Signing in…"
              ) : (
                <>
                  <span>Sign In</span> <span className="arrow">→</span>
                </>
              )}
            </button>

            <p className="submit-helper">
              Don't have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage("register");
                }}
              >
                Register
              </a>
            </p>
          </form>
        </AuthRight>
      </div>
    </div>
  );
}

export function Register({ setPage, showToast }) {
  const [registrationType, setRegistrationType] = useState(null);

  return (
    <div className="page active">
      <div className="auth">
        <AuthLeft mode="register" setPage={setPage} />
        <AuthRight>
          {registrationType === null ? (
            <div className="auth-form wide">
              <div className="form-eyebrow">
                <span className="dot" />
                New application
              </div>
              <h2>Create Account</h2>
              <p className="sub">
                Choose the account type you want to register.
              </p>

              <div style={{ display: "grid", gap: 12, marginTop: 28 }}>
                <button
                  type="button"
                  className="action"
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    padding: "18px 20px",
                  }}
                  onClick={() => setRegistrationType("referrer")}
                >
                  <span style={{ textAlign: "left" }}>
                    <strong style={{ display: "block" }}>
                      Register as a Referrer
                    </strong>
                    <span
                      style={{
                        display: "block",
                        marginTop: 6,
                        fontSize: 12,
                        fontWeight: 400,
                      }}
                    >
                      Refer clients and earn rewards.
                    </span>
                  </span>
                  <span aria-hidden="true">→</span>
                </button>
                <button
                  type="button"
                  className="action"
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    padding: "18px 20px",
                  }}
                  onClick={() => setRegistrationType("partner")}
                >
                  <span style={{ textAlign: "left" }}>
                    <strong style={{ display: "block" }}>
                      Register as a Partner
                    </strong>
                    <span
                      style={{
                        display: "block",
                        marginTop: 6,
                        fontSize: 12,
                        fontWeight: 400,
                      }}
                    >
                      Add your company to the partner network.
                    </span>
                  </span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              <p className="submit-helper">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage("login");
                  }}
                >
                  Sign In
                </a>
              </p>
            </div>
          ) : registrationType === "referrer" ? (
            <ReferrerRegistrationForm
              setPage={setPage}
              showToast={showToast}
              onBack={() => setRegistrationType(null)}
            />
          ) : (
            <PartnerRegistrationForm
              setPage={setPage}
              showToast={showToast}
              onBack={() => setRegistrationType(null)}
            />
          )}
        </AuthRight>
      </div>
    </div>
  );
}

function ReferrerRegistrationForm({ setPage, showToast, onBack }) {
  return (
    <RegistrationForm
      type="referrer"
      setPage={setPage}
      showToast={showToast}
      onBack={onBack}
    />
  );
}

function PartnerRegistrationForm({ setPage, showToast, onBack }) {
  return (
    <RegistrationForm
      type="partner"
      setPage={setPage}
      showToast={showToast}
      onBack={onBack}
    />
  );
}

function RegistrationForm({ type, setPage, showToast, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [company, setCompany] = useState("");
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Required";
    if (!email) e.email = "Required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      e.email = "Invalid email";
    if (!phone) e.phone = "Required";
    else if (!/^[0-9 +()-]{8,}$/.test(phone)) e.phone = "Invalid phone";
    if (!pw) e.pw = "Required";
    else if (pw.length < 6) e.pw = "Min 6 characters";
    if (type === "partner" && !company.trim()) e.company = "Required";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrs(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    try {
      await registerUser({
        fullName: name,
        email,
        phoneNo: phone,
        password: pw,
        type,
        companyName: type === "partner" ? company : undefined,
      });
      setLoading(false);
      showToast("Application received — review in 24–48h");
      setPage("login");
    } catch (error) {
      setLoading(false);
      const isDuplicateEmail =
        error?.code === "EMAIL_EXISTS" ||
        (error?.code === "23505" && /email/i.test(error.message || ""));
      if (isDuplicateEmail) {
        setErrs({ email: "Email already registered" });
        showToast("This email has already been registered");
        return;
      }
      setErrs({ form: error.message || "Unable to create account" });
    }
  };

  return (
    <form className="auth-form wide" onSubmit={onSubmit} noValidate>
      <div className="form-eyebrow">
        <span className="dot" />
        {type === "referrer" ? "Referrer application" : "Partner application"}
      </div>
      <h2>{type === "referrer" ? "Referrer Account" : "Partner Account"}</h2>
      <p className="sub">
        {type === "referrer"
          ? "Create your account to start referring clients and earning rewards."
          : "Create a partner account for your company. Applications are reviewed by our team."}
      </p>

      <div className="field-row">
        <Field
          label="Full Name"
          name="name"
          value={name}
          onChange={setName}
          placeholder="Full name"
          error={errs.name}
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="ahmad@email.com"
          error={errs.email}
          required
        />
      </div>

      <div className="field-row">
        <Field
          label="Phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={setPhone}
          placeholder="0123456789"
          error={errs.phone}
          required
        />
        <Field
          label="Password"
          name="password"
          type="password"
          value={pw}
          onChange={setPw}
          placeholder="••••••••"
          error={errs.pw}
          required
        />
      </div>

      {type === "partner" && (
        <Field
          label="Company"
          name="company"
          value={company}
          onChange={setCompany}
          placeholder="TechVision Sdn Bhd"
          error={errs.company}
          required
        />
      )}

      {errs.form && <div className="field-error">{errs.form}</div>}

      <button
        type="button"
        className="submit-helper"
        style={{
          background: "none",
          border: 0,
          padding: 0,
          cursor: "pointer",
        }}
        onClick={onBack}
      >
        ← Choose a different account type
      </button>

      <button className={`submit ${loading ? "loading" : ""}`} type="submit">
        {loading ? (
          "Submitting…"
        ) : (
          <>
            <span>
              Create {type === "referrer" ? "Referrer" : "Partner"} Account
            </span>
            <span className="arrow">→</span>
          </>
        )}
      </button>

      <p className="submit-helper">
        Already have an account?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setPage("login");
          }}
        >
          Sign In
        </a>
      </p>
    </form>
  );
}
