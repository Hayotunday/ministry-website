import { authAdmin } from "./firebase-admin";

/**
 * Verify the ID token sent by a client. Throws an error if invalid or if the
 * admin SDK is not initialized.
 * Returns the decoded token if successful.
 */
export async function verifyAuth(request: Request) {
  if (!authAdmin) {
    throw new Error("firebase admin is not initialized");
  }

  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Missing or malformed Authorization header");
  }

  const idToken = authHeader.split(" ")[1];
  const decoded = await authAdmin.verifyIdToken(idToken);
  return decoded;
}
