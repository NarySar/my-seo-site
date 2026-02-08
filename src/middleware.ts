import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Standard public routes
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/'
]);

export default clerkMiddleware(async (auth, req) => {
  // 🛑 MANUAL OVERRIDE
  // If the URL is for the Cron or Worker, let it pass immediately!
  // We check this FIRST to bypass all other security logic.
  if (req.nextUrl.pathname.startsWith('/api/cron') || req.nextUrl.pathname.startsWith('/api/worker')) {
    return NextResponse.next();
  }

  // If it's a standard public route, let it pass
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Otherwise, protect the route (Check for Login)
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};