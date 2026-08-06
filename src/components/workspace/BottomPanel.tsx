import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';

export default function BottomPanel() {
  const { status, report } = useWorkspace();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-ink-950/95 border-t border-cyan-500/20 flex flex-col transition-all duration-300 select-none shrink-0 ${
        isCollapsed ? 'h-9' : 'h-72'
      }`}
    >
      {/* Header / Top bar du BottomPanel */}
      <div className="h-9 px-4 bg-ink-900/60 border-b border-cyan-500/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            📊 AI Analysis Report
          </span>
          {status === 'completed' && report?.confidenceScore && (
            <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              Confidence: {(report.confidenceScore * 100).toFixed(0)}%
            </span>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors px-2 py-1 rounded cursor-pointer"
        >
          {isCollapsed ? '▲ Expand' : '▼ Collapse'}
        </button>
      </div>

      {/* Contenu principal scrollable */}
      {!isCollapsed && (
        <div className="flex-1 p-4 overflow-y-auto min-h-0 text-xs text-slate-300 font-sans custom-scrollbar">
          {status === 'uploading' && (
            <div className="h-full flex items-center justify-center gap-3 text-cyan-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Uploading IFC file to analysis server...
            </div>
          )}

          {status === 'analyzing' && (
            <div className="h-full flex items-center justify-center gap-3 text-amber-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Scanning IFC structure & executing clash detection...
            </div>
          )}

          {status === 'idle' && !report && (
            <div className="h-full flex items-center justify-center text-slate-500 italic">
              No active report. Upload an IFC file to start AI analysis.
            </div>
          )}

          {status === 'completed' && report && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-2">
              {/* Colonne 1 : Résumé & Stats */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Executive Summary
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed bg-ink-900/50 p-3 rounded border border-cyan-500/10">
                  {report?.summary || "Analyse terminée."}
                </p>
                <div className="flex gap-4 text-xs font-mono">
                  <div className="bg-ink-900/40 p-2 rounded border border-slate-800 flex-1">
                    <span className="text-slate-500 block text-[10px]">Elements</span>
                    <span className="text-cyan-300 font-bold">
                      {report?.statistics?.totalElements ?? '—'}
                    </span>
                  </div>
                  <div className="bg-ink-900/40 p-2 rounded border border-slate-800 flex-1">
                    <span className="text-slate-500 block text-[10px]">Total Issues</span>
                    <span className="text-amber-400 font-bold">
                      {report?.statistics?.issuesFound ?? '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Colonne 2 : Issues Détectées (Scroll interne indépendant) */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Detected Issues ({report?.detectedIssues?.length || 0})
                </h4>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {report?.detectedIssues?.map((issue: any, idx: number) => (
                    <div
                      key={issue.id || idx}
                      className="p-2.5 bg-ink-900/60 border border-amber-500/20 rounded flex flex-col gap-1 shrink-0"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-amber-400">
                          [{issue.type}] {issue.title}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-mono">
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{issue.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colonne 3 : Recommandations */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  AI Recommendations
                </h4>
                <ul className="flex flex-col gap-2">
                  {report?.recommendations?.map((rec: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 bg-ink-900/40 p-2 rounded border border-cyan-500/10 text-[11px] text-slate-300"
                    >
                      <span className="text-cyan-400 font-bold">✓</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}