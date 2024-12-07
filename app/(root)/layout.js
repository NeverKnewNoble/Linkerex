import Footer from "../components/(HomePage)/Footer";
import HelpBanner from "../components/(HomePage)/HelpBanner";
import Hero from "../components/(HomePage)/Hero";
import Navbar from "../components/(HomePage)/Navbar";
import TabCards from "../components/(HomePage)/TabCards";

export default function Layout({ children }) {
  return (
    <main id="hero" className="font-work-sans">
      <Navbar />
      <Hero />
      <HelpBanner />
      {children}
      <TabCards />
      <Footer />
    </main>
  );
}