import React, { useState, useEffect } from 'react';
import AlertList from '../components/AlertList';
import '../App.css';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/alerts/stats/summary');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div>
      <h1>Security Dashboard</h1>
      
      {stats && (
        <div className="grid">
          <div className="stat-card critical">
            <h3>Critical Alerts</h3>
            <div className="value">{stats.critical_count}</div>
          </div>
          <div className="stat-card high">
            <h3>High Priority</h3>
            <div className="value">{stats.high_count}</div>
          </div>
          <div className="stat-card medium">
            <h3>Medium Priority</h3>
            <div className="value">{stats.medium_count}</div>
          </div>
          <div className="stat-card">
            <h3>Total Alerts</h3>
            <div className="value">{stats.total_alerts}</div>
          </div>
          <div className="stat-card">
            <h3>Open Alerts</h3>
            <div className="value">{stats.open_count}</div>
          </div>
        </div>
      )}

      <div className="content-card">
        <h2>Recent Alerts</h2>
        <AlertList />
      </div>
    </div>
  );
}

export default Dashboard;