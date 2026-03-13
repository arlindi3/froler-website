/**
 * fix-cors.js — Sets CORS policy on Firebase Storage bucket.
 *
 * SETUP (one-time):
 * 1. Go to: https://console.firebase.google.com/project/froler/settings/serviceaccounts/adminsdk
 * 2. Click "Generate new private key" → download the JSON file
 * 3. Save it as "service-account.json" in the ROOT of this project
 *    (it's already in .gitignore so it won't be committed)
 * 4. Run: node fix-cors.js
 */

const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");

const SERVICE_ACCOUNT_PATH = path.join(__dirname, "service-account.json");
const BUCKET_NAME = "froler.firebasestorage.app";

const CORS_CONFIG = [
  {
    origin: ["*"],
    method: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
    responseHeader: [
      "Content-Type",
      "Authorization",
      "Content-Length",
      "User-Agent",
      "x-goog-resumable",
    ],
    maxAgeSeconds: 3600,
  },
];

async function fixCors() {
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error("❌ service-account.json not found!");
    console.error(
      "   Download it from: https://console.firebase.google.com/project/froler/settings/serviceaccounts/adminsdk",
    );
    console.error("   Save it as 'service-account.json' in the project root.");
    process.exit(1);
  }

  const storage = new Storage({ keyFilename: SERVICE_ACCOUNT_PATH });
  const bucket = storage.bucket(BUCKET_NAME);

  console.log(`⚙️  Setting CORS on bucket: ${BUCKET_NAME}`);
  await bucket.setCorsConfiguration(CORS_CONFIG);
  console.log("✅ CORS configured successfully!");
  console.log("   Uploads from the browser admin panel should now work.");
}

fixCors().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
