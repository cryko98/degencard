import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glitch';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-8 py-4 font-medium rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-sm tracking-wide overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#00F0FF] to-[#00A3FF] text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] font-bold border border-transparent",
    secondary: "bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 backdrop-blur-md",
    glitch: "bg-zinc-800 text-white border border-zinc-700"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Shine effect */}
      <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[30deg] group-hover:animate-[shine_1s_ease-in-out]" style={{ animation: 'none' }}></div>
      <style>{`
        .group:hover div {
            animation: shine 0.75s;
        }
        @keyframes shine {
            100% { left: 125%; }
        }
      `}</style>

      {isLoading ? (
        <span className="flex items-center gap-2 relative z-10">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      )}
    </button>
  );
};