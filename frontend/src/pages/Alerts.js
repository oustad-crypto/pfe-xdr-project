import React from 'react';
import AlertList from '../components/AlertList';

function Alerts() {
  return (
    <div>
      <h1>Alert Management</h1>
      <div className="content-card">
        <AlertList />
      </div>
    </div>
  );
}

export default Alerts;