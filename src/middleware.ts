import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public (no login required)
const isPublicRoute = createRouteMatcher([
  "/",                  // Home page
  "/features",          // Features page
  "/pricing",           // Pricing page
  "/docs",              // Docs page
  "/analyze",           // Analyze page (the frontend)
  "/api/scan",          // 👈 CRITICAL: The API must be public!
  "/sign-in(.*)",       // Auth pages
  "/sign-up(.*)"
]);

// 👇 Update this function to be ASYNC
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // 👇 Add 'await' here
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};