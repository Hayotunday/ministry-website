export interface GalleryItem {
  id?: string;
  title: string;
  category: string;
  imageUrl: string;
  // cloudinary public id for deletion
  publicId?: string;
}

/**
 * Fetch gallery items from the public API.
 * Returns all gallery items sorted by creation date.
 */
export async function getGalleryItems(
  page = 0,
  limit = 12,
  category?: string,
): Promise<GalleryItem[]> {
  try {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (category) params.set("category", category);
    const res = await fetch(`/api/gallery?${params.toString()}`);
    if (res.ok) {
      return await res.json();
    }
    console.warn("Failed to fetch gallery:", res.status);
    return [];
  } catch (err) {
    console.error("Error fetching gallery:", err);
    return [];
  }
}

export interface GalleryResult {
  success: boolean;
  error?: string;
  id?: string;
}

/**
 * Add a new gallery item (admin only).
 * Requires authentication token.
 */
export async function addGalleryItem(
  item: GalleryItem,
  authToken: string,
): Promise<GalleryResult> {
  try {
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, id: data.id };
    }

    const errorData = await res.json().catch(() => ({}));
    return {
      success: false,
      error: errorData.error || `HTTP ${res.status}`,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error adding gallery item:", err);
    return { success: false, error: message };
  }
}

/**
 * Delete a gallery item (admin only).
 * Requires authentication token and item ID.
 */
export async function deleteGalleryItem(
  id: string,
  publicId: string | undefined,
  authToken: string,
): Promise<GalleryResult> {
  try {
    // first delete the image from Cloudinary if we have a publicId
    if (publicId) {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
    }

    const res = await fetch(`/api/admin/gallery?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (res.ok) {
      return { success: true };
    }

    const errorData = await res.json().catch(() => ({}));
    return {
      success: false,
      error: errorData.error || `HTTP ${res.status}`,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error deleting gallery item:", err);
    return { success: false, error: message };
  }
}
