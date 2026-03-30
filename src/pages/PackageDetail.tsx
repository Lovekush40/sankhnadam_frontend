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
      <div className="min-h-screen flex items-center justify-center bg-background p-3">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-2">Package not found</h1>
          <Link to="/packages" className="text-primary underline">
            ← Back to packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[350px] ">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container pb-10 md:pb-16 z-10 ml-3">
          <h1 className="animate-fade-up font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight max-w-2xl">
            {pkg.title}
          </h1>
          <div className="animate-fade-up stagger-2 flex flex-wrap gap-4 mt-3 text-white text-sm">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {pkg.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {pkg.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} /> {pkg.groupSize}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12 md:py-16 px-3">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-8">

          {/* Left / Main */}
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            <ScrollReveal>
              <div>
                <h2 className="font-display text-xl font-bold mb-4 text-primary">About This Tour</h2>
                <p className="text-foreground leading-relaxed">{pkg.description}</p>
              </div>
            </ScrollReveal>

            {/* Highlights */}
            <ScrollReveal>
              <div>
                <h2 className="font-display text-xl font-bold mb-4 text-primary">Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Itinerary */}
            <ScrollReveal>
              <div>
                <h2 className="font-display text-xl font-bold mb-4 text-primary">Itinerary</h2>
                <div className="space-y-4">
                  {pkg.itinerary.map((item) => (
                    <div key={item.day} className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold bg-orange-600 text-white px-2 py-1 rounded">{item.day}</span>
                        <h3 className="font-display font-semibold text-sm text-gray-900">{item.title}</h3>
                      </div>
                      <p className="text-sm text-gray-700">{item.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Inclusions / Exclusions */}
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2 text-green-700">
                    <CheckCircle2 size={18} className="text-green-600" /> Inclusions
                  </h2>
                  <ul className="space-y-1.5">
                    {pkg.inclusions.map((i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span> {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2 text-red-700">
                    <XCircle size={18} className="text-red-600" /> Exclusions
                  </h2>
                  <ul className="space-y-1.5">
                    {pkg.exclusions.map((e) => (
                      <li key={e} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">✗</span> {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            {/* Policies */}
            <ScrollReveal>
              <div>
                <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2 text-primary">
                  <ShieldCheck size={18} /> Policies
                </h2>
                <ul className="space-y-1.5">
                  {pkg.policies.map((p) => (
                    <li key={p} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

          </div>

          {/* Sidebar */}
          <div>
            <ScrollReveal>
              <div className="bg-white rounded-lg p-6 md:p-8  border-2 shadow-2xl border-gray-200 sticky top-20 space-y-5">
                {/* Price */}
                <div>
                  <div className="flex items-end gap-3">
                    <span className="font-display text-3xl font-bold text-orange-600">₹{pkg.price.toLocaleString("en-IN")}</span>
                    <span className="text-sm text-gray-500 line-through mb-1">₹{pkg.originalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-gray-600">per person (taxes included)</p>
                </div>

                {/* Dates */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-1 text-gray-900"><CalendarDays size={14} /> Upcoming Dates</h3>
                  <div className="flex flex-wrap gap-2">
                    {pkg.startDates.map((d) => (
                      <span key={d} className="text-xs bg-gray-100 text-gray-800 px-2.5 py-1 rounded">
                        {new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timing */}
                <div className="text-sm text-gray-700 r border-gray-200 rounded-lg p-3 flex items-center gap-2">
                  <p><strong>Timing:</strong> {pkg.timing}</p>
                </div>

                {/* Book Now */}
                <Link
                  to={`/payment/${pkg.id}`}
                  className="block w-full text-center py-3 md:py-4 rounded-lg bg-orange-600 text-white font-semibold text-sm md:text-base hover:bg-orange-700 active:scale-95 transition-all"
                >
                  Book Now — Pay ₹{Math.round(pkg.price * 0.3).toLocaleString("en-IN")} to Reserve
                </Link>
                <p className="text-xs md:text-sm text-center text-gray-600 mt-1">Pay just 30% now to confirm your seat</p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetail;