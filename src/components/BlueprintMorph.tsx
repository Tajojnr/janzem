import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Layers, Ruler, Building2, CheckCircle2 } from 'lucide-react';

export const BlueprintMorph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const blueprintOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0]);
  const wireframeOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.75], [0, 1, 0]);
  const renderOpacity = useTransform(scrollYProgress, [0.65, 0.85, 1], [0, 1, 1]);

  const strokeDash = useTransform(scrollYProgress, [0, 0.35], [1000, 0]);
  const wireframeScale = useTransform(scrollYProgress, [0.35, 0.7], [0.9, 1.05]);
  const renderScale = useTransform(scrollYProgress, [0.7, 1], [1.08, 1]);

  return (
    <section id="blueprint" ref={containerRef} className="scroll-sequence blueprint-scroll-section relative bg-dark-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 px-6 md:px-16">
        <div className="relative z-20 max-w-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <Layers className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-sans tracking-widest text-gold-400 uppercase font-semibold">
              Architectural Evolution
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
            From Blueprint to <span className="text-gold-gradient">Masterpiece</span>
          </h2>
          <p className="mt-2 text-sm md:text-base font-sans text-neutral-400">
            Every Janzem estate is engineered through rigorous structural drafting, CAD validation, and sovereign execution.
          </p>
        </div>

        <div className="relative w-full h-[60vh] max-w-5xl mx-auto flex items-center justify-center my-auto">
          <motion.div
            style={{ opacity: prefersReducedMotion ? 0 : blueprintOpacity }}
            className={`absolute inset-0 flex items-center justify-center p-4 ${
              prefersReducedMotion ? "hidden" : ""
            }`}
          >
            <div className="w-full h-full glass-panel-gold rounded-3xl p-6 relative overflow-hidden flex items-center justify-center border border-gold-500/30">
              <div className="absolute inset-0 bg-[radial-gradient(#C6A84B_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
              
              <svg className="w-full h-full max-h-[400px]" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.rect
                  x="100" y="80" width="600" height="340" rx="12"
                  stroke="#C6A84B" strokeWidth="2" strokeDasharray="1000"
                  style={{ strokeDashoffset: strokeDash }}
                />
                <motion.path
                  d="M 100 250 L 700 250 M 350 80 L 350 420 M 520 80 L 520 250 M 230 250 L 230 420"
                  stroke="#E2CC85" strokeWidth="1.5" strokeDasharray="1000"
                  style={{ strokeDashoffset: strokeDash }}
                />
                <circle cx="220" cy="160" r="35" stroke="#C6A84B" strokeWidth="1" strokeDasharray="6 4" />
                <path d="M 220 120 L 220 200 M 180 160 L 260 160" stroke="#C6A84B" strokeWidth="1" />
                <text x="215" y="115" fill="#C6A84B" fontSize="12" fontFamily="serif" fontWeight="bold">N</text>
                
                <text x="140" y="200" fill="#E2CC85" fontSize="14" fontFamily="sans" opacity="0.8">GRAND FOYER</text>
                <text x="400" y="170" fill="#E2CC85" fontSize="14" fontFamily="sans" opacity="0.8">MASTER SUITE</text>
                <text x="560" y="170" fill="#E2CC85" fontSize="14" fontFamily="sans" opacity="0.8">PRIVATE TERRACE</text>
                <text x="130" y="340" fill="#E2CC85" fontSize="14" fontFamily="sans" opacity="0.8">VIP LOUNGE</text>
                <text x="380" y="340" fill="#E2CC85" fontSize="14" fontFamily="sans" opacity="0.8">INFINITY POOL DECK</text>
              </svg>

              <div className="absolute bottom-4 left-6 flex items-center space-x-2 text-xs font-mono text-gold-300">
                <Ruler className="w-3.5 h-3.5" />
                <span>JANZEEM ARCHITECTURAL DRAFT // CAD 2026-NIG</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{
              opacity: prefersReducedMotion ? 0 : wireframeOpacity,
              scale: prefersReducedMotion ? 1 : wireframeScale,
            }}
            className={`absolute inset-0 flex items-center justify-center p-4 pointer-events-none ${
              prefersReducedMotion ? "hidden" : ""
            }`}
          >
            <div className="w-full h-full glass-panel rounded-3xl p-6 relative overflow-hidden flex items-center justify-center border border-gold-400/40 shadow-gold-glow">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 via-transparent to-gold-500/5" />
              
              <div className="grid grid-cols-4 gap-4 w-full h-full opacity-60">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-gold-400/50 rounded-xl relative overflow-hidden bg-gold-500/5 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(198,168,75,0.2)_50%,transparent_75%)] animate-shimmer" />
                    <span className="absolute top-2 left-2 text-[9px] font-mono text-gold-300">
                      BEAM_{i + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="absolute top-6 right-6 flex items-center space-x-2 text-xs font-mono text-gold-300">
                <Building2 className="w-4 h-4 text-gold-400" />
                <span>LOAD-BEARING WIREFRAME ACTIVE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{
              opacity: prefersReducedMotion ? 1 : renderOpacity,
              scale: prefersReducedMotion ? 1 : renderScale,
            }}
            className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full h-full rounded-3xl relative overflow-hidden border border-gold-500/50 shadow-gold-glow-lg">
              <img
                src="/assets/images/properties/elite-1.webp"
                alt="Janzem Completed Villa"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />

              <div className="absolute bottom-6 left-6 md:left-10 z-10">
                <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/50 text-[10px] font-sans uppercase font-bold text-gold-300 tracking-widest mb-2 inline-block">
                  Verified Realized Compound
                </span>
                <h3 className="text-2xl md:text-4xl font-serif font-bold text-white">
                  The Sovereign Villa, Maitama
                </h3>
                <p className="text-xs md:text-sm font-sans text-neutral-300 mt-1">
                  100% Verified Title • Turnkey Delivery • Bespoke Finishing
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-20 flex items-center justify-between max-w-xl mx-auto w-full pt-4 border-t border-white/10 text-xs font-sans">
          <div className="flex items-center space-x-2 text-neutral-400">
            <CheckCircle2 className="w-4 h-4 text-gold-400" />
            <span>01. CAD Blueprint</span>
          </div>
          <div className="flex items-center space-x-2 text-neutral-400">
            <CheckCircle2 className="w-4 h-4 text-gold-400" />
            <span>02. Steel Skeleton</span>
          </div>
          <div className="flex items-center space-x-2 text-gold-300 font-bold">
            <CheckCircle2 className="w-4 h-4 text-gold-400" />
            <span>03. Living Legacy</span>
          </div>
        </div>
      </div>
    </section>
  );
};