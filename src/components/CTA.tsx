import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { JANZEM_DATA } from "../data/landingData";
import { Phone, ArrowUpRight, MessageCircle } from "lucide-react";

export const CTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [showFinalCta, setShowFinalCta] = useState(false);
  const [loadedFrame, setLoadedFrame] = useState(-1);

  const sequence = JANZEM_DATA.ideaToRealitySequence;
  const totalFrames = sequence?.totalFrames ?? 153;
  const desktopPath =
    sequence?.desktopPath ?? "/assets/frames/idea_desktop/frame_%04d.webp";
  const mobilePath =
    sequence?.mobilePath ?? "/assets/frames/idea_mobile/frame_%04d.webp";
  const prefersReducedMotion = useReducedMotion() ?? false;
  const initialFrameIndex = prefersReducedMotion ? totalFrames - 1 : 0;
  const isFinalCtaVisible = showFinalCta || prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawFrameIndex = useTransform(scrollYProgress, [0, 0.85], [0, totalFrames - 1]);
  const ctaProgress = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);

  const requestFrames = useCallback((frameIndex: number) => {
    const start = Math.max(0, Math.floor(frameIndex));
    const images = imagesRef.current;
    const end = Math.min(images.length, start + 6);

    for (let i = start; i < end; i++) {
      const img = images[i];
      if (img && !img.src) {
        img.src = img.dataset.src ?? "";
      }
    }
  }, []);

  // LAZY LOAD TRIGGER: Only start downloading frames when user approaches section
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Preload frames
  useEffect(() => {
    if (!shouldLoad) return;

    let isMounted = true;
    const isMobile = window.innerWidth < 768;
    const pathTemplate = isMobile ? mobilePath : desktopPath;
    const loadedImgs: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const padded = String(i).padStart(4, "0");
      img.decoding = "async";
      img.dataset.src = pathTemplate.replace("%04d", padded);

      const onImageSettled = () => {
        if (!isMounted) return;
        if (i - 1 === initialFrameIndex) {
          setIsLoading(false);
        }
        const currentFrame = prefersReducedMotion
          ? totalFrames - 1
          : Math.floor(rawFrameIndex.get());
        if (currentFrame === i - 1) {
          setLoadedFrame(i - 1);
        }
      };

      img.onload = onImageSettled;
      img.onerror = onImageSettled;

      loadedImgs.push(img);
    }

    imagesRef.current = loadedImgs;
    requestFrames(initialFrameIndex);

    return () => {
      isMounted = false;
      loadedImgs.forEach((img) => {
        img.src = "";
      });
      imagesRef.current = [];
    };
  }, [
    totalFrames,
    desktopPath,
    mobilePath,
    shouldLoad,
    rawFrameIndex,
    requestFrames,
    initialFrameIndex,
    prefersReducedMotion,
  ]);

  // Canvas draw
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || images.length === 0) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const clamped = Math.min(Math.max(0, Math.floor(index)), images.length - 1);
      let img = images[clamped];
      if (!img?.complete || img.naturalWidth === 0) {
        for (let i = clamped - 1; i >= 0; i--) {
          if (images[i]?.complete && images[i].naturalWidth > 0) {
            img = images[i];
            break;
          }
        }
      }
      if (!img?.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;
      let drawW = w;
      let drawH = h;
      let ox = 0;
      let oy = 0;

      if (canvasRatio > imgRatio) {
        drawH = w / imgRatio;
        oy = (h - drawH) / 2;
      } else {
        drawW = h * imgRatio;
        ox = (w - drawW) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctx.drawImage(img, ox, oy, drawW, drawH);
      ctx.restore();
    },
    []
  );

  useEffect(() => {
    let animationFrameId: number;

    const unsubFrame = rawFrameIndex.on("change", (latest: number) => {
      if (prefersReducedMotion) return;
      if (shouldLoad) requestFrames(latest);
      animationFrameId = requestAnimationFrame(() => {
        renderFrame(latest);
      });
    });

    const unsubCta = ctaProgress.on("change", (v: number) => {
      if (prefersReducedMotion) return;
      setShowFinalCta(v > 0.15);
    });

    return () => {
      unsubFrame();
      unsubCta();
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    rawFrameIndex,
    ctaProgress,
    renderFrame,
    requestFrames,
    shouldLoad,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    renderFrame(prefersReducedMotion ? totalFrames - 1 : rawFrameIndex.get());
  }, [loadedFrame, renderFrame, rawFrameIndex, prefersReducedMotion, totalFrames]);

  useEffect(() => {
    const onResize = () =>
      requestAnimationFrame(() =>
        renderFrame(prefersReducedMotion ? totalFrames - 1 : rawFrameIndex.get())
      );
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [rawFrameIndex, renderFrame, prefersReducedMotion, totalFrames]);

  return (
    <section id="cta" ref={containerRef} className="scroll-sequence cta-scroll-section relative bg-[#050505]">
      <div className="sticky top-0 h-screen supports-[height:100svh]:h-[100svh] w-full overflow-hidden bg-[#050505]">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#050505] text-white">
            <div className="relative mb-4 h-16 w-16">
              <div className="absolute inset-0 rounded-full border-2 border-[#C6A84B]/20" />
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-t-[#C6A84B]" />
            </div>
            <p className="font-serif text-lg tracking-wider text-[#C6A84B]">IDEA → REALITY</p>
          </div>
        )}

        {/* Canvas morph engine */}
        <canvas ref={canvasRef} className="h-full w-full object-cover" />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/50" />

        {/* Intro text */}
        {!isFinalCtaVisible && (
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-16">
            <div className="pt-16 md:pt-20">
              <h2 className="max-w-xl font-serif text-3xl font-bold leading-tight text-white sm:text-5xl">
                Watch Vision Become{" "}
                <span className="bg-gradient-to-r from-[#C6A84B] via-[#E5C365] to-[#D91B24] bg-clip-text text-transparent">
                  Built Reality
                </span>
              </h2>
              <p className="mt-3 max-w-md text-sm font-light text-neutral-400">
                Scroll to scrub Janzem&apos;s idea-to-reality engineering timeline — from line drawings to turnkey luxury.
              </p>
            </div>

            <div className="flex items-center gap-2.5 border-t border-white/10 pt-4 text-xs font-light uppercase tracking-widest text-neutral-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#D91B24]" />
              Scrub to reveal your legacy home
            </div>
          </div>
        )}

        {/* Final locked CTA panel */}
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center p-6"
          style={{
            opacity: prefersReducedMotion ? 1 : ctaProgress,
            pointerEvents: isFinalCtaVisible ? "auto" : "none",
          }}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute h-[420px] w-[640px] rounded-full bg-[#C6A84B]/10 blur-[100px]" />
          <div className="pointer-events-none absolute h-[280px] w-[280px] -translate-x-24 translate-y-10 rounded-full bg-[#D91B24]/10 blur-[80px]" />

          <div className="relative w-full max-w-3xl rounded-3xl border border-[#C6A84B]/35 bg-black/75 p-8 text-center shadow-[0_0_60px_rgba(198,168,75,0.18)] backdrop-blur-2xl md:p-14">
            <div className="absolute -top-px left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C6A84B] to-transparent" />

            <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A84B]/40 bg-[#C6A84B]/10">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D91B24] shadow-[0_0_12px_#D91B24]" />
            </div>

            <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Begin Your Real Estate{" "}
              <span className="bg-gradient-to-r from-[#C6A84B] via-[#E5C365] to-[#C6A84B] bg-clip-text text-transparent">
                Legacy Today.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-neutral-300 md:text-base">
              Contact our private advisory team to schedule direct site inspections, review title
              deeds, or negotiate off-market acquisitions across Nigeria.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/${JANZEM_DATA.brand.whatsapp}?text=Hello%20Janzem%20Real%20Estate,%20I%20want%20to%20begin%20my%20real%20estate%20legacy.`}
                target="_blank"
                rel="noreferrer"
                data-cursor="WHATSAPP"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#C6A84B] via-[#E5C365] to-[#C6A84B] px-7 py-3.5 text-sm font-bold text-black shadow-lg shadow-[#C6A84B]/20 transition-all hover:shadow-[#C6A84B]/35 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Connect on WhatsApp</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={`tel:${JANZEM_DATA.brand.phone}`}
                data-cursor="CALL"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-[#C6A84B] hover:text-[#C6A84B]"
              >
                <Phone className="h-4 w-4 text-[#C6A84B]" />
                <span>Direct Line: {JANZEM_DATA.brand.phone}</span>
              </a>
            </div>

            <p className="mt-6 text-[11px] font-mono tracking-wide text-neutral-500">
              CAC RC {JANZEM_DATA.brand.cacNumber} · SCUML {JANZEM_DATA.brand.scumlNumber} ·{" "}
              {JANZEM_DATA.brand.tiktokFollowers} TikTok community
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};