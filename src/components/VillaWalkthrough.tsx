import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { JANZEM_DATA } from "../data/landingData";
import { Eye, Compass, ShieldCheck } from "lucide-react";

export const VillaWalkthrough: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loadedFrame, setLoadedFrame] = useState(-1);

  const { totalFrames, desktopPath, mobilePath } = JANZEM_DATA.walkthroughSequence;
  const prefersReducedMotion = useReducedMotion() ?? false;
  const initialFrameIndex = prefersReducedMotion ? totalFrames - 1 : 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawFrameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

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

  // LAZY LOAD TRIGGER: Only start downloading frames when user is 400px away
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

  // Preload frame images
  useEffect(() => {
    if (!shouldLoad) return;

    let isMounted = true;
    const isMobile = window.innerWidth < 768;
    const pathTemplate = isMobile ? mobilePath : desktopPath;
    const loadedImgs: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, "0");
      img.decoding = "async";
      img.dataset.src = pathTemplate.replace("%04d", paddedIndex);

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

  // Render frame on GPU canvas
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || images.length === 0) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const clampedIndex = Math.min(Math.max(0, Math.floor(index)), images.length - 1);
      let img = images[clampedIndex];
      if (!img?.complete || img.naturalWidth === 0) {
        for (let i = clampedIndex - 1; i >= 0; i--) {
          if (images[i]?.complete && images[i].naturalWidth > 0) {
            img = images[i];
            break;
          }
        }
      }
      if (!img?.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const displayWidth = rect.width;
      const displayHeight = rect.height;

      if (displayWidth === 0 || displayHeight === 0) return;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = displayWidth / displayHeight;

      let drawWidth = displayWidth;
      let drawHeight = displayHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = displayWidth / imgRatio;
        offsetY = (displayHeight - drawHeight) / 2;
      } else {
        drawWidth = displayHeight * imgRatio;
        offsetX = (displayWidth - drawWidth) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    },
    []
  );

  useEffect(() => {
    let animationFrameId: number;
    const unsubscribe = rawFrameIndex.on("change", (latest: number) => {
      if (prefersReducedMotion) return;
      if (shouldLoad) requestFrames(latest);
      animationFrameId = requestAnimationFrame(() => {
        renderFrame(latest);
      });
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [rawFrameIndex, renderFrame, requestFrames, shouldLoad, prefersReducedMotion]);

  useEffect(() => {
    renderFrame(prefersReducedMotion ? totalFrames - 1 : rawFrameIndex.get());
  }, [loadedFrame, renderFrame, rawFrameIndex, prefersReducedMotion, totalFrames]);

  useEffect(() => {
    const handleResize = () =>
      requestAnimationFrame(() =>
        renderFrame(prefersReducedMotion ? totalFrames - 1 : rawFrameIndex.get())
      );
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [rawFrameIndex, renderFrame, prefersReducedMotion, totalFrames]);

  return (
    <div ref={containerRef} className="scroll-sequence walkthrough-scroll-section relative bg-[#050505]">
      <div className="sticky top-0 h-screen supports-[height:100svh]:h-[100svh] w-full overflow-hidden bg-[#050505]">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#050505] text-white">
            <div className="relative mb-4 h-16 w-16">
              <div className="absolute inset-0 rounded-full border-2 border-[#C6A84B]/20" />
              <div className="absolute inset-0 rounded-full border-2 border-t-[#C6A84B] animate-spin" />
            </div>
            <p className="font-serif text-lg tracking-wider text-[#C6A84B]">VILLA WALKTHROUGH</p>
          </div>
        )}

        {/* Canvas Frame Engine */}
        <canvas ref={canvasRef} className="h-full w-full object-cover" />

        {/* Gradient Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />

        {/* Header Overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-16 z-20">
          <div className="pt-16 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-[#C6A84B]/30 bg-black/60 px-4 py-1.5 backdrop-blur-md"
            >
              <Eye className="h-4 w-4 text-[#C6A84B]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C6A84B]">
                360° Interior Experience
              </span>
            </motion.div>

            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Step Inside <br />
              <span className="bg-gradient-to-r from-[#C6A84B] via-[#E5C365] to-[#C6A84B] bg-clip-text text-transparent">
                Uncompromising Luxury
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-neutral-300 font-light">
              Scrub to tour through Italian marble salons, custom Majlis lounges, and high-ceiling master suites.
            </p>
          </div>

          {/* Bottom Features Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs font-light text-neutral-400">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#C6A84B]" />
                Interactive 4K Spatial Tour
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#C6A84B]" />
                As-Built Verified Finishes
              </span>
            </div>
            <span className="font-mono text-[#C6A84B]">WALKTHROUGH timeline</span>
          </div>
        </div>
      </div>
    </div>
  );
};