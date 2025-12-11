import React, { useState, useRef } from 'react';
import { Twitter, Upload, Download, RefreshCw, Zap, Skull, Crown, Flame, Crosshair, Fingerprint, ScanLine } from 'lucide-react';
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

    // Artificial delay for effect
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
        scale: 2, // High resolution
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

  // Cyberpunk Neon Theme Engine
  const getCardTheme = (score: number) => {
    if (score >= 90) return { 
      tier: 'MYTHIC',
      bgGradient: 'bg-gradient-to-br from-purple-900 via-fuchsia-600 to-indigo-900',
      border: 'border-cyan-400',
      textAccent: 'text-cyan-400',
      glow: 'shadow-[0_0_60px_rgba(6,182,212,0.4)]',
      foil: 'opacity-40 mix-blend-overlay',
      frame: 'bg-gradient-to-r from-black to-purple-950',
      icon: <Crown size={16} className="text-cyan-300" />
    };
    if (score >= 70) return { 
      tier: 'LEGENDARY',
      bgGradient: 'bg-gradient-to-br from-indigo-950 via-purple-800 to-black',
      border: 'border-fuchsia-500',
      textAccent: 'text-fuchsia-400',
      glow: 'shadow-[0_0_50px_rgba(232,121,249,0.3)]',
      foil: 'opacity-30 mix-blend-color-dodge',
      frame: 'bg-gradient-to-r from-black to-fuchsia-950',
      icon: <Zap size={16} className="text-fuchsia-300" />
    };
    if (score >= 50) return { 
      tier: 'RARE',
      bgGradient: 'bg-gradient-to-br from-cyan-950 via-blue-900 to-black',
      border: 'border-blue-500',
      textAccent: 'text-blue-400',
      glow: 'shadow-[0_0_50px_rgba(59,130,246,0.3)]',
      foil: 'opacity-20 mix-blend-hard-light',
      frame: 'bg-gradient-to-r from-black to-blue-950',
      icon: <ScanLine size={16} className="text-blue-300" />
    };
    return { 
      tier: 'COMMON',
      bgGradient: 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-black',
      border: 'border-zinc-600',
      textAccent: 'text-zinc-400',
      glow: 'shadow-[0_0_30px_rgba(113,113,122,0.2)]',
      foil: 'opacity-10',
      frame: 'bg-zinc-900',
      icon: <Skull size={16} className="text-zinc-300" />
    };
  };

  const theme = state.data ? getCardTheme(state.data.score) : getCardTheme(0);

  return (
    <div id="analyzer" className="w-full min-h-full p-8 md:p-12">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center justify-items-center h-full">
        
        {/* LEFT: INPUT FORM */}
        <div className="w-full max-w-md py-8">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,1)]"></span>
              <span className="text-xs font-mono text-cyan-500/80 uppercase tracking-widest">Protocol V1</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight font-glitch neon-text-glow">
              IDENTITY FORGE
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">Upload a 1:1 ratio image to mint your Cyberpunk Degen Card. AI analysis included.</p>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-8">
            
            {/* Image Upload - Enforced Square */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-cyan-500/80 uppercase tracking-widest flex justify-between">
                <span>Subject Photo</span>
                <span className="text-zinc-600">REQ: 1:1 RATIO</span>
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full aspect-square max-w-[240px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 group overflow-hidden relative shadow-lg
                  ${imagePreview ? 'border-cyan-500/50 bg-black' : 'border-zinc-800 hover:border-cyan-500/50 bg-zinc-900/30'}`}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="relative z-10 flex items-center gap-2 text-cyan-200 font-medium bg-black/80 px-4 py-2 rounded-full border border-cyan-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      <RefreshCw size={14} /> Change Asset
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-zinc-900 rounded-full border border-zinc-700 group-hover:border-cyan-500/50 group-hover:bg-cyan-900/20 transition-all duration-300">
                      <Upload className="text-zinc-500 group-hover:text-cyan-400 transition-colors" size={24} />
                    </div>
                    <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Upload Image</span>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            </div>

            {/* Username Input */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-cyan-500/80 uppercase tracking-widest">Target Handle</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Twitter size={16} className="text-zinc-600 group-focus-within:text-cyan-400 transition-colors"/>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="crypto_whale"
                  required
                  className="w-full bg-[#0a0a0a] border border-zinc-800 text-cyan-100 text-lg p-4 pl-12 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 font-mono placeholder:text-zinc-800 shadow-inner"
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
              {state.status === 'idle' || state.status === 'error' ? 'INITIALIZE SCAN' : 'PROCESSING CHAIN DATA...'}
            </Button>
            
          </form>
        </div>

        {/* RIGHT: CARD PREVIEW */}
        <div className="flex flex-col items-center justify-center relative w-full pb-8 lg:pb-0">
          
          {(state.status === 'idle' || state.status === 'scanning' || state.status === 'analyzing') && (
             <div className="w-[380px] h-[580px] rounded-2xl border border-dashed border-zinc-800 flex flex-col items-center justify-center bg-zinc-900/10 relative overflow-hidden group">
                {/* Scanline Effect */}
                {(state.status === 'scanning' || state.status === 'analyzing') && (
                  <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-[20%] w-full animate-[progress_2s_infinite_linear]"></div>
                )}
                
                {state.status === 'idle' ? (
                  <div className="text-center p-8 z-10 opacity-50 group-hover:opacity-80 transition-opacity">
                    <div className="w-16 h-16 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <Fingerprint className="text-zinc-700" size={32} />
                    </div>
                    <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">Awaiting Identity Data</p>
                  </div>
                ) : (
                  <div className="text-center z-10">
                     <div className="font-glitch text-6xl font-bold mb-6 text-cyan-500/50 neon-text-glow">{Math.floor(Math.random() * 100)}</div>
                     <p className="text-cyan-500 text-[10px] font-mono uppercase tracking-[0.3em] animate-pulse">
                        {state.status === 'scanning' ? 'ACCESSING MEMPOOL...' : 'CALCULATING RUG RISK...'}
                     </p>
                  </div>
                )}
             </div>
          )}

          {state.status === 'complete' && state.data && (
            <div className="animate-fade-in-up flex flex-col items-center gap-8 w-full max-w-[420px]">
              
              {/* === THE SPECIAL CARD === */}
              {/* Added min-w and removed fixed scale constraints to prevent clipping */}
              <div 
                ref={cardRef}
                className={`relative w-full aspect-[2/3.1] rounded-[24px] p-[12px] shadow-2xl ${theme.glow} transition-all duration-500`}
                style={{ background: '#050505' }}
              >
                 {/* Outer Glow/Border Gradient */}
                 <div className={`absolute inset-0 rounded-[24px] ${theme.bgGradient} opacity-60 blur-md`}></div>
                 <div className={`absolute inset-0 rounded-[24px] border border-white/10`}></div>

                 {/* Main Card Chassis */}
                 <div className="relative w-full h-full bg-[#050505] rounded-[18px] overflow-hidden flex flex-col border border-white/5">
                    
                    {/* Background Texture - Circuit */}
                    <div className="absolute inset-0 opacity-20" style={{ 
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.2) 1px, transparent 0)', 
                        backgroundSize: '24px 24px' 
                    }}></div>
                    
                    {/* Holographic Foil Layer */}
                    <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/10 to-transparent transform -skew-x-12 ${theme.foil} pointer-events-none z-20`}></div>

                    {/* === HEADER === */}
                    <div className="relative z-30 flex justify-between items-center p-5 border-b border-white/10 bg-black/60 backdrop-blur-md">
                        <div className="flex items-center gap-2.5">
                           <div className="p-1 rounded bg-white/5 border border-white/10">
                              {theme.icon}
                           </div>
                           <span className={`text-sm font-black tracking-widest ${theme.textAccent}`}>{theme.tier} CARD</span>
                        </div>
                        <div className="text-[9px] font-mono text-zinc-500 flex flex-col items-end leading-tight">
                           <span className="text-cyan-500/50">SOLANA // MAINNET</span>
                           <span>ID: {Math.random().toString(36).substring(2, 7).toUpperCase()}</span>
                        </div>
                    </div>

                    {/* === IMAGE SECTION === */}
                    <div className="relative p-5 pb-0 z-10">
                        {/* Frame around image */}
                        <div className={`relative w-full aspect-square rounded-t-xl overflow-hidden border-x border-t ${theme.border} bg-black group shadow-2xl`}>
                            {/* Corner Accents */}
                            <div className={`absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 ${theme.border} z-30`}></div>
                            <div className={`absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 ${theme.border} z-30`}></div>
                            <div className={`absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 ${theme.border} z-30`}></div>
                            <div className={`absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 ${theme.border} z-30`}></div>

                            {/* Image */}
                            {imagePreview && (
                                <img 
                                    src={imagePreview} 
                                    className="w-full h-full object-cover filter contrast-125 saturate-125" 
                                    alt="Identity" 
                                />
                            )}
                            
                            {/* Crosshair Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none mix-blend-overlay">
                                <Crosshair className="text-cyan-200 w-40 h-40 opacity-30" strokeWidth={0.5} />
                            </div>

                            {/* Rank Overlay Title */}
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-10">
                                <h2 className={`font-black text-2xl uppercase italic tracking-tighter leading-none text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
                                    {state.data.rank}
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* === INFO SECTION === */}
                    <div className="flex-1 relative z-30 flex flex-col p-5 pt-3">
                        
                        {/* Handle & Verified Stamp */}
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex flex-col">
                              <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest mb-0.5">Operative</span>
                              <span className="text-xl font-bold text-white tracking-tight flex items-center gap-1">
                                @{username} <span className="text-cyan-400 text-[10px] bg-cyan-400/10 px-1 rounded ml-1">✓</span>
                              </span>
                           </div>
                           
                           {/* Rotated Stamp */}
                           <div className={`border ${theme.border} bg-black/80 ${theme.textAccent} px-3 py-1 transform -rotate-3 opacity-90 shadow-lg backdrop-blur-sm`}>
                              <span className="text-[9px] font-black uppercase tracking-[0.2em]">VERIFIED</span>
                           </div>
                        </div>

                        {/* Description Box */}
                        <div className={`p-3.5 rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm mb-5 shadow-inner`}>
                           <p className="text-xs text-zinc-300 font-medium leading-relaxed font-mono">
                              "{state.data.description}"
                           </p>
                        </div>

                        {/* Stats / Attributes */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                           <div className="bg-black/40 border border-zinc-800 p-2.5 rounded flex flex-col gap-1.5">
                              <span className="text-[8px] uppercase text-zinc-500 font-bold tracking-wider">Super Power</span>
                              <div className="flex items-center gap-2">
                                 <Flame size={12} className="text-purple-500" />
                                 <span className="text-[10px] font-bold text-white truncate">{state.data.pros[0]}</span>
                              </div>
                           </div>
                           <div className="bg-black/40 border border-zinc-800 p-2.5 rounded flex flex-col gap-1.5">
                              <span className="text-[8px] uppercase text-zinc-500 font-bold tracking-wider">Fatal Flaw</span>
                              <div className="flex items-center gap-2">
                                 <Skull size={12} className="text-cyan-500" />
                                 <span className="text-[10px] font-bold text-white truncate">{state.data.cons[0]}</span>
                              </div>
                           </div>
                        </div>
                        
                        {/* === FOOTER: SCORE & BARCODE === */}
                        <div className={`mt-auto rounded-xl ${theme.frame} p-2.5 border border-white/10 flex items-center justify-between shadow-lg`}>
                           {/* Score Display */}
                           <div className="flex flex-col items-center px-3 border-r border-white/10">
                              <span className="text-[8px] uppercase font-bold text-white/50 mb-0.5">Degen Score</span>
                              <span className={`text-3xl font-glitch leading-none ${theme.textAccent} drop-shadow-md`}>{state.data.score}</span>
                           </div>

                           {/* Barcode Graphic */}
                           <div className="flex-1 flex flex-col items-end px-2 gap-1 opacity-70">
                              <div className="h-5 w-full flex items-end justify-end gap-[2px]">
                                 {[...Array(20)].map((_, i) => (
                                    <div key={i} className={`bg-white h-[${Math.max(40, Math.random() * 100)}%] w-[${Math.random() > 0.5 ? '2px' : '3px'}]`}></div>
                                 ))}
                              </div>
                              <span className="text-[6px] font-mono text-white/80 tracking-[0.3em]">
                                 SOL-NET-AUTH-{Math.random().toString().substring(2,6)}
                              </span>
                           </div>
                        </div>

                    </div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full">
                <Button variant="secondary" className="flex-1 border-purple-900/40 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50" onClick={() => {
                  setState({status: 'idle'});
                  setUsername('');
                  setImagePreview(null);
                }}>
                  New Identity
                </Button>
                <Button onClick={handleDownload} variant="primary" className="flex-1">
                  <span className="flex items-center justify-center gap-2">
                    <Download size={16} /> Download
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