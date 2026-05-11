import { useState } from 'react';
import { donorApi } from '../api/services';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function DonorRegistration() {
  const [form, setForm] = useState({
    name: '',
    bloodGroup: '',
    phone: '',
    city: '',
    lastDonationDate: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      let submitData;
      if (imageFile) {
        submitData = new FormData();
        Object.keys(form).forEach(key => submitData.append(key, form[key]));
        if (!form.lastDonationDate) submitData.delete('lastDonationDate');
        submitData.append('image', imageFile);
      } else {
        submitData = {
          ...form,
          lastDonationDate: form.lastDonationDate || undefined,
        };
      }

      await donorApi.create(submitData);
      setMessage({ type: 'success', text: 'Donor registered successfully!' });
      setForm({ name: '', bloodGroup: '', phone: '', city: '', lastDonationDate: '' });
      setImageFile(null);
      e.target.reset();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Registration failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="page-header animate-fade-in">
        <h1>Donor Registration</h1>
        <p>Register a new blood donor</p>
      </div>

      <div className="glass-card form-card animate-slide-up">
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
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>
          <div className="form-group">
            <label>Last Donation Date</label>
            <input
              type="date"
              name="lastDonationDate"
              value={form.lastDonationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Donor Image (Optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {message.text && (
            <p className={`form-message ${message.type}`}>{message.text}</p>
          )}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting…' : 'Register Donor'}
          </button>
        </form>
      </div>
    </div>
  );
}
