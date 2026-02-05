import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Calendar, ExternalLink } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  console.log("🔍 DASHBOARD DEBUG START");
  console.log("👤 User ID:", userId);

  // Check if the key exists
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error("❌ CRITICAL ERROR: SUPABASE_SERVICE_ROLE_KEY is missing from .env.local!");
  } else {
    console.log("✅ Service Key found (Starts with):", serviceKey.substring(0, 10) + "...");
  }

  // Create the Admin Client
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey || ""
  );

  // Fetch Data
  console.log("⏳ Fetching data from Supabase...");
  const { data: scans, error } = await supabaseAdmin
    .from("scans")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ SUPABASE FETCH ERROR:", error.message);
  } else {
    console.log("✅ Data received. Rows found:", scans?.length || 0);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navbar />
      
      <main className="max-w-5xl mx-auto pt-32 px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Your Scan History</h1>
                <p className="text-zinc-500 mt-2">View past reports and track improvements.</p>
            </div>
            <Link 
                href="/analyze" 
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition-colors"
            >
                + New Scan
            </Link>
        </div>

        {/* ERROR STATE */}
        {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-6">
                Error loading data: {error.message} (Check Terminal for details)
            </div>
        )}

        {/* EMPTY STATE */}
        {(!scans || scans.length === 0) && !error && (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500 mb-4">You haven't scanned any sites yet.</p>
                <Link href="/analyze" className="text-blue-600 hover:underline">Run your first scan &rarr;</Link>
            </div>
        )}

        {/* SCAN LIST */}
        <div className="grid gap-4">
            {scans?.map((scan: any) => (
                <div key={scan.id} className="group bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-md flex items-center justify-between">
                    
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            scan.score >= 80 ? 'bg-green-100 text-green-700' :
                            scan.score >= 50 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {scan.score}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                                {scan.domain}
                                <a href={scan.url} target="_blank" className="text-zinc-400 hover:text-zinc-600"><ExternalLink className="h-3 w-3" /></a>
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-zinc-500 mt-1">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(scan.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                     <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400">
                        {scan.result?.modelUsed || "Gemini Flash"}
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}