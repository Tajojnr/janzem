import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JANZEM_DATA, type VerificationCert } from "../data/landingData";
import { ShieldCheck, Award, CheckCircle2, Eye, X, ExternalLink } from "lucide-react";

export const TrustBar: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<VerificationCert & { image: string } | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedCert) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCert(null);
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [selectedCert]);

  const certImages: Record<string, string> = {
    cac: "/assets/images/certificates/cac-certificate.webp",
    scuml: "/assets/images/certificates/scuml-certificate.webp",
  };

  return (
    <>
      <section id="trust" className="relative bg-[#080808] border-y border-white/10 py-16 px-6 md:px-16 overflow-hidden">
        {/* Ambient Gold Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[600px] rounded-full bg-[#C6A84B]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C6A84B] uppercase">
              <CheckCircle2 className="w-4 h-4 text-[#C6A84B]" />
              <span>Government Verified Real Estate Corporation</span>
            </div>
            <h3 className="mt-2 font-serif text-2xl md:text-4xl font-bold text-white leading-tight">
              100% Verified Regulatory Compliance
            </h3>
            <p className="mt-2 text-xs md:text-sm font-light text-neutral-400 max-w-md">
              Click any credential card to inspect our official legal incorporation and anti-money laundering registration documents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full lg:w-auto">
            {JANZEM_DATA.verifications.map((cert: VerificationCert) => {
              const imagePath = certImages[cert.id] || certImages.cac;
              return (
                <motion.div
                  key={cert.id}
                  whileHover={{ y: -3 }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#C6A84B]/60 hover:shadow-xl hover:shadow-[#C6A84B]/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-xl bg-[#C6A84B]/10 p-3 text-[#C6A84B] border border-[#C6A84B]/20">
                      {cert.id === "cac" ? (
                        <ShieldCheck className="w-6 h-6" />
                      ) : (
                        <Award className="w-6 h-6" />
                      )}
                    </div>
                    <span className="rounded-full bg-[#C6A84B]/20 border border-[#C6A84B]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#C6A84B] uppercase tracking-wider">
                      {cert.status}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="font-serif font-bold text-white text-lg block">
                      {cert.agency}
                    </span>
                    <div className="mt-1 font-mono text-sm font-bold text-[#C6A84B]">
                      {cert.regNumber}
                    </div>
                    <p className="mt-1 text-xs text-neutral-400 font-light">
                      {cert.title} • Issued {cert.issuedDate}
                    </p>
                  </div>

                  {/* View Document Action */}
                  <button
                    type="button"
                    onClick={() => setSelectedCert({ ...cert, image: imagePath })}
                    data-cursor="INSPECT"
                    className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-semibold text-white group-hover:text-[#C6A84B] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A84B]"
                  >
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#C6A84B]" />
                      Inspect Original Document
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Official Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-2xl"
          >
            <motion.div
              ref={dialogRef}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-dialog-title"
              tabIndex={-1}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-[#C6A84B]/40 bg-neutral-950 p-6 md:p-8 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#C6A84B] uppercase tracking-wider">
                    Official Verification Document
                  </span>
                  <h3 id="certificate-dialog-title" className="font-serif text-xl font-bold text-white">
                    {selectedCert.agency}
                  </h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate dialog"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A84B]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Certificate Image View */}
              <div className="my-6 flex justify-center overflow-y-auto max-h-[60vh] rounded-xl border border-white/10 bg-black/60 p-2">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[55vh] w-auto object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.alt = "Certificate image could not be loaded";
                  }}
                />
              </div>

              {/* Modal Footer Credentials */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs text-neutral-400">
                <div>
                  <span className="text-white font-semibold">Reg Number:</span>{" "}
                  <span className="font-mono text-[#C6A84B]">{selectedCert.regNumber}</span>
                </div>
                <div>
                  <span className="text-white font-semibold">Status:</span>{" "}
                  <span className="text-[#C6A84B]">{selectedCert.status}</span>
                </div>
                <div>
                  <span className="text-white font-semibold">Issued:</span> {selectedCert.issuedDate}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};