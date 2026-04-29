import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Achievements } from "@/components/site/Achievements";
import { Leadership } from "@/components/site/Leadership";
import { Objectives } from "@/components/site/Objectives";
import { Founder } from "@/components/site/Founder";
import { Gallery } from "@/components/site/Gallery";
import { Join } from "@/components/site/Join";
import { Donate } from "@/components/site/Donate";
import { Footer } from "@/components/site/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Achievements />
        <Leadership />
        <Objectives />
        <Founder />
        <Gallery />
        <Join />
        <Donate />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
