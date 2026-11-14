import { MotionConfig } from "framer-motion";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { ScrollVideoEngine } from "./components/ScrollVideoEngine";
import { TrustBar } from "./components/TrustBar";
import { BlueprintMorph } from "./components/BlueprintMorph";
import { HotSales } from "./components/HotSales";
import { EliteCollection } from "./components/EliteCollection";
import { VillaWalkthrough } from "./components/VillaWalkthrough";
import { LandLocations } from "./components/LandLocations";
import { FAQSection } from "./components/FAQSection";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#C6A84B] selection:text-black font-sans antialiased">
        {/* Custom Physics Gold Cursor */}
        <CustomCursor />

        {/* Sticky Luxury Glass Navigation */}
        <Navbar />

        <main>
          {/* Hero Section: 82-Frame Construction Timelapse Scrub */}
          <section id="vision" className="relative">
            <ScrollVideoEngine />
          </section>

          {/* Regulatory Compliance & Regulatory Badges */}
          <TrustBar />

          {/* 3-Stage Blueprint Morph Section */}
          <BlueprintMorph />

          {/* Hot Sales Section */}
          <section id="hot-sales">
            <HotSales />
          </section>

          {/* Ultra-Luxury Elite Collection Section */}
          <section id="elite">
            <EliteCollection />
          </section>

          {/* Interior Walkthrough Scroll Engine */}
          <section id="walkthrough">
            <VillaWalkthrough />
          </section>

          {/* Land Holdings & City Filter Section */}
          <section id="land">
            <LandLocations />
          </section>

          {/* Regulatory FAQ Accordion Section */}
          <section id="faq">
            <FAQSection />
          </section>

          {/* Conversion CTA Section */}
          <CTA />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;