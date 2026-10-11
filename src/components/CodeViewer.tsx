import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Terminal } from 'lucide-react';
import { BotConfig } from '../types';
import {
  generatePythonBotScript,
  generateRequirementsTxt,
  generateDotEnv,
  generateDeployScript,
  generateSystemdService
} from '../utils/codeGenerator';

interface CodeViewerProps {
  config: BotConfig;
}

type TabType = 'bot.py' | 'requirements.txt' | '.env' | 'deploy_setup.sh' | 'systemd.service';

export const CodeViewer: React.FC<CodeViewerProps> = ({ config }) => {
  const [activeTab, setActiveTab] = useState<TabType>('bot.py');
  const [copied, setCopied] = useState(false);

  const getCodeContent = (tab: TabType): string => {
    switch (tab) {
      case 'bot.py':
        return generatePythonBotScript(config);
      case 'requirements.txt':
        return generateRequirementsTxt();
      case '.env':
        return generateDotEnv(config);
      case 'deploy_setup.sh':
        return generateDeployScript();
      case 'systemd.service':
        return generateSystemdService();
    }
  };

  const currentCode = getCodeContent(activeTab);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeTab;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = currentCode.split('\n');

  return (
    <div className="flex flex-col h-[700px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
      {/* Tab Navigation Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['bot.py', 'requirements.txt', '.env', 'deploy_setup.sh', 'systemd.service'] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800 text-sky-400 font-semibold border border-slate-700/80 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.endsWith('.py') || tab.endsWith('.txt') ? (
                  <FileCode className="w-3.5 h-3.5 text-sky-400" />
                ) : (
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>কপি সম্পন্ন!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body with Line Numbers */}
      <div className="flex-1 overflow-auto bg-slate-950 font-mono-code text-xs leading-relaxed select-text flex">
        {/* Line numbers column */}
        <div className="select-none py-4 px-3 text-right text-slate-600 bg-slate-950/80 border-r border-slate-800/60 font-mono-code text-[11px] tabular-nums shrink-0">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 p-4 overflow-x-auto text-slate-200 whitespace-pre">
          {currentCode}
        </div>
      </div>

      {/* Bottom Bar Details */}
      <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>Python 3.10+ / 3.11+</span>
          <span>Pyrogram 2.0+</span>
          <span>Google Gemini Flash</span>
        </div>
        <div className="text-emerald-400 flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Ready to execute</span>
        </div>
      </div>
    </div>
  );
};
