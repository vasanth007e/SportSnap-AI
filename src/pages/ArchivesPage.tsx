import { motion } from 'motion/react';
import { Search, Filter, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, XCircle, ExternalLink, History } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function ArchivesPage() {
  const stats = [
    { label: "Total Scans", value: "1,284", color: "border-white/10" },
    { label: "Authenticated", value: "942", color: "border-l-accent-green" },
    { label: "Manipulated", value: "312", color: "border-l-orange-500" },
    { label: "Critical Alerts", value: "30", color: "border-l-red-500" }
  ];

  const scans = [
    {
      id: 1,
      tag: 'FACT',
      type: 'success',
      title: 'LeBron Final Quarter Performance - Staples Center',
      desc: 'Media metadata cross-referenced with broadcast latency signals. 99.8% Authenticity Score.',
      time: 'May 24, 2024 • 14:22 PM',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 2,
      tag: 'SUS',
      type: 'warning',
      title: 'Champions League Pitch Invasion - RAW Footage',
      desc: 'Possible frame-rate manipulation detected in secondary shadow patterns. Manual review required.',
      time: 'May 23, 2024 • 09:15 AM',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 3,
      tag: 'CAP',
      type: 'error',
      title: 'Mbappé Contract Signing Leak - AI Generated',
      desc: 'Generative adversarial network signatures found. Facial mapping inconsistencies confirmed.',
      time: 'May 22, 2024 • 22:10 PM',
      image: 'https://images.unsplash.com/photo-1518112164473-550f8303f260?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 4,
      tag: 'FACT',
      type: 'success',
      title: 'Nadal Training Session - Roland Garros',
      desc: 'Original source camera fingerprint matched. Content hash verified on-chain.',
      time: 'May 22, 2024 • 11:45 AM',
      image: 'https://images.unsplash.com/photo-1592709823125-a191f07a2a5e?auto=format&fit=crop&q=80&w=300'
    }
  ];

  return (
    <div className="flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl w-full px-8 py-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="text-left">
            <h1 className="font-display text-7xl text-white mb-6 font-bold tracking-tight">Verification Archives</h1>
            <p className="font-sans text-xl text-slate-400 max-w-2xl leading-relaxed">
              Your secure library of verified sports media. Access forensic data, deepfake analysis, and authenticity reports for all past scans.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-accent-blue transition-colors" />
              <input 
                className="bg-surface border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none w-64 md:w-80 transition-all font-bold placeholder:text-slate-600" 
                placeholder="Search archives..." 
                type="text" 
              />
            </div>
            <button className="bg-surface border border-white/10 p-4 rounded-2xl hover:bg-white/5 transition-colors text-slate-400">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Bento */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className={cn("glass-card p-8 rounded-3xl border-l-[6px]", stat.color)}
            >
              <p className="text-slate-500 font-black tracking-widest text-xs uppercase mb-3">{stat.label}</p>
              <p className="text-5xl font-display font-black text-white tracking-tighter">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* List Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="font-display text-4xl text-white font-bold tracking-tighter">Recent Scans</h2>
          <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Viewing 1-10 of 1,284</span>
        </div>

        {/* Scan List */}
        <div className="space-y-4">
          {scans.map((scan) => (
            <motion.div 
              key={scan.id}
              whileHover={{ scale: 1.005 }}
              className={cn(
                "glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row items-center p-5 gap-8 group border-transparent",
                scan.type === 'warning' ? "border-l-4 border-l-orange-500" :
                scan.type === 'error' ? "border-l-4 border-l-red-500" : "border-l-4 border-l-transparent"
              )}
            >
              <div className="w-full md:w-56 h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-surface relative">
                <img 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                  src={scan.image} 
                  alt={scan.title} 
                />
              </div>
              
              <div className="flex-grow space-y-4 text-left">
                <div className="flex flex-wrap items-center gap-4">
                  <span className={cn(
                    "px-4 py-1 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2",
                    scan.type === 'success' ? "bg-accent-green/10 text-accent-green" :
                    scan.type === 'warning' ? "bg-orange-500/10 text-orange-500" :
                    "bg-red-500/10 text-red-500"
                  )}>
                    {scan.type === 'success' ? <CheckCircle2 className="w-3 h-3" /> :
                     scan.type === 'warning' ? <AlertTriangle className="w-3 h-3" /> :
                     <XCircle className="w-3 h-3" />}
                    {scan.tag}
                  </span>
                  <span className="text-slate-600 font-bold text-xs tracking-tight flex items-center gap-2">
                    <History className="w-3 h-3" /> {scan.time}
                  </span>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white group-hover:text-accent-blue transition-colors leading-tight">
                  {scan.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium line-clamp-1 italic max-w-2xl">
                  {scan.desc}
                </p>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto">
                <button className="w-full md:w-auto bg-white/5 hover:bg-accent-blue hover:text-white border border-white/5 px-8 py-4 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-3 active:scale-95 group/btn uppercase tracking-widest">
                  Review Report
                  <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center items-center gap-3">
          <button className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-white transition-colors glass-card rounded-xl">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent-blue text-white font-black text-lg shadow-lg">
            1
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl glass-card text-slate-500 hover:text-white transition-colors font-bold">
            2
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl glass-card text-slate-500 hover:text-white transition-colors font-bold">
            3
          </button>
          <span className="text-slate-600 px-2 font-black tracking-widest">...</span>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl glass-card text-slate-500 hover:text-white transition-colors font-bold">
            128
          </button>
          <button className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-white transition-colors glass-card rounded-xl">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
