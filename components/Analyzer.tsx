import React, { useState, useRef } from 'react';
import { Twitter, Upload, Download, RefreshCw, Crosshair, Activity, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { analyzeProfile } from '../services/geminiService';
import { AnalysisState, Platform } from '../types';
import html2canvas from 'html2canvas';

export const Analyzer: React.FC = () => {
  const [username, setUsername] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [state, setState] = useState<AnalysisState>({ status: 'idle' });
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setState({ status: 'scanning' });

    setTimeout(async () => {
      setState({ status: 'analyzing' });
      try {
        const result = await analyzeProfile(username, Platform.TWITTER);
        setState({ status: 'complete', data: result });
      } catch (err: any) {
        setState({ status: 'error', error: err.message || 'Generation failed' });
      }
    }, 2000);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const safeName = username.replace(/[^a-z0-9]/gi, '_').substring(0, 20);
      link.href = image;
      link.download = `DEGEN_CARD_${safeName}.png`;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div id="analyzer" className="w-full min-h-full p-4 md:p-12 bg-gradient-to-br from-[#050510] to-[#020205]">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start justify-items-center h-full">
        
        {/* LEFT: INPUT FORM */}
        <div className="w-full max-w-md py-8">
          <div className="mb-10">
             <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse shadow-[0_0_10px_#00F0FF]"></span>
              <span className="text-xs font-bold text-[#00F0FF] tracking-wider uppercase">System Ready</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-4 font-tech">
              Identity <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#BD00FF]">Scanner</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Initialize the neural link. Upload your avatar and handle to generate your Web3 reputation credential.
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-8">
            
            {/* Image Upload */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex justify-between px-1">
                <span>Avatar Source</span>
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full aspect-square max-w-[180px] rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 group overflow-hidden relative
                  ${imagePreview ? 'border-[#00F0FF] bg-black shadow-[0_0_30px_rgba(0,240,255,0.2)]' : 'border-zinc-800 hover:border-[#00F0FF]/50 bg-white/5'}`}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-opacity" />
                    <div className="relative z-10 flex items-center gap-2 text-[#00F0FF] font-bold text-sm bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-[#00F0FF]/30">
                      <RefreshCw size={14} /> Replace
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00F0FF]/20 transition-colors">
                        <Upload className="text-zinc-400 group-hover:text-[#00F0FF] transition-colors" size={24} />
                    </div>
                    <span className="text-zinc-500 font-medium text-xs uppercase group-hover:text-[#00F0FF]">Click to Upload</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              </div>
            </div>

            {/* Username Input */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-1">Social Handle</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Twitter size={20} className="text-zinc-600 group-focus-within:text-[#00F0FF] transition-colors"/>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white text-xl p-5 pl-14 rounded-2xl focus:outline-none focus:border-[#00F0FF] focus:bg-white/10 transition-all duration-300 font-tech uppercase tracking-wider placeholder:text-zinc-700"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              disabled={!imagePreview}
              isLoading={state.status === 'scanning' || state.status === 'analyzing'}
            >
              {state.status === 'idle' || state.status === 'error' ? (
                  <span className="flex items-center gap-2"> <Sparkles size={18} /> MINT CARD </span>
              ) : 'ANALYZING CHAIN...'}
            </Button>
            
          </form>
        </div>

        {/* RIGHT: CARD PREVIEW */}
        <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[600px] bg-white/5 rounded-[40px] border border-white/5 backdrop-blur-sm p-8">
          
          {(state.status === 'idle' || state.status === 'scanning' || state.status === 'analyzing') && (
             <div className="w-full max-w-[380px] aspect-[1/1.6] rounded-3xl border border-dashed border-zinc-700 flex flex-col items-center justify-center bg-black/20 relative overflow-hidden">
                {(state.status === 'scanning' || state.status === 'analyzing') && (
                  <div className="absolute inset-0 bg-[#00F0FF]/5 z-0 animate-pulse">
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#00F0FF]/50 shadow-[0_0_20px_#00F0FF] animate-[scan_2s_linear_infinite]"></div>
                      <style>{`@keyframes scan { 0% {top: 0%} 100% {top: 100%} }`}</style>
                  </div>
                )}
                <div className="text-center z-10 p-6">
                   <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
                       <Activity className={`w-8 h-8 ${state.status === 'idle' ? 'text-zinc-700' : 'text-[#00F0FF] animate-bounce'}`} />
                   </div>
                   <p className="font-tech text-lg text-zinc-500 uppercase tracking-widest">
                      {state.status === 'idle' ? 'AWAITING INPUT' : 'PROCESSING...'}
                   </p>
                </div>
             </div>
          )}

          {state.status === 'complete' && state.data && (
            <div className="animate-fade-in-up flex flex-col items-center gap-8 w-full max-w-[420px]">
              
              {/* === THE CARD (Keeping the generated style mostly intact but slightly softer container) === */}
              <div 
                ref={cardRef}
                className="relative w-full aspect-[1/1.85] bg-[#02040a] rounded-[24px] p-3 shadow-2xl overflow-hidden border border-[#00F0FF]/30"
                style={{ 
                    boxShadow: '0 0 60px rgba(0, 240, 255, 0.2)'
                }}
              >
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" 
                     style={{backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
                </div>

                 {/* Inner Container */}
                 <div className="relative h-full w-full bg-[#050710] rounded-[20px] border border-[#00F0FF]/30 flex flex-col overflow-hidden">
                    
                    {/* Top HUD Bar */}
                    <div className="h-12 border-b border-[#00F0FF]/30 flex justify-between items-center px-5 bg-[#00F0FF]/5 shrink-0">
                        <div className="flex items-center gap-2">
                             <Crosshair size={14} className="text-[#00F0FF]" />
                             <span className="font-pixel text-[10px] text-[#00F0FF] pt-1">RARE CARD</span>
                        </div>
                        <div className="flex flex-col items-end leading-none">
                            <span className="font-tech text-[10px] text-[#BD00FF] tracking-wider uppercase font-bold">SOLANA // MAINNET</span>
                            <span className="font-tech text-[9px] text-zinc-500 uppercase">ID: {Math.random().toString(36).substring(2, 7).toUpperCase()}</span>
                        </div>
                    </div>

                    {/* Main Image Area with HUD Corners */}
                    <div className="p-4 relative shrink-0">
                        <div className="relative w-full aspect-square border-x border-[#00F0FF]/30 bg-black overflow-hidden group rounded-xl">
                             {/* Chart overlay effect in background */}
                             <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] mix-blend-overlay z-10"></div>
                             
                             {/* The Image */}
                             <img src={imagePreview!} className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500 z-0 relative" alt="Profile" />

                             {/* Red/Green Candles Overlay (Subtle) */}
                             <div className="absolute inset-0 z-10 opacity-20 mix-blend-screen pointer-events-none" style={{
                                 background: 'linear-gradient(180deg, rgba(255,0,0,0) 0%, rgba(255,0,0,0.2) 50%, rgba(0,255,0,0.2) 100%)'
                             }}></div>

                             {/* HUD Corners */}
                             <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#00F0FF] z-20 rounded-tl-lg"></div>
                             <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#00F0FF] z-20 rounded-tr-lg"></div>
                             <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#00F0FF] z-20 rounded-bl-lg"></div>
                             <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#00F0FF] z-20 rounded-br-lg"></div>
                             
                             {/* Floating Rank Name inside Image Area at bottom */}
                             <div className="absolute bottom-4 left-4 right-4 z-20">
                                 <h2 className="font-tech text-2xl font-bold text-white uppercase italic tracking-wider drop-shadow-md">
                                     {state.data.rank}
                                 </h2>
                                 <span className="font-pixel text-[9px] text-[#BD00FF] uppercase">(LEGENDARY)</span>
                             </div>
                        </div>
                    </div>

                    {/* Middle Info Section */}
                    <div className="px-5 flex flex-col gap-4 shrink-0">
                        
                        {/* Name & Verified */}
                        <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                             <div>
                                 <p className="font-tech text-[10px] text-zinc-500 uppercase tracking-widest">OPERATIVE</p>
                                 <h3 className="font-tech text-xl font-bold text-white">@{username}</h3>
                             </div>
                             <div className="px-3 py-1 bg-[#00F0FF]/10 border border-[#00F0FF] rounded-full">
                                 <span className="font-pixel text-[8px] text-[#00F0FF] uppercase">VERIFIED</span>
                             </div>
                        </div>

                        {/* Description Quote */}
                        <div className="bg-zinc-900/50 p-3 rounded-lg border-l-2 border-[#BD00FF]">
                             <p className="font-mono text-[10px] text-zinc-400 leading-relaxed italic">
                                 "{state.data.description}"
                             </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                             <div className="bg-black border border-zinc-800 p-2 relative overflow-hidden rounded-lg">
                                 <span className="font-pixel text-[7px] text-zinc-600 uppercase block mb-1">SUPER POWER</span>
                                 <span className="font-tech text-xs font-bold text-white truncate block">{state.data.pros[0]}</span>
                                 <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#00F0FF]"></div>
                             </div>
                             <div className="bg-black border border-zinc-800 p-2 relative overflow-hidden rounded-lg">
                                 <span className="font-pixel text-[7px] text-zinc-600 uppercase block mb-1">FATAL FLAW</span>
                                 <span className="font-tech text-xs font-bold text-white truncate block">{state.data.cons[0]}</span>
                                 <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#BD00FF]"></div>
                             </div>
                        </div>

                    </div>

                    {/* Bottom Footer Area */}
                    <div className="mt-auto p-4 pt-2 shrink-0">
                        <div className="bg-[#080a14] rounded-xl border border-[#00F0FF]/20 p-3 flex items-end justify-between relative overflow-hidden">
                             {/* Scanline in footer */}
                             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:4px_4px] opacity-20 pointer-events-none"></div>

                             {/* Score */}
                             <div className="relative z-10">
                                 <p className="font-pixel text-[8px] text-[#00F0FF]/60 mb-1">DEGEN SCORE</p>
                                 <p className="font-pixel text-4xl text-[#00F0FF] drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                                     {state.data.score}
                                 </p>
                             </div>

                             {/* Barcode / ID */}
                             <div className="flex flex-col items-end relative z-10">
                                 <div className="flex items-end gap-[1px] h-6 mb-1 opacity-80">
                                      {[...Array(24)].map((_,i) => (
                                          <div key={i} className={`w-[2px] bg-zinc-500`} style={{height: `${Math.random() * 100}%`}}></div>
                                      ))}
                                 </div>
                                 <span className="font-mono text-[8px] text-zinc-600 uppercase">SOL-NET-AUTH-{Math.floor(Math.random()*9000)+1000}</span>
                             </div>
                        </div>
                    </div>

                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full">
                <Button variant="secondary" className="flex-1 rounded-full text-xs font-bold" onClick={() => {
                  setState({status: 'idle'});
                  setUsername('');
                  setImagePreview(null);
                }}>
                  RESET
                </Button>
                <Button onClick={handleDownload} variant="primary" className="flex-1 rounded-full text-xs">
                  <span className="flex items-center justify-center gap-2">
                    <Download size={16} /> SAVE IMAGE
                  </span>
                </Button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};