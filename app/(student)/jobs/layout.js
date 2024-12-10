import Footer from '@/app/components/(HomePage)/Footer';
import Navbar from '../../components/(HomePage)/Navbar'
// import Joblist from '@/app/components/(elements)/Joblist';

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