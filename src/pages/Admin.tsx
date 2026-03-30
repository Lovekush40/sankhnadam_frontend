import { useState } from "react";
import { usePackages } from "@/hooks/usePackages";
import { type TourPackage } from "@/data/packages";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Pencil, Plus, RotateCcw, X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const empty: TourPackage = {
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

  const [editing, setEditing] = useState<TourPackage | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    const newPackage = { ...empty, id: crypto.randomUUID() };
    console.log("Opening new package form:", newPackage);
    setEditing(newPackage);
    setIsNew(true);
  };

  const openEdit = (pkg: TourPackage) => {
    setEditing({ ...pkg });
    setIsNew(false);
  };

  const close = () => {
    setEditing(null);
    setIsNew(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.title.trim() || !editing.location.trim()) {
      toast({ title: "Validation Error", description: "Title and location are required.", variant: "destructive" });
      return;
    }

    try {
      if (isNew) {
        await addPackage(editing);
        toast({ title: "Package added successfully!" });
      } else {
        await updatePackage(editing.id, editing);
        toast({ title: "Package updated successfully!" });
      }
      close();
    } catch (err) {
      toast({ title: "Error", description: "Save failed, please try again.", variant: "destructive" });
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    try {
      await deletePackage(id);
      toast({ title: "Package deleted" });
    } catch (err) {
      toast({ title: "Error", description: "Delete failed, please try again.", variant: "destructive" });
      console.error("Delete error:", err);
    }
  };

  const set = (field: keyof TourPackage, value: unknown) =>
    setEditing((prev) => prev && ({ ...prev, [field]: value }));

  const setList = (field: keyof TourPackage, raw: string) =>
    set(field, raw.split("\n").map((s) => s.trim()).filter(Boolean));

  const setItinerary = (raw: string) => {
    const items = raw.split("\n").filter(Boolean).map((line) => {
      const [day = "", title = "", details = ""] = line.split("|").map((s) => s.trim());
      return { day, title, details };
    });
    set("itinerary", items);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage tour packages and content</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => { resetToDefaults(); toast({ title: "Reset to defaults" }); }}>
                <RotateCcw size={16} className="mr-2" /> Reset All
              </Button>
              <Button size="sm" onClick={openNew} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus size={16} className="mr-2" /> Add Package
              </Button>
            </div>
          </div>

          {/* List */}
          <div className="space-y-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  {pkg.image && (
                    <img src={pkg.image} alt={pkg.title} className="w-20 h-16 object-cover rounded-lg hidden sm:block" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1 truncate text-gray-900">{pkg.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{pkg.location} · {pkg.duration}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-blue-600">₹{pkg.price.toLocaleString("en-IN")}</span>
                      {pkg.originalPrice > pkg.price && (
                        <span className="text-sm text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString("en-IN")}</span>
                      )}
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{pkg.groupSize}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => openEdit(pkg)} className="h-9 border-gray-300 hover:bg-gray-50">
                      <Pencil size={16} className="mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(pkg.id)} className="h-9 text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 hover:bg-red-50">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {packages.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">No packages yet</h3>
                <p className="text-gray-600 mb-6">Get started by creating your first tour package.</p>
                <Button onClick={openNew} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus size={18} className="mr-2" /> Create First Package
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-auto p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900">{isNew ? "Add New Package" : "Edit Package"}</h2>
                  <p className="text-gray-600 text-sm mt-1">Fill in the details below to {isNew ? "create" : "update"} your tour package</p>
                </div>
                <Button variant="ghost" size="icon" onClick={close} className="h-8 w-8 hover:bg-gray-100">
                  <X size={20} />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Package Title" value={editing.title} onChange={(v) => set("title", v)} placeholder="e.g. Vrindavan Divine Darshan" />
                <Field label="Location" value={editing.location} onChange={(v) => set("location", v)} placeholder="e.g. Vrindavan, Uttar Pradesh" />
                <Field label="Duration" value={editing.duration} onChange={(v) => set("duration", v)} placeholder="e.g. 3 Days / 2 Nights" />
                <Field label="Group Size" value={editing.groupSize} onChange={(v) => set("groupSize", v)} placeholder="e.g. 15-25 travellers" />
                <Field label="Price (₹)" value={String(editing.price)} onChange={(v) => set("price", Number(v) || 0)} type="number" placeholder="4999" />
                <Field label="Original Price (₹)" value={String(editing.originalPrice)} onChange={(v) => set("originalPrice", Number(v) || 0)} type="number" placeholder="6999" />
                <Field label="Image URL" value={editing.image} onChange={(v) => set("image", v)} className="sm:col-span-2" placeholder="https://example.com/image.jpg" />
                <Field label="Timing" value={editing.timing} onChange={(v) => set("timing", v)} className="sm:col-span-2" placeholder="e.g. Morning departure" />
              </div>

              <AreaField label="Short Description" value={editing.shortDescription} onChange={(v) => set("shortDescription", v)} rows={3} placeholder="Brief overview of the package..." />
              <AreaField label="Full Description" value={editing.description} onChange={(v) => set("description", v)} rows={4} placeholder="Detailed description of the tour package..." />
              <AreaField label="Highlights (one per line)" value={editing.highlights.join("\n")} onChange={(v) => setList("highlights", v)} rows={4} placeholder="Banke Bihari Temple darshan&#10;ISKCON Temple visit&#10;Yamuna Ghat ceremony" />
              <AreaField label="Inclusions (one per line)" value={editing.inclusions.join("\n")} onChange={(v) => setList("inclusions", v)} rows={4} placeholder="Accommodation&#10;Meals&#10;Transportation&#10;Guide services" />
              <AreaField label="Exclusions (one per line)" value={editing.exclusions.join("\n")} onChange={(v) => setList("exclusions", v)} rows={3} placeholder="Personal expenses&#10;Travel insurance&#10;Visa fees" />
              <AreaField label="Policies (one per line)" value={editing.policies.join("\n")} onChange={(v) => setList("policies", v)} rows={3} placeholder="Cancellation policy&#10;Refund policy&#10;Terms & conditions" />
              <AreaField label="Start Dates (one per line, YYYY-MM-DD)" value={editing.startDates.join("\n")} onChange={(v) => setList("startDates", v)} rows={3} placeholder="2024-01-15&#10;2024-01-22&#10;2024-01-29" />
              <AreaField
                label="Itinerary (one per line: Day|Title|Details)"
                value={editing.itinerary.map((i) => `${i.day}|${i.title}|${i.details}`).join("\n")}
                onChange={setItinerary}
                rows={5}
                placeholder="Day 1|Arrival & Temple Tour|Arrive and visit Banke Bihari Temple&#10;Day 2|Full Day Darshan|Visit ISKCON and other sacred sites&#10;Day 3|Departure|Morning puja and checkout"
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={close} size="lg" className="border-gray-300 hover:bg-gray-50">
                  Cancel
                </Button>
                <Button onClick={handleSave} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Save size={16} className="mr-2" /> {isNew ? "Create Package" : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

function Field({ label, value, onChange, type = "text", placeholder, className }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-sm font-medium mb-2 block text-gray-700">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}

function AreaField({ label, value, onChange, rows = 3, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string;
}) {
  return (
    <div>
      <Label className="text-sm font-medium mb-2 block text-gray-700">{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="min-h-[80px] resize-y border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}

export default Admin;