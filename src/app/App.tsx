import { Route, Routes } from "react-router";
import { Footer } from "./components/Footer";
import { SiteHeader } from "./components/SiteHeader";
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ServicesPage } from "./pages/ServicesPage";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
