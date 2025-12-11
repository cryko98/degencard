import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Analyzer } from './components/Analyzer';
import { Tokenomics } from './components/Tokenomics';
import { Button } from './components/Button';
import { X, Crosshair } from 'lucide-react';

function App() {
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);

  useEffect(() => {
    if (isAnalyzerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isAnalyzerOpen]);

  return (
    <div className="min-h-screen bg-[#02040a] text-zinc-200 font-sans overflow-x-hidden relative selection:bg-[#BD00FF] selection:text-white">
      <Header />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#BD00FF]/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20"></div>
      </div>
      
      {/* HERO SECTION - Split Layout like SecHub */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 min-h-screen flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Content */}
            <div className="text-left animate-fade-in-up">
              <div className="inline-block text-[#00F0FF] font-bold tracking-widest text-sm uppercase mb-4">
                AI Powered Identity Protocol
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
                ANALYZE YOUR <br/>
                <span className="bg-gradient-to-r from-[#BD00FF] to-[#00F0FF] bg-clip-text text-transparent">
                  DEGEN SCORE
                </span>
              </h1>
              
              <p className="text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed">
                In today's crypto world, reputation is everything. Our AI analyzes your social footprint to generate your immutable on-chain identity card.
              </p>
              
              <div className="flex items-center gap-6">
                <Button onClick={() => setIsAnalyzerOpen(true)} className="group rounded-full bg-[#00F0FF] hover:bg-[#00c0cc] text-black border-none px-10 py-5">
                  <span className="flex items-center justify-center gap-2 font-bold">
                    MINT CARD
                  </span>
                </Button>
              </div>
            </div>

            {/* Right: Visual Abstract - THE CARD VISUAL */}
            <div className="relative hidden lg:flex justify-center">
               <div className="relative w-full max-w-[400px] animate-float">
                  
                  {/* Decorative Glow Behind */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#BD00FF] to-[#00F0FF] blur-[80px] opacity-30"></div>

                  {/* Static Card Mockup */}
                  <div className="relative aspect-[1/1.85] bg-[#02040a] rounded-[24px] p-3 shadow-2xl overflow-hidden border border-[#00F0FF]/30 rotate-6 hover:rotate-0 transition-transform duration-700 ease-out cursor-default group">
                      {/* Background Grid */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none" 
                           style={{backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
                      </div>

                       {/* Inner Container */}
                       <div className="relative h-full w-full bg-[#050710] rounded-[20px] border border-[#00F0FF]/30 flex flex-col overflow-hidden">
                          
                          {/* Top HUD Bar */}
                          <div className="h-10 border-b border-[#00F0FF]/30 flex justify-between items-center px-4 bg-[#00F0FF]/5 shrink-0">
                              <div className="flex items-center gap-2">
                                   <Crosshair size={12} className="text-[#00F0FF]" />
                                   <span className="font-pixel text-[9px] text-[#00F0FF] pt-1">RARE CARD</span>
                              </div>
                              <div className="flex flex-col items-end leading-none">
                                  <span className="font-tech text-[9px] text-[#BD00FF] uppercase font-bold">SOLANA</span>
                              </div>
                          </div>

                          {/* Main Image Area */}
                          <div className="p-3 relative shrink-0">
                              <div className="relative w-full aspect-square border-x border-[#00F0FF]/30 bg-black overflow-hidden group rounded-xl">
                                   <img src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop" className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" alt="Preview" />
                                   
                                   {/* HUD Corners */}
                                   <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#00F0FF] z-20 rounded-tl-lg"></div>
                                   <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#00F0FF] z-20 rounded-tr-lg"></div>
                                   <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#00F0FF] z-20 rounded-bl-lg"></div>
                                   <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#00F0FF] z-20 rounded-br-lg"></div>

                                   <div className="absolute bottom-3 left-3 right-3 z-20">
                                       <h2 className="font-tech text-xl font-bold text-white uppercase italic tracking-wider drop-shadow-md">
                                           CHART GAZER
                                       </h2>
                                   </div>
                              </div>
                          </div>

                          {/* Info Section */}
                          <div className="px-4 flex flex-col gap-3 shrink-0">
                              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                                   <div>
                                       <h3 className="font-tech text-lg font-bold text-white">@SATOSHI</h3>
                                   </div>
                                   <div className="px-2 py-0.5 bg-[#00F0FF]/10 border border-[#00F0FF] rounded-full">
                                       <span className="font-pixel text-[6px] text-[#00F0FF] uppercase">VERIFIED</span>
                                   </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                   <div className="bg-black border border-zinc-800 p-2 relative overflow-hidden rounded-lg">
                                       <span className="font-pixel text-[6px] text-zinc-600 uppercase block mb-1">POWER</span>
                                       <span className="font-tech text-[10px] font-bold text-white">DIAMOND HANDS</span>
                                   </div>
                                   <div className="bg-black border border-zinc-800 p-2 relative overflow-hidden rounded-lg">
                                       <span className="font-pixel text-[6px] text-zinc-600 uppercase block mb-1">FLAW</span>
                                       <span className="font-tech text-[10px] font-bold text-white">NO EXIT STRATEGY</span>
                                   </div>
                              </div>
                          </div>

                          {/* Footer */}
                          <div className="mt-auto p-3 pt-1 shrink-0">
                              <div className="bg-[#080a14] rounded-lg border border-[#00F0FF]/20 p-2 flex items-end justify-between relative overflow-hidden">
                                   <div className="relative z-10">
                                       <p className="font-pixel text-[6px] text-[#00F0FF]/60 mb-0.5">SCORE</p>
                                       <p className="font-pixel text-2xl text-[#00F0FF] drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                                           94
                                       </p>
                                   </div>
                                   <div className="flex flex-col items-end">
                                       <div className="flex items-end gap-[1px] h-4 mb-0.5 opacity-80">
                                            {[...Array(12)].map((_,i) => (
                                                <div key={i} className={`w-[2px] bg-zinc-500`} style={{height: `${Math.random() * 100}%`}}></div>
                                            ))}
                                       </div>
                                   </div>
                              </div>
                          </div>
                       </div>
                  </div>

               </div>
            </div>

          </div>
        </div>
      </section>

      {/* TOKENOMICS / FEATURES */}
      <Tokenomics />

      {/* ANALYZER MODAL */}
      {isAnalyzerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#02040a]/90 backdrop-blur-2xl transition-all duration-500" onClick={() => setIsAnalyzerOpen(false)}></div>
          
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#0b0f19] rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-fade-in-up flex flex-col overflow-hidden border border-white/10">
            <button 
              onClick={() => setIsAnalyzerOpen(false)}
              className="absolute top-6 right-6 z-50 p-3 bg-white/5 hover:bg-[#BD00FF] hover:text-white rounded-full text-zinc-400 transition-all duration-300"
            >
              <X size={20} />
            </button>
            <div className="overflow-y-auto custom-scrollbar flex-1 w-full">
               <Analyzer />
            </div>
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="bg-[#02040a] border-t border-white/5 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
           <span className="text-xl font-bold tracking-tight font-tech uppercase bg-gradient-to-r from-[#BD00FF] to-[#00F0FF] bg-clip-text text-transparent">
              DEGENCARD
            </span>
          <p className="text-zinc-600 text-xs font-mono uppercase">
            © 2025 DEGEN LABS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;