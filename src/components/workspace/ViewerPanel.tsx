import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';

export default function ViewerPanel() {
  const { file, status } = useWorkspace();

  return (
    <div className="flex-1 bg-ink-950 relative flex items-center justify-center overflow-hidden border-r border-cyan-500/20 group select-none">
      {/* Grille de fond type CAD */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Repère d'axes XYZ en bas à gauche */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1 text-[10px] font-mono text-slate-500 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-red-500" /> <span className="text-red-400">X</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-emerald-500" /> <span className="text-emerald-400">Y</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-cyan-500" /> <span className="text-cyan-400">Z</span>
        </div>
      </div>

      {/* Target & Cube holographique central */}
      <div className="text-center z-10 flex flex-col items-center gap-4">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Cercles concentriques animés selon statut */}
          <div 
            className={`absolute inset-0 rounded-full border transition-all duration-300 ${
              status === 'analyzing'
                ? 'border-amber-400 animate-ping opacity-50'
                : 'border-cyan-500/20 animate-ping opacity-20'
            }`} 
          />
          <div className="absolute inset-2 rounded-full border border-dashed border-cyan-500/40 animate-spin-slow" />
          
          {/* Wireframe Cube */}
          <div className="w-12 h-12 border-2 border-cyan-400 bg-cyan-500/10 rotate-45 rounded flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <span className="text-cyan-300 font-mono text-xs font-bold">IFC</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <h2 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">3D Viewer</h2>
          
          {/* Message dynamique selon le statut de l'analyse */}
          {file ? (
            <div className="flex flex-col items-center gap-1">
              <p className={`text-xs font-mono border px-3 py-1 rounded-full shadow-sm flex items-center gap-2 transition-colors ${
                status === 'uploading'
                  ? 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40'
                  : status === 'analyzing'
                  ? 'text-amber-400 bg-amber-950/60 border-amber-500/40'
                  : 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  status === 'analyzing'
                    ? 'bg-amber-400 animate-ping'
                    : 'bg-emerald-400 animate-pulse'
                }`} />
                {status === 'uploading' && `Uploading ${file.name}...`}
                {status === 'analyzing' && `Analyzing ${file.name}...`}
                {status === 'completed' && `Loaded: ${file.name}`}
              </p>
              <p className="text-[10px] text-slate-400 italic">
                {status === 'analyzing' ? 'AI geometry scan in progress...' : '(Ready for Web-IFC viewer integration)'}
              </p>
            </div>
          ) : (
            <p className="text-xs text-cyan-400/80 font-mono bg-ink-900/90 border border-cyan-500/30 px-3 py-1 rounded-full shadow-sm">
              Drop IFC file here
            </p>
          )}
        </div>
      </div>
    </div>
  );
}