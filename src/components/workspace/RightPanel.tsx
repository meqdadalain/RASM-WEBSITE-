import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';

type Tab = 'ai' | 'chat' | 'properties';

export default function RightPanel() {
  const { file, status, report } = useWorkspace();
  const [activeTab, setActiveTab] = useState<Tab>('ai');
  const [chatInput, setChatInput] = useState('');

  return (
    <aside className="w-80 bg-ink-950/90 flex flex-col border-l border-cyan-500/20 shrink-0 font-sans select-none">
      {/* Navigation Onglets (AI / Chat / Properties) */}
      <div className="flex border-b border-cyan-500/20 bg-ink-900/50">
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === 'ai'
              ? 'border-cyan-400 text-cyan-400 bg-ink-900/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          ✨ AI
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === 'chat'
              ? 'border-cyan-400 text-cyan-400 bg-ink-900/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          💬 Chat
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`flex-1 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === 'properties'
              ? 'border-cyan-400 text-cyan-400 bg-ink-900/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          🔍 Props
        </button>
      </div>

      {/* 1. ONGLET AI ASSISTANT & TIMELINE */}
      {activeTab === 'ai' && (
        <div className="p-4 flex flex-col gap-5 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Status Panel
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                  status === 'idle'
                    ? 'text-slate-400 bg-slate-900 border-slate-700'
                    : status === 'uploading'
                    ? 'text-cyan-400 bg-cyan-950 border-cyan-500/30'
                    : status === 'analyzing'
                    ? 'text-amber-400 bg-amber-950 border-amber-500/30 animate-pulse'
                    : 'text-emerald-400 bg-emerald-950 border-emerald-500/30'
                }`}
              >
                {status === 'idle' && 'Ready'}
                {status === 'uploading' && 'Uploading...'}
                {status === 'analyzing' && 'Analyzing...'}
                {status === 'completed' && 'Done'}
              </span>
            </div>

            {/* Informations d'analyse */}
            <div className="bg-ink-900/70 border border-cyan-500/20 rounded-lg p-3 text-xs flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Status</span>
                <span className="text-cyan-300 font-mono font-medium flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      status === 'analyzing'
                        ? 'bg-amber-400 animate-ping'
                        : status === 'completed'
                        ? 'bg-emerald-400'
                        : 'bg-slate-500'
                    }`}
                  />
                  {status === 'idle' && 'Waiting for IFC'}
                  {status === 'uploading' && 'Uploading IFC'}
                  {status === 'analyzing' && 'AI Scan Running'}
                  {status === 'completed' && 'Analysis Complete'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Selected File</span>
                <span className="text-cyan-300 font-mono truncate max-w-[140px]">
                  {file ? file.name : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Elements</span>
                <span className="text-slate-300 font-mono">
                  {report?.statistics?.totalElements ?? '—'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Issues</span>
                <span className="text-amber-400 font-mono">
                  {report?.statistics?.issuesFound ?? '—'}
                </span>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-cyan-500/10" />

          {/* Timeline & Findings */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Timeline & Findings
            </h3>
            {report?.detectedIssues?.length ? (
              <div className="flex flex-col gap-2">
                {report.detectedIssues.map((issue: any, index: number) => (
                  <div
                    key={issue.id || index}
                    className="p-2.5 rounded bg-ink-900/60 border border-amber-500/30 text-xs flex flex-col gap-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-amber-400 font-semibold font-mono text-[10px] uppercase">
                        [{issue.type}] {issue.title}
                      </span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-mono">
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      {issue.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 italic p-3 rounded bg-ink-900/30 border border-slate-800">
                {status === 'analyzing'
                  ? 'AI scanning model structure...'
                  : 'No analysis history available.'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. ONGLET CHAT IA */}
      {activeTab === 'chat' && (
        <div className="flex flex-col flex-1 p-3 min-h-0">
          <div className="flex-1 bg-ink-900/40 border border-cyan-500/10 rounded-lg p-3 overflow-y-auto flex flex-col gap-3">
            <div className="bg-cyan-950/40 border border-cyan-500/20 rounded-lg p-2.5 text-xs text-cyan-200">
              <p className="font-semibold mb-1 text-cyan-400">🤖 RASM Copilot</p>
              {status === 'completed' && report ? (
                <span>
                  Analyse terminée pour{' '}
                  <strong className="text-cyan-300 font-mono">{file?.name}</strong>.
                  J'ai identifié <strong className="text-amber-400">{report.statistics?.issuesFound ?? 0} anomalies</strong>. Tu peux me poser des questions dessus !
                </span>
              ) : status === 'analyzing' ? (
                <span>
                  Analyse en cours du fichier{' '}
                  <strong className="text-cyan-300 font-mono">{file?.name}</strong>... Un instant.
                </span>
              ) : file ? (
                <span>
                  Fichier <strong className="text-cyan-300 font-mono">{file.name}</strong> prêt !
                </span>
              ) : (
                <span>
                  Bonjour ! Charge un fichier IFC pour que je puisse t'aider à analyser la structure.
                </span>
              )}
            </div>
          </div>

          {/* Zone de saisie du message */}
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Pose une question à l'IA..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-ink-900 border border-cyan-500/30 rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button className="bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded text-xs font-semibold transition-colors">
              Envoyer
            </button>
          </div>
        </div>
      )}

      {/* 3. ONGLET PROPERTIES */}
      {activeTab === 'properties' && (
        <div className="p-4 flex flex-col gap-4 flex-1 overflow-y-auto">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Selected Element
          </h3>

          <div className="bg-ink-900/40 border border-slate-800 rounded-lg p-3 text-xs flex flex-col gap-2 font-mono">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-500">Name</span>
              <span className="text-slate-400">No selection</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-500">IFC Type</span>
              <span className="text-slate-400">—</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-500">GUID</span>
              <span className="text-slate-400">—</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-500">Material</span>
              <span className="text-slate-400">—</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Issue</span>
              <span className="text-slate-400">—</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}