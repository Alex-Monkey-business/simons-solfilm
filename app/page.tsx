import type { Metadata } from "next";
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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="innhold">
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
