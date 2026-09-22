import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { Statement, Services, Sectors, Agent, Method, Work } from "@/components/Sections";
import Brief from "@/components/Brief";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-full focus:bg-paper focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-bg"
      >
        Skip to Content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <Services />
        <Sectors />
        <Agent />
        <Method />
        <Work />
        <Brief />
      </main>
      <Footer />
    </>
  );
}
