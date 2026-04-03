import { Link } from "react-router-dom";
import { usePackages } from "@/hooks/usePackages";
import PackageCard from "@/components/PackageCard";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DimondLine from "@/components/ui/DimondLine";
import { ChevronRight, Sparkles } from "lucide-react";

const Landing = () => {
  const { packages, isLoading, error } = usePackages();
  const featured = packages.slice(0, 3);

  if (isLoading) return <div className="text-center py-20">Loading packages...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero - Responsive Fix */}
      <section className="relative w-full h-screen max-h-[800px] md:max-h-none md:h-auto md:min-h-[600px] flex items-center overflow-hidden">
        <img
          src="https://merobrajdham.com/wp-content/uploads/al_opt_content/IMAGE/merobrajdham.com/wp-content/uploads/2025/04/Place-To-Visit-In-Brajdham-1.png.bv.webp?bv_host=merobrajdham.com"
          alt="Braj Bhoomi"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Enhanced gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative w-full container mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20 lg:py-32 z-10 flex items-center min-h-screen md:min-h-auto">
          <div className="w-full md:max-w-3xl">
            <div className="flex items-center gap-2 mb-4 animate-fade-up">
              <Sparkles size={20} className="text-orange-400" />
              <span className="text-orange-300 text-sm font-semibold tracking-wider">SACRED SPIRITUAL JOURNEYS</span>
            </div>

            <h1 className="animate-fade-up font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-4 md:mb-6 drop-shadow-2xl">
              Discover the Divine Lands of <span className="text-orange-300">Braj Bhoomi</span>
            </h1>

            <p className="animate-fade-up stagger-2 text-gray-100 text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8 max-w-2xl drop-shadow-lg">
              Embark on a spiritual journey through the most sacred destinations of Braj. Experience the divine essence of Vrindavan, Mathura, and beyond with expert guides and devotional care.
            </p>

            <div className="animate-fade-up stagger-3 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/packages"
                className="inline-flex items-center justify-center sm:justify-start px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 active:scale-[0.97]"
              >
                Explore Packages <ChevronRight size={20} className="ml-2" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center sm:justify-start px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-white/60 text-white font-bold text-sm sm:text-base hover:bg-white/10 transition-all duration-300 active:scale-[0.97]"
              >
                Get In Touch
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="animate-fade-up stagger-4 mt-8 md:mt-12 flex flex-wrap gap-4 sm:gap-6 text-white text-sm">
              <div className="flex items-center gap-2">
                <span className="text-orange-300 font-bold">1,200+</span>
                <span className="text-gray-200">Happy Travelers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-300 font-bold">4.9★</span>
                <span className="text-gray-200">Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Improved Spacing */}
      <ScrollReveal>
        <section className="bg-gradient-to-br from-orange-50 to-white py-12 md:py-16 px-4 sm:px-6 md:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { num: "1,200+", label: "Happy Travellers" },
                { num: "48+", label: "Tours Completed" },
                { num: "12", label: "Sacred Destinations" },
                { num: "4.9★", label: "Average Rating" },
              ].map((s, idx) => (
                <ScrollReveal key={s.label} delay={idx * 100}>
                  <div className="text-center">
                    <div className="font-bold text-3xl md:text-4xl text-orange-600 mb-2">{s.num}</div>
                    <div className="text-xs md:text-sm text-gray-600 font-medium">{s.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Packages - Responsive Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Popular Tour Packages
              </h2>
              <DimondLine className="mx-auto mb-4" />
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                Hand-picked spiritual journeys curated with devotion through the holiest sites of Braj Bhoomi
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            {featured.map((pkg, i) => (
              <ScrollReveal key={pkg.id} delay={i * 100}>
                <PackageCard pkg={pkg} />
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/packages"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-base transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              View All Packages <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section - Better Responsive Layout */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12 md:mb-16">
              Why Travel With Us
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: "🛕",
                title: "Expert Guides",
                desc: "Local pandits and scholars who know every sacred site and spiritual story.",
              },
              {
                icon: "🍃",
                title: "Pure Veg Meals",
                desc: "Sattvic, home-cooked Braj cuisine prepared with spiritual consciousness.",
              },
              {
                icon: "🚐",
                title: "Comfortable Travel",
                desc: "Modern AC vehicles, clean accommodations, and hassle-free arrangements.",
              },
              {
                icon: "💰",
                title: "Affordable Prices",
                desc: "Transparent pricing with flexible payment options and no hidden charges.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="group bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 text-center hover:-translate-y-1">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready for a Spiritual Journey?</h2>
          <p className="text-orange-100 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of pilgrims who have experienced the divine grace of Braj Bhoomi
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-orange-600 font-bold text-base hover:bg-gray-100 transition-all duration-300 active:scale-95"
          >
            Plan Your Tour Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;