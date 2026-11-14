import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { JANZEM_DATA } from "../data/landingData";
import { HelpCircle, ChevronDown } from "lucide-react";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section className="relative bg-neutral-950 py-24 px-6 md:px-16 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C6A84B]">
            <HelpCircle className="h-4 w-4" />
            <span>Transparency & Verification</span>
          </div>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {JANZEM_DATA.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-neutral-900/40 overflow-hidden backdrop-blur-md"
              >
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between p-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#C6A84B]"
                >
                  <span className="font-serif text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#C6A84B] ${
                      prefersReducedMotion
                        ? "transition-none"
                        : "transition-transform duration-300"
                    } ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <motion.div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  aria-hidden={!isOpen}
                  initial={false}
                  animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};