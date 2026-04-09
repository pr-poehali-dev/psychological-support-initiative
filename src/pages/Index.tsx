import { useState, useEffect } from "react";
import { Header, HeroSection, PainPointsSection, AboutSection } from "@/components/sections/HeroAboutSections";
import { ProcessSection, ResultsSection } from "@/components/sections/ProcessResultsSections";
import { TestimonialsSection, PricingSection } from "@/components/sections/TestimonialsPricingSection";
import { ContactSection, Footer } from "@/components/sections/ContactFooterSection";
import PortfolioSection from "@/components/sections/PortfolioSection";

export default function Index() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setFormStatus("loading");
    try {
      const res = await fetch("https://functions.poehali.dev/4dc45207-e781-4cb3-961c-a2b1ee3e0ed1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormStatus("success");
        setForm({ name: "", phone: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <Header dark={dark} scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} toggleDark={toggleDark} />
      <HeroSection />
      <PainPointsSection />
      <AboutSection />
      <PortfolioSection />
      <ProcessSection />
      <ResultsSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection form={form} setForm={setForm} formStatus={formStatus} setFormStatus={setFormStatus} handleFormSubmit={handleFormSubmit} />
      <Footer />
    </div>
  );
}