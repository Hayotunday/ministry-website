# Ministry Website

This project is a Next.js application with an admin dashboard for managing contact info, programs, and a gallery.

## Setup

Copy environment variables into a `.env.local` file. The following are required:

```plaintext
# email credentials for nodemailer
EMAIL_USER=...
EMAIL_PASS=...
EMAIL_RECEIVER=...
# EMAIL_RECEIVER=...

# firebase client config
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...

# firebase admin config
FIREBASE_ADMIN_PROJECT_ID=...
FIREBASE_ADMIN_PRIVATE_KEY=...

# Cloudinary configuration (for image upload)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Install dependencies:

```bash
npm install
# or using pnpm
pnpm install
```

If migrating from Vercel Blob to Cloudinary, remove `@vercel/blob` and install the Cloudinary SDK:

```bash
npm uninstall @vercel/blob && npm install cloudinary
```

Run in development mode:

```bash
npm run dev
```

The admin UI is available at `/admin`.

## Cloudinary Notes

- Images are uploaded to the `gallery` folder in your Cloudinary account.
- The server returns both the secure URL and the `publicId` which is stored in Firestore.
- Deleting a gallery item removes the image from Cloudinary using the `publicId`.
