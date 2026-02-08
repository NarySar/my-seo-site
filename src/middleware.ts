import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that usually need protection
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/api/scan(.*)'
]);

// 1. We add 'async' here (Build Fix)
export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        // 2. We add 'await' here (Build Fix)
        (await auth()).protect();
    }
});

export const config = {
  matcher: [
    // 🛑 THE NUCLEAR FIX:
    // This tells Next.js: "Don't even LOOK at /api/cron or /api/worker"
    "/((?!api/cron|api/worker|_next|.*\\..*).*)", 
    
    // Also skip static files
    "/(api|trpc)((?!/cron|/worker).*)",
  ],
};