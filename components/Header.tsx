import React from 'react';
import { Copy } from 'lucide-react';

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
);

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
      <div className="bg-[#0b0f19]/80 backdrop-blur-md rounded-full px-8 py-4 flex items-center justify-between w-full max-w-7xl border border-white/5">
        
        {/* Logo - Text Only */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight font-tech uppercase bg-gradient-to-r from-[#BD00FF] to-[#00F0FF] bg-clip-text text-transparent">
            DEGENCARD
          </span>
        </div>
        
        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Contract Address Pill */}
          <div className="hidden md:flex items-center gap-3 px-5 py-2 bg-[#1a1f2e] border border-white/5 rounded-full hover:border-[#00F0FF]/30 transition-colors group cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="text-zinc-400 font-mono text-xs tracking-wider group-hover:text-white transition-colors">CA: SOON</span>
            <Copy size={14} className="text-zinc-500 group-hover:text-[#00F0FF] transition-colors" />
          </div>

          <a href="https://x.com" target="_blank" rel="noreferrer" className="p-2 text-zinc-400 hover:text-white transition-colors">
            <XLogo />
          </a>
        </div>
      </div>
    </header>
  );
};