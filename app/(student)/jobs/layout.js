import Navbar from '../../components/(HomePage)/Navbar'

export default function Layout({ children }) {
    return (
      <main>
        <Navbar />
        {children}
        
      </main>
    );
  }