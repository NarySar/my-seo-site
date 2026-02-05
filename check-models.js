const https = require('https');

// 🔴 PASTE YOUR NEW KEY (API key 2) HERE
const API_KEY = "AIzaSyAhGsFWionnMsu1OjrwfDt_9olMM0au8u0"; 

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

console.log("🔍 Asking Google for available models...");

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    if (json.models) {
        console.log("\n✅ SUCCESS! You have access to these models:");
        json.models.forEach(m => {
            if(m.supportedGenerationMethods.includes("generateContent")) {
                console.log(`🌟 ${m.name.replace('models/', '')}`);
            }
        });
    } else {
        console.log("❌ ERROR:", json);
    }
  });
}).on("error", (e) => console.error("Network error:", e));