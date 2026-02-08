import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/api/scan(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        // 🛑 FIX: We manually check for the user instead of using .protect()
        // This avoids the TypeScript error completely.
        const { userId, redirectToSignIn } = await auth();
        
        if (!userId) {
            return redirectToSignIn();
        }
    }
});

export const config = {
  matcher: [
    // 🛑 THE "NUCLEAR" CONFIG (Keep this!):
    // This tells Next.js to completely IGNORE /api/cron and /api/worker
    "/((?!api/cron|api/worker|_next|.*\\..*).*)", 
    
    // Also skip static files
    "/(api|trpc)((?!/cron|/worker).*)",
  ],
};