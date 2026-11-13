import React, { useState } from "react";
import { motion } from "framer-motion";
import { JANZEM_DATA, type Property } from "../data/landingData";
import { Crown, Bed, Bath, Maximize2, ArrowUpRight } from "lucide-react";

export const EliteCollection: React.FC = () => {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);
  const featured = JANZEM_DATA.eliteCollection[0];
  const secondary = JANZEM_DATA.eliteCollection.slice(1);

  return (
    <section className="relative bg-[#050505] py-24 px-6 md:px-16 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C6A84B]">
              <Crown className="h-4 w-4" />
              <span>Trophy Architectural Estates</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl font-bold text-white">
              The Elite Collection
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-sm text-neutral-400 font-light">
            Bespoke palaces engineered for high-net-worth individuals seeking privacy, security, and world-class craftsmanship.
          </p>
        </div>

        {/* Featured Ultra Property */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseEnter={() => setHoveredProperty(featured.id)}
            onMouseLeave={() => setHoveredProperty(null)}
            className="group relative mb-12 rounded-3xl border border-[#C6A84B]/30 bg-neutral-900/60 overflow-hidden shadow-2xl backdrop-blur-xl will-change-transform"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative lg:col-span-7 h-96 lg:h-auto overflow-hidden bg-neutral-950">
                {hoveredProperty === featured.id && featured.videoUrl ? (
                  <video
                    src={featured.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover scale-105 transition-transform duration-500 will-change-transform"
                  />
                ) : (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                  />
                )}
                {featured.badge && (
                  <div className="absolute top-6 left-6 rounded-full bg-[#C6A84B] px-4 py-1.5 text-xs font-bold text-black uppercase tracking-wider shadow-lg">
                    {featured.badge}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#C6A84B] uppercase tracking-wider">
                    {featured.location}
                  </span>
                  <h3 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-white">
                    {featured.title}
                  </h3>
                  <div className="mt-4 font-serif text-3xl font-bold text-[#C6A84B]">
                    {featured.price}
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 border-y border-white/10 py-6">
                    <div>
                      <span className="block text-xs text-neutral-400 font-light">Bedrooms</span>
                      <span className="text-lg font-serif font-bold text-[#C6A84B]">{featured.specs.beds} Suites</span>
                    </div>
                    <div>
                      <span className="block text-xs text-neutral-400 font-light">Bathrooms</span>
                      <span className="text-lg font-serif font-bold text-[#C6A84B]">{featured.specs.baths} Baths</span>
                    </div>
                    <div>
                      <span className="block text-xs text-neutral-400 font-light">Footprint</span>
                      <span className="text-lg font-serif font-bold text-[#C6A84B]">{featured.specs.sizeSqM} m²</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured.features.map((feat: string, idx: number) => (
                      <span
                        key={idx}
                        className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-neutral-300"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <a
                    href={`https://wa.me/${JANZEM_DATA.brand.whatsapp}?text=Inquiry%20regarding%20${encodeURIComponent(featured.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="PALACE"
                    className="inline-flex items-center gap-3 rounded-full bg-[#C6A84B] px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-[#e5c365]"
                  >
                    <span>Request Confidential Dossier</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Secondary Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondary.map((property: Property) => {
            const isHovered = hoveredProperty === property.id;
            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                onMouseEnter={() => setHoveredProperty(property.id)}
                onMouseLeave={() => setHoveredProperty(null)}
                className="group relative rounded-3xl border border-white/10 bg-neutral-900/40 overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-[#C6A84B]/50 will-change-transform"
              >
                <div className="relative h-72 w-full overflow-hidden bg-neutral-950">
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
                  {property.badge && (
                    <div className="absolute top-4 left-4 rounded-full bg-[#C6A84B] px-3.5 py-1 text-xs font-bold text-black uppercase tracking-wider">
                      {property.badge}
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8">
                  <span className="text-xs font-semibold text-[#C6A84B] uppercase tracking-wider">
                    {property.location}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-white">
                    {property.title}
                  </h3>
                  <div className="mt-2 font-serif text-2xl font-bold text-[#C6A84B]">
                    {property.price}
                  </div>

                  <div className="mt-6 flex items-center gap-6 border-t border-white/5 pt-4 text-xs font-light text-neutral-300">
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