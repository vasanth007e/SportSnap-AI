import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Link as LinkIcon, Camera, Upload, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, History, Bolt, Loader2, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { verifyClaimWithGemini, VerificationResultData } from '@/src/lib/gemini';
import LiveScanModal from '@/src/components/LiveScanModal';

interface VerificationPageProps {
  onVerify: (result: VerificationResultData) => void;
}

export default function VerificationPage({ onVerify }: VerificationPageProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState<string>('');
  const [loadingText, setLoadingText] = useState('Analyzing sources...');
  const [isLiveScanOpen, setIsLiveScanOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVerify = async () => {
    if (!query && !imageBase64) return;
    setIsLoading(true);
    
    // Simulate changing loading text
    const textInterval = setInterval(() => {
      setLoadingText(prev => 
        prev === 'Analyzing sources...' ? 'Cross-referencing timeline...' :
        prev === 'Cross-referencing timeline...' ? 'Running media forensics...' :
        'Finalizing verdict...'
      );
    }, 2000);

    try {
      const result = await verifyClaimWithGemini(query, imageBase64);
      clearInterval(textInterval);
      onVerify(result);
    } catch (error) {
      console.error(error);
      clearInterval(textInterval);
      alert('Verification failed. Please check your API key and try again.');
      setIsLoading(false);
    }
  };

  const handleLiveScan = () => {
    setIsLiveScanOpen(true);
  };

  const handleLiveScanResult = (result: VerificationResultData) => {
    setIsLiveScanOpen(false);
    onVerify(result);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const trending = [
    {
      id: 1,
      tag: 'FACT',
      type: 'success',
      category: 'TRANSFER NEWS',
      title: 'Mbappé Contract Clause Leak',
      desc: 'Original legal document metadata confirmed by AI snapshot of professional club registry.',
      time: '12 mins ago',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      tag: 'DEEPFAKE ALERT',
      type: 'warning',
      category: 'VIRAL CLIP',
      title: 'LeBron Backflip Slam Dunk',
      desc: "AI Detection detected frame inconsistencies in the player's shadow. 98% probability of synthesis.",
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      tag: 'VERIFIED',
      type: 'info',
      category: 'INTERVIEW RECAP',
      title: 'Manager Post-Match Outburst',
      desc: 'Audio forensic analysis confirms voice biometric matching original broadcast source data.',
      time: '4 hours ago',
      image: 'https://images.unsplash.com/photo-1521485950395-bcfb8fc9bd06?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl w-full px-4 py-24 md:py-32 flex flex-col items-center text-center"
      >
        {/* Hero Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8 border-white/20">
          <Bolt className="w-4 h-4 text-accent-green fill-accent-green" />
          <span className="text-xs font-bold tracking-widest text-white uppercase">SportSnap AI</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-display text-5xl md:text-8xl text-white mb-6 leading-none tracking-tight">
          Shazam for <br />
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Sports Truth</span>
        </h1>

        <p className="font-sans text-lg text-slate-400 max-w-2xl mb-12">
          Instantly verify transfer rumors, highlight clips, and sports news using AI. High-performance media forensic analysis for elite reporters and fans.
        </p>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-md"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-accent-blue rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-accent-blue animate-pulse" />
                  </div>
                </div>
                <div className="text-xl font-display font-bold text-white tracking-widest uppercase animate-pulse">
                  {loadingText}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Bar */}
        <div className="w-full max-w-3xl mb-8 group">
          <div className="p-2 rounded-2xl glass-card flex flex-col md:flex-row items-center gap-4 focus-within:ring-2 focus-within:ring-accent-blue/50 transition-all duration-500 hover:border-white/20">
            <div className="flex w-full items-center pl-4 gap-3">
              <LinkIcon className="w-5 h-5 text-slate-500 shrink-0" />
              <input 
                className="flex-grow bg-transparent border-none outline-none text-white font-sans placeholder:text-slate-600 focus:ring-0 py-2" 
                placeholder="paste suspicious sports link / headline" 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              />
              {imageBase64 && (
                <div className="relative shrink-0">
                  <img src={imageBase64} alt="Upload preview" className="w-10 h-10 object-cover rounded-lg border border-white/20" />
                  <button 
                    onClick={() => setImageBase64('')}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={handleVerify}
              disabled={isLoading || (!query && !imageBase64)}
              className="bg-white text-obsidian px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 active:scale-95 transition-all duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              VERIFY
            </button>
          </div>
        </div>

        {/* Mode Toggles */}
        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <button 
            onClick={handleLiveScan}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/10 glass-card text-white font-bold hover:bg-white/5 hover:border-white/20 active:scale-95 transition-all duration-200"
          >
            <Camera className="w-5 h-5 text-accent-green" />
            Live Scan Overlay
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/10 glass-card text-white font-bold hover:bg-white/5 hover:border-white/20 active:scale-95 transition-all duration-200"
          >
            <Upload className="w-5 h-5 text-accent-blue" />
            Upload Image
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Trending Section */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-3xl text-white flex items-center gap-3 text-left">
              Trending Verifications
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-green"></span>
              </span>
            </h3>
            <a className="text-accent-blue font-bold flex items-center gap-1 hover:underline" href="#">
              View All <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trending.map((card) => (
              <motion.div 
                key={card.id}
                whileHover={{ y: -10 }}
                className="glass-card rounded-3xl overflow-hidden text-left hover:border-white/30 transition-all duration-300"
              >
                <div className="h-56 relative group">
                  <img 
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" 
                    src={card.image} 
                    alt={card.title} 
                  />
                  <div className={cn(
                    "absolute top-4 left-4 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border",
                    card.type === 'success' ? "bg-accent-green/20 border-accent-green/40 text-accent-green" :
                    card.type === 'warning' ? "bg-orange-500/20 border-orange-500/40 text-orange-500" :
                    "bg-accent-blue/20 border-accent-blue/40 text-accent-blue"
                  )}>
                    {card.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
                     card.type === 'warning' ? <AlertTriangle className="w-3.5 h-3.5" /> :
                     <ShieldCheck className="w-3.5 h-3.5" />}
                    <span className="text-[10px] font-black tracking-widest uppercase">{card.tag}</span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-xs font-black tracking-widest text-slate-500 mb-2 uppercase">{card.category}</p>
                  <h4 className="font-display text-xl text-white mb-4">{card.title}</h4>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-6 leading-relaxed">{card.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <History className="w-3.5 h-3.5" /> {card.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Live Scan Modal */}
      <LiveScanModal
        isOpen={isLiveScanOpen}
        onClose={() => setIsLiveScanOpen(false)}
        onVerify={handleLiveScanResult}
      />
    </div>
  );
}
