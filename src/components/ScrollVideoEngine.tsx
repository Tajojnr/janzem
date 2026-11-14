import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { JANZEM_DATA } from "../data/landingData";
import { MapPin } from "lucide-react";
import { HeroOverlay } from "./HeroOverlay";

export const ScrollVideoEngine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);
  const [loadedFrame, setLoadedFrame] = useState(-1);

  const { totalFrames, desktopPath, mobilePath, annotations } = JANZEM_DATA.heroSequence;
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

  // Create image elements up front, but only request frames as they are needed.
  useEffect(() => {
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
    rawFrameIndex,
    requestFrames,
    initialFrameIndex,
    prefersReducedMotion,
  ]);

  // Draw frame on canvas
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
    renderFrame(prefersReducedMotion ? totalFrames - 1 : rawFrameIndex.get());
  }, [loadedFrame, rawFrameIndex, renderFrame, prefersReducedMotion, totalFrames]);

  // Sync scroll to frame via requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const unsubscribe = rawFrameIndex.on("change", (latest: number) => {
      if (prefersReducedMotion) return;
      requestFrames(latest);
      animationFrameId = requestAnimationFrame(() => {
        const idx = Math.floor(latest);
        renderFrame(idx);

        const currentAnnot = annotations.find(
          (a) => Math.abs(a.frameIndex - idx) <= 3
        );
        setActiveAnnotation(currentAnnot ? currentAnnot.frameIndex : null);
      });
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [rawFrameIndex, renderFrame, requestFrames, annotations, prefersReducedMotion]);

  useEffect(() => {
    const handleResize = () =>
      requestAnimationFrame(() =>
        renderFrame(prefersReducedMotion ? totalFrames - 1 : rawFrameIndex.get())
      );
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [rawFrameIndex, renderFrame, prefersReducedMotion, totalFrames]);

  const activeAnnotationData = annotations.find(
    (a) => a.frameIndex === activeAnnotation
  );

  return (
    <div ref={containerRef} className="scroll-sequence hero-scroll-section relative bg-[#050505]">
      <div className="sticky top-0 h-screen supports-[height:100svh]:h-[100svh] w-full overflow-hidden bg-[#050505]">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
            <div className="relative mb-6 h-20 w-20">
              <div className="absolute inset-0 rounded-full border-2 border-[#C6A84B]/20" />
              <div className="absolute inset-0 rounded-full border-2 border-t-[#C6A84B] animate-spin" />
            </div>
            <p className="font-serif text-xl tracking-wider text-[#C6A84B]">JANZEM LUXURY</p>
          </div>
        )}

        {/* Canvas Engine */}
        <canvas ref={canvasRef} className="h-full w-full object-cover" />

        {/* Vignette Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />

        {/* Dynamic Frame Annotations */}
        <AnimatePresence>
          {activeAnnotationData && (
            <motion.div
              key={activeAnnotationData.frameIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                top: `${activeAnnotationData.coords.y}%`,
                left: `${activeAnnotationData.coords.x}%`,
              }}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-auto will-change-transform"
            >
              <div className="group relative flex items-center gap-3 rounded-2xl border border-[#C6A84B]/30 bg-black/80 p-4 shadow-xl backdrop-blur-md max-w-xs md:max-w-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C6A84B]/10 border border-[#C6A84B]/30 text-[#C6A84B]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white">
                    {activeAnnotationData.title}
                  </h4>
                  <p className="mt-1 text-xs text-neutral-300">
                    {activeAnnotationData.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <HeroOverlay />
      </div>
    </div>
  );
};