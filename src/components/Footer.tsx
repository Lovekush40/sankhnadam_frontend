import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[hsl(20_20%_14%)] text-[hsl(36_33%_97%)] p-4">
    <div className="container py-12 md:py-16 px-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold mb-3">
            🙏 Shanknadam Tours
          </h3>
          <p className="text-sm text-orange-100 max-w-xs leading-relaxed">
            Guiding devotees through the sacred lands of Braj Bhoomi since 2018. Experience the divine leelas of Shri Krishna with us.
          </p>
        </div>
        <div>
          <h4 className="font-display text-base font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-orange-100">
            <li><Link to="/packages" className="hover:text-white transition-colors">Tour Packages</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base font-semibold mb-3">Reach Us</h4>
          <ul className="space-y-2 text-sm text-orange-100">
            <li>📍 Vrindavan, Mathura, UP — 281121</li>
            <li>📞 +91 9286145712</li>
            <li>📞 +91 8476068944</li>
            <li>✉️ bhardwajy6013@gmail.com </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-orange-500 mt-10 pt-6 text-center text-xs text-orange-200">
        © {new Date().getFullYear()} Shanknadam Tour & Travels. Radhe Radhe 🙏
      </div>
    </div>
  </footer>
);

export default Footer;
