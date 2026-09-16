import React from 'react';
import { createRoot } from 'react-dom/client';

function AdminFoundation() {
  return (
    <main>
      <h1>ENVAX Admin</h1>
      <p>Foundation V1 activa. Los módulos administrativos se implementarán por fases.</p>
    </main>
  );
}

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

createRoot(root).render(
  <React.StrictMode>
    <AdminFoundation />
  </React.StrictMode>
);
