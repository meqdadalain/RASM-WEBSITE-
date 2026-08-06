import React from 'react';
import { WorkspaceProvider } from '@/context/WorkspaceContext';
import TopBar from '@/components/workspace/TopBar';
import Sidebar from '@/components/workspace/Sidebar';
import ViewerPanel from '@/components/workspace/ViewerPanel';
import RightPanel from '@/components/workspace/RightPanel';
import BottomPanel from '@/components/workspace/BottomPanel';

export default function Workspace() {
  return (
    <WorkspaceProvider>
      <div className="h-screen w-screen flex flex-col bg-ink-950 text-cyan-50 overflow-hidden font-sans">
        {/* TopBar fixe en haut */}
        <TopBar />

        {/* Zone centrale divisée en 2 : Haut (Panneaux) et Bas (Report) */}
        <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
          
          {/* Ligne 1 : Sidebar + 3D Viewer + RightPanel */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            <Sidebar />
            <ViewerPanel />
            <RightPanel />
          </div>

          {/* Ligne 2 : BottomPanel qui s'aligne horizontalement sans chevaucher la Sidebar */}
          <BottomPanel />

        </div>
      </div>
    </WorkspaceProvider>
  );
}