export interface Property {
  id: string;
  title: string;
  location: string;
  city: 'Abuja' | 'Kano' | 'Kaduna' | 'Nasarawa';
  price: string;
  originalPrice?: string;
  specs: {
    beds?: number;
    baths?: number;
    sizeSqM: number;
    titleType: string;
  };
  image: string;
  videoUrl?: string;
  badge?: string;
  features: string[];
}

export interface VerificationCert {
  id: string;
  agency: string;
  regNumber: string;
  title: string;
  issuedDate: string;
  status: 'VERIFIED' | 'ACTIVE';
  icon: string;
}

export const JANZEM_DATA = {
  brand: {
    name: "Janzem Real Estate Limited",
    tagline: "Ultra-Luxury Estates across Nigeria's Prime Locations",
    cacNumber: "8983132",
    scumlNumber: "SC 201502330",
    phone: "08035148719",
    whatsapp: "2348035148719",
    tiktok: "@janzem_realestate",
    tiktokFollowers: "172.6K",
    tiktokLikes: "1.6M",
    headquarters: "Abuja, Nigeria",
  },

  heroSequence: {
    totalFrames: 122,
    desktopPath: "/assets/frames/desktop/frame_%04d.webp",
    mobilePath: "/assets/frames/mobile/frame_%04d.webp",
    annotations: [
      {
        frameIndex: 10,
        title: "Land Acquisition & Excavation",
        description: "Soil testing & C-of-O verified land breaking in prime sectors.",
        coords: { x: 30, y: 40 },
      },
      {
        frameIndex: 45,
        title: "Monolithic Structural Core",
        description: "Engineered high-grade concrete & earthquake-resistant framing.",
        coords: { x: 50, y: 45 },
      },
      {
        frameIndex: 85,
        title: "Glass & Façade Integration",
        description: "Double-glazed UV reflective thermal glass installation.",
        coords: { x: 65, y: 35 },
      },
      {
        frameIndex: 118,
        title: "Turnkey Smart Palace",
        description: "Fully automated, solar-integrated luxury masterpiece ready for occupation.",
        coords: { x: 75, y: 55 },
      },
    ],
  },

  walkthroughSequence: {
    totalFrames: 120,
    desktopPath: "/assets/frames/walkthrough_desktop/frame_%04d.webp",
    mobilePath: "/assets/frames/walkthrough_mobile/frame_%04d.webp",
  },

  ideaToRealitySequence: {
    totalFrames: 153,
    desktopPath: "/assets/frames/idea_desktop/frame_%04d.webp",
    mobilePath: "/assets/frames/idea_mobile/frame_%04d.webp",
  },

  verifications: [
    {
      id: "cac",
      agency: "Corporate Affairs Commission",
      regNumber: "RC 8983132",
      title: "Certificate of Incorporation",
      issuedDate: "November 8, 2023",
      status: "VERIFIED",
      icon: "ShieldCheck",
    },
    {
      id: "scuml",
      agency: "EFCC - Special Control Unit Against Money Laundering",
      regNumber: "SC 201502330",
      title: "Certificate of Registration",
      issuedDate: "November 28, 2023",
      status: "ACTIVE",
      icon: "Award",
    },
  ] as VerificationCert[],

  hotSales: [
    {
      id: "hs-1",
      title: "The Golden Crest Villa",
      location: "Maitama Extension, Abuja",
      city: "Abuja",
      price: "₦450,000,000",
      originalPrice: "₦520,000,000",
      specs: { beds: 5, baths: 6, sizeSqM: 850, titleType: "C of O" },
      image: "/assets/images/properties/hot-sale-1.webp",
      videoUrl: "/assets/videos/source/villa drone view.mp4",
      badge: "Save ₦70M",
      features: ["Private Infinity Pool", "Smart Home Automation", "7-Car Garage", "Solar Grid"],
    },
    {
      id: "hs-2",
      title: "Royal Palm Heights",
      location: "Asokoro Diplomatic Zone, Abuja",
      city: "Abuja",
      price: "₦680,000,000",
      originalPrice: "₦750,000,000",
      specs: { beds: 6, baths: 7, sizeSqM: 1100, titleType: "Federal C of O" },
      image: "/assets/images/properties/hot-sale-2.webp",
      videoUrl: "/assets/videos/source/villa exterior video.mp4",
      badge: "Exclusive Promo",
      features: ["Elevator", "Cinematics Room", "Helipad Access", "Perimeter Armor"],
    },
    {
      id: "hs-3",
      title: "Kano Royal Horizon Estate",
      location: "Nassarawa GRA, Kano",
      city: "Kano",
      price: "₦280,000,000",
      originalPrice: "₦320,000,000",
      specs: { beds: 5, baths: 5, sizeSqM: 950, titleType: "Kano Governor's Consent" },
      image: "/assets/images/properties/hot-sale-3.webp",
      videoUrl: "/assets/videos/source/villa exterior 2.mp4",
      badge: "Limited Availability",
      features: ["Traditional Courtyard Blend", "High Security Gatehouse", "Dual Kitchens"],
    },
    {
      id: "hs-4",
      title: "Kaduna Sovereign Court",
      location: "Barnawa GRA, Kaduna",
      city: "Kaduna",
      price: "₦195,000,000",
      originalPrice: "₦230,000,000",
      specs: { beds: 4, baths: 5, sizeSqM: 700, titleType: "KADGIS C of O" },
      image: "/assets/images/properties/hot-sale-4.webp",
      videoUrl: "/assets/videos/source/villa sunset view.mp4",
      badge: "Hot Deal",
      features: ["Solar Powered", "All En-Suite", "Staff Quarters", "Green Lawn"],
    },
  ] as Property[],

  eliteCollection: [
    {
      id: "ec-1",
      title: "Palais de Janzem",
      location: "Guzape Hilltop, Abuja",
      city: "Abuja",
      price: "₦1,200,000,000",
      specs: { beds: 7, baths: 9, sizeSqM: 1800, titleType: "Federal C of O" },
      image: "/assets/images/properties/elite-1.webp",
      videoUrl: "/assets/videos/source/estate birds eyeview.mp4",
      badge: "Ultra Luxury",
      features: ["360 City View", "Subterranean Cinema", "Olympic Lap Pool", "Private Security Detail Quarters"],
    },
    {
      id: "ec-2",
      title: "The Sultan's Haven",
      location: "Badawa GRA, Kano",
      city: "Kano",
      price: "₦550,000,000",
      specs: { beds: 6, baths: 8, sizeSqM: 1400, titleType: "C of O" },
      image: "/assets/images/properties/elite-2.webp",
      videoUrl: "/assets/videos/source/video lapse 2.mp4",
      badge: "Bespoke Architecture",
      features: ["Grand Majlis Salon", "Water Cascade", "Smart HVAC System"],
    },
    {
      id: "ec-3",
      title: "Karu Luxury Oasis",
      location: "Karu Commercial Layout, Nasarawa",
      city: "Nasarawa",
      price: "₦160,000,000",
      specs: { beds: 4, baths: 4, sizeSqM: 600, titleType: "NAGIS C of O" },
      image: "/assets/images/properties/elite-3.webp",
      videoUrl: "/assets/videos/source/villa drone view.mp4",
      badge: "High ROI Spot",
      features: ["Proximity to Abuja Boundary", "Gated Security", "Continuous Power Infrastructure"],
    },
  ] as Property[],

  landLocations: [
    {
      id: "l-1",
      title: "Jampark Prime Commercial Plots",
      location: "Katampe Extension, Abuja",
      city: "Abuja",
      price: "₦120,000,000 / plot",
      specs: { sizeSqM: 1000, titleType: "FCDA Allocation" },
      image: "/assets/images/properties/land-1.webp",
      badge: "Instant Allocation",
      features: ["Tarred Access Roads", "Underground Drainage", "Electricity Grid Ready"],
    },
    {
      id: "l-2",
      title: "Kano Industrial & Residential Layout",
      location: "Challawa GRA Phase 2, Kano",
      city: "Kano",
      price: "₦45,000,000 / plot",
      specs: { sizeSqM: 1200, titleType: "Kano C of O" },
      image: "/assets/images/properties/land-2.webp",
      badge: "High Growth",
      features: ["Commercial Grade", "Dry Flat Land", "Immediate Building Approval"],
    },
    {
      id: "l-3",
      title: "Kaduna Millennium City Layout",
      location: "Millennium City, Kaduna",
      city: "Kaduna",
      price: "₦28,000,000 / plot",
      specs: { sizeSqM: 800, titleType: "KADGIS C of O" },
      image: "/assets/images/properties/land-3.webp",
      badge: "Fast Selling",
      features: ["Gated Estate Layout", "Paved Streetlights", "Perimeter Fence"],
    },
    {
      id: "l-4",
      title: "Karu Gateway Commercial Plots",
      location: "Abuja-Keffi Expressway, Nasarawa",
      city: "Nasarawa",
      price: "₦18,000,000 / plot",
      specs: { sizeSqM: 600, titleType: "NAGIS Right of Occupancy" },
      image: "/assets/images/properties/land-4.webp",
      badge: "High Yield Investment",
      features: ["Expressway Frontage", "Ideal for Plazas & Warehouses", "C-of-O Processing Included"],
    },
  ] as Property[],

  faqs: [
    {
      question: "Are all Janzem properties verified with legitimate titles?",
      answer: "Yes. Every single property in our portfolio has verified titles including FCDA C-of-O, NAGIS, KADGIS, or State Governor's Consent. We operate under full regulatory compliance with CAC Reg No. 8983132 and EFCC SCUML RN: SC 201502330.",
    },
    {
      question: "Can I inspect properties virtually or in person?",
      answer: "We offer high-definition 4K virtual video walkthroughs, live guided video tours over WhatsApp, and direct chauffeured physical site visits in Abuja, Kano, Kaduna, and Nasarawa.",
    },
    {
      question: "What flexible payment plans does Janzem offer?",
      answer: "We offer outright payment discounts as well as structured 6-month to 18-month interest-free installment plans with an initial 30% deposit.",
    },
    {
      question: "How do I start the purchase process?",
      answer: "Contact our client relations desk directly via Phone (08035148719) or WhatsApp. Our legal team will prepare an official Letter of Offer and Land/Property Sale Agreement.",
    },
  ],
};