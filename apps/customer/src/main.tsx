import React from 'react';
import { createRoot } from 'react-dom/client';

function CustomerFoundation() {
  return (
    <main>
      <h1>ENVAX Catálogo</h1>
      <p>Foundation V1 activa. La interfaz final se implementará únicamente desde diseños aprobados.</p>
    </main>
  );
}

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

createRoot(root).render(
  <React.StrictMode>
    <CustomerFoundation />
  </React.StrictMode>
);
