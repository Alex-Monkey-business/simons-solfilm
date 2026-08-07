import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { BeforeAfter } from "@/components/BeforeAfter";
import { About } from "@/components/About";
import { SocialProof } from "@/components/SocialProof";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BrandLoader } from "@/components/BrandLoader";

export default function Home() {
  return (
    <>
      <BrandLoader />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <BeforeAfter />
        <About />
        <SocialProof />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
