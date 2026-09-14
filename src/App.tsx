import AppShowcase from "@/components/AppShowcase";
import DownloadSection from "@/components/DownloadSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ScreenshotsSection from "@/components/ScreenshotsSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ScreenshotsSection />
        <AppShowcase />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
