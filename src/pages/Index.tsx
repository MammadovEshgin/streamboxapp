import { lazy, Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import Footer from "@/components/landing/Footer";

const FeaturesSection = lazy(() => import("@/components/landing/FeaturesSection"));
const ScreenshotsSection = lazy(() => import("@/components/landing/ScreenshotsSection"));
const AppShowcase = lazy(() => import("@/components/landing/AppShowcase"));
const DownloadSection = lazy(() => import("@/components/landing/DownloadSection"));

const SectionFallback = () => <div aria-hidden />;

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <Suspense fallback={<SectionFallback />}>
      <FeaturesSection />
      <ScreenshotsSection />
      <AppShowcase />
      <DownloadSection />
    </Suspense>
    <Footer />
  </div>
);

export default Index;
