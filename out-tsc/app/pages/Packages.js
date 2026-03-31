import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePackages } from "@/hooks/usePackages";
import PackageCard from "@/components/PackageCard";
import ScrollReveal from "@/components/ScrollReveal";
const Packages = () => {
    const { packages, isLoading, error } = usePackages();
    if (isLoading) {
        return _jsx("div", { className: "text-center py-20", children: "Loading packages..." });
    }
    if (error) {
        return _jsx("div", { className: "text-center py-20 text-red-500", children: error });
    }
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Navbar, {}), _jsx("div", { className: "pt-24 pb-16", children: _jsxs("div", { className: "container", children: [_jsxs(ScrollReveal, { children: [_jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2", children: "Our Tour Packages" }), _jsx("p", { className: "text-muted-foreground text-center mb-10 max-w-lg mx-auto", children: "Choose from our carefully crafted spiritual journeys across the sacred lands of Braj Bhoomi" })] }), _jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: packages.map((pkg, i) => (_jsx(ScrollReveal, { delay: i * 80, children: _jsx(PackageCard, { pkg: pkg }) }, pkg.id))) })] }) }), _jsx(Footer, {})] }));
};
export default Packages;
