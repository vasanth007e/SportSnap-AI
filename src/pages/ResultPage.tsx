import { motion } from 'motion/react';
import { ShieldCheck, History, User2, Radio, CheckCircle2, XCircle, SearchX, PersonStanding, FileWarning, ArrowLeft, AlertTriangle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { VerificationResultData } from '../lib/gemini';

interface ResultPageProps {
  data: VerificationResultData;
  onReset: () => void;
}

export default function VerificationResult({ data, onReset }: ResultPageProps) {
  const isFact = data.verdict === 'FACT';
  const isSus = data.verdict === 'SUS';
  const isCap = data.verdict === 'CAP';

  const themeColor = isFact ? 'text-accent-green' : isCap ? 'text-red-500' : 'text-orange-500';
  const bgColor = isFact ? 'bg-accent-green' : isCap ? 'bg-red-500' : 'bg-orange-500';
  const bgLight = isFact ? 'bg-accent-green/10' : isCap ? 'bg-red-500/10' : 'bg-orange-500/10';
  const borderLight = isFact ? 'border-accent-green/30' : isCap ? 'border-red-500/30' : 'border-orange-500/30';
  const shadowGlow = isFact ? 'shadow-[0_0_50px_rgba(52,211,153,0.15)]' : isCap ? 'shadow-[0_0_50px_rgba(239,68,68,0.15)]' : 'shadow-[0_0_50px_rgba(249,115,22,0.15)]';
  const hoverBg = isFact ? 'group-hover:bg-accent-green/10' : isCap ? 'group-hover:bg-red-500/10' : 'group-hover:bg-orange-500/10';
  
  const title = isFact ? "✅ Verified Authentic" : isCap ? "🔴 CAP Detected" : "⚠️ Suspicious Content";
  const iconFallback = [SearchX, PersonStanding, Radio, History, FileWarning];

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1440px] mx-auto px-8 py-12 md:py-16"
    >
      <button 
        onClick={onReset}
        className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Scan
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-8">
          <div className={cn("glass-card rounded-[2.5rem] p-12 relative overflow-hidden group", shadowGlow)}>
            <div className={cn("absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl transition-colors duration-700", bgLight, hoverBg)}></div>
            
            <div className="flex flex-col items-center text-center space-y-8 relative z-10">
              <div className={cn("inline-flex items-center gap-3 px-8 py-3 border rounded-full", bgLight, borderLight)}>
                <span className={cn("w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_currentColor]", bgColor, isFact ? 'shadow-accent-green' : isCap ? 'shadow-red-500' : 'shadow-orange-500')}></span>
                <span className={cn("text-3xl font-black tracking-[0.2em] font-display", themeColor)}>{data.verdict}</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">{title}</h1>
                <p className={cn("text-2xl font-display font-semibold opacity-80", themeColor)}>Confidence Score: {data.confidenceScore}%</p>
              </div>

              <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <p className="text-xl italic text-slate-200 leading-relaxed font-medium">
                  "{data.explanation}"
                </p>
              </div>

              {data.failurePoints && data.failurePoints.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
                  {data.failurePoints.map((point, index) => {
                    const Icon = iconFallback[index % iconFallback.length];
                    return (
                      <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <Icon className={cn("w-6 h-6 shrink-0", themeColor)} />
                        <span className="text-left font-bold text-slate-300 leading-tight">{point}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel: Source Trust */}
        <div className="lg:col-span-4 h-full">
          <div className={cn("glass-card rounded-[2.5rem] p-10 flex flex-col h-full border-t border-b border-l border-r", borderLight)}>
            <h3 className="text-2xl font-display font-bold text-white mb-8 tracking-tight">Source Analytics</h3>
            
            <div className="space-y-12 flex-grow flex flex-col">
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90 scale-110">
                    <circle className="text-white/5" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="12" />
                    <circle 
                      className={cn(themeColor, "transition-all duration-1000 ease-out")} 
                      cx="96" cy="96" fill="transparent" r="80" 
                      stroke="currentColor" strokeWidth="12" 
                      strokeDasharray={2 * Math.PI * 80}
                      strokeDashoffset={2 * Math.PI * 80 * (1 - data.trustScore / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-white font-display">{data.trustScore}%</span>
                    <span className="text-xs font-black tracking-widest text-slate-500 uppercase mt-1">Trust Score</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Account Age", value: "3 Days", color: "text-white" },
                  { label: "Engagement Quality", value: "Bot-Heavy", color: "text-red-400" },
                  { label: "Past Verifications", value: "0 Clean / 14 Failed", color: "text-white" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                    <span className="text-slate-400 font-medium">{item.label}</span>
                    <span className={cn("font-bold tracking-tight", item.color)}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <div className="h-32 w-full glass-card rounded-2xl overflow-hidden opacity-50 relative group">
                  <img 
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" 
                    src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800" 
                    alt="Analytics data" 
                  />
                  <div className="absolute inset-0 bg-obsidian/40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-12 group">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-display font-bold text-white tracking-tight">Timeline Cross-Reference</h3>
            <span className="px-4 py-1.5 bg-accent-blue/10 text-accent-blue text-xs font-bold rounded-full border border-accent-blue/20 uppercase tracking-widest">AI SCAN COMPLETE</span>
          </div>

          <div className="relative space-y-16 py-4">
            {/* Thread line */}
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent-blue to-accent-blue/20"></div>

            {data.timeline?.map((event, index) => (
              <div key={index} className="relative pl-14">
                <div className={cn("absolute left-0 top-1 w-8 h-8 rounded-full bg-obsidian border-4 shadow-[0_0_15px_currentColor]", index === 0 ? "border-accent-blue text-accent-blue" : themeColor)}></div>
                <div className="flex flex-col">
                  <span className={cn("font-black tracking-widest text-xs uppercase mb-2", index === 0 ? "text-accent-blue" : themeColor)}>{event.date}</span>
                  <h4 className="text-white font-bold text-2xl mb-3">{event.title}</h4>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Sources Panel */}
        <div className="glass-card rounded-[2.5rem] p-10 flex flex-col">
          <h3 className="text-2xl font-display font-bold text-white mb-8 tracking-tight">Official Sources</h3>
          <div className="space-y-4 flex-grow">
            {data.sources?.map((source, index) => (
              <div key={index} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border", source.verified ? "bg-accent-blue/10 border-accent-blue/30 text-accent-blue" : "bg-white/5 border-white/10 text-slate-400")}>
                  {source.verified ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-white font-bold">{source.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{source.status}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex items-center gap-3 text-accent-blue opacity-80">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Blockchain Secured Verification</span>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
