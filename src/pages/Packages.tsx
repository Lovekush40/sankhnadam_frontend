import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePackages } from "@/hooks/usePackages";
import PackageCard from "@/components/PackageCard";
import ScrollReveal from "@/components/ScrollReveal";

const Packages = () => {
  const { packages, isLoading, error } = usePackages();

  if (isLoading) {
    return <div className="text-center py-20">Loading packages...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container">
          <ScrollReveal>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
              Our Tour Packages
            </h1>
            <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
              Choose from our carefully crafted spiritual journeys across the sacred lands of Braj Bhoomi
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <ScrollReveal key={pkg.id} delay={i * 80}>
                <PackageCard pkg={pkg} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Packages;