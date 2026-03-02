# Ministry Website

This project is a Next.js application with an admin dashboard for managing contact info, programs, and a gallery.

## Setup

Copy environment variables into a `.env.local` file. The following are required:

```plaintext
NEXT_PUBLIC_FIREBASE_API_KEY=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PROJECT_ID=...

# Cloudinary configuration (for image upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# other env vars used by the app (e.g. SENDGRID, etc.)
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
