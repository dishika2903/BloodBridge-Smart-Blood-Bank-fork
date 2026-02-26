import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/services';

const ROLES = ['Admin', 'Staff'];

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Staff',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await authApi.signup(form);
      if (res && res.success) {
        setMessage({ type: 'success', text: 'Account created! Redirecting to login…' });
        setTimeout(() => navigate('/login'), 1200);
      } else {
        setMessage({ type: 'error', text: res.message || 'Signup failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Signup failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="glass-card auth-card animate-slide-up">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="brand-icon">🩸</span>
            <span>BloodBridge</span>
          </div>
          <h1>Create an account</h1>
          <p className="auth-subtitle">Set up access for admins and staff members.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {message.text && (
            <p className={`form-message ${message.type}`}>{message.text}</p>
          )}

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <p className="auth-footer-text">
          <Link to="/">Back to landing</Link>
        </p>
      </div>
    </div>
  );
}

