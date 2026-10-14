import React, { useEffect, useRef } from 'react';

export const QuoteSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rainbowRef = useRef<HTMLImageElement | null>(null);
  const leftCloudRef = useRef<HTMLImageElement | null>(null);
  const rightCloudRef = useRef<HTMLImageElement | null>(null);

  // Animation state in ref for 60/120fps GPU smooth performance without React re-render overhead
  const stateRef = useRef({
    currentRainbowY: 120,
    targetRainbowY: 120,
    currentLeftX: -200,
    targetLeftX: -200,
    currentRightX: 200,
    targetRightX: 200,
    currentCloudY: 0,
    targetCloudY: 0,
  });

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const s = stateRef.current;

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Progress: clamp(0, 1, (windowHeight - rect.top) / (windowHeight + rect.height))
        const rawProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const progress = Math.max(0, Math.min(1, rawProgress));

        // 1. Rainbow parallax: moves vertically from +120px to -160px
        s.targetRainbowY = 120 + progress * (-160 - 120);

        // 2 & 3. Clouds: slides in when in view (progress 0.12 - 0.92), slides back out when not
        const isInView = progress >= 0.12 && progress <= 0.92;
        s.targetLeftX = isInView ? 0 : -200;
        s.targetRightX = isInView ? 0 : 200;

        // Clouds also drift up (cloudY = progress * -50)
        s.targetCloudY = progress * -50;
      }

      // Lerp smoothing: current + (target - current) * factor
      // Rainbow lerp factor: 0.06
      s.currentRainbowY += (s.targetRainbowY - s.currentRainbowY) * 0.06;

      // Clouds lerp factor: 0.04
      s.currentLeftX += (s.targetLeftX - s.currentLeftX) * 0.04;
      s.currentRightX += (s.targetRightX - s.currentRightX) * 0.04;
      s.currentCloudY += (s.targetCloudY - s.currentCloudY) * 0.04;

      // Direct DOM updates with translate3d and will-change: transform
      if (rainbowRef.current) {
        rainbowRef.current.style.transform = `translate3d(0, ${s.currentRainbowY.toFixed(2)}px, 0)`;
      }

      if (leftCloudRef.current) {
        // Opacity tied to X distance: 0 at -200px, 1 at 0px
        const leftOpacity = Math.max(0, Math.min(1, 1 - Math.abs(s.currentLeftX) / 200));
        leftCloudRef.current.style.transform = `translate3d(${s.currentLeftX.toFixed(2)}px, ${s.currentCloudY.toFixed(2)}px, 0)`;
        leftCloudRef.current.style.opacity = leftOpacity.toFixed(3);
      }

      if (rightCloudRef.current) {
        // Opacity tied to X distance: 0 at +200px, 1 at 0px
        const rightOpacity = Math.max(0, Math.min(1, 1 - Math.abs(s.currentRightX) / 200));
        rightCloudRef.current.style.transform = `translate3d(${s.currentRightX.toFixed(2)}px, ${s.currentCloudY.toFixed(2)}px, 0) scaleX(-1)`;
        rightCloudRef.current.style.opacity = rightOpacity.toFixed(3);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="quote-section"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #010A17 0%, #0A4267 30%, #20658E 60%, #6BADC4 100%)',
      }}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center px-6 md:px-12 select-none"
    >
      {/* 1. Rainbow image -- absolute inset-x-0 top-0 z-30 */}
      <img
        ref={rainbowRef}
        src="https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png"
        alt="Atmospheric rainbow light arc"
        loading="lazy"
        className="absolute inset-x-0 top-0 z-30 w-full pointer-events-none select-none object-cover opacity-90 will-change-transform"
        style={{
          transform: 'translate3d(0, 120px, 0)',
        }}
      />

      {/* 2. Left cloud -- absolute left-0 bottom-[10%] z-10, hidden sm:block */}
      <img
        ref={leftCloudRef}
        src="https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png"
        alt="Ethereal cloud"
        loading="lazy"
        className="absolute left-0 bottom-[10%] z-10 hidden sm:block w-[500px] md:w-[650px] pointer-events-none select-none will-change-transform"
        style={{
          marginLeft: '-50%',
          opacity: 0,
          transform: 'translate3d(-200px, 0px, 0)',
        }}
      />

      {/* 3. Right cloud -- absolute right-0 bottom-[15%] z-10, scale-x-[-1] */}
      <img
        ref={rightCloudRef}
        src="https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png"
        alt="Ethereal cloud"
        loading="lazy"
        className="absolute right-0 bottom-[15%] z-10 hidden sm:block w-[500px] md:w-[650px] pointer-events-none select-none will-change-transform"
        style={{
          marginRight: '-75%',
          opacity: 0,
          transform: 'translate3d(200px, 0px, 0) scaleX(-1)',
        }}
      />

      {/* 4. Quote content -- centered, z-20, max-w-4xl */}
      <div className="relative z-20 max-w-4xl mx-auto text-center px-4 md:px-8">
        <blockquote className="font-instrument text-white text-xl sm:text-2xl md:text-4xl lg:text-[42px] leading-[1.45] md:leading-[1.5] tracking-wide text-glow font-normal">
          “Serene was founded on a belief in beauty that honors your nature. We pursue refined outcomes, considered approaches, and lasting vitality. We spend time learning what matters to you before deciding what serves you best. No rushing, no excess -- just support that lets you feel radiant.”
        </blockquote>

        <p className="mt-6 md:mt-8 text-white/80 text-sm md:text-base tracking-wide font-inter font-light">
          Dr. Mia Callahan — Founder
        </p>

        {/* Subtle decorative brand touch */}
        <div className="mt-10 flex justify-center items-center gap-3 opacity-60">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/60" />
          <span className="font-dancing text-xl text-white/80">Serene</span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/60" />
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
