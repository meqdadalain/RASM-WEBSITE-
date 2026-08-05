// src/pages/Workspace.tsx
import React from 'react';
import AnalysisReport from '../components/AnalysisReport';

export function Workspace() {
  return (
    <div className="workspace-container p-6">
      <h1 className="text-2xl font-bold mb-4">Workspace RASM</h1>
      
      {/* 1. Upload IFC */}
      <section className="upload-section mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold">1. Upload IFC</h2>
        <p>Zone de dépôt du fichier IFC...</p>
      </section>

      {/* 2. 3D Viewer */}
      <section className="viewer-section mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold">2. Visionneuse 3D</h2>
        <p>Afficheur 3D IFC...</p>
      </section>

      {/* 3. AI Analysis Report */}
      <section className="report-section border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">3. AI Analysis Report</h2>
        <AnalysisReport />
      </section>
    </div>
  );
}

export default Workspace;