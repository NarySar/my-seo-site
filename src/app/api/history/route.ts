import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    // 1. Verify the user securely via Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Connect to Supabase using the powerful Service Role Key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Fetch ONLY this specific user's scans
    const { data, error } = await supabase
      .from("scans")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // 4. Send the data back to the dashboard
    return NextResponse.json(data);

  } catch (error) {
    console.error("🔥 History Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}