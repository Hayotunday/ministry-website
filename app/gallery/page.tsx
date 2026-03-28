"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { ChevronUp, X, PlayCircle } from "lucide-react";
import Image from "next/image";
import { getGalleryItems, type GalleryItem } from "@/lib/gallery";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"all" | "image" | "video">("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const itemsPerPage = 6;

  const fetchGallery = async () => {
    setIsLoading(true);
    // Fetch all items from the database to handle filtering and display limits locally
    const items = await getGalleryItems(0, 1000);
    setGalleryItems(items);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    // Reset visible items when filters or tabs change
    setVisibleCount(itemsPerPage);
  }, [activeTab, activeFilter]);

  const filters = ["all", "outreach", "community", "worship", "youth"];

  const loadMore = () => setVisibleCount((prev) => prev + itemsPerPage);

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

  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const filteredItems = useMemo(() => {
    let items = galleryItems;

    if (activeFilter !== "all") {
      items = items.filter((item) => item.category === activeFilter);
    }

    if (activeTab === "all") return items;
    return items.filter((item) =>
      activeTab === "video" ? item.type === "video" : item.type !== "video",
    );
  }, [galleryItems, activeTab, activeFilter]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const isLastPage = visibleCount >= filteredItems.length;

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
      {/* <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-semibold transition-all capitalize ${
                  activeFilter === filter
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {filter === "all" ? "All Activities" : filter}
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* Gallery Grid */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Media Type Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-gray-200 rounded-xl">
              {(["all", "image", "video"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-lg font-semibold transition-all capitalize ${
                    activeTab === tab
                      ? "bg-white text-purple-600 shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab === "all"
                    ? "All"
                    : tab === "image"
                      ? "Photos"
                      : "Videos"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {displayedItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.type === "video" && item.videoUrl) {
                    window.open(item.videoUrl, "_blank", "noopener,noreferrer");
                  } else {
                    setSelectedItem(item);
                  }
                }}
                className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all group cursor-pointer ${
                  idx === 0 || idx === 4 ? "md:col-span-1 md:row-span-2" : ""
                }`}
              >
                {item.type === "video" && item.videoUrl ? (
                  <>
                    <Image
                      loading="eager"
                      src={`https://i.ytimg.com/vi/${getYouTubeVideoId(
                        item.videoUrl,
                      )}/hqdefault.jpg`}
                      alt={item.title}
                      width={600}
                      height={400}
                      priority
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="w-16 h-16 text-white/80" />
                    </div>
                  </>
                ) : (
                  item.imageUrl && (
                    <Image
                      loading="eager"
                      src={item.imageUrl}
                      alt={item.title}
                      width={600}
                      height={400}
                      priority
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white font-semibold p-4">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          {!isLastPage && (
            <div className="mt-8 flex justify-center">
              <Button onClick={loadMore} disabled={isLoading}>
                {isLoading ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16 md:py-24 rounded-3xl mx-6 mb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Support Our Mission
          </h2>
          <p className="text-purple-100 mb-8 text-lg">
            Your contributions help us continue our vital work in providing
            spiritual nourishment and physical support to those in need.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <Button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 font-semibold">
                Donate Now
              </Button>
            </Link>
            <Link href="/programs">
              <Button className="border-white text-white hover:bg-purple-700 px-8 py-3 font-semibold">
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
          className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 cursor-pointer"
          >
            <X size={20} />
          </button>
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
            onBlur={() => setSelectedItem(null)}
          >
            {selectedItem.imageUrl && (
              <Image
                loading="eager"
                src={selectedItem.imageUrl}
                alt="Gallery preview"
                width={1200}
                height={800}
                className="object-contain rounded-lg w-full h-auto max-h-[90vh]"
                priority
              />
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
