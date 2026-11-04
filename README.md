# PunarTech — Premium Refurbished Laptop E-Commerce Platform

> **PunarTech On Top!**  
> Verified Pre-Owned & Refurbished Laptop Store for Pune & Delhi Inventory Hubs.

---

## 1. Project Overview

PunarTech is a modern, high-conversion static e-commerce catalog engineered for laptop sales and customer discovery across Pune and Delhi branch locations.

### Key Highlights:
- **91 Total Verified Physical Units**: 60 in Pune Hub (`PT/P001`–`PT/P060`) and 31 in Delhi Hub (`PT/D001`–`PT/D031`).
- **Complete Specification Accuracy**: Authentic selling prices, genuine processor generations, RAM capacities, SSD/HDD storage, graphics configurations, and display sizes with zero fabricated discounts or hallucinated data.
- **WhatsApp-First Conversion Flow**:
  - Direct group integration with the official community: `https://chat.whatsapp.com/LGPhmaRzif3I91VUUa628L`
  - Automated pre-composed enquiry messages containing the exact Stock ID, full model name, and price.
  - One-click message copying and direct WhatsApp routing.
- **Zero-Backend Static Architecture**: Runs completely in the browser with local filtering, multi-attribute search, and localStorage persistence for comparison and wishlists.
- **Side-by-Side Comparison**: Compare up to 3 laptops with automated detection of lowest price, largest SSD, and highest RAM.
- **Zero-Broken-Image Guarantee**: High-resolution imagery paired with realistic SVG laptop chassis fallbacks.

---

## 2. Running the Project Locally

### Prerequisites:
- Node.js (v18 or v20+)
- npm or pnpm

### Installation:
```bash
npm install
```

### Start Development Server:
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### Production Build:
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory ready for deployment.

---

## 3. How to Update Laptop Prices

All laptop records are stored in a clean, isolated data file:  
📂 `src/data/laptops.ts` (and mirrored in `src/data/laptops.json`).

To update a price:
1. Open `src/data/laptops.ts`.
2. Locate the laptop by its stock ID (e.g. `PT/P001` or `PT/D017`).
3. Modify the `sellingPrice` field and `hasPrice`:
   ```typescript
   {
     id: "PT/P001",
     stockId: "PT/P001",
     // Change price here (number in INR):
     sellingPrice: 21999,
     hasPrice: true,
     ...
   }
   ```
4. If a laptop has no fixed price and requires customer enquiry:
   ```typescript
   sellingPrice: null,
   hasPrice: false,
   ```
5. Save the file. The catalog and search index will automatically update.

---

## 4. How to Add a New Laptop

To add a new laptop to inventory:
1. Open `src/data/laptops.ts`.
2. Append a new object to the `LAPTOP_INVENTORY` array:
   ```typescript
   {
     id: "PT/P061",
     stockId: "PT/P061",
     branch: "Pune", // or "Delhi"
     brand: "Dell",  // Dell, HP, Lenovo, Acer, Apple, ASUS, MSI, Other
     model: "Latitude 7420",
     fullName: "Dell Latitude 7420 Ultrabook",
     processor: "Intel Core i5 11th Gen",
     processorCategory: "Intel Core i5",
     generation: 11,
     ram: "16GB",
     ramGb: 16,
     storageRaw: "512GB NVMe SSD",
     storageType: "SSD only",
     ssdGb: 512,
     ssdText: "512GB SSD",
     hddGb: null,
     hddText: null,
     graphicsRaw: "Intel Iris Xe Graphics",
     hasDedicatedGraphics: false,
     dedicatedGraphics: null,
     graphicsBrand: "Intel Integrated",
     display: "14\"",
     displayClass: "14-inch class",
     sellingPrice: 32000,
     hasPrice: true,
     originalPrice: null,
     serialNumber: "SN-PT-P061-INTERNAL", // Internal only, never shown to customer
     condition: "Refurbished / Pre-owned (Verified Inventory)",
     availability: "Available (Confirm before purchase)",
     badges: ["Latest Gen in Collection", "16GB RAM"],
     highlights: [
       "16GB RAM for heavy multitasking",
       "512GB high-speed SSD",
       "14\" Full HD Display",
       "Available at Pune Branch"
     ],
     suitableFor: "Suitable for development, data analysis, and professional office workflows.",
     imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
     searchableText: "pt/p061 dell latitude 7420 intel core i5 11th gen 16gb 512gb ssd pune ₹32000"
   }
   ```
3. Update `INVENTORY_STATS` at the bottom of `laptops.ts` if you want the header summary pills to reflect the new count.

---

## 5. How to Replace Laptop Images

Each item in `src/data/laptops.ts` has an `imageUrl` property.

- **Option A (External URL)**: Paste any high-quality direct image URL (e.g., from your own image hosting or CDN).
- **Option B (Local Asset)**: Place image files in `public/assets/laptops/` and reference them with absolute public paths:
  ```typescript
  imageUrl: "/assets/laptops/dell_latitude_7400.jpg"
  ```
- If an image ever fails to load, PunarTech’s built-in `LaptopImage` component will automatically display an ultra-clean, branded SVG laptop chassis with the brand's logo, stock ID, and screen specifications.

---

## 6. How to Configure the WhatsApp Business Number

In `src/data/laptops.ts`, locate the `WHATSAPP_CONFIG` object:

```typescript
export const WHATSAPP_CONFIG = {
  // Official PunarTech WhatsApp Group Link
  groupInviteUrl: 'https://chat.whatsapp.com/LGPhmaRzif3I91VUUa628L',
  
  // Set direct business number (with country code, no + or spaces)
  // Example: '919876543210'
  // When set, "Enquire" buttons will directly open a 1:1 chat with this number!
  // When left empty (''), enquiries link to the group invite and offer 1-click message copy.
  businessNumber: '',
  
  brandName: 'PunarTech',
  tagline: 'PunarTech On Top'
};
```

---

## 7. Static Hosting & Deployment

Because PunarTech is a 100% client-side React SPA, it can be deployed to any static hosting provider at zero server cost.

### Vercel / Netlify / Cloudflare Pages / GitHub Pages:
1. Build the project:
   ```bash
   npm run build
   ```
2. Set the publish directory to `dist`.
3. Single-Page Application (SPA) redirect rule:
   - For Netlify: add a `_redirects` file containing `/* /index.html 200`.
   - For Vercel: standard SPA rewrites are enabled automatically.

---

## 8. Data Audit & Verification Summary

| Metric | Total |
|---|---|
| Total Imported Units | **91** |
| Pune Branch Inventory (`PT/P001`–`PT/P060`) | **60** |
| Delhi Branch Inventory (`PT/D001`–`PT/D031`) | **31** |
| Units with Verified Selling Prices | **85** |
| Units Marked "Contact for Price" | **6** (`PT/P056`, `PT/P057`, `PT/P058`, `PT/P059`, `PT/P060`, `PT/D017`) |
| Brands Represented | Dell (46), HP (25), Lenovo (13), Acer (3), Apple (2), ASUS (1), MSI (1) |
