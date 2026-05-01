import { useState } from 'react';

export default function Field({ label, type = 'text', value, onChange, placeholder, error, required, name, onBlur }) {
  const [show, setShow] = useState(false);
  const isPw = type === 'password';
  const realType = isPw ? (show ? 'text' : 'password') : type;

  return (
    <div className="field-group">
      <div className="field-label">
        <span>{label}{required && <span className="req"> *</span>}</span>
        {error && <span style={{ color: 'var(--orange-deep)', textTransform: 'none', letterSpacing: 0, fontSize: 10 }}>{error}</span>}
      </div>
      <div className={`field ${error ? 'error' : ''}`}>
        <input
          name={name}
          type={realType}
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete="off"
        />
        {isPw && (
          <button type="button" className="togpw" onClick={() => setShow(s => !s)}>
            {show ? 'HIDE' : 'SHOW'}
          </button>
        )}
      </div>
    </div>
  );
}
