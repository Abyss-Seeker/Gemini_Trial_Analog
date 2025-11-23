import React, { useState, useEffect, useMemo } from 'react';
import { HorrorTheme, Artwork, GeneratedLore } from './types';
import { generateArtifactLore } from './services/geminiService';
import { CrtOverlay } from './components/CrtOverlay';
import { GlitchText } from './components/GlitchText';
import { ThemeSelector } from './components/ThemeSelector';

const ARTWORKS: Record<HorrorTheme, Artwork[]> = {
  [HorrorTheme.NUCLEAR]: [
    { id: 'n1', title: 'REACTOR_CORE_09', imageUrl: 'https://picsum.photos/800/600?grayscale&blur=2', year: '1986', threatLevel: 'CRITICAL' },
    { id: 'n2', title: 'SHADOW_IMPRINT', imageUrl: 'https://picsum.photos/800/800?grayscale', year: '1992', threatLevel: 'MODERATE' },
    { id: 'n3', title: 'MUTATION_LOG_A', imageUrl: 'https://picsum.photos/600/800?grayscale', year: '2001', threatLevel: 'CONTAINED' },
  ],
  [HorrorTheme.CASSETTE]: [
    { id: 'c1', title: 'SYSTEM_32_GHOST', imageUrl: 'https://picsum.photos/800/500?blur=1', year: '1982', threatLevel: 'VIRAL' },
    { id: 'c2', title: 'MAGNETIC_ECHO', imageUrl: 'https://picsum.photos/700/700', year: '1989', threatLevel: 'UNKNOWN' },
    { id: 'c3', title: 'TERMINAL_FACE', imageUrl: 'https://picsum.photos/600/600', year: '1995', threatLevel: 'HIGH' },
  ],
  [HorrorTheme.PUNK]: [
    { id: 'p1', title: 'RIORT_SUBJECT_1', imageUrl: 'https://picsum.photos/800/600', year: '2077', threatLevel: 'ANARCHY' },
    { id: 'p2', title: 'XEROX_SOUL', imageUrl: 'https://picsum.photos/500/800', year: '2024', threatLevel: 'LOW' },
    { id: 'p3', title: 'NO_SIGNAL', imageUrl: 'https://picsum.photos/900/600', year: 'UNKNOWN', threatLevel: 'NULL' },
  ],
};

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<HorrorTheme>(HorrorTheme.NUCLEAR);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [lore, setLore] = useState<GeneratedLore | null>(null);
  const [loadingLore, setLoadingLore] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);

  // Initial boot sequence effect
  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Theme configuration helper
  const themeConfig = useMemo(() => {
    switch (currentTheme) {
      case HorrorTheme.NUCLEAR:
        return {
          bg: 'bg-zinc-950',
          accent: 'text-yellow-500',
          border: 'border-yellow-600',
          font: 'font-terminal',
          filter: 'sepia(1) hue-rotate(50deg) contrast(1.5) brightness(0.7)',
        };
      case HorrorTheme.CASSETTE:
        return {
          bg: 'bg-black',
          accent: 'text-amber-500',
          border: 'border-amber-700',
          font: 'font-vhs',
          filter: 'hue-rotate(-30deg) contrast(1.2) saturate(0.5)',
        };
      case HorrorTheme.PUNK:
        return {
          bg: 'bg-neutral-900',
          accent: 'text-red-600',
          border: 'border-red-600',
          font: 'font-punk',
          filter: 'grayscale(1) contrast(2) brightness(1.2)',
        };
    }
  }, [currentTheme]);

  // Handle Artwork Selection & Lore Generation
  const handleArtworkSelect = async (art: Artwork) => {
    setSelectedArtwork(art);
    setLore(null);
    setLoadingLore(true);
    
    // Simulate system delay before processing
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const newLore = await generateArtifactLore(currentTheme, art.title);
      setLore(newLore);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLore(false);
    }
  };

  if (bootSequence) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center font-vhs text-2xl text-green-500">
        <div className="w-96">
          <p className="animate-pulse">INITIALIZING...</p>
          <div className="w-full h-4 border border-green-800 mt-2 p-0.5">
            <div className="h-full bg-green-500 animate-[width_2s_ease-out_forwards] w-full origin-left" />
          </div>
          <p className="mt-2 text-sm opacity-70">LOADING ASSETS... DONE</p>
          <p className="text-sm opacity-70">CONNECTING TO ARCHIVE... DONE</p>
        </div>
        <CrtOverlay />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-700 ${themeConfig.bg} text-gray-200 overflow-hidden relative`}>
      <CrtOverlay />

      {/* Header */}
      <header className={`p-6 border-b ${themeConfig.border} flex justify-between items-end relative z-30`}>
        <div>
          <GlitchText 
            text="SIGNAL_LOST_ARCHIVES" 
            as="h1" 
            className={`text-4xl md:text-6xl ${themeConfig.font} ${themeConfig.accent} tracking-tighter`} 
          />
          <p className={`text-xs mt-2 uppercase tracking-[0.5em] opacity-60 ${themeConfig.font}`}>
            / MODE: {currentTheme} / CONNECTION_STABLE
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className={`${themeConfig.font} text-sm opacity-50`}>{new Date().toLocaleTimeString()}</p>
          <p className={`${themeConfig.font} text-xs text-red-500 animate-pulse`}>REC ●</p>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="p-4 md:p-8 flex flex-col md:flex-row gap-8 h-[calc(100vh-180px)] relative z-20">
        
        {/* Gallery List (Left) */}
        <div className="md:w-1/3 flex flex-col gap-4 overflow-y-auto pb-24 pr-2">
          {ARTWORKS[currentTheme].map((art) => (
            <div 
              key={art.id}
              onClick={() => handleArtworkSelect(art)}
              className={`
                group relative cursor-pointer p-4 border transition-all duration-300
                ${selectedArtwork?.id === art.id ? `bg-white/10 ${themeConfig.border}` : 'border-transparent hover:border-gray-700 bg-black/20'}
              `}
            >
              <div className="flex justify-between items-start">
                <h3 className={`${themeConfig.font} text-xl group-hover:pl-2 transition-all`}>{art.title}</h3>
                <span className={`text-xs border px-1 ${themeConfig.border} ${themeConfig.accent}`}>{art.year}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 font-mono">ID: {art.id} // THREAT: {art.threatLevel}</p>
              
              {/* Hover highlight glitch */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity" />
            </div>
          ))}
        </div>

        {/* Display Area (Right) */}
        <div className="md:w-2/3 h-full border border-gray-800 bg-black/40 relative flex flex-col md:flex-row overflow-hidden">
          {selectedArtwork ? (
            <>
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-black">
                <img 
                  src={selectedArtwork.imageUrl} 
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover opacity-80"
                  style={{ filter: themeConfig.filter }}
                />
                {/* Image noise overlay */}
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise_pattern_with_intensity_0.4.png')] opacity-30 mix-blend-overlay animate-[noise_0.5s_infinite]" />
              </div>

              {/* Data/Lore Section */}
              <div className={`w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center ${themeConfig.font}`}>
                <div className={`border-l-2 pl-4 ${themeConfig.border} h-full flex flex-col`}>
                  
                  <h2 className={`text-3xl mb-4 ${themeConfig.accent} uppercase tracking-widest`}>
                    {selectedArtwork.title}
                  </h2>

                  <div className="space-y-6 flex-grow">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 uppercase">Analysis Log:</p>
                      {loadingLore ? (
                        <p className="animate-pulse text-sm">DECRYPTING DATA STREAM...</p>
                      ) : (
                         <GlitchText text={lore?.description || "WAITING FOR INPUT..."} className="text-lg leading-relaxed" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 uppercase">Containment Protocol:</p>
                       {loadingLore ? (
                        <div className="h-4 w-24 bg-gray-800 animate-pulse" />
                      ) : (
                        <p className={`text-sm ${themeConfig.accent} border border-dashed p-2 border-opacity-30`}>
                          {lore?.containmentProtocol || "---"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-8 text-[10px] opacity-40 font-mono">
                    <p>ARCHIVE_REF: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    <p>INTEGRITY: {Math.floor(Math.random() * 30) + 60}%</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col opacity-30">
              <div className={`w-32 h-32 border-4 ${themeConfig.border} rounded-full animate-spin border-t-transparent`} />
              <p className={`mt-8 ${themeConfig.font} text-xl animate-pulse`}>NO SUBJECT SELECTED</p>
            </div>
          )}
        </div>
      </main>

      <ThemeSelector currentTheme={currentTheme} onSelect={setCurrentTheme} />
    </div>
  );
};

export default App;
