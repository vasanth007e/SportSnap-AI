import { motion } from 'motion/react';
import { LayoutDashboard, Newspaper, ShieldCheck, Archive, User, LogIn } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/src/services/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navItems = [
    { id: 'verification', label: 'Verification', icon: ShieldCheck },
    { id: 'feed', label: 'Feed', icon: Newspaper },
    { id: 'insights', label: 'Insights', icon: LayoutDashboard },
    { id: 'archives', label: 'Archives', icon: Archive },
  ];

const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error(error);
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <header className="sticky top-0 w-full z-50 bg-obsidian/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-8 py-4 max-w-[1440px] mx-auto">
        <div 
          className="text-2xl font-black italic tracking-tighter text-white font-display cursor-pointer"
          onClick={() => setActiveTab('verification')}
        >
          SportSnap AI
        </div>

        <nav className="hidden md:flex gap-4 font-display font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "px-4 py-1.5 rounded-lg transition-all duration-300 relative group",
                activeTab === item.id ? "text-accent-blue" : "text-slate-400 hover:text-white"
              )}
            >
              {item.label}
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-accent-blue"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4 font-display">
          
  <button
  onClick={user ? handleLogout : handleGoogleLogin}
  className="text-slate-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2"
>
  <LogIn className="w-4 h-4" />
  {user ? `Logout (${user.displayName})` : "Log In"}
</button>
          <button className="bg-accent-blue text-white px-6 py-2 rounded-xl font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-95 transition-all duration-200 text-sm">
            Get Pro
          </button>
        </div>
      </div>
    </header>
  );
}
