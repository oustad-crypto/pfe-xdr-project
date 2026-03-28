import React, { useState, useEffect } from 'react';

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/incidents/');
      if (response.ok) {
        const data = await response.json();
        setIncidents(data);
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading incidents...</div>;

  return (
    <div>
      <h1>Incident Management</h1>
      <div className="content-card">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Severity</th>
              <th>Source IP</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id}>
                <td>{incident.title}</td>
                <td><span className={`badge badge-${incident.status}`}>{incident.status}</span></td>
                <td><span className={`badge badge-${incident.severity}`}>{incident.severity}</span></td>
                <td>{incident.source_ip}</td>
                <td>{new Date(incident.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {incidents.length === 0 && <p>No incidents found</p>}
      </div>
    </div>
  );
}

export default Incidents;