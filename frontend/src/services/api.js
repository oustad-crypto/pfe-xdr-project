const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const alertsAPI = {
  getAll: (skip = 0, limit = 100) => 
    fetch(`${API_URL}/alerts/?skip=${skip}&limit=${limit}`).then(r => r.json()),
  
  getById: (id) =>
    fetch(`${API_URL}/alerts/${id}`).then(r => r.json()),
  
  update: (id, data) =>
    fetch(`${API_URL}/alerts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  
  getStats: () =>
    fetch(`${API_URL}/alerts/stats/summary`).then(r => r.json())
};

export const incidentsAPI = {
  getAll: () =>
    fetch(`${API_URL}/incidents/`).then(r => r.json()),
  
  getById: (id) =>
    fetch(`${API_URL}/incidents/${id}`).then(r => r.json()),
  
  create: (data) =>
    fetch(`${API_URL}/incidents/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  
  update: (id, data) =>
    fetch(`${API_URL}/incidents/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json())
};

export const rulesAPI = {
  getAll: () =>
    fetch(`${API_URL}/rules/`).then(r => r.json()),
  
  create: (data) =>
    fetch(`${API_URL}/rules/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  
  update: (id, data) =>
    fetch(`${API_URL}/rules/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json())
};

export const logsAPI = {
  getAll: (skip = 0, limit = 100) =>
    fetch(`${API_URL}/logs/?skip=${skip}&limit=${limit}`).then(r => r.json()),
  
  ingest: (data) =>
    fetch(`${API_URL}/logs/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json())
};