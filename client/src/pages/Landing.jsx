import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) el.classList.add('visible');
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="nav-brand"><span className="brand-icon">🩸</span> BloodBridge</span>
        <div className="landing-nav-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          {user ? (
            <Link to="/app" className="btn btn-primary">Go to Dashboard</Link>
          ) : (
            <Link to="/login" className="btn btn-primary">Login to Dashboard</Link>
          )}
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80"
            alt="Blood donation"
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content animate-fade-in">
          <h1>Connecting Lives Through Smart Blood Management</h1>
          <p className="hero-tagline">
            One donation can save up to three lives. BloodBridge helps hospitals and donors
            connect efficiently so the right blood reaches those who need it.
          </p>
          <div className="hero-cta">
            {user ? (
              <>
                <Link to="/app/donors" className="btn btn-primary">Register as Donor</Link>
                <Link to="/app/request" className="btn btn-secondary">Request Blood</Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary">Get Started</Link>
                <Link to="/login" className="btn btn-secondary">Login</Link>
              </>
            )}
          </div>
        </div>
        <div className="scroll-hint animate-float">
          <a href="#about">Scroll to explore</a>
        </div>
      </section>

      <section id="about" className="section reveal">
        <div className="container">
          <h2 className="section-title">About BloodBridge</h2>
          <p className="section-desc">
            BloodBridge is a smart blood bank platform that connects donors, hospitals, and
            blood banks. We track inventory in real time, match requests with compatible
            donors, and ensure every unit is used where it matters most.
          </p>
        </div>
      </section>

      <section id="features" className="section features reveal">
        <div className="container">
          <h2 className="section-title">Why BloodBridge?</h2>
          <div className="features-grid">
            <div className="glass-card feature-card">
              <span className="feature-icon">📋</span>
              <h3>Donor Registry</h3>
              <p>Register donors with blood group, city, and eligibility based on last donation date.</p>
            </div>
            <div className="glass-card feature-card">
              <span className="feature-icon">📦</span>
              <h3>Live Inventory</h3>
              <p>Track blood units by group. Update stock in real time with a single click.</p>
            </div>
            <div className="glass-card feature-card">
              <span className="feature-icon">🩺</span>
              <h3>Smart Matching</h3>
              <p>Request blood by group. We show compatible units and eligible donors automatically.</p>
            </div>
            <div className="glass-card feature-card">
              <span className="feature-icon">✅</span>
              <h3>Request Workflow</h3>
              <p>Approve or reject requests. Approved requests deduct inventory automatically.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <p>© BloodBridge – Smart Blood Bank Platform. For educational use.</p>
        </div>
      </footer>
    </div>
  );
}
