import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestApi } from '../api/services';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function BloodRequest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patientName: '',
    hospitalName: '',
    bloodGroup: '',
    unitsRequired: 1,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const val = e.target.name === 'unitsRequired' ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: val });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await requestApi.create(form);
      setMessage({ type: 'success', text: 'Request created! You can view matching results.' });
      setForm({ patientName: '', hospitalName: '', bloodGroup: '', unitsRequired: 1 });
      const id = res.data?._id;
      if (id) {
        setTimeout(() => navigate(`/app/match/${id}`), 1500);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Request failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="page-header animate-fade-in">
        <h1>Blood Request</h1>
        <p>Submit a new blood request</p>
      </div>

      <div className="glass-card form-card animate-slide-up">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              placeholder="Patient full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Hospital Name</label>
            <input
              type="text"
              name="hospitalName"
              value={form.hospitalName}
              onChange={handleChange}
              placeholder="Hospital name"
              required
            />
          </div>
          <div className="form-group">
            <label>Blood Group</label>
            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select blood group</option>
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Units Required</label>
            <input
              type="number"
              name="unitsRequired"
              min="1"
              value={form.unitsRequired}
              onChange={handleChange}
              required
            />
          </div>
          {message.text && (
            <p className={`form-message ${message.type}`}>{message.text}</p>
          )}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting…' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
