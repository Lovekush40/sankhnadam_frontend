import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Phone, Mail, MapPin, MessageCircle, Instagram } from "lucide-react";
const Contact = () => {
    const [form, setForm] = useState({ message: "" });
    const [sent, setSent] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/api/v1/contact/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 🔐 send token if using JWT
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                },
                body: JSON.stringify({
                    message: form.message
                })
            });
            if (!res.ok) {
                throw new Error("Failed to send message");
            }
            setSent(true);
            setForm(prev => ({ ...prev, message: "" }));
            setTimeout(() => setSent(false), 4000);
        }
        catch (error) {
            console.error(error);
            alert("Error sending message");
        }
    };
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Navbar, {}), _jsx("div", { className: "pt-24 pb-16 px-3", children: _jsxs("div", { className: "container", children: [_jsxs(ScrollReveal, { children: [_jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2", children: "Get In Touch" }), _jsx("p", { className: "text-gray-700 text-center mb-12 max-w-md mx-auto", children: "Have questions about our tours? Reach us directly or send a message." })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-10 max-w-4xl mx-auto", children: [_jsx(ScrollReveal, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Phone, { size: 20, className: "text-orange-600 mt-1" }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-sm text-gray-900", children: "Phone" }), _jsx("p", { className: "text-gray-700 text-sm", children: "+91 98765 43210" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Mail, { size: 20, className: "text-orange-600 mt-1" }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-sm text-gray-900", children: "Email" }), _jsx("p", { className: "text-gray-700 text-sm", children: "info@sanknadamtours.com" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(MapPin, { size: 20, className: "text-orange-600 mt-1" }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-sm text-gray-900", children: "Office" }), _jsx("p", { className: "text-gray-700 text-sm", children: "Near Banke Bihari Temple, Vrindavan, Mathura, UP \u2014 281121" })] })] }), _jsxs("div", { className: "border-t border-gray-200 pt-6 space-y-4", children: [_jsx("h3", { className: "font-display font-bold text-base text-gray-900", children: "Chat With Us" }), _jsxs("a", { href: "https://wa.me/919286145712", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 bg-green-600 text-white rounded-lg px-5 py-3 font-semibold text-sm hover:bg-green-700 active:scale-[0.97] transition-all", children: [_jsx(MessageCircle, { size: 20 }), " Chat on WhatsApp"] }), _jsxs("a", { href: "https://instagram.com/shankhnadam_tourandtravels", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg px-5 py-3 font-semibold text-sm hover:from-pink-600 hover:to-orange-600 active:scale-[0.97] transition-all", children: [_jsx(Instagram, { size: 20 }), " Follow on Instagram"] })] })] }) }), _jsx(ScrollReveal, { delay: 120, children: _jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-lg p-6 shadow-md border border-gray-200 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium block mb-1 text-gray-900", children: "Message" }), _jsx("textarea", { required: true, rows: 4, value: form.message, onChange: (e) => setForm({ ...form, message: e.target.value }), className: "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none", placeholder: "I'd like to know more about the Braj Parikrama tour..." })] }), _jsx("button", { type: "submit", className: "w-full py-3 rounded-lg bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 active:scale-[0.97] transition-all", children: "Send Message" }), sent && (_jsx("p", { className: "text-sm text-green-600 text-center font-medium animate-fade-in", children: "\u2713 Message sent! We'll get back to you soon. Radhe Radhe! \uD83D\uDE4F" }))] }) })] })] }) }), _jsx(Footer, {})] }));
};
export default Contact;
