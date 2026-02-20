import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define which routes are public (No login required)
const isPublicRoute = createRouteMatcher([
  "/",               // Landing Page
  "/features",       // Features Page
  "/pricing",        // Pricing Page
  "/link-building-plans", 
  "/local-seo-plans",     
  "/technical-seo-plans", 
  "/services/(.*)",  // 👈 NEW: Whitelists all pages inside /services/
  "/analyze",        
  "/api/scan",       
  "/api/cron",       
  "/api/worker",     
  "/sign-in(.*)",    
  "/sign-up(.*)"     
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