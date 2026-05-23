# NOCHILL - Luxury Streetwear Archive

A cinematic, premium ecommerce experience for the underground fashion collective.

## 🎥 Aesthetic Direction
- **Cinematic Underground:** Dark monochrome palette, huge bold typography, and editorial layouts.
- **Atmospheric UI:** Noise/grain overlays, glassmorphism accents, and luxury pacing.
- **Advanced Motion:** 3D Chrome logo (React Three Fiber), GSAP scroll triggers, magnetic physics, and velocity-aware letter-trail cursor.

## 🛠 Tech Stack
- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **Animations:** GSAP, Framer Motion, Lenis (Smooth Scroll)
- **3D:** React Three Fiber, Three.js
- **State Management:** Zustand
- **Language:** TypeScript

## 📂 Architecture
- `src/app`: App router with editorial routes (Shop, Collections, Archive, Contact).
- `src/app/admin`: Full-featured management terminal for products, drops, and global status.
- `src/components`: Atomic UI components, Layouts, and 3D elements.
- `src/store`: Centralized UI and Cart state using Zustand.
- `src/lib`: Animation constants, utility functions, and brand-specific formatting.

## 🚀 Setup Guide
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 Deployment (Vercel)
1. Push your code to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. The configuration is standard Next.js 15. The project is optimized for Edge runtime where possible.

## 🕶 Design Language
- **Colors:** Deepest Black `#000000`, Pure White `#FFFFFF`, Dark Gray `#111111`.
- **Typography:**
  - **Bebas Neue:** Huge editorial headers and titles.
  - **DM Mono:** Technical metadata, coordinates, and price labels.
  - **Outfit:** Clean legible body text and UI labels.
- **Brand Identity:** NOCHILL // YUNA (London 51.5074° N), Status: ACTIVE, Drop: 001.

## 🔐 Admin Access
The management terminal is located at `/admin`. It allows you to:
- Add/Edit products (with local image upload support).
- Toggle "Maintenance Mode" (NO SIGNAL).
- Manage "Members Only" access.
- Live-update product availability.
(Data is persisted in LocalStorage for this demonstration).

---
**NOCHILL NEVER SLEEPS.**
Built for the outsiders.
