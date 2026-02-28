import admin from "firebase-admin";

// Only initialize the admin SDK if the necessary environment variables are available.
// During the build step or in environments where the service account is not provided
// we simply skip initialization so that imports don't throw.
let dbAdmin: admin.firestore.Firestore | null = null;
let authAdmin: admin.auth.Auth | null = null;

if (!admin.apps.length) {
  const hasServiceAccount =
    process.env.FIREBASE_ADMIN_PROJECT_ID &&
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
    process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (hasServiceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(
          /\\n/g,
          "\n",
        ),
      }),
      databaseURL: `https://${process.env.FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`,
    });
    dbAdmin = admin.firestore();
    authAdmin = admin.auth();
  } else {
    // not enough information to initialize, leave services as null
    console.warn(
      "firebase-admin not initialized because service account variables are missing",
    );
  }
} else {
  dbAdmin = admin.firestore();
  authAdmin = admin.auth();
}

export { dbAdmin, authAdmin };

/**
 * Throws if the Firestore instance isn’t initialized. Used by server APIs that
 * must fail fast when the service account isn't configured (e.g., during
 * local development without env vars or at build time).
 */
export function requireDbAdmin(): FirebaseFirestore.Firestore {
  if (!dbAdmin) {
    throw new Error("firebase-admin firestore not initialized");
  }
  return dbAdmin;
}
