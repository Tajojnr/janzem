import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { JANZEM_DATA } from "../data/landingData";
import { MapPin } from "lucide-react";
import { HeroOverlay } from "./HeroOverlay";

export const ScrollVideoEngine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const { totalFrames, desktopPath, mobilePath, annotations } = JANZEM_DATA.heroSequence;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawFrameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  useEffect(() => {
    setShouldLoad(true);
  }, []);

  // Preload frame images
  useEffect(() => {
    if (!shouldLoad) return;
    
    let isMounted = true;
    const isMobile = window.innerWidth < 768;
    const pathTemplate = isMobile ? mobilePath : desktopPath;
    const loadedImgs: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, "0");
      img.src = pathTemplate.replace("%04d", paddedIndex);

      const onImageLoad = () => {
        if (!isMounted) return;
        count++;
        if (count >= Math.floor(totalFrames * 0.3)) {
          setIsLoading(false);
        }
      };

      img.onload = onImageLoad;
      img.onerror = onImageLoad;

      loadedImgs.push(img);
    }

    setImages(loadedImgs);

    return () => {
      isMounted = false;
      loadedImgs.forEach((img) => {
        img.src = "";
      });
    };
  }, [totalFrames, desktopPath, mobilePath, shouldLoad]);

  // Draw frame on canvas
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const clampedIndex = Math.min(Math.max(0, Math.floor(index)), images.length - 1);
      const img = images[clampedIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

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
    [images]
  );

  // Sync scroll to frame via requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const unsubscribe = rawFrameIndex.on("change", (latest: number) => {
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
  }, [rawFrameIndex, renderFrame, annotations]);

  useEffect(() => {
    const handleResize = () =>
      requestAnimationFrame(() => renderFrame(rawFrameIndex.get()));
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [rawFrameIndex, renderFrame]);

  const activeAnnotationData = annotations.find(
    (a) => a.frameIndex === activeAnnotation
  );

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
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