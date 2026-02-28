import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define which routes are public (No login required)
const isPublicRoute = createRouteMatcher([
  "/",               
  "/features",       
  "/pricing",        
  "/pricing/(.*)",   
  "/services/(.*)",  
  "/analyze",        
  "/api/scan",       
  "/api/cron",       
  "/api/worker",     
  "/api/pulse",      // 👈 ADDED: This allows the chatbot to work publicly
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
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};