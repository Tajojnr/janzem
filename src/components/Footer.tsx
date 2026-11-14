import React from "react";
import { JANZEM_DATA } from "../data/landingData";
import { ShieldCheck, Phone, MapPin, Award, ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Social links: paste your real profile URLs here.                    */
/* An icon only appears once its URL is filled in, so there are no     */
/* dead links on the live site.                                        */
/* ------------------------------------------------------------------ */
const SOCIAL_URLS = {
  instagram: "", // e.g. "https://www.instagram.com/your_handle"
  facebook: "", // e.g. "https://www.facebook.com/your.page"
  youtube: "", // e.g. "https://www.youtube.com/@your_channel"
};

/* ---------------------------- Brand icons ---------------------------- */
type IconProps = { className?: string };

const TikTokIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .55.04.81.1v-3.5a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.19 8.19 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
  </svg>
);

const InstagramIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YouTubeIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WhatsAppIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* Resting state is quiet; each icon takes its real brand colour on hover. */
const SOCIAL_BASE =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A84B]";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { brand } = JANZEM_DATA;

  const socials = [
    {
      label: "Janzem on Instagram",
      href: SOCIAL_URLS.instagram,
      Icon: InstagramIcon,
      hover:
        "hover:bg-gradient-to-tr hover:from-[#F9CE34] hover:via-[#EE2A7B] hover:to-[#6228D7]",
    },
    {
      label: "Janzem on WhatsApp",
      href: `https://wa.me/${brand.whatsapp}?text=Hello%20Janzem%20Real%20Estate`,
      Icon: WhatsAppIcon,
      hover: "hover:bg-[#25D366]",
    },
    {
      label: "Janzem on YouTube",
      href: SOCIAL_URLS.youtube,
      Icon: YouTubeIcon,
      hover: "hover:bg-[#FF0000]",
    },
    {
      label: "Janzem on Facebook",
      href: SOCIAL_URLS.facebook,
      Icon: FacebookIcon,
      hover: "hover:bg-[#1877F2]",
    },
    {
      label: "Janzem on TikTok",
      href: `https://www.tiktok.com/${brand.tiktok}`,
      Icon: TikTokIcon,
      hover: "hover:bg-[#FE2C55]",
    },
  ].filter((s) => s.href);

  return (
    <footer className="relative z-20 overflow-x-clip border-t border-white/10 bg-[#050505] pt-20 pb-10 text-neutral-400">
      {/* Soft gold glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[480px] -translate-x-1/2 rounded-full bg-[#C6A84B]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        {/* Top Grid */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand Column */}
          <div className="space-y-5 md:col-span-4">
            <a href="#" className="group inline-flex items-center gap-3.5">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/60 p-1.5 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/assets/images/ui/logo.webp"
                  alt={brand.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-extrabold tracking-wider text-white transition-colors group-hover:text-[#C6A84B]">
                  JANZEM
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#C6A84B]">
                  REAL ESTATE LTD
                </span>
              </div>
            </a>

            <p className="max-w-xs text-sm font-light leading-relaxed text-neutral-400">
              {brand.tagline}
            </p>

            {/* Regulatory Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C6A84B]/20 bg-[#C6A84B]/5 px-3 py-1.5 font-mono text-[11px] text-[#C6A84B]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>CAC RC {brand.cacNumber}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C6A84B]/20 bg-[#C6A84B]/5 px-3 py-1.5 font-mono text-[11px] text-[#C6A84B]">
                <Award className="h-3.5 w-3.5" />
                <span>SCUML {brand.scumlNumber}</span>
              </div>
            </div>

            {/* Social Icons */}
            <ul className="flex flex-wrap items-center gap-3 pt-2" aria-label="Janzem on social media">
              {socials.map(({ label, href, Icon, hover }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    title={label}
                    className={`${SOCIAL_BASE} ${hover}`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`tel:${brand.phone}`}
                  aria-label="Call Janzem"
                  title="Call Janzem"
                  className={`${SOCIAL_BASE} hover:bg-[#C6A84B]`}
                >
                  <Phone className="h-[18px] w-[18px]" aria-hidden />
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <a href="#vision" className="transition-colors hover:text-[#C6A84B]">
                  Architectural Vision
                </a>
              </li>
              <li>
                <a href="#hot-sales" className="transition-colors hover:text-[#C6A84B]">
                  Hot Sales
                </a>
              </li>
              <li>
                <a href="#elite" className="transition-colors hover:text-[#C6A84B]">
                  Elite Collection
                </a>
              </li>
              <li>
                <a href="#walkthrough" className="transition-colors hover:text-[#C6A84B]">
                  3D Walkthrough
                </a>
              </li>
              <li>
                <a href="#land" className="transition-colors hover:text-[#C6A84B]">
                  Land Holdings
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-[#C6A84B]">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Corridors */}
          <div className="md:col-span-3">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Primary Corridors
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6A84B]" />
                <span>Abuja — Maitama, Asokoro, Guzape</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6A84B]" />
                <span>Kano — Nassarawa GRA</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6A84B]" />
                <span>Kaduna — Barnawa GRA</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6A84B]" />
                <span>Nasarawa — Sultan Road Corridor</span>
              </li>
            </ul>
          </div>

          {/* Concierge CTA */}
          <div className="md:col-span-3">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Private Concierge
            </h4>
            <div className="space-y-4 text-sm font-light">
              <a
                href={`tel:${brand.phone}`}
                className="flex items-center gap-2.5 transition-colors hover:text-[#C6A84B]"
              >
                <Phone className="h-4 w-4 text-[#C6A84B]" />
                <span className="font-medium text-white">{brand.phone}</span>
              </a>

              <p className="text-xs leading-relaxed text-neutral-500">
                Abuja, Kano, Kaduna & Nasarawa offices · Nigeria
              </p>

              <a
                href={`https://wa.me/${brand.whatsapp}?text=Hello%20Janzem%20Real%20Estate,%20I%20would%20like%20a%20private%20consultation.`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C6A84B] to-[#e5c365] px-5 py-2.5 text-xs font-bold text-black transition-all hover:shadow-lg hover:shadow-[#C6A84B]/20"
              >
                <span>WhatsApp Concierge</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 text-[11px] text-neutral-500 md:flex-row">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-wide">
            TikTok {brand.tiktok} · {brand.tiktokFollowers} followers · {brand.tiktokLikes} likes
          </p>
          <p className="font-mono">SCUML RN: {brand.scumlNumber}</p>
        </div>
      </div>
    </footer>
  );
};