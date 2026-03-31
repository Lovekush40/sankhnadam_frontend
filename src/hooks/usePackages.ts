import { useState, useEffect } from "react";
import axios from "axios";
import { type TourPackage } from "@/data/packages";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const normalizePackage = (pkg: any): TourPackage => ({
id: pkg.id || pkg._id || "",
title: pkg.title || "",
location: pkg.location || "",
duration: pkg.duration || "",
price: pkg.price || 0,
originalPrice: pkg.originalPrice || pkg.original_price || 0,
image: pkg.image || pkg.imageUrl || "",
shortDescription: pkg.shortDescription || pkg.short_description || "",
description: pkg.description || "",
highlights: pkg.highlights || [],
itinerary: pkg.itinerary || [],
inclusions: pkg.inclusions || [],
exclusions: pkg.exclusions || [],
policies: pkg.policies || [],
startDates: pkg.startDates || pkg.start_dates || [],
timing: pkg.timing || "",
groupSize: pkg.groupSize || pkg.group_size || "",
});

export const usePackages = () => {
const [packages, setPackages] = useState<TourPackage[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const fetchPackages = async () => {
  setIsLoading(true);
  setError(null);
  try {
    const res = await axios.get(`${BASE_URL}/packages`, {
      withCredentials: true,
    });
    const data = Array.isArray(res.data) ? res.data.map(normalizePackage) : [];
    setPackages(data);
  } catch (err: any) {
    console.error("Error fetching packages:", err);
    setError(err?.message || "Failed to load packages");
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchPackages();
}, []);

const addPackage = async (pkg: TourPackage) => {
  try {
    const res = await axios.post(`${BASE_URL}/packages`, pkg, { withCredentials: true });
    setPackages((prev) => [...prev, normalizePackage(res.data)]);
    return normalizePackage(res.data);
  } catch (err: any) {
    console.error("Error adding package:", err);
    throw err;
  }
};

const updatePackage = async (id: string, pkg: TourPackage) => {
  try {
    const res = await axios.put(`${BASE_URL}/packages/${id}`, pkg, { withCredentials: true });
    const updated = normalizePackage(res.data);
    setPackages((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  } catch (err: any) {
    console.error("Error updating package:", err);
    throw err;
  }
};

const deletePackage = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/packages/${id}`, { withCredentials: true });
    setPackages((prev) => prev.filter((p) => p.id !== id));
  } catch (err: any) {
    console.error("Error deleting package:", err);
    throw err;
  }
};

const resetToDefaults = async () => {
  // Reset locally and optionally hit backend reset endpoint if available
  setPackages([]);
  await fetchPackages();
};

return { packages, addPackage, updatePackage, deletePackage, fetchPackages, resetToDefaults, isLoading, error };
};