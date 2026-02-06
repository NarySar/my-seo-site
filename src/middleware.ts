import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define your public routes
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/api/cron',   // 👈 The Manager
  '/api/worker', // 👈 The Worker
  '/'            // The Homepage
]);

// 2. We add 'async' here because auth() is now asynchronous
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // 3. We add 'await' here to wait for the user data to load
    (await auth()).protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};