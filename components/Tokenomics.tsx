import React from 'react';
import { PieChart, TrendingUp, ShieldCheck } from 'lucide-react';

export const Tokenomics: React.FC = () => {
  return (
    <section id="tokenomics" className="py-32 bg-[#050505] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-900/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter neon-text-glow">
            PROTOCOL <span className="text-zinc-600">STATS</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Transparent on-chain metrics governing the Degen Identity ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative p-8 rounded-2xl border border-zinc-800 bg-black/80 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 h-full">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-700 mb-6 group-hover:border-cyan-500/50 group-hover:text-cyan-400 text-zinc-400 transition-colors">
                 <PieChart size={20} />
              </div>
              <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 group-hover:text-cyan-400 transition-colors">Total Supply</h3>
              <p className="text-4xl font-mono text-white tracking-tighter mb-2">1,000M</p>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full w-full bg-cyan-500"></div>
              </div>
              <p className="text-zinc-600 mt-4 text-xs font-mono">FIXED SUPPLY • NO MINT FUNCTION</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="relative p-8 rounded-2xl border border-zinc-800 bg-black/80 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 h-full">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-700 mb-6 group-hover:border-purple-500/50 group-hover:text-purple-400 text-zinc-400 transition-colors">
                 <TrendingUp size={20} />
              </div>
              <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 group-hover:text-purple-400 transition-colors">Liquidity</h3>
              <p className="text-4xl font-mono text-white tracking-tighter mb-2">LOCKED</p>
               <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-purple-500"></div>
              </div>
              <p className="text-zinc-600 mt-4 text-xs font-mono">LP BURNED • 100% SECURE</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="relative p-8 rounded-2xl border border-zinc-800 bg-black/80 backdrop-blur-sm hover:border-fuchsia-500/50 transition-all duration-300 h-full">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-700 mb-6 group-hover:border-fuchsia-500/50 group-hover:text-fuchsia-400 text-zinc-400 transition-colors">
                 <ShieldCheck size={20} />
              </div>
              <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 group-hover:text-fuchsia-400 transition-colors">Authority</h3>
              <p className="text-4xl font-mono text-white tracking-tighter mb-2">REVOKED</p>
               <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full w-full bg-fuchsia-500"></div>
              </div>
              <p className="text-zinc-600 mt-4 text-xs font-mono">IMMUTABLE CONTRACT</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};