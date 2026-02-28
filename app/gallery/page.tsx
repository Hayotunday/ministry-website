"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronUp, X } from "lucide-react";
import Image from "next/image";
import { getGalleryItems, type GalleryItem } from "@/lib/gallery";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      const items = await getGalleryItems();
      // Use fetched items if available, otherwise use defaults
      setGalleryItems(items);
      setIsLoading(false);
    };

    fetchGallery();
  }, []);

  const filters = ["all", "outreach", "community", "worship", "youth"];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  // incremental display: show a subset and load more on demand
  const [itemsToShow, setItemsToShow] = useState(6);
  const visibleItems = filteredItems.slice(0, itemsToShow);
  const loadMore = () => setItemsToShow((n) => n + 6);

  // scroll-to-top visibility toggle
  const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowScrollButton(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Ministry in Action
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Witness the impact of our community outreach, spiritual growth, and
            dedicated service across the globe.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-semibold transition-all capitalize ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {filter === "all" ? "All Activities" : filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {visibleItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item.imageUrl)}
                className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all group cursor-pointer ${
                  idx === 0 || idx === 4 ? "md:col-span-1 md:row-span-2" : ""
                }`}
              >
                <Image
                  loading="eager"
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={400}
                  priority
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white font-semibold p-4">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          {itemsToShow < filteredItems.length && (
            <div className="mt-8 flex justify-center">
              <Button onClick={loadMore}>Load more</Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24 rounded-3xl mx-6 mb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Support Our Mission
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Your contributions help us continue our vital work in providing
            spiritual nourishment and physical support to those in need.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 font-semibold">
                Donate Now
              </Button>
            </Link>
            <Link href="/programs">
              <Button className="border-white text-white hover:bg-blue-700 px-8 py-3 font-semibold">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button (shown when scrolled) */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 cursor-pointer"
          >
            <X size={20} />
          </button>
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            onBlur={() => setSelectedImage(null)}
          >
            <Image
              loading="eager"
              src={selectedImage}
              alt="Gallery preview"
              width={650}
              height={650}
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
