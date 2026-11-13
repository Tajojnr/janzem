import React from "react";
import { motion } from "framer-motion";
import { JANZEM_DATA } from "../data/landingData";
import { ShieldCheck, Award, ArrowDownRight, Phone, ChevronDown } from "lucide-react";

export const HeroOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-16">
      {/* Top Header: Clean typographic lines, no bubbles */}
      <div className="pt-20 md:pt-24 flex items-center justify-between text-xs tracking-wider">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-neutral-300 font-light"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#C6A84B]" />
          <span>{JANZEM_DATA.brand.tiktokFollowers} TikTok Community</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-400">{JANZEM_DATA.brand.tiktokLikes} Likes</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:flex items-center gap-6 text-neutral-400 font-light"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6A84B]" />
            CAC: RC {JANZEM_DATA.brand.cacNumber}
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#C6A84B]" />
            SCUML: {JANZEM_DATA.brand.scumlNumber}
          </span>
        </motion.div>
      </div>

      {/* Main Hero Copy */}
      <div className="my-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C6A84B]">
            {JANZEM_DATA.brand.headquarters} Premier Luxury Real Estate
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Architectural Excellence. <br />
            <span className="bg-gradient-to-r from-[#C6A84B] via-[#E5C365] to-[#C6A84B] bg-clip-text text-transparent">
              Unrivaled Integrity.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg font-light text-neutral-300 leading-relaxed">
            Discover verified luxury residential estates, custom architectural villas, and high-yield commercial lands across Abuja, Kano, Kaduna, and Nasarawa.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href={`https://wa.me/${JANZEM_DATA.brand.whatsapp}?text=Hello%20Janzem%20Real%20Estate,%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20properties.`}
            target="_blank"
            rel="noreferrer"
            data-cursor="INSPECT"
            className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-[#C6A84B] via-[#E5C365] to-[#C6A84B] px-7 py-3.5 text-sm font-bold text-black transition-all hover:shadow-lg hover:shadow-[#C6A84B]/25 active:scale-95"
          >
            <span>Book Private VIP Inspection</span>
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </a>

          <a
            href={`tel:${JANZEM_DATA.brand.phone}`}
            data-cursor="CALL"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-[#C6A84B] hover:text-[#C6A84B]"
          >
            <Phone className="w-4 h-4 text-[#C6A84B]" />
            <span>{JANZEM_DATA.brand.phone}</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt: Clean hairline layout */}
      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-light text-neutral-400">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C6A84B] animate-pulse" />
          <span className="tracking-widest uppercase">Scroll to scrub timeline sequence</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white">
          <span>Explore Timeline</span>
          <ChevronDown className="h-4 w-4 text-[#C6A84B]" />
        </div>
      </div>
    </div>
  );
};