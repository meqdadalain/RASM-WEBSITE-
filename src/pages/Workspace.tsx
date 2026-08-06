import React from 'react';
import TopBar from '@/components/workspace/TopBar';
import Sidebar from '@/components/workspace/Sidebar';
import ViewerPanel from '@/components/workspace/ViewerPanel';
import RightPanel from '@/components/workspace/RightPanel';
import BottomPanel from '@/components/workspace/BottomPanel';

export default function Workspace() {
  return (
    <div className="h-screen w-screen flex flex-col bg-ink-950 text-cyan-50 overflow-hidden font-sans">
      {/* TopBar */}
      <TopBar />

      {/* Central Area: Sidebar | 3D Viewer | Right Panel */}
      <div className="flex-1 flex min-h-0 relative">
        <Sidebar />
        <ViewerPanel />
        <RightPanel />
      </div>

      {/* Bottom Panel */}
      <BottomPanel />
    </div>
  );
}