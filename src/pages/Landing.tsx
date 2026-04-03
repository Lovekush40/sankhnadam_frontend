import { Link } from "react-router-dom";
import { usePackages } from "@/hooks/usePackages";
import PackageCard from "@/components/PackageCard";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DimondLine from "@/components/ui/DimondLine";

const Landing = () => {
  const { packages, isLoading, error } = usePackages();
  const featured = packages.slice(0, 3);

  if (isLoading) return <div className="text-center py-20">Loading packages...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[90vh] min-h-[500px] flex items-end overflow-hidden px-3">
        <img
          src="https://merobrajdham.com/wp-content/uploads/al_opt_content/IMAGE/merobrajdham.com/wp-content/uploads/2025/04/Place-To-Visit-In-Brajdham-1.png.bv.webp?bv_host=merobrajdham.com"
          alt="Braj Bhoomi"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="relative container pb-16 md:pb-24 z-10">
          <h1 className="animate-fade-up font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl drop-shadow-[0_30px_30px_rgba(0,0,0,0.6)]" style={{ lineHeight: 1.1 }}>
            Discover the Divine Lands of Braj Bhoomi
          </h1>
          <p className="animate-fade-up stagger-2 text-gray-100 text-base md:text-lg mt-4 max-w-md drop-shadow-lg">
            Spiritual tours to Vrindavan, Mathura, Barsana, Govardhan & Nandgaon — curated with love and devotion by Sanknadam Tours.
          </p>
          <div className="animate-fade-up stagger-3 flex flex-wrap gap-3 mt-6">
            <Link
              to="/packages"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-orange-500/90 text-white font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all"
            >
              Explore Packages
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-white/40 text-white/80 font-semibold text-sm hover:bg-white/10 active:scale-[0.97] transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <ScrollReveal>
        <section className="bg-card py-10 px-3">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "1,200+", label: "Happy Travellers" },
              { num: "48+", label: "Tours Completed" },
              { num: "12", label: "Sacred Destinations" },
              { num: "4.9★", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl md:text-3xl font-bold text-primary">{s.num}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Packages */}
      <section className="py-16 md:py-24 px-3">
        <div className="container">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
              Popular Tour Packages
            </h2>
            <DimondLine className="mx-auto mb-4" />
            <p className="text-muted-foreground text-center mb-10 max-w-md mx-auto">
              Hand-picked spiritual journeys through the holiest sites of Braj
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((pkg, i) => (
              <ScrollReveal key={pkg.id} delay={i * 100}>
                <PackageCard pkg={pkg} />
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/packages"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[hsl(348_52%_32%)] text-[hsl(36_33%_97%)] font-semibold text-sm hover:brightness-95 active:scale-[0.97] transition-all"
            >
              View All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-card py-16 md:py-24 px-3">
        <div className="container">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              Why Travel With Us
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🛕", title: "Expert Guides", desc: "Local pandits and scholars who know every leela sthal." },
              { icon: "🍃", title: "Pure Veg Meals", desc: "Sattvic home-cooked Braj cuisine included in every tour." },
              { icon: "🚐", title: "Comfortable Travel", desc: "AC vehicles, clean stays, hassle-free arrangements." },
              { icon: "💰", title: "Affordable Prices", desc: "Budget-friendly packages with no hidden charges." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="bg-background rounded-lg p-6 shadow-sm text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-display text-base font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;