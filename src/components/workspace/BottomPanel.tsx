import React, { useState } from 'react';
import AnalysisReport from '@/components/AnalysisReport';
export default function BottomPanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section 
      className={`border-t border-cyan-500/20 bg-ink-950 transition-all duration-300 flex flex-col shrink-0 ${
        isExpanded ? 'h-72' : 'h-10'
      }`}
    >
      {/* Barre de contrôle du panneau */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-10 px-4 flex items-center justify-between cursor-pointer hover:bg-ink-900/60 transition-colors select-none"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            📊 AI Analysis Report
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">
            {isExpanded ? 'Click to collapse' : 'No active report (Click to expand)'}
          </span>
        </div>

        <button className="text-xs text-slate-400 hover:text-cyan-400 font-mono">
          {isExpanded ? '▼ Hide' : '▲ Show'}
        </button>
      </div>

      {/* Contenu du rapport */}
      {isExpanded && (
        <div className="flex-1 p-4 overflow-y-auto border-t border-cyan-500/10 bg-ink-900/30">
          <AnalysisReport />
        </div>
      )}
    </section>
  );
}