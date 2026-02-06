import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Create a matcher for your public routes
// We add '/api/cron' and '/api/worker' here so Clerk doesn't check them
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/api/cron',   // 👈 Allow the Manager
  '/api/worker', // 👈 Allow the Worker
  '/'            // Allow the homepage
]);

export default clerkMiddleware((auth, req) => {
  // 2. Protect all routes EXCEPT the public ones
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};