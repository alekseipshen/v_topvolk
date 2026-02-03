# 🔍 Old URLs Audit - Max Appliance Service

## Purpose
Track all old URLs from previous website to ensure:
1. ✅ All important pages have 301 redirects
2. ✅ No broken links for users
3. ✅ SEO value is preserved (link juice)

---

## ✅ KNOWN OLD URLs (Already Redirected)

These URLs are from the old site and already have 301 redirects in `next.config.ts`:

| Old URL | New URL | Status | Notes |
|---------|---------|--------|-------|
| `/refrigerator-repair/` | `/services/refrigerator-repair` | ✅ 301 | High traffic page |
| `/washer-repair/` | `/services/washer-repair` | ✅ 301 | High traffic page |
| `/appliance-repair-bergen-county/` | `/service-areas#bergen` | ✅ 301 | County page → anchor |
| `/contact/` | `/#contact` | ✅ 301 | Contact form on homepage |
| `/samsung-appliance-repair-bergen-county/` | `/brands/samsung-repair` | ✅ 301 | Brand page |
| `/samsung-appliance-repair/` | `/brands/samsung-repair` | ✅ 301 | Brand page |
| `/lg-appliance-repair-bergen-county/` | `/brands/lg-repair` | ✅ 301 | Brand page |
| `/cities/kenilworth` | `/cities/kenilworth` | ✅ 200 | Already correct |
| `/5-top-reasons-why-your-dryer-isnt-drying-clothes-new-jersey-homeowners-guide/` | `/blog/why-your-dryer-isnt-drying-clothes` | ✅ 301 | Blog post |

---

## ⏳ TO INVESTIGATE

### Method 1: Google Search Console
**If you have access to old GSC:**
1. Go to: https://search.google.com/search-console
2. Performance → Pages
3. Export top 100 pages by clicks
4. Check each URL:
   - Does it work on new site? → OK
   - Does it have 301 redirect? → OK
   - Does it 404? → Need to add redirect

### Method 2: Check Archive.org
1. Go to: https://web.archive.org/web/*/maxapplianceservice.com
2. Look at last snapshot before new site launch
3. Check sitemap.xml from old site
4. List all old page types:
   - Service pages
   - Location pages
   - Blog posts
   - About/Contact pages
   - Pricing pages
   - FAQ pages

### Method 3: Google Search
```
site:maxapplianceservice.com inurl:old-pattern
```

Replace `old-pattern` with potential old URL patterns:
- `appliance-repair` (without /services/)
- `repair-service`
- `about-us`
- `our-services`
- `testimonials`
- `schedule-appointment`

---

## 🚨 COMMON OLD PATTERNS TO CHECK

Based on typical appliance repair sites, check if these existed:

### Service Pages:
- [ ] `/appliance-repair/`
- [ ] `/refrigerator-repair/` ✅ (redirected)
- [ ] `/washer-repair/` ✅ (redirected)
- [ ] `/dryer-repair/`
- [ ] `/dishwasher-repair/`
- [ ] `/oven-repair/`
- [ ] `/range-repair/`
- [ ] `/freezer-repair/`
- [ ] `/microwave-repair/`
- [ ] `/garbage-disposal-repair/`

### Location Pages:
- [ ] `/bergen-county-appliance-repair/` ✅ (redirected)
- [ ] `/essex-county-appliance-repair/`
- [ ] `/hudson-county-appliance-repair/`
- [ ] `/locations/`
- [ ] `/service-areas/` ✅ (exists)

### Brand Pages:
- [ ] `/lg-repair/` ✅ (redirected)
- [ ] `/samsung-repair/` ✅ (redirected)
- [ ] `/whirlpool-repair/`
- [ ] `/ge-repair/`
- [ ] `/maytag-repair/`

### Info Pages:
- [ ] `/about/` or `/about-us/`
- [ ] `/contact/` ✅ (redirected)
- [ ] `/schedule/` or `/book-appointment/`
- [ ] `/pricing/` or `/rates/`
- [ ] `/testimonials/` or `/reviews/`
- [ ] `/faq/`
- [ ] `/warranty/`
- [ ] `/emergency-repair/`
- [ ] `/same-day-service/`

### Blog Posts:
- [ ] `/blog/`
- [ ] `/articles/`
- [ ] `/tips/`
- [ ] Any specific old blog posts?

---

## 📋 ACTION ITEMS

### Priority 1: High Traffic Pages
Check these first (usually have most backlinks and traffic):

1. **Homepage:** ✅ Works
2. **Top Service Pages:** ✅ Redirected
3. **Top Location Pages:** ✅ Redirected
4. **Contact Page:** ✅ Redirected
5. **Blog (if existed):** ⏳ Check

### Priority 2: SEO Value Pages
Pages that likely have backlinks:

1. **About Us:** ⏳ Check if existed
2. **Testimonials/Reviews:** ⏳ Check if existed
3. **Service Areas:** ✅ Works
4. **Brand Pages:** ✅ Redirected

### Priority 3: Low Priority Pages
Less likely to have traffic/backlinks:

1. **Privacy Policy:** ✅ Exists
2. **Terms of Service:** ✅ Exists
3. **FAQ (if standalone):** ⏳ Check

---

## 🔧 HOW TO ADD NEW REDIRECTS

If you find an old URL that needs a redirect:

1. **Edit:** `next.config.ts`
2. **Add to redirects array:**
```typescript
{
  source: '/old-url-here',
  destination: '/new-url-here',
  permanent: true, // 301 redirect
},
```
3. **Commit & Deploy**

---

## 📊 TRACKING

### Before Migration (if available):
- Total pages in old sitemap: ?
- Top 10 pages by traffic: ?
- Top 10 pages by backlinks: ?
- Total backlinks: ?

### After Migration:
- Redirects added: 9 ✅
- 404 errors fixed: 0 ⏳
- Backlinks preserved: ⏳ (check Ahrefs/SEMrush)

---

## 🎯 NEXT STEPS

1. **Ask client for:**
   - Old Google Analytics data (top pages by traffic)
   - Old Google Search Console data (top pages by clicks)
   - Old sitemap.xml backup (if available)
   
2. **Check manually:**
   - Google: `site:maxapplianceservice.com`
   - Check first 10 pages of results
   - Test each URL - does it work or 404?

3. **Use Screaming Frog (if needed):**
   - Crawl old sitemap (if available)
   - Compare with new sitemap
   - Export list of URLs needing redirects

---

## 📝 NOTES

**Last Updated:** January 9, 2026  
**Status:** Initial audit - need more data from old site  
**Next Review:** After checking GSC data
