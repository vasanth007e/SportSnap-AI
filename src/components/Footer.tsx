export default function Footer() {
  return (
    <footer className="w-full py-12 mt-auto bg-obsidian border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-7xl mx-auto gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-xl font-black text-white font-display">SportSnap AI</div>
          <p className="font-display text-sm tracking-wide text-slate-500 italic">© 2024 SportSnap AI. Elite Media Verification.</p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-8 font-display text-sm tracking-wide">
          <a className="text-slate-500 hover:text-accent-blue transition-colors" href="#">Privacy Policy</a>
          <a className="text-slate-500 hover:text-accent-blue transition-colors" href="#">Terms of Service</a>
          <a className="text-slate-500 hover:text-accent-blue transition-colors" href="#">API Access</a>
          <a className="text-slate-500 hover:text-accent-blue transition-colors" href="#">Journalist Portal</a>
        </nav>

        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 cursor-pointer transition-all">
            <span className="text-lg">𝕏</span>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 cursor-pointer transition-all">
            <span className="text-lg">in</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
