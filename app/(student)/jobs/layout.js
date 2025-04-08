import Footer from '@/components/general/Footer';
import Navbar from '@/components/general/Navbar'


export default function Layout({ children }) {
    return (
      <main>
        <Navbar />
        {children}
        {/* <Joblist /> */}
        <Footer />
      </main>
    );
  }