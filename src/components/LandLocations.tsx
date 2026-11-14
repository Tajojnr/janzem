import React, { useState } from "react";
import { motion } from "framer-motion";
import { JANZEM_DATA, type Property } from "../data/landingData";
import { MapPin, FileCheck, ArrowUpRight } from "lucide-react";

type CityFilter = 'All' | 'Abuja' | 'Kano' | 'Kaduna' | 'Nasarawa';

export const LandLocations: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityFilter>('All');

  const filteredPlots = selectedCity === 'All'
    ? JANZEM_DATA.landLocations
    : JANZEM_DATA.landLocations.filter((p: Property) => p.city === selectedCity);

  return (
    <section className="relative bg-[#0A0A0A] py-24 px-6 md:px-16 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C6A84B]">
              <MapPin className="h-4 w-4" />
              <span>Verified Sovereign Land Bank</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl font-bold text-white">
              Land Holdings Across Nigeria
            </h2>
          </div>

          {/* City Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {(['All', 'Abuja', 'Kano', 'Kaduna', 'Nasarawa'] as CityFilter[]).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                  selectedCity === city
                    ? 'bg-[#C6A84B] text-black font-bold shadow-lg'
                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Plots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPlots.map((plot: Property) => (
            <motion.div
              key={plot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl border border-white/10 bg-neutral-900/40 overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-[#C6A84B]/50"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={plot.image}
                  alt={plot.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {plot.badge && (
                  <div className="absolute top-4 left-4 rounded-full bg-[#C6A84B] px-3.5 py-1 text-xs font-bold text-black uppercase tracking-wider">
                    {plot.badge}
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-xs font-semibold text-[#C6A84B] uppercase tracking-wider">
                      {plot.location}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-white">
                      {plot.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-b border-white/5 py-4">
                  <div className="font-serif text-xl font-bold text-[#C6A84B]">
                    {plot.price}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <FileCheck className="h-4 w-4 text-[#C6A84B]" />
                    <span>{plot.specs.titleType}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#C6A84B]">
                    {plot.specs.sizeSqM} m²
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <a
                    href={`https://wa.me/${JANZEM_DATA.brand.whatsapp}?text=Inquiry%20regarding%20land%20plot:%20${encodeURIComponent(plot.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#C6A84B] transition-colors"
                  >
                    <span>Inquire Allocation</span>
                    <ArrowUpRight className="h-4 w-4 text-[#C6A84B]" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};