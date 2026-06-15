import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Loader2, ShieldCheck, AlertTriangle, Zap } from 'lucide-react';
import { verifyClaimWithGemini, VerificationResultData } from '@/src/lib/gemini';
import ReactCrop, {
  Crop,
  centerCrop,
  makeAspectCrop
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { saveVerificationResult } from "@/src/services/firestore";

interface LiveScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (result: VerificationResultData) => void;
}

type ScanStep =
  | 'select'
  | 'preview'
  | 'analyzing'
  | 'error';

const SCENARIOS = [
  {
    id: 'viral_clip',
    icon: '🎬',
    label: 'Viral Sports Clip',
    desc: 'Suspicious highlight or impossible play',
    claim: 'Viral clip showing an NBA player performing a 720° aerial spin dunk from the free-throw line — an physically impossible athletic feat being shared as real raw footage on social media.',
  },
  {
    id: 'transfer',
    icon: '📋',
    label: 'Transfer News',
    desc: 'Leaked contract or signing document',
    claim: 'Screenshot of alleged leaked transfer contract showing a top football star signing with a rival club for a record-breaking fee — contract metadata appears suspicious and origin unverified.',
  },
  {
    id: 'injury',
    icon: '🏥',
    label: 'Injury Report',
    desc: 'Suspicious medical update or breaking news',
    claim: 'Alleged ESPN breaking news tweet claiming a star quarterback suffered a season-ending torn ACL in practice — the Twitter account has only 200 followers and was created 3 days ago.',
  },
  {
    id: 'locker_audio',
    icon: '🎙️',
    label: 'Locker Room Audio',
    desc: 'Leaked audio or interview clip',
    claim: 'Leaked locker room audio where a coach allegedly threatens players with release — voice sounds suspiciously synthetic with artificial reverb artifacts and unnatural breath patterns.',
  },
  {
    id: 'scoreline',
    icon: '📊',
    label: 'Match Result Leak',
    desc: 'Early scoreline or result spoiler',
    claim: 'Screenshot claiming to show the final score of tonight\'s Champions League final hours before kickoff, complete with a forged official UEFA watermark and fabricated scoreboard graphic.',
  },
];

const SCAN_TEXTS = [
  'Initializing capture zone...',
  'Mapping screen region...',
  'Extracting visual metadata...',
  'Cross-referencing source data...',
  'Running media forensics...',
  'Sending to AI pipeline...',
  'Finalizing analysis...',
];

export default function LiveScanModal({ isOpen, onClose, onVerify }: LiveScanModalProps) {
  const [step, setStep] = useState<ScanStep>('select');
  const [scanText, setScanText] = useState(SCAN_TEXTS[0]);
  const [scanProgress, setScanProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [showImageViewer, setShowImageViewer] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [croppedImage, setCroppedImage] = useState<string>("");

const handleScreenCapture = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true
    });

    const video = document.createElement("video");
    video.srcObject = stream;

    await video.play();
    console.log(
  "Video size:",
  video.videoWidth,
  video.videoHeight
);

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");
    console.log("Image length:", image.length);

    setCapturedImage(image);
    setStep("preview");

    stream.getTracks().forEach(track => track.stop());
  } catch (error) {
    console.error("Capture failed:", error);
  }
};
const getCroppedImage = () => {
  if (!imageRef.current || !completedCrop) {
    return capturedImage;
  }

  const canvas = document.createElement("canvas");
  const image = imageRef.current;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) return capturedImage;

  canvas.width = completedCrop.width || 0;
  canvas.height = completedCrop.height || 0;

  ctx.drawImage(
    image,
    (completedCrop.x || 0) * scaleX,
    (completedCrop.y || 0) * scaleY,
    (completedCrop.width || 0) * scaleX,
    (completedCrop.height || 0) * scaleY,
    0,
    0,
    completedCrop.width || 0,
    completedCrop.height || 0
  );

  return canvas.toDataURL("image/png");
};

  // Reset whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('select');
      setScanProgress(0);
      setScanText(SCAN_TEXTS[0]);
      setErrorMsg('');
    }
  }, [isOpen]);

  const handleSelectScenario = async (scenarioId: string) => {
    const scenario = SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return;

    setStep('scanning');
    setScanProgress(0);

    // Cycle scan text
    let textIdx = 0;
    const textInterval = setInterval(() => {
      textIdx = (textIdx + 1) % SCAN_TEXTS.length;
      setScanText(SCAN_TEXTS[textIdx]);
    }, 850);

    // Animate progress to ~80% while "scanning"
    let prog = 0;
    const progressInterval = setInterval(() => {
      prog += Math.random() * 9 + 3;
      if (prog >= 78) { clearInterval(progressInterval); prog = 78; }
      setScanProgress(Math.min(prog, 78));
    }, 280);

    // Hold on scanning step for realism
    await new Promise(r => setTimeout(r, 2600));

    setStep('analyzing');
    setScanText('Sending to AI verification pipeline...');

    try {
      const result = await verifyClaimWithGemini(scenario.claim, undefined);
      clearInterval(textInterval);
      clearInterval(progressInterval);
      setScanProgress(100);
      // Brief flash at 100% before handoff
      await new Promise(r => setTimeout(r, 350));
      onVerify(result);
    } catch (err) {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      console.error('LiveScan error:', err);
      setErrorMsg('Verification pipeline failed. Please check your API key and network, then try again.');
      setStep('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="live-scan-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(2, 6, 23, 0.93)', backdropFilter: 'blur(12px)' }}
        >
          {/* Click-away only on select step */}
          {step === 'select' && (
            <div className="absolute inset-0" onClick={onClose} />
          )}

          <motion.div
            key="live-scan-panel"
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 20 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative w-full max-w-lg mx-4 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl"
            style={{ background: 'linear-gradient(145deg, #0f172a 0%, #080e1c 100%)' }}
          >
            {/* Subtle scan grid — only during active scan */}
            {(step === 'scanning' || step === 'analyzing') && (
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.07]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />
            )}

            {/* Close button */}
            {(step === 'select' || step === 'error') && (
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/8 hover:bg-white/16 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}

            {/* ── SELECT ── */}
            {step === 'select' && (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-accent-blue" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-accent-blue uppercase">
                    Live Scan
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  Capture Suspicious Content
                </h2>
                <p className="text-slate-400 text-sm mb-7 leading-relaxed">
                  Select the content type you've spotted. SportSnap AI will screen
                  capture and run full media forensic verification.
                </p>

                <div className="space-y-2.5">
<button
  onClick={handleScreenCapture}
  className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl border border-accent-blue/30 bg-accent-blue/10 hover:bg-accent-blue/20 transition-all duration-200 text-white font-bold mb-4"
>
  <Camera className="w-5 h-5" />
  Capture Screen / Window
</button>
                                  </div>

                <p className="text-center text-slate-600 text-[12px] mt-6">
                  Capture screenshots of suspicious sports content for AI-powered verification.
                </p>
              </div>
            )}
	    {step === 'preview' && (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-white mb-4">
      Screenshot Captured
    </h2>

    <img
src={croppedImage || capturedImage}
  alt="Captured"
  onClick={() => setShowImageViewer(true)}
className="w-full rounded-xl border border-white/10 cursor-pointer hover:opacity-90 transition"/>

    <div className="flex gap-3">
      <button
        onClick={() => setStep('select')}
        className="px-4 py-2 rounded-xl border border-white/10 text-white"
      >
        Capture Again
      </button>

      <button
	onClick={async () => {
  try {
    setStep("analyzing");

const imageToVerify =
  croppedImage || capturedImage;

const result = await verifyClaimWithGemini(
  "",
  imageToVerify
);

await saveVerificationResult(
  "Live Scan Verification",
  result
);

onVerify(result);
  } catch (error) {
    console.error(error);
    setStep("error");
  }
}}
        className="px-4 py-2 rounded-xl bg-accent-blue text-white"
      >
        Verify
      </button>
    </div>
{showImageViewer && (
  <div
    className="fixed inset-0 z-[200] bg-black/90 flex items-center justify   center p-6"
    onClick={() => setShowImageViewer(false)}
  >
    <div
      className="max-w-7xl max-h-[90vh] overflow-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <ReactCrop
         crop={crop}
         onChange={(c) => setCrop(c)}
         onComplete={(c) => setCompletedCrop(c)}
       >
        <img
  ref={imageRef}
  src={capturedImage}
  alt="Captured"
  className="w-full rounded-xl border border-white/10"
/>
      </ReactCrop>
<div className="flex justify-center gap-4 mt-6">
 <button
  onClick={() => {
    const cropped = getCroppedImage();
    setCroppedImage(cropped);
    setShowImageViewer(false);
  }}
  className="px-5 py-2 rounded-xl border border-white/10 text-white"
>
  Done Cropping
</button>
</div>
    </div>
  </div>
)}
  </div>
)}
            {/* ── SCANNING / ANALYZING ── */}
            {(step === 'scanning' || step === 'analyzing') && (
              <div className="p-10 flex flex-col items-center text-center">
                <div className="relative w-28 h-28 mb-8">
                  <div className="absolute inset-0 border-2 border-accent-blue/15 rounded-full animate-ping" />
                  <div className="absolute inset-3 border-2 border-accent-blue/30 rounded-full" />
                  <div className="absolute inset-5 border-4 border-transparent border-t-accent-blue rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="w-9 h-9 text-accent-blue animate-pulse" />
                  </div>
                </div>

                <p className="font-display text-lg font-bold text-white uppercase tracking-widest animate-pulse mb-1">
                  {scanText}
                </p>
                <p className="text-slate-600 text-xs mb-6">{Math.round(scanProgress)}% complete</p>

                <div className="w-full max-w-xs bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent-blue to-emerald-400"
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>

                {step === 'analyzing' && (
                  <div className="mt-8 flex items-center gap-2 text-accent-blue text-sm font-bold">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Running AI verification pipeline...
                  </div>
                )}
              </div>
            )}

            {/* ── ERROR ── */}
            {step === 'error' && (
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-5">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">Scan Failed</h3>
                <p className="text-slate-400 text-sm max-w-xs leading-relaxed mb-8">{errorMsg}</p>
                <div className="flex gap-4">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white font-bold text-sm transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => { setStep('select'); setErrorMsg(''); }}
                    className="px-6 py-3 rounded-xl bg-accent-blue text-white font-bold text-sm hover:bg-blue-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
