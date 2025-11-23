import React from 'react';

export const CrtOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden w-full h-full">
      {/* Scanlines */}
      <div 
        className="absolute inset-0 w-full h-full opacity-10"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 2px, 3px 100%'
        }}
      />
      
      {/* Moving Tracking Line */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-white opacity-5 vhs-tracking" />
      
      {/* Vignette */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* RGB Shift/Noise wrapper - simulated via mix-blend-mode in CSS if desired, but here we keep it simple for performance */}
      <div className="absolute inset-0 opacity-[0.03] animate-[noise_0.2s_infinite] bg-white pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};
