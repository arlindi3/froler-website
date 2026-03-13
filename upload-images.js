// upload-images.js — Run with: node upload-images.js
// Uploads all car images from src/images/ to Firebase Storage
// and updates each car document in Firestore with the download URLs.
// No CORS issues because this runs in Node.js, not in a browser.

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} = require("firebase/firestore");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const fs = require("fs");
const path = require("path");

const firebaseConfig = {
  apiKey: "AIzaSyClMnKVwb63TvnneJ0hA9Las2LcMcLwLrw",
  authDomain: "froler.firebaseapp.com",
  projectId: "froler",
  storageBucket: "froler.firebasestorage.app",
  messagingSenderId: "4541172773",
  appId: "1:4541172773:web:c31a682999c9d3e9d503cc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const imagesDir = path.join(__dirname, "src", "images");

// Map: slug → array of local image filenames (in order)
const carImages = {
  "mercedes-glc": [
    "car1.jpeg",
    "details1.jpeg",
    "details2.jpeg",
    "details3.jpeg",
    "details4.jpeg",
    "details5.jpeg",
    "details6.jpeg",
    "details7.jpeg",
  ],
  "mercedes-cls": [
    "car2.jpeg",
    "detailsCls1.jpeg",
    "detailsCls (2).jpeg",
    "detailsCls (3).jpeg",
    "detailsCls (4).jpeg",
    "detailsCls (5).jpeg",
    "detailsCls (6).jpeg",
    "detailsCls (7).jpeg",
    "detailsCls (8).jpeg",
    "detailsCls (9).jpeg",
  ],
  "mercedes-gle": [
    "car3.jpeg",
    "detailsGle (1).jpeg",
    "detailsGle (2).jpeg",
    "detailsGle (3).jpeg",
    "detailsGle (4).jpeg",
    "detailsGle (5).jpeg",
    "detailsGle (6).jpeg",
    "detailsGle (7).jpeg",
    "detailsGle (8).jpeg",
  ],
  "range-vogue": [
    "car4.jpeg",
    "detailsRangeRover (1).jpg",
    "detailsRangeRover (2).jpg",
    "detailsRangeRover (3).jpg",
    "detailsRangeRover (4).jpg",
    "detailsRangeRover (5).jpg",
    "detailsRangeRover (6).jpg",
  ],
};

async function uploadImage(slug, filename) {
  const filePath = path.join(imagesDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`   ⚠ File not found: ${filename}`);
    return null;
  }

  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filename);
  const storagePath = `cars/${slug}/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const storageRef = ref(storage, storagePath);

  const contentType = ext === ".png" ? "image/png" : "image/jpeg";

  await uploadBytes(storageRef, fileBuffer, { contentType });
  const url = await getDownloadURL(storageRef);
  return url;
}

async function main() {
  console.log("🔄 Fetching cars from Firestore...\n");

  const carsSnap = await getDocs(collection(db, "cars"));
  const carsMap = {};
  carsSnap.forEach((d) => {
    const data = d.data();
    carsMap[data.slug] = { id: d.id, ...data };
  });

  console.log(`Found ${Object.keys(carsMap).length} cars in Firestore.\n`);

  for (const [slug, filenames] of Object.entries(carImages)) {
    const car = carsMap[slug];
    if (!car) {
      console.log(
        `❌ Car with slug "${slug}" not found in Firestore. Skipping.\n`,
      );
      continue;
    }

    console.log(`🚗 ${car.name} (${slug})`);
    console.log(`   Uploading ${filenames.length} images...`);

    const urls = [];
    for (let i = 0; i < filenames.length; i++) {
      const filename = filenames[i];
      console.log(`   [${i + 1}/${filenames.length}] ${filename}`);
      const url = await uploadImage(slug, filename);
      if (url) {
        urls.push(url);
        console.log(`   ✅ Uploaded`);
      }
    }

    // Update Firestore document
    if (urls.length > 0) {
      await updateDoc(doc(db, "cars", car.id), { images: urls });
      console.log(`   📝 Firestore updated with ${urls.length} image URLs.\n`);
    } else {
      console.log(`   ⚠ No images uploaded.\n`);
    }
  }

  console.log("🎉 Done! All images uploaded and cars updated.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
