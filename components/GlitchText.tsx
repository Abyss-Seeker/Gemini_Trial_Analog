import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  hoverEffect?: boolean;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Tag = 'p', className = '', hoverEffect = false }) => {
  return (
    <Tag className={`relative inline-block ${className} ${hoverEffect ? 'group' : ''}`}>
      <span className="relative z-10">{text}</span>
      <span className={`absolute top-0 left-[2px] -z-10 text-red-500 opacity-70 mix-blend-screen animate-pulse ${hoverEffect ? 'group-hover:translate-x-1' : ''}`}>
        {text}
      </span>
      <span className={`absolute top-0 -left-[2px] -z-10 text-cyan-500 opacity-70 mix-blend-screen animate-pulse delay-75 ${hoverEffect ? 'group-hover:-translate-x-1' : ''}`}>
        {text}
      </span>
    </Tag>
  );
};
