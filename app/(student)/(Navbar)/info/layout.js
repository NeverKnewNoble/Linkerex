import Navbar from '@/components/general/Navbar'

export default function Layout({ children }) {
    return (
      <main>
        <Navbar />
        {children}
      </main>
    );
  }