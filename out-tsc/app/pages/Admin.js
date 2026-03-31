import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { usePackages } from "@/hooks/usePackages";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Pencil, Plus, RotateCcw, X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const empty = {
    id: "",
    title: "",
    location: "",
    duration: "",
    price: 0,
    originalPrice: 0,
    image: "",
    shortDescription: "",
    description: "",
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    policies: [],
    startDates: [],
    timing: "",
    groupSize: "",
};
const Admin = () => {
    const { packages, addPackage, updatePackage, deletePackage, resetToDefaults } = usePackages();
    const { toast } = useToast();
    const [editing, setEditing] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const openNew = () => {
        const newPackage = { ...empty, id: crypto.randomUUID() };
        console.log("Opening new package form:", newPackage);
        setEditing(newPackage);
        setIsNew(true);
    };
    const openEdit = (pkg) => {
        setEditing({ ...pkg });
        setIsNew(false);
    };
    const close = () => {
        setEditing(null);
        setIsNew(false);
    };
    const handleSave = async () => {
        if (!editing)
            return;
        if (!editing.title.trim() || !editing.location.trim()) {
            toast({ title: "Validation Error", description: "Title and location are required.", variant: "destructive" });
            return;
        }
        try {
            if (isNew) {
                await addPackage(editing);
                toast({ title: "Package added successfully!" });
            }
            else {
                await updatePackage(editing.id, editing);
                toast({ title: "Package updated successfully!" });
            }
            close();
        }
        catch (err) {
            toast({ title: "Error", description: "Save failed, please try again.", variant: "destructive" });
            console.error("Save error:", err);
        }
    };
    const handleDelete = async (id) => {
        if (!confirm("Delete this package?"))
            return;
        try {
            await deletePackage(id);
            toast({ title: "Package deleted" });
        }
        catch (err) {
            toast({ title: "Error", description: "Delete failed, please try again.", variant: "destructive" });
            console.error("Delete error:", err);
        }
    };
    const set = (field, value) => setEditing((prev) => prev && ({ ...prev, [field]: value }));
    const setList = (field, raw) => set(field, raw.split("\n").map((s) => s.trim()).filter(Boolean));
    const setItinerary = (raw) => {
        const items = raw.split("\n").filter(Boolean).map((line) => {
            const [day = "", title = "", details = ""] = line.split("|").map((s) => s.trim());
            return { day, title, details };
        });
        set("itinerary", items);
    };
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsx("div", { className: "pt-20 pb-12", children: _jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-8 flex-wrap gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2", children: "Admin Dashboard" }), _jsx("p", { className: "text-gray-600", children: "Manage tour packages and content" })] }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => { resetToDefaults(); toast({ title: "Reset to defaults" }); }, children: [_jsx(RotateCcw, { size: 16, className: "mr-2" }), " Reset All"] }), _jsxs(Button, { size: "sm", onClick: openNew, className: "bg-blue-600 hover:bg-blue-700 text-white", children: [_jsx(Plus, { size: 16, className: "mr-2" }), " Add Package"] })] })] }), _jsxs("div", { className: "space-y-4", children: [packages.map((pkg) => (_jsx("div", { className: "bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow", children: _jsxs("div", { className: "flex items-center gap-4", children: [pkg.image && (_jsx("img", { src: pkg.image, alt: pkg.title, className: "w-20 h-16 object-cover rounded-lg hidden sm:block" })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-lg mb-1 truncate text-gray-900", children: pkg.title }), _jsxs("p", { className: "text-sm text-gray-600 mb-2", children: [pkg.location, " \u00B7 ", pkg.duration] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "text-lg font-bold text-blue-600", children: ["\u20B9", pkg.price.toLocaleString("en-IN")] }), pkg.originalPrice > pkg.price && (_jsxs("span", { className: "text-sm text-gray-500 line-through", children: ["\u20B9", pkg.originalPrice.toLocaleString("en-IN")] })), _jsx("span", { className: "text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full", children: pkg.groupSize })] })] }), _jsxs("div", { className: "flex gap-2 shrink-0", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => openEdit(pkg), className: "h-9 border-gray-300 hover:bg-gray-50", children: [_jsx(Pencil, { size: 16, className: "mr-1" }), " Edit"] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => handleDelete(pkg.id), className: "h-9 text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 hover:bg-red-50", children: _jsx(Trash2, { size: 16 }) })] })] }) }, pkg.id))), packages.length === 0 && (_jsxs("div", { className: "text-center py-16", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDCE6" }), _jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-900", children: "No packages yet" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Get started by creating your first tour package." }), _jsxs(Button, { onClick: openNew, size: "lg", className: "bg-blue-600 hover:bg-blue-700 text-white", children: [_jsx(Plus, { size: 18, className: "mr-2" }), " Create First Package"] })] }))] })] }) }), editing && (_jsx("div", { className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-auto p-4", children: _jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl", children: [_jsx("div", { className: "sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-display text-2xl font-bold text-gray-900", children: isNew ? "Add New Package" : "Edit Package" }), _jsxs("p", { className: "text-gray-600 text-sm mt-1", children: ["Fill in the details below to ", isNew ? "create" : "update", " your tour package"] })] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: close, className: "h-8 w-8 hover:bg-gray-100", children: _jsx(X, { size: 20 }) })] }) }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [_jsx(Field, { label: "Package Title", value: editing.title, onChange: (v) => set("title", v), placeholder: "e.g. Vrindavan Divine Darshan" }), _jsx(Field, { label: "Location", value: editing.location, onChange: (v) => set("location", v), placeholder: "e.g. Vrindavan, Uttar Pradesh" }), _jsx(Field, { label: "Duration", value: editing.duration, onChange: (v) => set("duration", v), placeholder: "e.g. 3 Days / 2 Nights" }), _jsx(Field, { label: "Group Size", value: editing.groupSize, onChange: (v) => set("groupSize", v), placeholder: "e.g. 15-25 travellers" }), _jsx(Field, { label: "Price (\u20B9)", value: String(editing.price), onChange: (v) => set("price", Number(v) || 0), type: "number", placeholder: "4999" }), _jsx(Field, { label: "Original Price (\u20B9)", value: String(editing.originalPrice), onChange: (v) => set("originalPrice", Number(v) || 0), type: "number", placeholder: "6999" }), _jsx(Field, { label: "Image URL", value: editing.image, onChange: (v) => set("image", v), className: "sm:col-span-2", placeholder: "https://example.com/image.jpg" }), _jsx(Field, { label: "Timing", value: editing.timing, onChange: (v) => set("timing", v), className: "sm:col-span-2", placeholder: "e.g. Morning departure" })] }), _jsx(AreaField, { label: "Short Description", value: editing.shortDescription, onChange: (v) => set("shortDescription", v), rows: 3, placeholder: "Brief overview of the package..." }), _jsx(AreaField, { label: "Full Description", value: editing.description, onChange: (v) => set("description", v), rows: 4, placeholder: "Detailed description of the tour package..." }), _jsx(AreaField, { label: "Highlights (one per line)", value: editing.highlights.join("\n"), onChange: (v) => setList("highlights", v), rows: 4, placeholder: "Banke Bihari Temple darshan\nISKCON Temple visit\nYamuna Ghat ceremony" }), _jsx(AreaField, { label: "Inclusions (one per line)", value: editing.inclusions.join("\n"), onChange: (v) => setList("inclusions", v), rows: 4, placeholder: "Accommodation\nMeals\nTransportation\nGuide services" }), _jsx(AreaField, { label: "Exclusions (one per line)", value: editing.exclusions.join("\n"), onChange: (v) => setList("exclusions", v), rows: 3, placeholder: "Personal expenses\nTravel insurance\nVisa fees" }), _jsx(AreaField, { label: "Policies (one per line)", value: editing.policies.join("\n"), onChange: (v) => setList("policies", v), rows: 3, placeholder: "Cancellation policy\nRefund policy\nTerms & conditions" }), _jsx(AreaField, { label: "Start Dates (one per line, YYYY-MM-DD)", value: editing.startDates.join("\n"), onChange: (v) => setList("startDates", v), rows: 3, placeholder: "2024-01-15\n2024-01-22\n2024-01-29" }), _jsx(AreaField, { label: "Itinerary (one per line: Day|Title|Details)", value: editing.itinerary.map((i) => `${i.day}|${i.title}|${i.details}`).join("\n"), onChange: setItinerary, rows: 5, placeholder: "Day 1|Arrival & Temple Tour|Arrive and visit Banke Bihari Temple\nDay 2|Full Day Darshan|Visit ISKCON and other sacred sites\nDay 3|Departure|Morning puja and checkout" }), _jsxs("div", { className: "flex justify-end gap-3 pt-4 border-t border-gray-200", children: [_jsx(Button, { variant: "outline", onClick: close, size: "lg", className: "border-gray-300 hover:bg-gray-50", children: "Cancel" }), _jsxs(Button, { onClick: handleSave, size: "lg", className: "bg-blue-600 hover:bg-blue-700 text-white", children: [_jsx(Save, { size: 16, className: "mr-2" }), " ", isNew ? "Create Package" : "Save Changes"] })] })] })] }) })), _jsx(Footer, {})] }));
};
function Field({ label, value, onChange, type = "text", placeholder, className }) {
    return (_jsxs("div", { className: className, children: [_jsx(Label, { className: "text-sm font-medium mb-2 block text-gray-700", children: label }), _jsx(Input, { type: type, value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, className: "h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500" })] }));
}
function AreaField({ label, value, onChange, rows = 3, placeholder }) {
    return (_jsxs("div", { children: [_jsx(Label, { className: "text-sm font-medium mb-2 block text-gray-700", children: label }), _jsx(Textarea, { value: value, onChange: (e) => onChange(e.target.value), rows: rows, placeholder: placeholder, className: "min-h-[80px] resize-y border-gray-300 focus:border-blue-500 focus:ring-blue-500" })] }));
}
export default Admin;
