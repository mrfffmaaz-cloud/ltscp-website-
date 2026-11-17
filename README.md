# LTSCP Digital Seva & Cyber Cafe

Complete multi-page React + TypeScript + Tailwind CSS + Firebase web platform for **LTSCP Digital Seva & Cyber Cafe** (`Maharajpur Chowk, Madhubani, Bihar, India`).

## Features
- **Multi-Page Routing**: Home (`/`), All Services (`/services`), Category Pages (`/category/:categoryId`), Individual Service Pages (`/services/:slug` for all 75 services), About (`/about`), Contact (`/contact`), Privacy Policy (`/privacy-policy`), Terms & Conditions (`/terms`), and Admin Dashboard (`/admin`).
- **WhatsApp Click-to-Chat Booking**: Service-specific pre-filled, editable WhatsApp messages (`https://wa.me/919693239920`) where customers review details and manually press Send.
- **Instant Search & Bilingual Support**: Live keyword search, category filtering, English & Hindi (`EN / हिंदी`) language toggle, and Light/Dark theme toggle.
- **Admin Dashboard & Enquiry CRM**: Google Sign-In protected admin/staff portal (`/admin`) backed by Firebase Authentication and Cloud Firestore with hardened security rules (`firestore.rules`).
- **SEO Ready**: `robots.txt`, `sitemap.xml`, `LocalBusiness` JSON-LD structured data, and dynamic per-route `<title>` & meta descriptions.

## Project Structure
- `src/App.tsx` – Main router and layout shell
- `src/context/AppContext.tsx` – Theme, bilingual copy, Firestore catalog sync, RBAC auth, and WhatsApp booking modal state
- `src/data/defaultCatalog.ts` – All 7 categories (A–G) and 75 services with custom WhatsApp templates
- `src/data/translations.ts` – English and Hindi UI copy
- `src/lib/firebase.ts` – Firebase App, Auth, Firestore initialization (`firebase-applet-config.json`), connection test, and structured error handling
- `src/lib/whatsapp.ts` – URL-encoded WhatsApp Click-to-Chat helpers
- `src/lib/analytics.ts` – Non-blocking anonymous page/service/search/WhatsApp intent logger
- `src/components/` – Navbar, Footer, ServiceCard, WhatsAppBookingModal, EnquiryForm, LocationSection, FloatingWhatsApp, IconMap, ErrorBoundary
- `src/pages/` – HomePage, ServicesPage, ServiceDetailPage, AboutPage, ContactPage, LegalPages, AdminPage
- `src/assets/images/` – Generated visual assets
- `public/` – `robots.txt`, `sitemap.xml`
- `firebase-blueprint.json`, `firestore.rules`, `firestore.rules.test.ts`, `security_spec.md` – Database schema blueprint and hardened security rules

## Local Setup & Build
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables (see `.env.example`) and ensure `firebase-applet-config.json` matches your Firebase project.
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Deploy Firestore security rules (via Firebase CLI):
   ```bash
   firebase deploy --only firestore:rules
   ```
