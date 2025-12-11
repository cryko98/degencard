import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Analyzer } from './components/Analyzer';
import { Button } from './components/Button';
import { Activity, Lock, Search, X, Zap, Cpu } from 'lucide-react';

const Marquee = () => (
  <div className="relative flex overflow-x-hidden bg-cyan-950/20 border-y border-[#00F0FF]/20 py-3 backdrop-blur-sm">
    <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
      {[...Array(20)].map((_, i) => (
        <span key={i} className="text-[#00F0FF] font-mono text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-4">
          IDENTITY_VERIFIED <span className="text-[#BD00FF]">•</span> 
          NO_RUG_PULL <span className="text-[#BD00FF]">•</span> 
          WAGMI_CERTIFIED <span className="text-[#BD00FF]">•</span> 
          SOLANA_MAINNET
        </span>
      ))}
    </div>
    <style>{`
      .animate-marquee {
        animation: marquee 20s linear infinite;
      }
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </div>
);

function App() {
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isAnalyzerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isAnalyzerOpen]);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 font-sans selection:bg-[#00F0FF] selection:text-black overflow-x-hidden">
      <Header />
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-visible">
        
        {/* Ambient Background Lights - Pale Blue as requested */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#00F0FF]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-[#00F0FF]/30 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)] group hover:border-[#00F0FF]/50 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
                </span>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-300 group-hover:text-[#00F0FF] transition-colors font-mono">
                  Protocol V1 Live
                </span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-[0.9] tracking-tighter uppercase bg-gradient-to-r from-[#BD00FF] to-[#00F0FF] bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(189,0,255,0.3)]">
                MINT YOUR <br/>
                DIGITAL SOUL
              </h1>
              
              <p className="text-lg sm:text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed font-light">
                The ultimate on-chain reputation protocol. Upload your PFP, link your handle, and let the AI mint your Degen Score card.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button className="w-full sm:w-auto text-base py-4 font-bold" onClick={() => setIsAnalyzerOpen(true)}>
                  <span className="flex items-center justify-center gap-2">
                    <Zap size={18} className="fill-current" />
                    Launch App
                  </span>
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-6 text-zinc-600">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-[10px] font-bold text-zinc-500">
                       {i}
                     </div>
                   ))}
                </div>
                <div className="text-xs font-mono">
                  <span className="text-[#00F0FF] font-bold">14,203</span> Identities Minted
                </div>
              </div>
            </div>

            {/* Right Visual (Floating Image Only) */}
            <div className="relative hidden lg:block perspective-1000">
              <div className="relative w-[400px] mx-auto transform rotate-y-12 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out group">
                
                {/* Floating Elements (Background) */}
                <div className="absolute -top-12 -right-12 z-0">
                  <div className="w-32 h-32 rounded-full border border-[#00F0FF]/20 animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-0 w-32 h-32 rounded-full border border-[#BD00FF]/20 border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
                </div>

                {/* Glowing Image Container */}
                <div className="relative z-10 p-[3px] rounded-2xl bg-gradient-to-br from-[#00F0FF] via-[#BD00FF] to-[#00F0FF] shadow-[0_0_60px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_80px_rgba(189,0,255,0.4)] transition-shadow duration-500">
                   <div className="bg-[#050505] rounded-xl overflow-hidden relative">
                      <img 
                        src="https://pbs.twimg.com/media/G77Mz27WwAAGrId?format=jpg&name=medium" 
                        className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300 filter contrast-110 saturate-110" 
                        alt="Degen Card Preview"
                      />
                      
                      {/* Subtle Scanline Overlay */}
                      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]"></div>
                   </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <Marquee />

      {/* FEATURES STRIP */}
      <div className="bg-[#030303] border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group p-6 rounded-2xl hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-zinc-800">
            <div className="w-12 h-12 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-xl flex items-center justify-center text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.1)] mb-6 group-hover:scale-110 transition-transform">
              <Search size={24} />
            </div>
            <h3 className="font-bold text-white text-xl mb-3 font-tech">AI Deep Profiling</h3>
            <p className="text-zinc-500 leading-relaxed">Our neural nets scrape the deepest trenches of your on-chain history and social footprint to generate a unique identity.</p>
          </div>
          
          <div className="group p-6 rounded-2xl hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-zinc-800">
             <div className="w-12 h-12 bg-[#BD00FF]/10 border border-[#BD00FF]/20 rounded-xl flex items-center justify-center text-[#BD00FF] shadow-[0_0_15px_rgba(189,0,255,0.1)] mb-6 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <h3 className="font-bold text-white text-xl mb-3 font-tech">Risk Assessment</h3>
            <p className="text-zinc-500 leading-relaxed">Calculates your true risk tolerance based on memecoin hold times and liquidity provision behavior.</p>
          </div>
          
          <div className="group p-6 rounded-2xl hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-zinc-800">
             <div className="w-12 h-12 bg-white/5 border border-white/20 rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6 group-hover:scale-110 transition-transform">
              <Lock size={24} />
            </div>
            <h3 className="font-bold text-white text-xl mb-3 font-tech">Proof of Degen</h3>
            <p className="text-zinc-500 leading-relaxed">Mintable assets that serve as cryptographic proof of your trading style. Flex on X with high-res exports.</p>
          </div>
        </div>
      </div>

      {/* ANALYZER MODAL */}
      {isAnalyzerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" onClick={() => setIsAnalyzerOpen(false)}></div>
          
          {/* Modal Container */}
          <div className="relative w-full max-w-6xl h-full max-h-[95vh] bg-[#050505] border border-[#00F0FF]/30 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.15)] animate-fade-in-up flex flex-col overflow-hidden">
            
            <button 
              onClick={() => setIsAnalyzerOpen(false)}
              className="absolute top-6 right-6 z-50 p-2 bg-white/5 hover:bg-[#00F0FF] hover:text-black rounded-full text-[#00F0FF] transition-all duration-300"
            >
              <X size={20} />
            </button>
            
            <div className="overflow-y-auto custom-scrollbar flex-1 w-full">
               <Analyzer />
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#050505] border-t border-[#00F0FF]/20 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
           <span className="text-lg font-bold tracking-tight font-tech uppercase bg-gradient-to-r from-[#BD00FF] to-[#00F0FF] bg-clip-text text-transparent">
              DEGENCARD
            </span>
          <p className="text-zinc-600 text-xs font-mono">
            EST. 2024 • DEGEN LABS • SOLANA PROTOCOL
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;