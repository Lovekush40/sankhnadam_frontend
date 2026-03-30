import { Link } from "react-router-dom";
import { MapPin, Clock, Users } from "lucide-react";

type Package = {
  id: string;
  image: string;
  title: string;
  location: string;
  duration: string;
  groupSize: string | number;
  shortDescription: string;
  price: number;
  originalPrice: number;
};

const PackageCard = ({ pkg }: { pkg: Package }) => {
  return (
    <Link
      to={`/packages/${pkg.id}`}
      className="group block bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
          {pkg.title}
        </h3>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <MapPin size={13} /> {pkg.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} /> {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} /> {pkg.groupSize}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {pkg.shortDescription}
        </p>

        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-primary">
            ₹{pkg.price.toLocaleString("en-IN")}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{pkg.originalPrice.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">
            per person
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;