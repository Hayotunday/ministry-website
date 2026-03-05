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
  CardDescription,
} from "@/components/ui/card";
import { Edit, Trash, ImageIcon, Phone, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import Image from "next/image";

export default function AdminPage() {
  const pageSize = 8;

  const imageRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
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
    setIsSubmitting(false);
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

  const uploadFile = async (
    file: File,
  ): Promise<{ imageUrl: string; publicId: string } | null> => {
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const addGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!galleryForm.title || !galleryForm.category || !selectedFile) {
      toast.error("Please fill in title, category, and select an image.");
      setIsSubmitting(false);
      return;
    }

    const token = await getToken();
    if (!token) {
      toast.error("Not authenticated");
      return;
    }

    const uploadResult = await uploadFile(selectedFile);
    console.log("upload: ", uploadResult);
    if (!uploadResult) {
      setIsSubmitting(false);
      toast.error("Failed to upload image.");
      return;
    }

    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...galleryForm, ...uploadResult }),
    });

    if (res.ok) {
      toast.success("Gallery item added");
      setGalleryForm({ title: "", category: "", imageUrl: "", publicId: "" });
      setGalleryFormOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      fetchGallery();
    } else {
      toast.error("Failed to add gallery item");
    }

    setIsSubmitting(false);
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
            <CardTitle>Admin Portal</CardTitle>
            <CardDescription>
              Please log in to manage website content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={login} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
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
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-6 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content.</p>
        </div>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* contact */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> Contact Information
              </CardTitle>
              <CardDescription>
                Update the public contact details for the ministry.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {mode === "view" && (
                <Button
                  size="sm"
                  onClick={() => {
                    setMode("edit");
                    setOldContactInfo(contactInfo);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
              )}

              {mode === "edit" && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMode("view");
                      setContactInfo(oldContactInfo);
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="sm"
                    onClick={saveContact}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                value={contactInfo.email || ""}
                disabled={mode === "view"}
                onChange={(e) =>
                  setContactInfo((c) => ({ ...c, email: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone</Label>
              <Input
                id="contact-phone"
                value={formatPhoneNumber(contactInfo.phone || "")}
                disabled={mode === "view"}
                onChange={(e) =>
                  setContactInfo((c) => ({ ...c, phone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-address">Address</Label>
              <Textarea
                id="contact-address"
                value={contactInfo.address || ""}
                disabled={mode === "view"}
                onChange={(e) =>
                  setContactInfo((c) => ({
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> Gallery
            </CardTitle>
            <div className="flex items-center">
              <Button
                size="sm"
                variant={galleryFormOpen ? "destructive" : "default"}
                onClick={() => setGalleryFormOpen(!galleryFormOpen)}
              >
                {galleryFormOpen ? "Cancel" : "Add New Image"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {galleryFormOpen && (
              <form onSubmit={addGalleryItem}>
                <div className="border p-4 rounded-lg space-y-4 bg-muted/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gallery-title">Title</Label>
                      <Input
                        id="gallery-title"
                        value={galleryForm.title}
                        onChange={(e) =>
                          setGalleryForm((p) => ({
                            ...p,
                            title: e.target.value,
                          }))
                        }
                        placeholder="e.g., Community Outreach"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gallery-category">Category</Label>
                      <Select
                        value={galleryForm.category}
                        onValueChange={(value) =>
                          setGalleryForm((p) => ({ ...p, category: value }))
                        }
                      >
                        <SelectTrigger id="gallery-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="outreach">Outreach</SelectItem>
                          <SelectItem value="community">Community</SelectItem>
                          <SelectItem value="founder">Founder</SelectItem>
                          <SelectItem value="flyer">Flyer</SelectItem>
                          <SelectItem value="worship">Worship</SelectItem>
                          <SelectItem value="youth">Youth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Image</Label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          if (!file) return;
                          if (previewUrl) URL.revokeObjectURL(previewUrl);
                          const url = URL.createObjectURL(file);
                          setSelectedFile(file);
                          setPreviewUrl(url);
                        }}
                        ref={imageRef}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => imageRef.current?.click()}
                        variant="outline"
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="preview"
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-md border border-dashed flex items-center justify-center bg-muted/50">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={
                      !galleryForm.title ||
                      !galleryForm.category ||
                      !selectedFile ||
                      isSubmitting
                    }
                  >
                    {isSubmitting ? "Saving..." : "Save Image"}
                  </Button>
                </div>
              </form>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden group w-fit h-fit"
                >
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-200">
                      <Image
                        width={300}
                        height={200}
                        src={item.imageUrl}
                        alt={item.title}
                        className="object-cover"
                        loading="eager"
                      />
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() =>
                        handleDeleteGalleryItem(item.id, item.publicId)
                      }
                      className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <p
                      className="font-semibold truncate text-sm"
                      title={item.title}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {item.category}
                    </p>
                  </CardContent>
                </Card>
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
