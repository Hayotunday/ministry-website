"use client";

import { useEffect, useRef, useState } from "react";
import { auth } from "@/lib/firebase-client";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Edit, Trash, ImageIcon, Phone, FileText } from "lucide-react";
import {
  type ContactInfo,
  getContactInfo,
  saveContactInfo,
} from "@/lib/contact";
import {
  type GalleryItem,
  deleteGalleryItem,
  getGalleryItems,
} from "@/lib/gallery";
import { formatPhoneNumber } from "@/lib/utils";

export default function AdminPage() {
  const pageSize = 6;

  const imageRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    phone: "",
    address: "",
  });
  const [oldContactInfo, setOldContactInfo] = useState<ContactInfo>({
    email: "",
    phone: "",
    address: "",
  });
  const [programs, setPrograms] = useState<Array<any>>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [galleryFormOpen, setGalleryFormOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "",
    imageUrl: "",
    publicId: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    fetchContact();
    fetchGallery(0);
    return unsub;
  }, []);

  const getToken = async () => {
    if (!user) return null;
    return user.getIdToken();
  };

  // revoke object URL previews when they change or on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const fetchContact = async () => {
    getContactInfo().then((info) => {
      if (info.email || info.phone || info.address) {
        setContactInfo(info);
      }
    });
  };

  const saveContact = async () => {
    const token = await getToken();
    if (!token) {
      toast.error("Not authenticated");
      return;
    }
    const result = await saveContactInfo(contactInfo, token);
    if (result.success) {
      toast.success("Contact info saved");
      setMode("view");
    } else {
      toast.error(result.error || "Failed to save contact info");
    }
  };

  const fetchPrograms = async () => {
    const token = await getToken();
    if (!token) return;
    const res = await fetch("/api/admin/programs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setPrograms(await res.json());
    }
  };

  const addProgram = async () => {
    const title = prompt("Program title");
    if (!title) return;
    const token = await getToken();
    const res = await fetch("/api/admin/programs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      fetchPrograms();
    }
  };

  const deleteProgram = async (id: string) => {
    const token = await getToken();
    const res = await fetch(`/api/admin/programs?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchPrograms();
  };

  const fetchGallery = async (p = 0) => {
    setLoadingGallery(true);
    const items = await getGalleryItems(p, pageSize);
    if (p === 0) {
      setGallery(items);
    } else {
      setGallery((prev) => [...prev, ...items]);
    }
    setLoadingGallery(false);
    setPage(p);
    if (items.length < pageSize) setIsLastPage(true);
  };

  // upload helper returns url and publicId or null
  const uploadFile = async (
    file: File,
  ): Promise<{ url: string; publicId: string } | null> => {
    const form = new FormData();
    form.append("file", file);
    try {
      const r = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      const blob = await r.json();
      if (blob?.url && blob?.publicId) {
        return { url: blob.url, publicId: blob.publicId };
      }
      return null;
    } catch (err) {
      console.error("upload failed", err);
      return null;
    }
  };

  // uploads a File object and updates form state
  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setSelectedFile(file);
    const result = await uploadFile(file);
    if (result) {
      setGalleryForm((prev) => ({
        ...prev,
        imageUrl: result.url,
        publicId: result.publicId,
      }));
      toast.success("Image uploaded. Add title and category to save.");
    } else {
      toast.error("Upload failed");
    }
  };

  const addGalleryItem = async () => {
    // if there's a file pending, perform the upload when save is clicked
    if (selectedFile) {
      await handleImageUpload(selectedFile);
    }

    // ensure we have a url and publicId; after upload attempt above the form should be populated
    if (!galleryForm.imageUrl && selectedFile) {
      const result = await uploadFile(selectedFile);
      if (result) {
        setGalleryForm((f) => ({
          ...f,
          imageUrl: result.url,
          publicId: result.publicId,
        }));
      }
    }

    if (
      !galleryForm.title ||
      !galleryForm.category ||
      !galleryForm.imageUrl ||
      !galleryForm.publicId
    ) {
      toast.error("Please fill in all fields");
      return;
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
      body: JSON.stringify(galleryForm),
    });

    if (res.ok) {
      toast.success("Gallery item added");
      setGalleryForm({ title: "", category: "", imageUrl: "", publicId: "" });
      setGalleryFormOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchGallery();
    } else {
      toast.error("Failed to add gallery item");
    }
  };

  const handleDeleteGalleryItem = async (id?: string, publicId?: string) => {
    if (!id) return;
    const token = await getToken();
    if (!token) return;
    const result = await deleteGalleryItem(id, publicId, token);
    if (result.success) {
      toast.success("Gallery item deleted");
      fetchGallery();
    } else {
      toast.error(result.error || "Failed to delete item");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={login} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full rounded"
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" /> Contact Info
            </CardTitle>
            <CardAction className="space-x-2">
              {mode === "view" && (
                <Button
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => {
                    setMode("edit");
                    setOldContactInfo(contactInfo);
                  }}
                >
                  Edit
                </Button>
              )}

              {mode === "edit" && (
                <>
                  <Button
                    variant="destructive"
                    className="cursor-pointer"
                    size="sm"
                    onClick={() => {
                      setMode("view");
                      setContactInfo(oldContactInfo);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    size="sm"
                    onClick={saveContact}
                  >
                    Save
                  </Button>
                </>
              )}
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                className="border p-2 w-full rounded"
                value={contactInfo.email || ""}
                disabled={mode === "view"}
                onChange={(e) =>
                  setContactInfo((c: any) => ({ ...c, email: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                className="border p-2 w-full rounded"
                value={formatPhoneNumber(contactInfo.phone || "")}
                disabled={mode === "view"}
                onChange={(e) =>
                  setContactInfo((c: any) => ({ ...c, phone: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Address</label>
              <textarea
                className="border p-2 w-full rounded"
                value={contactInfo.address || ""}
                disabled={mode === "view"}
                onChange={(e) =>
                  setContactInfo((c: any) => ({
                    ...c,
                    address: e.target.value,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* programs */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" /> Programs
            </CardTitle>
            <CardAction>
              <Button size="sm" onClick={addProgram}>
                Add
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {programs.map((p) => (
                <li key={p.id} className="flex justify-between items-center">
                  {p.title}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteProgram(p.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card> */}

        {/* gallery */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> Gallery
            </CardTitle>
            <CardAction>
              <Button
                size="sm"
                variant={galleryFormOpen ? "destructive" : "default"}
                onClick={() => setGalleryFormOpen(!galleryFormOpen)}
              >
                {galleryFormOpen ? "Cancel" : "Add Item"}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            {galleryFormOpen && (
              <div className="border p-4 rounded space-y-3 bg-slate-50">
                <div>
                  <label className="block text-sm mb-1">Title</label>
                  <input
                    className="border p-2 w-full rounded"
                    value={galleryForm.title}
                    onChange={(e) =>
                      setGalleryForm((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="e.g., Community Outreach Program"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Category</label>
                  <select
                    className="border p-2 w-full rounded"
                    value={galleryForm.category}
                    onChange={(e) =>
                      setGalleryForm((p) => ({
                        ...p,
                        category: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select category</option>
                    <option value="outreach">Outreach</option>
                    <option value="community">Community</option>
                    <option value="founder">Founder</option>
                    <option value="worship">Worship</option>
                    <option value="youth">Youth</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    // ensure single selection; new selection replaces previous
                    multiple={false}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (!file) return;
                      // revoke previous preview if any
                      if (previewUrl) {
                        URL.revokeObjectURL(previewUrl);
                      }
                      const url = URL.createObjectURL(file);
                      setSelectedFile(file);
                      setPreviewUrl(url);
                    }}
                    ref={imageRef}
                    // className="hidden"
                  />
                  <Button
                    onClick={() => imageRef.current?.click()}
                    disabled={loadingGallery}
                    className="w-full cursor-pointer"
                    variant={"outline"}
                  >
                    Select Image
                  </Button>
                  {previewUrl && (
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="preview"
                        className="w-32 h-32 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <Button
                  onClick={addGalleryItem}
                  className="w-full cursor-pointer"
                  disabled={
                    !galleryForm.title ||
                    !galleryForm.category ||
                    !selectedFile ||
                    !galleryForm.publicId
                  }
                >
                  Save Image
                </Button>
              </div>
            )}
            <div className="grid grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto rounded"
                    title={item.title}
                  />
                  <p className="text-xs text-gray-600 mt-1 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {item.category}
                  </p>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() =>
                      handleDeleteGalleryItem(item.id, item.publicId)
                    }
                    className="absolute top-1 right-1"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            {!isLastPage && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => fetchGallery(page + 1)}
                  disabled={loadingGallery}
                >
                  {loadingGallery ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
