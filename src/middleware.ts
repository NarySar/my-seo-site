import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define Public Routes
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/api/cron',   // Manager
  '/api/worker', // Worker
  '/'            // Homepage
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. If it's NOT a public route...
  if (!isPublicRoute(req)) {
    // 3. Check for a User ID manually (Bypasses the .protect() type error)
    const { userId, redirectToSignIn } = await auth();
    
    // 4. If no user, kick them to login
    if (!userId) {
      return redirectToSignIn();
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};