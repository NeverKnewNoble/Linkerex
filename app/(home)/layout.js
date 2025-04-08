import Footer from "@/components/general/Footer";
import HelpBanner from "@/components/homePage/HelpBanner";
import Hero from "@/components/homePage/Hero";
import Navbar from "@/components/general/Navbar";
import AboutUs from "@/components/homePage/AboutUs";



export default function Layout({ children }) {
  return (
    <main id="home" className="font-work-sans">
      <Navbar />
      <Hero />
      <HelpBanner />
      {children}
      <AboutUs />
      <Footer />
      
    </main>
  );
}
