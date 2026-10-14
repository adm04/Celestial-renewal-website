import React, { useRef, useState } from 'react';
import Navbar from './Navbar';
import Button from './Button';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-section');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden select-none">
      {/* Fixed Navbar */}
      <Navbar onBookClick={scrollToQuote} />

      {/* 1. Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
      />

      {/* 2. Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      {/* 4. Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none">
        <div className="flex flex-col items-center justify-center max-w-5xl -mt-[120px] pointer-events-auto">
          {/* Heading */}
          <h1 className="font-instrument text-white text-[36px] md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-center text-glow">
            Gentle touch. Radiant presence.
          </h1>

          {/* Subtext */}
          <p className="text-white/70 text-sm md:text-base text-center mt-5 md:mt-7 max-w-xl">
            Expert beauty and holistic wellness, delivered with warmth and intention.
          </p>

          {/* CTA Button */}
          <Button onClick={scrollToQuote} className="mt-6 md:mt-9">
            Begin your renewal
          </Button>
        </div>
      </div>

      {/* 5. Sound Indicator (desktop only) */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? 'Experience with sound' : 'Mute sound'}
        className="hidden md:flex items-center gap-3 absolute bottom-8 left-8 z-30 group cursor-pointer focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5 transition-all duration-300 group-hover:border-white/50 group-hover:bg-white/10">
          {/* Small horizontal bar */}
          <div
            className={`w-3.5 h-[2px] bg-white/70 transition-all duration-300 ${
              isMuted ? '' : 'bg-white scale-x-125 shadow-[0_0_8px_white]'
            }`}
          />
        </div>
        <div className="flex flex-col text-left leading-tight text-white/60 text-xs font-light group-hover:text-white/90 transition-colors">
          <span>{isMuted ? 'Experience' : 'Sound active'}</span>
          <span>{isMuted ? 'with sound' : '(click to mute)'}</span>
        </div>
      </button>

      {/* Subtle scroll down indicator */}
      <div
        onClick={scrollToQuote}
        className="absolute bottom-8 right-8 z-30 hidden md:flex items-center gap-2 text-white/40 hover:text-white/80 cursor-pointer text-xs tracking-widest uppercase transition-colors"
      >
        <span>Explore</span>
        <svg className="w-3.5 h-3.5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
