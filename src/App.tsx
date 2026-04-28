import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import VerificationPage from './pages/VerificationPage';
import ResultPage from './pages/ResultPage';
import FeedPage from './pages/FeedPage';
import InsightsPage from './pages/InsightsPage';
import ArchivesPage from './pages/ArchivesPage';
import { VerificationResultData } from './lib/gemini';

export default function App() {
  const [activeTab, setActiveTab] = useState('verification');
  const [showResult, setShowResult] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResultData | null>(null);

  const handleVerify = useCallback((result: VerificationResultData) => {
    setVerificationResult(result);
    setShowResult(true);
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setShowResult(false);
  }, []);

  const renderContent = () => {
    if (showResult && activeTab === 'verification' && verificationResult) {
      return <ResultPage data={verificationResult} onReset={() => setShowResult(false)} />;
    }

    switch (activeTab) {
      case 'verification':
        return <VerificationPage onVerify={handleVerify} />;
      case 'feed':
        return <FeedPage />;
      case 'insights':
        return <InsightsPage />;
      case 'archives':
        return <ArchivesPage />;
      default:
        return <VerificationPage onVerify={handleVerify} />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-accent-blue/30 selection:text-white">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="glow-accent top-[-100px] left-[-100px] animate-pulse"></div>
        <div className="glow-secondary bottom-[-50px] right-[-50px]"></div>
      </div>

      <Header activeTab={activeTab} setActiveTab={handleTabChange} />

      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={showResult ? 'result' : activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
