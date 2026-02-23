import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define which routes are public (No login required)
const isPublicRoute = createRouteMatcher([
  "/",               // Landing Page
  "/features",       // Features Page
  "/pricing",        // Base Pricing Page (optional fallback)
  "/pricing/(.*)",   // 👈 NEW: Whitelists all new pricing tier pages
  "/services/(.*)",  // 👈 NEW: Whitelists all new service pages
  "/analyze",        // The Scanner Frontend
  "/api/scan",       // The Scanner API
  "/api/cron",       // The Scheduler
  "/api/worker",     // The Background Worker
  "/sign-in(.*)",    // Clerk Sign In
  "/sign-up(.*)"     // Clerk Sign Up
]);

// 2. Protect all other routes
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

// 3. Configuration to skip static files
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};