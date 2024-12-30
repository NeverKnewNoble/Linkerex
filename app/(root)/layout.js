import Footer from "../components/(HomePage)/Footer";
import HelpBanner from "../components/(HomePage)/HelpBanner";
import Hero from "../components/(HomePage)/Hero";
import Navbar from "../components/(HomePage)/Navbar";
import AboutUs from "../components/(HomePage)/AboutUs";



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
