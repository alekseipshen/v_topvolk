# TopVolk Construction Website
High-conversion website for home renovation business in Seattle area with dynamic landing pages for cities and services.

## 🚀 Tech Stack

- **Next.js 14+** with App Router
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form + Zod** for form validation
- **Google reCAPTCHA v3** for bot protection
- **n8n** for lead processing

## 📋 Features

- ✅ Dynamic pages for Seattle area cities
- ✅ Dynamic pages for renovation services (kitchen, bathroom, deck, etc.)
- ✅ SEO-optimized with metadata and Schema.org
- ✅ Lead form with reCAPTCHA v3
- ✅ Google Reviews integration (4.9⭐)
- ✅ Portfolio showcase
- ✅ Sticky mobile bar (Call + Request Quote buttons)
- ✅ Fully responsive design
- ✅ Automatic sitemap generation

## 🛠️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` file:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
N8N_WEBHOOK_URL=https://webhook-processor-production-ae2b.up.railway.app
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
max-appliance-site/
├── app/
│   ├── [appliance]-repair/        # /refrigerator-repair
│   │   └── [brand]/               # /refrigerator-repair/lg
│   ├── [city]/
│   │   ├── appliance-repair/      # /hackensack/appliance-repair
│   │   └── [appliance]-repair/    # /hackensack/refrigerator-repair
│   ├── commercial/
│   │   └── [appliance]-repair/    # /commercial/refrigerator-repair
│   ├── api/
│   │   └── submit-lead/           # API route for lead submission
│   ├── layout.tsx
│   ├── page.tsx                   # Homepage
│   └── sitemap.ts                 # Dynamic sitemap
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── GoogleRating.tsx
│   ├── Reviews.tsx
│   ├── LeadForm.tsx
│   ├── StickyMobileBar.tsx
│   └── ReCaptchaProvider.tsx
├── lib/
│   ├── data/
│   │   ├── cities.ts
│   │   ├── appliances.ts
│   │   ├── brands.ts
│   │   └── reviews.ts
│   └── utils.ts
└── package.json
```

## 🔐 reCAPTCHA Integration

1. **Frontend**: Uses `react-google-recaptcha-v3` to get token
2. **Backend**: Next.js API Route validates token via Google API
3. **Scoring**: Minimum score 0.3 (can be adjusted)
4. **Google Ads**: Only leads with score >= 0.3 trigger conversions

## 🌐 Deployment to Vercel

### 1. Connect to Vercel

```bash
npm install -g vercel
vercel login
vercel
```

### 2. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`
- `N8N_WEBHOOK_URL`

### 3. Deploy

```bash
vercel --prod
```

## 📊 SEO Features

- Dynamic meta tags for every page
- Schema.org structured data
- Open Graph tags
- Automatic sitemap generation
- Semantic HTML structure

## 📱 Mobile Features

- Mobile-first responsive design
- Sticky mobile bar (Call + Book)
- Touch-friendly buttons
- Optimized for Core Web Vitals

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize colors:

```ts
colors: {
  green: {...},
  blue: {...}
}
```

### Content

- **Cities**: Edit `lib/data/cities.ts`
- **Appliances**: Edit `lib/data/appliances.ts`
- **Brands**: Edit `lib/data/brands.ts`
- **Reviews**: Edit `lib/data/reviews.ts`

## 📞 Contact Information

- **Phone**: (551) 282-9561
- **Service Area**: New Jersey (14 counties)
- **Google Business Profile**: [View Reviews](https://share.google/d853tcVXONrRwfOby)

## ✅ Production Checklist

- [ ] Set up reCAPTCHA keys
- [ ] Configure n8n webhook
- [ ] Test lead form submission
- [ ] Verify Google Ads conversion tracking
- [ ] Check all dynamic pages render correctly
- [ ] Test mobile sticky bar
- [ ] Verify sitemap.xml generation
- [ ] Run Lighthouse audit (target 90+)
- [ ] Set up custom domain
- [ ] Configure Google Analytics (if needed)

## 📄 License

© 2026 Max Appliance Service. All rights reserved.
