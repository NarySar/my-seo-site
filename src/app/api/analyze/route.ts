import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
// Fix
export async function POST(request: Request) {
  try {
    // 1. Get the URL from the frontend
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 2. Fetch the actual HTML of the website
    // We add a User-Agent so we look like a real browser
    const response = await fetch(url, {
      headers: {
        "User-Agent": "PulseSeo-Agent/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch website" }, { status: 500 });
    }

    const html = await response.text();

    // 3. Load HTML into Cheerio (The Reader)
    const $ = cheerio.load(html);

    // 4. Extract Data
    const title = $("title").text() || "No title found";
    const metaDescription = $('meta[name="description"]').attr("content") || "No description found";
    
    // Check for H1 tag (Primary Topic)
    const h1Text = $("h1").first().text().trim() || "No H1 tag found";
    
    // Check for schema.org data (JSON-LD)
    const jsonLdCount = $('script[type="application/ld+json"]').length;

    // Check for robots meta tag
    const robotsTag = $('meta[name="robots"]').attr("content") || "No robots tag found";

    // 5. Return the Real Data
    return NextResponse.json({
      success: true,
      data: {
        title,
        metaDescription,
        h1Text,
        jsonLdCount,
        robotsTag,
      },
    });

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong scanning the site" }, { status: 500 });
  }
}