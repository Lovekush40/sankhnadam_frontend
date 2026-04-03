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

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] md:min-h-[600px] flex items-center overflow-hidden">
        <img
          src="https://merobrajdham.com/wp-content/uploads/al_opt_content/IMAGE/merobrajdham.com/wp-content/uploads/2025/04/Place-To-Visit-In-Brajdham-1.png.bv.webp?bv_host=merobrajdham.com"
          alt="Braj Bhoomi"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="relative w-full container mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20 z-10 flex items-center">
          <div className="w-full md:max-w-2xl">

            <div className="flex items-center gap-2 mb-3 animate-fade-up">
              <Sparkles size={18} className="text-orange-400" />
              <span className="text-orange-300 text-xs sm:text-sm font-semibold tracking-wider">
                SACRED SPIRITUAL JOURNEYS
              </span>
            </div>

            <h1 className="animate-fade-up font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-snug mb-3 md:mb-5 drop-shadow-2xl">
              Discover the Divine Lands of <span className="text-orange-300">Braj Bhoomi</span>
            </h1>

            <p className="animate-fade-up stagger-2 text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-5 md:mb-7 max-w-xl drop-shadow-lg">
              Embark on a spiritual journey through the most sacred destinations of Braj. Experience the divine essence of Vrindavan, Mathura, and beyond.
            </p>

            <div className="animate-fade-up stagger-3 flex flex-col sm:flex-row gap-3">
              <Link
                to="/packages"
                className="inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base transition-all duration-300"
              >
                Explore Packages <ChevronRight size={18} className="ml-2" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-lg border border-white/60 text-white font-bold text-sm sm:text-base hover:bg-white/10 transition-all duration-300"
              >
                Get In Touch
              </Link>
            </div>

            <div className="animate-fade-up stagger-4 mt-6 flex flex-wrap gap-4 text-white text-xs sm:text-sm">
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

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-12 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { num: "1,200+", label: "Happy Travellers" },
              { num: "48+", label: "Tours Completed" },
              { num: "12", label: "Destinations" },
              { num: "4.9★", label: "Rating" },
            ].map((s, idx) => (
              <div key={s.label} className="text-center">
                <div className="font-bold text-2xl sm:text-3xl md:text-4xl text-orange-600 mb-1">
                  {s.num}
                </div>
                <div className="text-xs md:text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Popular Tour Packages
            </h2>
            <DimondLine className="mx-auto mb-4" />
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
              Hand-picked spiritual journeys curated with devotion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
            {featured.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/packages"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm sm:text-base transition-all duration-300"
            >
              View All Packages <ChevronRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            Why Travel With Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: "🛕", title: "Expert Guides", desc: "Local experts for sacred journeys." },
              { icon: "🍃", title: "Pure Veg Meals", desc: "Sattvic, hygienic food." },
              { icon: "🚐", title: "Comfort Travel", desc: "Clean & AC transport." },
              { icon: "💰", title: "Affordable", desc: "Transparent pricing." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 md:p-6 shadow-sm text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-base md:text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-600 py-12 md:py-16 px-4 text-center text-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
          Ready for a Spiritual Journey?
        </h2>
        <p className="text-orange-100 text-sm sm:text-base mb-6 max-w-xl mx-auto">
          Join thousands of pilgrims who experienced Braj Bhoomi
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-orange-600 font-bold text-sm sm:text-base"
        >
          Plan Your Tour
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;