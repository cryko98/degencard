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
  const baseStyles = "relative px-8 py-3 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-sm tracking-wide";
  
  const variants = {
    primary: "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] font-bold",
    secondary: "bg-black text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 hover:border-purple-500/50",
    glitch: "bg-zinc-800 text-white border border-zinc-700"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Running...
        </span>
      ) : children}
    </button>
  );
};