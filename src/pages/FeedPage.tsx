import { motion } from 'motion/react';
import { Newspaper, TrendingUp, ArrowRight, ShieldAlert, Bot, MessageSquareWarning, Activity, History } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function FeedPage() {
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[1440px] w-full px-8 py-24"
      >
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)] pulse border border-white/20"></span>
            <span className="text-accent-blue font-black tracking-widest uppercase text-xs">Live Analysis Active</span>
          </div>
          <h1 className="font-display text-7xl text-white mb-6 tracking-tight">Trending Fake Alerts</h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Real-time sports media verification powered by elite AI. Monitoring 50,000+ sources for deepfakes, manipulated audio, and coordinated misinformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Alert Card */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="md:col-span-8 glass-card rounded-[2.5rem] p-8 border-red-500/10 overflow-hidden relative group cursor-pointer"
          >
             <div className="absolute top-8 right-8 z-10">
              <span className="px-5 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 font-black text-xs flex items-center gap-2 backdrop-blur-xl">
                <ShieldAlert className="w-4 h-4" />
                CAP
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-2/5 aspect-[4/5] rounded-[2rem] overflow-hidden bg-surface relative">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" 
                  src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&q=80&w=800" 
                  alt="Stadium" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent"></div>
              </div>

              <div className="flex-1 flex flex-col justify-between h-full pt-4">
                <div>
                  <span className="text-slate-500 font-black tracking-widest text-[10px] uppercase mb-4 block">Transfer Rumor #4920</span>
                  <h2 className="font-display text-4xl text-white mb-6 leading-tight font-bold">🔥 Mbappé to Arsenal rumor spreading across X</h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    AI Analysis confirms the viral "boarding pass" image is a composite fabrication. Source metadata points to a coordinated bot network originating in Eastern Europe.
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2 font-bold text-slate-500 text-sm">
                      <History className="w-4 h-4" /> 4m ago
                    </span>
                    <span className="flex items-center gap-2 font-bold text-red-500 text-sm">
                      <TrendingUp className="w-4 h-4" /> 124k Reach
                    </span>
                  </div>
                  <button className="text-accent-blue font-bold hover:underline flex items-center gap-2 text-sm group/btn">
                    View Full Report <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Alert */}
          <div className="md:col-span-4 glass-card rounded-[2.5rem] p-10 flex flex-col group cursor-pointer border-orange-500/10">
            <div className="mb-10 flex justify-between items-start">
              <span className="px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 font-black text-xs flex items-center gap-2 backdrop-blur-xl">
                <MessageSquareWarning className="w-4 h-4" />
                SUS
              </span>
              <span className="text-slate-500 font-bold text-xs tracking-widest">18m ago</span>
            </div>
            
            <h3 className="font-display text-3xl text-white mb-6 leading-tight group-hover:text-orange-400 transition-colors font-bold">⚠ Fake injury report spreading</h3>
            <p className="text-slate-400 leading-relaxed mb-10">
              Reports of a season-ending ACL tear for star QB are based on a spoofed ESPN tweet account. No medical confirmation found.
            </p>

            <div className="mt-auto aspect-video rounded-3xl overflow-hidden bg-surface relative opacity-60 group-hover:opacity-100 transition-opacity">
              <img 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" 
                alt="Medical" 
              />
              <div className="absolute inset-0 bg-obsidian/40"></div>
            </div>
          </div>

          {/* Deepfake Card */}
          <div className="md:col-span-6 glass-card rounded-[2.5rem] p-10 border-orange-500/20 group cursor-pointer">
            <div className="flex justify-between items-center mb-10">
              <span className="px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/40 text-orange-500 font-black text-xs flex items-center gap-2">
                <Bot className="w-4 h-4" />
                DEEPFAKE ALERT
              </span>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-obsidian bg-slate-800 overflow-hidden ring-1 ring-white/10 flex items-center justify-center font-bold text-[10px] text-white">
                    {i === 3 ? "+12" : <div className="w-full h-full bg-slate-700 animate-pulse" />}
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-display text-4xl text-white mb-6 font-bold leading-tight">🚨 Deepfake athlete interview detected</h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Voice synthesis and lip-sync manipulation detected in recent "leaked" locker room audio. 98.4% AI confidence score on spectral mismatch.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-obsidian/50 p-6 rounded-2xl border border-white/5">
                <span className="text-slate-500 font-bold text-[10px] uppercase block mb-2 tracking-widest">Authenticity</span>
                <span className="text-red-500 font-display text-4xl font-black">1.6%</span>
              </div>
              <div className="bg-obsidian/50 p-6 rounded-2xl border border-white/5">
                <span className="text-slate-500 font-bold text-[10px] uppercase block mb-2 tracking-widest">Viral Factor</span>
                <span className="text-accent-blue font-display text-3xl font-black italic">EXTREME</span>
              </div>
            </div>
          </div>

          {/* Index Panel */}
          <div className="md:col-span-6 glass-card rounded-[2.5rem] p-12 bg-gradient-to-br from-surface to-obsidian flex flex-col justify-center items-center">
            <div className="flex items-center gap-10 w-full mb-12">
              <div className="flex-1">
                <h4 className="text-white font-display text-3xl mb-4 font-bold">Global Misinfo Index</h4>
                <p className="text-slate-400 text-lg">Spike in coordinated AI-generated sports content detected in the last 6 hours.</p>
              </div>
              <div className="w-40 h-40 flex items-center justify-center rounded-full border-4 border-accent-blue/10 border-t-accent-blue shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <span className="text-white font-display text-4xl font-black tracking-tighter">+42%</span>
              </div>
            </div>

            <div className="w-full h-24 flex items-end gap-3 group/chart">
              {[20, 35, 60, 45, 85, 95].map((val, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  className={cn(
                    "flex-1 rounded-t-xl transition-all duration-500",
                    i === 5 ? "bg-accent-blue" : "bg-accent-blue/20 group-hover/chart:bg-accent-blue/40"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Brand Protection CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-16 rounded-[3.5rem] glass-card bg-gradient-to-r from-blue-900/20 via-obsidian to-transparent/5 border-accent-blue/10 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-glow-blue opacity-5"></div>
          <div className="flex-1 relative z-10">
            <h2 className="font-display text-5xl md:text-6xl text-white mb-6 font-bold tracking-tight">Protect Your Brand.</h2>
            <p className="text-slate-400 text-xl max-w-xl leading-relaxed">
              Journalists and scouts get priority API access to our neural verification engine. Validate any clip in under 400ms.
            </p>
          </div>
          <div className="flex gap-6 relative z-10">
            <button className="px-10 py-5 bg-white text-obsidian rounded-2xl font-black tracking-tight text-lg hover:scale-105 transition-transform active:scale-95 shadow-2xl">
              Request Access
            </button>
            <button className="px-10 py-5 glass-card bg-transparent text-white rounded-2xl font-black tracking-tight text-lg hover:bg-white/5 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
