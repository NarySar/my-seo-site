import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "PulseSeo-Agent/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch website" }, { status: 500 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // --- BASIC DATA ---
    const title = $("title").text().trim() || "No title found";
    const metaDescription = $('meta[name="description"]').attr("content") || "No description found";
    const h1Text = $("h1").first().text().trim() || "No H1 tag found";
    const jsonLdCount = $('script[type="application/ld+json"]').length;
    const robotsTag = $('meta[name="robots"]').attr("content") || "No robots tag found";

    // --- NEW "SMART" METRICS ---
    
    // 1. Word Count (Clean text only, no scripts/styles)
    const bodyText = $("body").text().replace(/\s+/g, " ").trim();
    const wordCount = bodyText.split(" ").length;

    // 2. Image Analysis
    const totalImages = $("img").length;
    const imagesWithAlt = $("img[alt]").filter((i, el) => $(el).attr("alt") !== "").length;
    const missingAlt = totalImages - imagesWithAlt;

    // 3. Link Analysis
    const totalLinks = $("a").length;

    return NextResponse.json({
      success: true,
      data: {
        title,
        metaDescription,
        h1Text,
        jsonLdCount,
        robotsTag,
        // Send new data to frontend
        wordCount,
        totalImages,
        missingAlt,
        totalLinks,
      },
    });

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong scanning the site" }, { status: 500 });
  }
}