import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestApi } from '../api/services';
import { useAuth } from '../context/AuthContext';

export default function MatchingResult() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!requestId) return;
    let mounted = true;
    (async () => {
      try {
        const res = await requestApi.getMatching(requestId);
        if (mounted) setData(res.data);
      } catch (e) {
        if (mounted) setMessage({ type: 'error', text: e.message || 'Failed to load match data' });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [requestId]);

  const updateStatus = async (requestStatus) => {
    setStatusUpdating(true);
    setMessage({ type: '', text: '' });
    try {
      await requestApi.updateStatus(requestId, requestStatus);
      setMessage({ type: 'success', text: `Request ${requestStatus.toLowerCase()}.` });
      setData((prev) => (prev ? { ...prev, request: { ...prev.request, requestStatus } } : null));
    } catch (e) {
      setMessage({ type: 'error', text: e.message || 'Update failed' });
    } finally {
      setStatusUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="page-header">
        <h1>Matching Result</h1>
        <p className="loading-msg">Loading…</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="page-header">
        <h1>Matching Result</h1>
        <p className="form-message error">{message.text || 'Request not found.'}</p>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/app')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const { request, compatibleDonors, availableUnitsByGroup, totalAvailableUnits, sufficient } = data;
  const isPending = request.requestStatus === 'Pending';
  const isAdmin = user?.role === 'Admin';

  return (
    <div className="matching-page">
      <div className="page-header animate-fade-in">
        <h1>Matching Result</h1>
        <p>Request: {request.patientName} – {request.bloodGroup} ({request.unitsRequired} units)</p>
      </div>

      {message.text && (
        <p className={`form-message ${message.type}`} style={{ marginBottom: '1rem' }}>
          {message.text}
        </p>
      )}

      <div className="match-grid">
        <div className="glass-card match-card animate-slide-up">
          <h3>Request Details</h3>
          <ul className="detail-list">
            <li><strong>Patient:</strong> {request.patientName}</li>
            <li><strong>Hospital:</strong> {request.hospitalName}</li>
            <li><strong>Blood Group:</strong> {request.bloodGroup}</li>
            <li><strong>Units Required:</strong> {request.unitsRequired}</li>
            <li>
              <strong>Status:</strong>{' '}
              <span className={`badge badge-${request.requestStatus.toLowerCase()}`}>
                {request.requestStatus}
              </span>
            </li>
          </ul>
          {isPending && isAdmin && (
            <div className="status-actions">
              <button
                type="button"
                className="btn btn-primary"
                disabled={statusUpdating || !sufficient}
                onClick={() => updateStatus('Approved')}
                title={!sufficient ? 'Insufficient inventory to approve' : ''}
              >
                {statusUpdating ? 'Updating…' : 'Approve'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={statusUpdating}
                onClick={() => updateStatus('Rejected')}
              >
                Reject
              </button>
            </div>
          )}
        </div>

        <div className="glass-card match-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3>Available Units (Compatible)</h3>
          <p className="summary-line">
            Total compatible units: <strong>{totalAvailableUnits}</strong>
            {sufficient ? (
              <span className="badge badge-approved">Sufficient</span>
            ) : (
              <span className="badge badge-rejected">Insufficient</span>
            )}
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Blood Group</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {availableUnitsByGroup.map((row) => (
                  <tr key={row.bloodGroup}>
                    <td>{row.bloodGroup}</td>
                    <td>{row.unitsAvailable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card match-card full-width animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3>Compatible Donors (Eligible)</h3>
          <p className="text-muted">Donors with compatible blood group and last donation &gt; 3 months ago.</p>
          {compatibleDonors.length === 0 ? (
            <p className="text-muted">No eligible donors found for this request.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>Phone</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  {compatibleDonors.map((d) => (
                    <tr key={d._id}>
                      <td>
                        {d.image ? (
                          <img src={`http://localhost:5000${d.image}`} alt={d.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '20px', color: '#555' }}>👤</span>
                          </div>
                        )}
                      </td>
                      <td>{d.name}</td>
                      <td>{d.bloodGroup}</td>
                      <td>{d.phone}</td>
                      <td>{d.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <button type="button" className="btn btn-secondary" onClick={() => navigate('/app')}>
        Back to Dashboard
      </button>
    </div>
  );
}
