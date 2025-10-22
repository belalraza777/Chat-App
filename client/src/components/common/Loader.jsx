import React from 'react';
import './loader.css';

export default function Loader({ type = 'list', count = 3 }) {
  if (type === 'user-list') {
    // Skeleton for user list
    return (
      <div>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div className="skeleton skeleton-avatar" />
            <div style={{ flex: 1 }}>
              <div className="skeleton skeleton-text" style={{ width: '60%' }} />
              <div className="skeleton skeleton-text" style={{ width: '40%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (type === 'messages') {
    // Skeleton for messages
    return (
      <div>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ marginBottom: 18 }}>
            <div className="skeleton skeleton-message" />
          </div>
        ))}
      </div>
    );
  }
  // Default: simple block
  return <div className="skeleton" style={{ height: 32, width: 120 }} />;
}
