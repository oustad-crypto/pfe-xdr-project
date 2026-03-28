import React, { useState, useEffect } from 'react';

function Rules() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/rules/');
      if (response.ok) {
        const data = await response.json();
        setRules(data);
      }
    } catch (error) {
      console.error('Error fetching rules:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading rules...</div>;

  return (
    <div>
      <h1>Threat Detection Rules</h1>
      <div className="content-card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Pattern</th>
            </tr>
          </thead>
          <tbody>
            {rules.map(rule => (
              <tr key={rule.id}>
                <td>{rule.name}</td>
                <td>{rule.rule_type}</td>
                <td><span className={`badge badge-${rule.severity}`}>{rule.severity}</span></td>
                <td><span className={`badge ${rule.enabled ? 'badge-open' : 'badge-resolved'}`}>{rule.enabled ? 'Enabled' : 'Disabled'}</span></td>
                <td><code>{rule.pattern.substring(0, 50)}...</code></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rules.length === 0 && <p>No rules found</p>}
      </div>
    </div>
  );
}

export default Rules;