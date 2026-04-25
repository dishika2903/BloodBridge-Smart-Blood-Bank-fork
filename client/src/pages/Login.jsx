import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../api/services';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/app';

  const [form, setForm] = useState({ email: '', password: '' });
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
    const res = await authApi.login(form);

    console.log("Login Response:", res); // 👈 DEBUG (remove later)

    if (res && res.success && res.user && res.token) {
      // ✅ SAFE TOKEN STORAGE
      localStorage.setItem("token", res.token);

      login(res.user);
      navigate(from, { replace: true });
    } else {
      setMessage({ type: 'error', text: res.message || 'Login failed' });
    }

  } catch (err) {
    setMessage({ type: 'error', text: err.message || 'Login failed' });
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
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Log in to access your smart blood bank dashboard.</p>
        </div>

        <form onSubmit={handleSubmit}>
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
              placeholder="Your password"
              required
            />
          </div>

          {message.text && (
            <p className={`form-message ${message.type}`}>{message.text}</p>
          )}

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="auth-footer-text">
          New to BloodBridge? <Link to="/signup">Create an account</Link>
        </p>
        <p className="auth-footer-text">
          <Link to="/">Back to landing</Link>
        </p>
      </div>
    </div>
  );
}

