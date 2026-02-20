// Edge Middleware for Google Ads Geolocation
// File: /middleware.ts (root of project)
//
// STATUS: DISABLED (2026-02-20)
// Reason: City-specific service routes (/cities/[city]/services/[service]) use
// appliance repair data from old template. Construction service pages at
// /services/[service] work correctly without middleware (show "Seattle Area").
//
// TODO: Enable when city-specific construction service pages are created.
// The city mapping below (Seattle area) is ready - just need matching routes.

import { NextRequest, NextResponse } from 'next/server';

export const config = {
  // Matcher intentionally left empty to disable middleware
  matcher: [],
};

export function middleware(request: NextRequest) {
  // Pass through all requests — middleware disabled
  return NextResponse.next();
}
