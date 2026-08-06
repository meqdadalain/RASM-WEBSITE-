import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-cyan-500/20 bg-ink-950/80 p-4 flex flex-col gap-6 select-none">
      {/* Upload IFC Section */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Upload IFC</h3>
        <div className="border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/60 rounded-xl p-4 text-center transition-colors cursor-pointer bg-ink-900/50">
          <p className="text-xs text-slate-300 font-medium">Select IFC file</p>
          <p className="text-[10px] text-slate-500 mt-1">or drag & drop here</p>
        </div>
      </div>

      <div className="h-[1px] bg-cyan-500/10" />

      {/* Projects */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Projects</h3>
        <ul className="text-sm flex flex-col gap-1 text-slate-300">
          <li className="px-3 py-1.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs font-medium cursor-pointer">
            📁 Active Structure
          </li>
        </ul>
      </div>

      {/* Files */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Files</h3>
        <p className="text-xs text-slate-500 italic">No files loaded</p>
      </div>
    </aside>
  );
}