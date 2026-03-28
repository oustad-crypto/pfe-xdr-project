import React, { useState, useEffect } from 'react';
import './AlertList.css';

function AlertList() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/alerts/?limit=20');
      if (response.ok) {
        const data = await response.json();
        setAlerts(data);
      } else {
        setError('Failed to fetch alerts');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAlertStatus = async (alertId, status) => {
    try {
      const response = await fetch(`http://localhost:8000/api/alerts/${alertId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchAlerts();
      }
    } catch (err) {
      console.error('Error updating alert:', err);
    }
  };

  if (loading) return <div className="loading">Loading alerts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="alert-list">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Threat Score</th>
            <th>Source IP</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(alert => (
            <tr key={alert.id} className={`alert-row ${alert.severity}`}> 
              <td>{alert.title}</td>
              <td><span className={`badge badge-${alert.severity}`}>{alert.severity.toUpperCase()}</span></td>
              <td><span className={`badge badge-${alert.status}`}>{alert.status}</span></td>
              <td>{(alert.threat_score * 100).toFixed(0)}%</td>
              <td>{alert.source_ip}</td>
              <td>{new Date(alert.timestamp).toLocaleString()}</td>
              <td>
                {alert.status === 'open' && (
                  <> 
                    <button className="button button-primary" onClick={() => updateAlertStatus(alert.id, 'acknowledged')}> 
                      Acknowledge
                    </button>
                    <button className="button button-primary" onClick={() => updateAlertStatus(alert.id, 'resolved')}> 
                      Resolve
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {alerts.length === 0 && <p>No alerts found</p>}
    </div>
  );
}

export default AlertList;