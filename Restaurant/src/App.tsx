import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import AdminReservations from "./components/AdminReservations";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import SignatureDishes from "./components/SignatureDishes";
import MenuSection from "./components/MenuSection";
import Chef from "./components/Chef";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === "#admin");

  useEffect(() => {
    const updateRoute = () => setIsAdmin(window.location.hash === "#admin");
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  if (isAdmin) {
    return <AdminReservations />;
  }

  return (
    <div className="min-h-screen bg-ink font-sans text-cream">
      <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>
      <Navbar />
      <main>
        <Hero active={!loading} />
        <Marquee />
        <About />
        <SignatureDishes />
        <MenuSection />
        <Chef />
        <Gallery />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </div>
  );
}
