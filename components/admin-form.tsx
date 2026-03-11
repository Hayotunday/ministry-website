"use client";

import { useState, useRef, useEffect } from "react";
import { X, ImagePlus } from "lucide-react";
import { auth } from "@/lib/firebase-client";
import { onAuthStateChanged, User } from "firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AdminFormProps {
  onClose: () => void;
}

export default function AdminForm({ onClose }: AdminFormProps) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("image");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  const getToken = async () => {
    if (!user) return null;
    return user.getIdToken();
  };

  const uploadFile = async (
    file: File,
  ): Promise<{ imageUrl: string; publicId: string } | null> => {
    const form = new FormData();
    form.append("file", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      const blob = await response.json();
      if (blob?.url && blob?.publicId) {
        return { imageUrl: blob.url, publicId: blob.publicId };
      }
      return null;
    } catch (err) {
      console.error("upload failed", err);
      toast.error("Image upload failed.");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let uploadResult = null;

    if (!title || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (type === "image") {
      if (!file) {
        toast.error("Please select an image file.");
        return;
      }

      uploadResult = await uploadFile(file);
      if (!uploadResult) {
        toast.error("Failed to upload image.");
        return;
      }
    }

    if (type === "video") {
      if (!videoUrl) {
        toast.error("Please enter a video URL.");
        return;
      }

      uploadResult = { videoUrl, publicId: "" };
    }

    const token = await getToken();
    if (!token) {
      toast.error("Not authenticated");
      return;
    }

    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...uploadResult, title, category, type }),
    });

    if (res.ok) {
      toast.success("Gallery item added");
    } else {
      toast.error("Failed to add gallery item");
    }

    setLoading(false);
    onClose();
    router.refresh();
  };

  return (
    <section className="w-full lg:w-112.5 border-l border-slate-100 bg-white flex flex-col shadow-2xl fixed right-0 top-0 bottom-0 z-40 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
        <h3 className="text-xl font-bold text-slate-900">New Creation</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-50 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      {/* Form Content */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto p-8 space-y-8"
      >
        {/*  */}
        <Select value={type} onValueChange={(e) => setType(e)}>
          <SelectTrigger
            id="type"
            size="default"
            className="w-full h-10 px-5 py-4"
          >
            <SelectValue placeholder="Select Media Type" />
          </SelectTrigger>
          <SelectContent className="w-full py-1 gap-1">
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>

        {/* Image Upload */}
        {type === "image" && (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
              Main Photography
            </label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setFile(f);
                  if (f) {
                    setPreview(URL.createObjectURL(f));
                  } else {
                    setPreview(null);
                  }
                }}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-4/3 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 hover:border-accent transition-all cursor-pointer group-hover:scale-[1.02]"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="object-cover w-full h-full rounded-xl"
                  />
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ImagePlus className="w-8 h-8 text-accent" />
                    </div>
                    <p className="font-bold text-slate-700">
                      Upload high-res image
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Recommended: 1200 x 900px (JPG or PNG) {"\n"} 250KB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video URL Input */}
        {type === "video" && (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
              Video URL
            </label>
            <input
              type="url"
              placeholder="Enter video URL (e.g., YouTube, Vimeo)"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
              value={videoUrl || ""}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <p className="text-xs text-slate-400 mt-2">
              Enter a valid youtube video URL.
            </p>
          </div>
        )}

        {/* Title Input */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]"
          >
            Media Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Lavender & Honey Macarons"
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]"
          >
            Category
          </label>
          <div className="relative">
            <Select value={category} onValueChange={(e) => setCategory(e)}>
              <SelectTrigger
                id="category"
                size="default"
                className="w-full h-10 px-5 py-4"
              >
                <SelectValue placeholder="Select Media category" />
              </SelectTrigger>
              <SelectContent className="w-full py-1 gap-1">
                <SelectItem value="outreach">Outreach</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="founder">Founder</SelectItem>
                <SelectItem value="flyer">Flyer</SelectItem>
                <SelectItem value="worship">Worship</SelectItem>
                <SelectItem value="youth">Youth</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>

      {/* Footer Buttons */}
      <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4 shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-4 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-white hover:border-slate-300 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-4 bg-black text-white rounded-xl font-bold hover:shadow-lg hover:shadow-black/30 hover:cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Media"}
        </button>
      </div>
    </section>
  );
}
