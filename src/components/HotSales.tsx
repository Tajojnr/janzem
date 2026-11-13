import React, { useState } from "react";
import { motion } from "framer-motion";
import { JANZEM_DATA, type Property } from "../data/landingData";
import { Bed, Bath, Maximize2, Tag, ArrowUpRight, Play } from "lucide-react";

export const HotSales: React.FC = () => {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);

  return (
    <section className="relative bg-[#050505] py-24 px-6 md:px-16 overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#D91B24]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D91B24]/40 bg-[#D91B24]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#D91B24]">
              <Tag className="h-3.5 w-3.5 text-[#D91B24]" />
              <span>Discounted Premier Assets</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl font-bold text-white">
              Hot Sales & Urgent Offers
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-sm text-neutral-400 font-light">
            Verified luxury properties featuring high capital appreciation potential across Nigeria's prime metropolitan centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JANZEM_DATA.hotSales.map((property: Property) => {
            const isHovered = hoveredProperty === property.id;
            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredProperty(property.id)}
                onMouseLeave={() => setHoveredProperty(null)}
                className="group relative rounded-3xl border border-white/10 bg-neutral-900/40 overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-[#D91B24]/60 hover:shadow-2xl hover:shadow-[#D91B24]/10 will-change-transform"
              >
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-950">
                  {/* Dynamic Video Mounting — Only downloads bytes on actual hover */}
                  {isHovered && property.videoUrl ? (
                    <video
                      src={property.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover scale-105 transition-transform duration-500 will-change-transform"
                    />
                  ) : (
                    <img
                      src={property.image}
                      alt={property.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                    />
                  )}

                  {/* Crimson Red Hot Badge */}
                  {property.badge && (
                    <div className="absolute top-4 left-4 rounded-full bg-[#D91B24] border border-white/20 px-4 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                      {property.badge}
                    </div>
                  )}

                  {property.videoUrl && !isHovered && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md border border-white/20">
                      <Play className="h-3 w-3 fill-white" />
                      <span>Hover for Video</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-xs font-medium text-[#C6A84B] uppercase tracking-wider">
                        {property.location}
                      </span>
                      <h3 className="mt-1 font-serif text-2xl font-bold text-white group-hover:text-[#C6A84B] transition-colors">
                        {property.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-2xl font-bold text-[#C6A84B]">
                        {property.price}
                      </div>
                      {property.originalPrice && (
                        <div className="text-xs font-light text-[#D91B24] line-through">
                          {property.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-b border-white/5 py-4 text-xs font-light text-neutral-300">
                    {property.specs.beds && (
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4 text-[#C6A84B]" />
                        <span>{property.specs.beds} Beds</span>
                      </div>
                    )}
                    {property.specs.baths && (
                      <div className="flex items-center gap-2">
                        <Bath className="h-4 w-4 text-[#C6A84B]" />
                        <span>{property.specs.baths} Baths</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Maximize2 className="h-4 w-4 text-[#C6A84B]" />
                      <span>{property.specs.sizeSqM} m²</span>
                    </div>
                    <div className="ml-auto rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-neutral-400">
                      {property.specs.titleType}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <a
                      href={`https://wa.me/${JANZEM_DATA.brand.whatsapp}?text=Inquiry%20regarding%20${encodeURIComponent(property.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="INSPECT"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#C6A84B] transition-colors"
                    >
                      <span>Request Private Inspection</span>
                      <ArrowUpRight className="h-4 w-4 text-[#C6A84B]" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};