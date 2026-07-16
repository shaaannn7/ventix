import React, { useEffect, useState } from 'react';
import { Sparkles, Check, X, Sliders, ArrowRight, CheckCircle2 } from 'lucide-react';

const REASONING = [
  'Crowd density at 83%',
  '2 buses arriving in 4 min',
  'Historical congestion pattern',
  'Weather slowing entry',
];

export const AIMissionSummary: React.FC = () => {
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [confidence, setConfidence] = useState(88);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setConfidence(Math.min(88 + Math.round((7 * step) / 30), 95));
      if (step >= 30) clearInterval(timer);
    }, 33);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowResult(true), 600);
    return () => clearTimeout(t);
  }, []);

  if (status === 'approved') {
    return (
      <div className="bg-obsidian-elevated border border-system-green/30 rounded-sm p-lg flex flex-col items-center gap-sm text-center">
        <CheckCircle2 className="w-6 h-6 text-system-green" />
        <p className="text-sm font-semibold text-white">Dispatch Executed</p>
        <p className="text-xs text-system-mutedText">4 volunteers deployed to Gate B.</p>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="bg-obsidian-elevated border border-system-border rounded-sm p-lg flex flex-col items-center gap-sm text-center">
        <X className="w-5 h-5 text-system-crimson" />
        <p className="text-sm font-semibold text-white">Dismissed</p>
        <button
          onClick={() => setStatus('pending')}
          className="text-xs text-system-cyan hover:underline mt-xs"
        >
          View next recommendation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-obsidian-elevated border border-system-border rounded-sm p-md flex flex-col gap-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <Sparkles className="w-3.5 h-3.5 text-system-purple" />
          <span className="text-xs font-semibold text-white">AI Recommendation</span>
        </div>
        <span className="text-xs text-system-purple font-mono">{confidence}% confidence</span>
      </div>

      {/* Recommendation */}
      <div>
        <p className="text-sm font-semibold text-white">Deploy 4 Volunteers to Gate B</p>
        <div
          className="flex items-center gap-xs mt-xs text-xs font-mono"
          style={{ opacity: showResult ? 1 : 0, transition: 'opacity 0.4s ease' }}
        >
          <span className="text-system-crimson line-through">18 min queue</span>
          <ArrowRight className="w-3 h-3 text-system-mutedText" />
          <span className="text-system-green font-semibold">7 min queue</span>
        </div>
      </div>

      {/* Reasoning */}
      <div className="grid grid-cols-2 gap-xs">
        {REASONING.map((item) => (
          <div key={item} className="flex items-center gap-xs text-xs text-system-mutedText">
            <Check className="w-3 h-3 text-system-green shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-sm pt-sm border-t border-system-border">
        <button
          onClick={() => setStatus('rejected')}
          aria-label="Reject AI Recommendation"
          className="flex-1 flex items-center justify-center gap-xs py-xs border border-system-border rounded-sm text-xs text-system-mutedText hover:text-white hover:bg-obsidian-sub transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Reject
        </button>
        <button
          onClick={() => setStatus('pending')}
          aria-label="Modify AI Recommendation"
          className="flex-1 flex items-center justify-center gap-xs py-xs border border-system-border rounded-sm text-xs text-system-mutedText hover:text-white hover:bg-obsidian-sub transition-colors"
        >
          <Sliders className="w-3.5 h-3.5" />
          Modify
        </button>
        <button
          onClick={() => setStatus('approved')}
          aria-label="Approve AI Recommendation"
          className="flex-1 flex items-center justify-center gap-xs py-xs bg-system-purple border border-system-purple/40 rounded-sm text-xs text-white font-semibold hover:bg-system-purple/90 transition-colors"
        >
          <Check className="w-3.5 h-3.5" />
          Approve
        </button>
      </div>
    </div>
  );
};

export default AIMissionSummary;
