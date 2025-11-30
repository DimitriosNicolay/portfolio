import ContactSidebar from "@/components/ContactSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Contact Sidebar */}
      <ContactSidebar />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <Footer />
      </div>
    </main>
  );
}
