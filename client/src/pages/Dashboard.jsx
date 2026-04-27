import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donorApi, inventoryApi, requestApi } from '../api/services';
import { io } from "socket.io-client";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalUnits: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  // ✅ Socket created once
  const socket = io("http://localhost:5000");

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      try {
        const [donorsRes, invRes, reqRes] = await Promise.all([
          donorApi.getAll(),
          inventoryApi.getAll(),
          requestApi.getAll(),
        ]);
        if (!mounted) return;
        const totalUnits = (invRes.data || []).reduce((s, i) => s + (i.unitsAvailable || 0), 0);
        const pending = (reqRes.data || []).filter((r) => r.requestStatus === 'Pending');
        const donorsList = Array.isArray(donorsRes.data) ? donorsRes.data : [];
        setStats({
          totalDonors: donorsList.length,
          totalUnits,
          pendingRequests: pending.length,
        });
        setRequests((reqRes.data || []).slice(0, 5));
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchStats();
    return () => { mounted = false; };
  }, []);

  // ✅ Socket listener
  useEffect(() => {
    socket.on("new_request", (data) => {
      console.log("New request received:", data);

      // update UI instantly
      setRequests((prev) => [data, ...prev.slice(0, 4)]);

      // update stats
      setStats((prev) => ({
        ...prev,
        pendingRequests: prev.pendingRequests + 1,
      }));
    });

    return () => {
      socket.off("new_request"); // cleanup listener
    };
  }, []);

  if (loading) {
    return (
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="loading-msg">Loading stats…</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-header animate-fade-in">
        <h1>Dashboard</h1>
        <p>Overview of your blood bank</p>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <span className="stat-icon">👥</span>
          <h3>Total Donors</h3>
          <p className="stat-value counter">{stats.totalDonors}</p>
        </div>
        <div className="glass-card stat-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <span className="stat-icon">🩸</span>
          <h3>Total Blood Units</h3>
          <p className="stat-value counter">{stats.totalUnits}</p>
        </div>
        <div className="glass-card stat-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <span className="stat-icon">⏳</span>
          <h3>Pending Requests</h3>
          <p className="stat-value counter">{stats.pendingRequests}</p>
        </div>
      </div>

      <div className="glass-card recent-section animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="section-header">
          <h2>Recent Requests</h2>
          <Link to="/app/request" className="btn btn-secondary btn-sm">New Request</Link>
        </div>
        {requests.length === 0 ? (
          <p className="text-muted">No requests yet. <Link to="/app/request">Create one</Link>.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Hospital</th>
                  <th>Blood Group</th>
                  <th>Units</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r._id}>
                    <td>{r.patientName}</td>
                    <td>{r.hospitalName}</td>
                    <td>{r.bloodGroup}</td>
                    <td>{r.unitsRequired}</td>
                    <td>
                      <span className={`badge badge-${r.requestStatus.toLowerCase()}`}>
                        {r.requestStatus}
                      </span>
                    </td>
                    <td>
                      <Link to={`/app/match/${r._id}`} className="btn btn-secondary btn-sm">
                        Match
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}