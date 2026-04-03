import { useParams, Link } from "react-router-dom";
import { usePackages } from "@/hooks/usePackages";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  MapPin,
  Clock,
  Users,
  CalendarDays,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Phone,
  MessageSquare,
  ChevronLeft,
} from "lucide-react";

const PackageDetail = () => {
  const { id } = useParams();
  const { packages, isLoading } = usePackages();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading package...</p>
      </div>
    );
  }

  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center">
          <h1 className="font-bold text-2xl md:text-3xl text-gray-900 mb-4">Package not found</h1>
          <Link to="/packages" className="text-orange-600 hover:text-orange-700 font-semibold inline-flex items-center gap-2">
            <ChevronLeft size={20} /> Back to packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero Image Section - Responsive Fix */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full container mx-auto px-4 sm:px-6 md:px-8 pb-6 md:pb-10 lg:pb-16 z-10">
            <ScrollReveal>
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg leading-tight mb-3 md:mb-4">
                {pkg.title}
              </h1>

              <div className="flex flex-wrap gap-3 md:gap-6 text-white text-sm md:text-base">
                <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
                  <MapPin size={16} className="text-orange-300" />
                  <span>{pkg.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
                  <Clock size={16} className="text-orange-300" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
                  <Users size={16} className="text-orange-300" />
                  <span>{pkg.groupSize}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

          {/* Left / Main Content Column */}
          <div className="lg:col-span-2 space-y-10">

            {/* About Section */}
            <ScrollReveal>
              <div>
                <h2 className="font-bold text-2xl md:text-3xl text-orange-600 mb-4 flex items-center gap-2">
                  <div className="w-1 h-8 bg-orange-600 rounded" />
                  About This Tour
                </h2>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {pkg.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Highlights Section */}
            <ScrollReveal>
              <div>
                <h2 className="font-bold text-2xl md:text-3xl text-orange-600 mb-6 flex items-center gap-2">
                  <div className="w-1 h-8 bg-orange-600 rounded" />
                  Tour Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.highlights.map((h) => (
                    <div 
                      key={h} 
                      className="flex items-start gap-3 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-300"
                    >
                      <CheckCircle2 size={20} className="text-orange-600 mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm md:text-base">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Itinerary Section */}
            <ScrollReveal>
              <div>
                <h2 className="font-bold text-2xl md:text-3xl text-orange-600 mb-6 flex items-center gap-2">
                  <div className="w-1 h-8 bg-orange-600 rounded" />
                  Day-by-Day Itinerary
                </h2>
                <div className="space-y-4">
                  {pkg.itinerary.map((item, idx) => (
                    <ScrollReveal key={item.day} delay={idx * 50}>
                      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 md:p-6 border-l-4 border-orange-600 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-600 text-white font-bold text-sm">
                            {item.day.replace(/\D/g, '')}
                          </span>
                          <h3 className="font-bold text-base md:text-lg text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed ml-11">{item.details}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Inclusions / Exclusions */}
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                
                {/* Inclusions */}
                <div className="bg-green-50 rounded-xl p-6 md:p-8 border border-green-200">
                  <h2 className="font-bold text-lg md:text-xl text-green-700 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={22} className="text-green-600" />
                    What's Included
                  </h2>
                  <ul className="space-y-2.5">
                    {pkg.inclusions.map((i) => (
                      <li key={i} className="text-gray-700 text-sm md:text-base flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-red-50 rounded-xl p-6 md:p-8 border border-red-200">
                  <h2 className="font-bold text-lg md:text-xl text-red-700 mb-4 flex items-center gap-2">
                    <XCircle size={22} className="text-red-600" />
                    Not Included
                  </h2>
                  <ul className="space-y-2.5">
                    {pkg.exclusions.map((e) => (
                      <li key={e} className="text-gray-700 text-sm md:text-base flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5">✗</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </ScrollReveal>

            {/* Policies Section */}
            <ScrollReveal>
              <div className="bg-blue-50 rounded-xl p-6 md:p-8 border border-blue-200">
                <h2 className="font-bold text-lg md:text-xl text-blue-700 mb-4 flex items-center gap-2">
                  <ShieldCheck size={22} className="text-blue-600" />
                  Policies & Terms
                </h2>
                <ul className="space-y-2.5">
                  {pkg.policies.map((p) => (
                    <li key={p} className="text-gray-700 text-sm md:text-base flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              
              {/* Booking Card */}
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-orange-200 shadow-xl sticky top-6">
                  
                  {/* Price Section */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-gray-600 text-sm mb-2">Price per Person</p>
                    <div className="flex items-end gap-2">
                      <span className="font-bold text-4xl text-orange-600">₹{pkg.price.toLocaleString("en-IN")}</span>
                      {pkg.originalPrice > pkg.price && (
                        <span className="text-gray-400 line-through text-lg mb-1">
                          ₹{pkg.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Taxes & fees included</p>
                  </div>

                  {/* Dates Section */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CalendarDays size={16} className="text-orange-600" />
                      Available Dates
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pkg.startDates.slice(0, 5).map((d) => (
                        <span 
                          key={d} 
                          className="text-xs bg-orange-50 text-orange-700 px-3 py-2 rounded-lg font-medium hover:bg-orange-100 transition-colors duration-200"
                        >
                          {new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timing Section */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
                      <Clock size={16} className="text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600 font-semibold">Timing</p>
                        <p className="text-sm text-gray-900 font-medium">{pkg.timing}</p>
                      </div>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <Link
                    to={`/payment/${pkg.id}`}
                    className="block w-full text-center py-4 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-base hover:from-orange-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-600/30 active:scale-95 mb-3"
                  >
                    Reserve Your Seat
                  </Link>

                  <p className="text-xs text-center text-gray-600 mb-4">
                    Pay only <span className="font-bold text-orange-600">₹{Math.round(pkg.price * 0.3).toLocaleString("en-IN")}</span> (30%) to secure your spot
                  </p>

                  {/* Contact CTA */}
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Need Help?</h4>
                    <Link
                      to="/contact"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-orange-600 text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-300"
                    >
                      <MessageSquare size={16} />
                      Chat With Us
                    </Link>
                  </div>

                </div>
              </ScrollReveal>

              {/* Trust Badge */}
              <ScrollReveal delay={100}>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 text-center">
                  <p className="text-2xl mb-1">✓</p>
                  <p className="text-xs text-gray-700">
                    <span className="font-bold text-green-700">100% Safe</span> & Verified Package
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Trusted by 1,200+ pilgrims</p>
                </div>
              </ScrollReveal>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetail;