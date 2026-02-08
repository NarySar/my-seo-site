import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Define Public Routes with WILDCARDS (.*) to catch everything
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/api/cron(.*)',   // 👈 Wildcard added (The Manager)
  '/api/worker(.*)', // 👈 Wildcard added (The Worker)
  '/'            
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. If it is a public route, skip ALL checks and just pass it through
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // 3. Otherwise, protect it manually
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};