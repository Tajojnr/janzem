import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Phone, Menu, X, ShieldCheck, Award } from "lucide-react";
import { JANZEM_DATA } from "../data/landingData";

/**
 * Logo: use the cropped wordmark (no empty padding), saved to
 * public/assets/images/ui/logo-wordmark.webp (or .png).
 */
const LOGO_SRC = "/assets/images/ui/logo-wordmark.webp";

// Move this into JANZEM_DATA.brand when convenient.
const SCUML_NUMBER = "SC 201502330";

// Properties first: that is what a buyer came for.
const NAV_LINKS = [
  { name: "Elite Collection", href: "#elite" },
  { name: "Hot Sales", href: "#hot-sales", isHot: true },
  { name: "Land Bank", href: "#land" },
  { name: "3D Walkthrough", href: "#walkthrough" },
  { name: "Vision", href: "#vision" },
  { name: "FAQ", href: "#faq" },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

const GOLD = "#C6A84B";

/** Tracks which section sits in the middle band of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setActive(best.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export const Navbar: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const activeSection = useActiveSection(SECTION_IDS);
  const current = scrolled ? activeSection : null;

  // Hide on the way down so the villa build is unobstructed; return on the way up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > previous && y > 160);
  });

  // Lock page scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const { phone, whatsapp, cacNumber } = JANZEM_DATA.brand;
  const bookingHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hello Janzem, I would like to book a VIP inspection."
  )}`;

  const slide = reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={slide}
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled || menuOpen
            ? "border-b border-[#C6A84B]/15 bg-[#07090D]/85 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-black/85 via-black/40 to-transparent"
        }`}
      >
        {/* Trust strip: credentials sit at the top of the page, where buyers look first */}
        <div
          className={`hidden overflow-hidden transition-all duration-500 lg:block ${
            scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
          }`}
          aria-hidden={scrolled}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/[0.06] px-12 py-2 text-[11.5px] text-neutral-400">
            <p>Luxury estates and land in Abuja, Kano, Kaduna and Nasarawa</p>
            <ul className="flex items-center gap-6">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: GOLD }} aria-hidden />
                <span>CAC registered, RC {cacNumber}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5" style={{ color: GOLD }} aria-hidden />
                <span>SCUML {SCUML_NUMBER}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 transition-[padding] duration-500 md:px-12 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
        >
          {/* Logo: full wordmark, no tile */}
          <a
            href="#"
            aria-label="Janzem Real Estate, back to top"
            className="group flex items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A84B]"
          >
            <img
              src={LOGO_SRC}
              alt="Janzem"
              className="h-8 w-auto drop-shadow-[0_0_14px_rgba(217,27,36,0.35)] transition-transform duration-500 group-hover:scale-[1.03] md:h-10"
            />
          </a>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden justify-center lg:flex">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = current === link.href.slice(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative flex items-center gap-1.5 rounded-sm px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A84B] ${
                        isActive ? "text-[#E5C365]" : "text-neutral-300 hover:text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      {"isHot" in link && link.isHot && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#D91B24] motion-safe:animate-pulse"
                          aria-label="Hot offers"
                        />
                      )}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                          className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[#C6A84B] to-transparent"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop actions: phone is a quiet link, one loud button */}
          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 rounded-sm text-[13px] font-semibold text-white transition-colors hover:text-[#E5C365] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A84B]"
            >
              <Phone className="h-3.5 w-3.5" style={{ color: GOLD }} aria-hidden />
              <span>{phone}</span>
            </a>
            <span className="h-5 w-px bg-white/15" aria-hidden />
            <a
              href={bookingHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-b from-[#E5C365] to-[#B8963F] px-6 py-2.5 text-[13px] font-bold text-[#14110A] shadow-[0_8px_24px_-10px_rgba(198,168,75,0.7)] transition-all duration-300 hover:shadow-[0_10px_30px_-8px_rgba(229,195,101,0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5C365] active:scale-[0.97]"
            >
              Book VIP inspection
            </a>
          </div>

          {/* Mobile: compact booking button and menu toggle */}
          <div className="col-start-3 flex items-center gap-3 lg:hidden">
            <a
              href={bookingHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-b from-[#E5C365] to-[#B8963F] px-4 py-2 text-xs font-bold text-[#14110A] active:scale-[0.97]"
            >
              Book visit
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A84B]"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Build progress: a gold hairline that fills as the villa rises */}
        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-[#B8963F] via-[#E5C365] to-[#C6A84B]"
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#07090D]/97 px-6 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul>
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.08 + i * 0.05, duration: 0.4 }}
                    className="border-b border-white/[0.07]"
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 font-serif text-[28px] leading-tight text-neutral-100 transition-colors hover:text-[#E5C365]"
                    >
                      <span>{link.name}</span>
                      {"isHot" in link && link.isHot && (
                        <span className="rounded-full bg-[#D91B24] px-2.5 py-0.5 font-sans text-[11px] font-bold text-white">
                          Hot offers
                        </span>
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto space-y-5 pt-10">
              <p className="flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="h-4 w-4" style={{ color: GOLD }} aria-hidden />
                <span>
                  CAC RC {cacNumber}, SCUML {SCUML_NUMBER}
                </span>
              </p>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/15 py-3.5 text-sm font-semibold text-white"
                >
                  <Phone className="h-4 w-4" style={{ color: GOLD }} aria-hidden />
                  Call us
                </a>
                <a
                  href={bookingHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center rounded-full bg-gradient-to-b from-[#E5C365] to-[#B8963F] py-3.5 text-sm font-bold text-[#14110A]"
                >
                  Book VIP inspection
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};