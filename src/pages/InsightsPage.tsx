import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ShieldCheck, Globe, Satellite, FileDown, AlertCircle, Check, RefreshCw as Sync } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function InsightsPage() {
  const data = [
    { time: '08:00', value: 60 },
    { time: '10:00', value: 40 },
    { time: '12:00', value: 95 },
    { time: '14:00', value: 75 },
    { time: '16:00', value: 50 },
    { time: '18:00', value: 90 },
  ];

  return (
    <div className="flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[1440px] px-8 py-12 md:py-16 w-full"
      >
        <div className="mb-16">
          <h1 className="font-display text-7xl text-white mb-4 tracking-tight font-bold">Trust Report Dashboard</h1>
          <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
            Real-time media verification engine. Processing satellite, metadata, and pixel-level integrity for global sports assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Main Chart */}
          <div className="col-span-12 lg:col-span-8 glass-card rounded-[2.5rem] p-10 flex flex-col">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="font-display text-3xl font-bold text-white mb-2">Authenticity Breakdown</h3>
                <p className="text-slate-500 font-medium">Aggregated verification score across active sessions</p>
              </div>
              <div className="flex items-center gap-3 px-5 py-2 bg-accent-green/10 border border-accent-green/20 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse"></span>
                <span className="text-accent-green font-black tracking-widest text-[10px] uppercase">FACT ACTIVE</span>
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#475569" 
                    tick={{ fill: '#475569', fontWeight: 700, fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                    dy={20}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass-card p-4 rounded-xl border-accent-blue/30 shadow-2xl">
                            <p className="text-white font-black text-[10px] mb-1 uppercase tracking-widest">{payload[0].payload.time}</p>
                            <p className="text-accent-blue font-display text-2xl font-bold">{payload[0].value}% Score</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 2 || index === 5 ? '#3B82F6' : '#1e293b'} 
                        className={cn("transition-all duration-500 cursor-pointer opacity-80 hover:opacity-100")}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-between mt-8 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span>
            </div>
          </div>

          {/* Credibility Scores */}
          <div className="col-span-12 lg:col-span-4 glass-card rounded-[2.5rem] p-10 flex flex-col justify-between">
            <h3 className="font-display text-3xl font-bold text-white mb-10 tracking-tight">Source Credibility</h3>
            
            <div className="space-y-10 flex-grow">
              {[
                { icon: ShieldCheck, label: "Official Press", score: 99.8, color: "bg-accent-blue" },
                { icon: Globe, label: "Social Aggregate", score: 74.2, color: "bg-orange-500" },
                { icon: Satellite, label: "Orbital Metadata", score: 91.5, color: "bg-accent-green" }
              ].map((item, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-slate-200">
                      <item.icon className={cn("w-6 h-6", item.color === 'bg-accent-blue' ? 'text-accent-blue' : item.color === 'bg-orange-500' ? 'text-orange-500' : 'text-accent-green')} />
                      <span className="font-black tracking-widest text-[10px] uppercase">{item.label}</span>
                    </div>
                    <span className={cn("font-display text-xl font-bold tracking-tight", 
                      item.color === 'bg-accent-blue' ? 'text-accent-blue' : item.color === 'bg-orange-500' ? 'text-orange-500' : 'text-accent-green'
                    )}>{item.score}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={cn("h-full rounded-full", item.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-5 border border-white/5 bg-white/5 rounded-2xl text-white font-black tracking-tight text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3 mt-12 group">
              <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              Download Audit Report
            </button>
          </div>

          {/* Scanner Visual */}
          <div className="col-span-12 md:col-span-6 glass-card rounded-[2.5rem] overflow-hidden group cursor-pointer relative">
            <div className="relative h-72">
              <img 
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                src="https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?auto=format&fit=crop&q=80&w=800" 
                alt="Scanner" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"></div>
              <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between">
                <h3 className="font-display text-4xl font-bold text-white tracking-tight">Integrity Scanner</h3>
                <div className="px-5 py-2 bg-red-500/10 border border-red-500/30 rounded-full flex items-center gap-3 backdrop-blur-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]"></span>
                  <span className="text-red-500 font-black tracking-widest text-[10px] uppercase">Deepfake Alert</span>
                </div>
              </div>
            </div>
            <div className="p-10 space-y-8">
              <p className="text-slate-400 text-lg leading-relaxed">Scanning frame buffers for neural-network artifacts and pixel-inconsistency. High probability of synthetic generation detected in background audience.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                  <span className="block text-slate-500 font-bold text-[10px] uppercase mb-2 tracking-widest text-left">Confidence</span>
                  <span className="text-white font-display text-4xl font-black tracking-tighter block text-left">89.2%</span>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                  <span className="block text-slate-500 font-bold text-[10px] uppercase mb-2 tracking-widest text-left">Latency</span>
                  <span className="text-white font-display text-4xl font-black tracking-tighter italic block text-left">14ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* History Tracker */}
          <div className="col-span-12 md:col-span-6 glass-card rounded-[2.5rem] p-10 flex flex-col">
            <h3 className="font-display text-4xl font-bold text-white mb-12 tracking-tight">Verification History</h3>
            <div className="space-y-12 relative flex-grow pt-4">
              <div className="absolute left-[13px] top-6 bottom-4 w-px bg-white/5"></div>
              
              {[
                { title: "Premier League Live Broadcast", meta: "Checksum: 8x92f...L01", time: "2m ago", type: "success" },
                { title: "Transfer Leak: Stadium CCTV", meta: "Checksum: 4v12k...Z99", time: "15m ago", type: "success" },
                { title: "Press Conf Photo (Twitter)", meta: "Manipulation Detected", time: "1h ago", type: "error" },
                { title: "Scout Report: Video Clip", meta: "Processing Meta-Data...", time: "3h ago", type: "info" }
              ].map((item, index) => (
                <div key={index} className="relative pl-12 group cursor-pointer">
                  <div className={cn(
                    "absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center border-4 border-obsidian ring-2 transition-all",
                    item.type === 'success' ? "bg-accent-green ring-accent-green/20" :
                    item.type === 'error' ? "bg-red-500 ring-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.5)]" :
                    "bg-accent-blue animate-pulse ring-accent-blue/20"
                  )}>
                    {item.type === 'success' ? <Check className="w-3 h-3 text-obsidian font-bold" /> :
                     item.type === 'error' ? <AlertCircle className="w-3 h-3 text-obsidian font-bold" /> :
                     <Sync className="w-3 h-3 text-obsidian font-bold" />}
                  </div>
                  <div className="flex justify-between items-start text-left">
                    <div>
                      <p className={cn("font-bold text-lg leading-none transition-colors", item.type === 'loading' ? 'text-slate-400' : 'text-white group-hover:text-accent-blue')}>{item.title}</p>
                      <p className={cn("text-xs mt-2 font-bold tracking-tight", item.type === 'error' ? 'text-red-500' : 'text-slate-500 uppercase')}>{item.meta}</p>
                    </div>
                    <span className="text-slate-600 font-bold text-xs">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
