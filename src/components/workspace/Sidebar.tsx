import React, { useRef } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';

export default function Sidebar() {
  const { file, startAnalysisSimulation, status } = useWorkspace();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startAnalysisSimulation(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startAnalysisSimulation(e.dataTransfer.files[0]);
    }
  };

  return (
    <aside className="w-64 bg-ink-950/90 flex flex-col h-full border-r border-cyan-500/20 shrink-0 font-sans select-none overflow-hidden">
      {/* 1. Zone Upload (Fixe) */}
      <div className="p-4 flex flex-col gap-2 shrink-0">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Upload IFC
        </span>
        <input
          type="file"
          accept=".ifc"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
            status === 'uploading' || status === 'analyzing'
              ? 'border-amber-500/50 bg-amber-950/10'
              : 'border-cyan-500/30 hover:border-cyan-400 bg-ink-900/40 hover:bg-ink-900/80'
          }`}
        >
          <span className="text-xs font-medium text-slate-300">
            {status === 'uploading'
              ? 'Uploading...'
              : status === 'analyzing'
              ? 'Analyzing...'
              : 'Select IFC file'}
          </span>
          <span className="text-[10px] text-slate-500">or drag & drop here</span>
        </div>
      </div>

      <div className="h-[1px] bg-cyan-500/10 shrink-0" />

      {/* 2. Zone Projects (Fixe) */}
      <div className="p-4 flex flex-col gap-2 shrink-0">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Projects
        </span>
        <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2 font-mono">
          📁 Active Structure
        </div>
      </div>

      <div className="h-[1px] bg-cyan-500/10 shrink-0" />

      {/* 3. Zone Files (Scrollable) */}
      <div className="p-4 flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Files
        </span>
        {file ? (
          <div className="p-2 rounded bg-ink-900 border border-cyan-500/20 text-xs text-cyan-200 flex items-center gap-2 font-mono">
            📄 <span className="truncate">{file.name}</span>
          </div>
        ) : (
          <span className="text-xs text-slate-500 italic">No file loaded</span>
        )}
      </div>
    </aside>
  );
}