import React from 'react';
import { Copy } from 'lucide-react';

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
);

export const Header: React.FC = () => {
  const ca = "5TFzzLXgTmyfm1TR7fJzSudhJSe3BESTmeYvtzdQpump";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ca);
    // Optional: You could add a toast notification here
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - Text Only, Pixel Font, Purple -> Blue Gradient */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold tracking-tight font-tech uppercase bg-gradient-to-r from-[#BD00FF] to-[#00F0FF] bg-clip-text text-transparent filter drop-shadow-[0_0_5px_rgba(189,0,255,0.5)]">
              DEGENCARD
            </span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            {/* Contract Address Box */}
            <div 
              onClick={copyToClipboard}
              className="hidden md:flex items-center gap-3 px-4 py-2 bg-purple-900/10 hover:bg-purple-900/20 border border-purple-500/20 rounded-lg transition-colors group cursor-pointer shadow-[0_0_10px_rgba(168,85,247,0.1)] active:scale-95"
              title="Copy Address"
            >
              <span className="text-purple-400 font-mono text-xs font-bold uppercase">CA:</span>
              <span className="text-purple-200/80 font-mono text-xs tracking-wider">{ca}</span>
              <Copy size={14} className="text-purple-500 group-hover:text-[#00F0FF] transition-colors" />
            </div>

            <nav className="flex items-center gap-6">
               <a href="https://x.com/degencardpump?s=11" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#00F0FF] transition-colors">
                <XLogo />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};