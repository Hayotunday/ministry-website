export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

export interface SaveResult {
  success: boolean;
  error?: string;
}

/**
 * Fetch contact information from the API.
 * Returns the contactInfo document from the settings collection.
 */
/**
 * Fetch contact information from the API.
 * Returns the contactInfo document from the settings collection.
 */
export async function getContactInfo(): Promise<ContactInfo> {
  try {
    const res = await fetch("/api/admin/contact");
    if (res.ok) {
      return await res.json();
    }
    return {};
  } catch (err) {
    console.error("Error fetching contact info:", err);
    return {};
  }
}

/**
 * Save/update contact information via the admin API.
 * Requires authentication token from Firebase.
 * @param contactInfo - The updated contact information
 * @param authToken - Firebase ID token for authentication
 */
export async function saveContactInfo(
  contactInfo: ContactInfo,
  authToken: string,
): Promise<SaveResult> {
  try {
    const res = await fetch("/api/admin/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(contactInfo),
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
    console.error("Error saving contact info:", err);
    return { success: false, error: message };
  }
}
