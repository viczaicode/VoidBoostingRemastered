import React from 'react';

export default function AdminLayout({ title, subtitle, children }) {
  return (
    <div className="panel-page">
      <div className="panel-container">
        <div className="panel-header">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
