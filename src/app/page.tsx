import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { Services, WhoWeServe, Agent, Process, Work } from "@/components/Sections";
import Brief from "@/components/Brief";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to Content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <WhoWeServe />
        <Agent />
        <Process />
        <Work />
        <Brief />
      </main>
      <Footer />
    </>
  );
}
