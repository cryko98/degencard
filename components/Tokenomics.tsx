import React from 'react';
import { ScanFace, Shield, Zap } from 'lucide-react';

export const Tokenomics: React.FC = () => {
  return (
    <section className="py-32 relative z-10 bg-[#02040a]">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
                <h3 className="text-[#00F0FF] font-bold tracking-widest uppercase text-sm mb-2">Our Services</h3>
                <h2 className="text-4xl md:text-5xl font-bold text-white">Manage Identity Services</h2>
            </div>
            <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                Managed Identity Services (MIS) are cybersecurity services for users and entire networks, both public and private.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="group bg-[#0b0f19] p-10 rounded-[40px] border border-white/5 hover:border-[#00F0FF]/30 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#00F0FF]/10 flex items-center justify-center mb-8 group-hover:bg-[#00F0FF] transition-colors duration-300">
               <ScanFace size={32} className="text-[#00F0FF] group-hover:text-black transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Deep Analysis</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              AI-driven threats include computer viruses, data breaches, and other attack vectors digital life. We analyze it all.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-[#0b0f19] p-10 rounded-[40px] border border-white/5 hover:border-[#BD00FF]/30 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#BD00FF]/10 flex items-center justify-center mb-8 group-hover:bg-[#BD00FF] transition-colors duration-300">
               <Shield size={32} className="text-[#BD00FF] group-hover:text-black transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Secure Minting</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
               Downloading and running a malware scanner. If it can't detect a virus, you'll have to remove it from device.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-[#0b0f19] p-10 rounded-[40px] border border-white/5 hover:border-white/30 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-white transition-colors duration-300">
               <Zap size={32} className="text-white group-hover:text-black transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">24/7 Availability</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
               Providing assistance and receiving queries for customers, around the clock, ensuring help is available.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};