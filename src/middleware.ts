import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// We can keep the standard protection here because the Config below
// will prevent this from even running on your Cron Job.
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/api/scan(.*)' // Protect the scanner if used manually
]);

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) {
        auth().protect();
    }
});

export const config = {
  matcher: [
    // 🛑 THE FIX:
    // This weird looking code says: "Match EVERYTHING, EXCEPT /api/cron and /api/worker"
    // If the URL matches 'api/cron', this middleware will simply NOT RUN.
    "/((?!api/cron|api/worker|_next|.*\\..*).*)", 
    
    // Also skip static files
    "/(api|trpc)((?!/cron|/worker).*)",
  ],
};