import React from 'react';

export default function TopBar() {
  return (
    <header className="h-12 border-b border-cyan-500/20 bg-ink-950 px-5 flex items-center justify-between z-20 shrink-0 select-none">
      <div className="flex items-center gap-3">
        <span className="font-bold text-sm tracking-widest text-cyan-400">RASM</span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
          v1.0.0-alpha
        </span>
        <div className="h-3 w-[1px] bg-cyan-500/20 mx-1" />
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Local Mode</span>
        </div>
      </div>

      <div className="flex items-center gap-5 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Project:</span>
          <select className="bg-ink-900 border border-cyan-500/30 text-cyan-200 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-400">
            <option>Default Project</option>
          </select>
        </div>

        <div className="h-3 w-[1px] bg-cyan-500/20" />

        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <span className="text-slate-500">AI Engine:</span>
          <span className="text-cyan-400">Ready</span>
        </div>

        <div className="h-3 w-[1px] bg-cyan-500/20" />

        <button className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors text-xs font-medium">
          <span>⚙ Settings</span>
        </button>
      </div>
    </header>
  );
}