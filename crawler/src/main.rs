use reqwest;
use scraper::{Html, Selector};
use serde_json::json;
use std::env;
use tokio;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 👇 NEW: Tell Rust to look in the root folder for .env.local!
    dotenv::from_filename("../.env.local").ok();

    let target_url = "https://www.pulseplusseo.ai";
    let base_domain = "pulseplusseo.ai";
    
    println!("🚀 PULSE-PLUS: Firing up the Rust Crawler...");
    
    let response = reqwest::get(target_url).await?;
    let html_content = response.text().await?;
    let document = Html::parse_document(&html_content);
    let link_selector = Selector::parse("a").unwrap();
    
    let mut clean_links = Vec::new();

    for element in document.select(&link_selector) {
        if let Some(href) = element.value().attr("href") {
            if href.starts_with('#') || href.starts_with("mailto:") { continue; }
            
            let full_url = if href.starts_with('/') {
                format!("https://{}{}", base_domain, href)
            } else {
                href.to_string()
            };

            if full_url.contains(base_domain) && !clean_links.contains(&full_url) {
                clean_links.push(full_url);
            }
        }
    }

    println!("📊 Found {} clean, internal pages to scan.", clean_links.len());

    // 👇 NEW: Grab the EXACT variable names you already use in your Next.js app
    let supabase_url = env::var("NEXT_PUBLIC_SUPABASE_URL").expect("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
    let supabase_key = env::var("SUPABASE_SERVICE_ROLE_KEY").expect("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
    
    let client = reqwest::Client::new();
    let insert_url = format!("{}/rest/v1/crawl_queue", supabase_url);

    println!("💾 Saving URLs to Supabase Database...");

    for link in clean_links {
        let payload = json!({
            "domain": base_domain,
            "url": link,
            "status": "pending"
        });

        let res = client.post(&insert_url)
            .header("apikey", &supabase_key)
            .header("Authorization", format!("Bearer {}", supabase_key))
            .header("Content-Type", "application/json")
            .header("Prefer", "return=minimal")
            .json(&payload)
            .send()
            .await?;

        if res.status().is_success() {
            println!("✅ Queued: {}", link);
        } else {
            println!("❌ Failed to queue: {} (Status: {})", link, res.status());
        }
    }

    println!("🎉 CRAWL COMPLETE! Database is prepped for the AI Agent.");
    Ok(())
}