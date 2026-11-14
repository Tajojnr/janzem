import React, { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Fast spring for inner core dot
  const dotX = useSpring(0, { damping: 30, stiffness: 400 });
  const dotY = useSpring(0, { damping: 30, stiffness: 400 });

  // Fluid delayed spring for outer trailing gold halo
  const ringX = useSpring(0, { damping: 22, stiffness: 180 });
  const ringY = useSpring(0, { damping: 22, stiffness: 180 });

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest("[data-cursor]");

      if (hoverable) {
        const cursorType = hoverable.getAttribute("data-cursor");
        setIsHovered(true);
        if (cursorType && cursorType !== "pointer") {
          setCursorText(cursorType);
        } else {
          setCursorText("");
        }
      } else if (target.closest("button, a, input, select, video")) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [dotX, dotY, ringX, ringY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Fast Center Core Gold Dot */}
      <motion.div
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-[#C6A84B] shadow-[0_0_10px_#C6A84B]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer Fluid Trailing Gold Ring & Hover Label */}
      <motion.div
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-colors duration-300 ${
          isHovered
            ? "bg-[#C6A84B]/15 border border-[#C6A84B]/80 backdrop-blur-sm shadow-[0_0_25px_rgba(198,168,75,0.35)]"
            : "border border-[#C6A84B]/30 bg-transparent"
        }`}
        animate={{
          width: isHovered ? (cursorText ? 72 : 52) : 32,
          height: isHovered ? (cursorText ? 72 : 52) : 32,
          scale: isClicking ? 0.8 : isHovered ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-[9px] font-sans font-extrabold tracking-widest text-[#E5C365] uppercase text-center px-1"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};