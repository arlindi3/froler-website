import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import "./Admin.css";

const CAR_TYPES = [
  "SUV",
  "SEDAN",
  "COUPE",
  "HATCHBACK",
  "KOMBI",
  "KABRIOLET",
  "PICKUP",
];

const defaultForm = {
  name: "",
  slug: "",
  type: "SUV",
  carMake: "",
  price: "",
  km: "",
  year: new Date().getFullYear(),
  size: "",
  gps: false,
  sportPackage: false,
  featured: false,
  description: "",
  extras: "", // comma-separated string in form, stored as array
  imageUrl: "", // single URL input field
};

const AdminCarForm = ({ car, onDone, onCancel }) => {
  const isEdit = Boolean(car);
  const [form, setForm] = useState(() => {
    if (car) {
      return {
        ...defaultForm,
        ...car,
        extras: Array.isArray(car.extras)
          ? car.extras.join("\n")
          : car.extras || "",
      };
    }
    return defaultForm;
  });

  // Existing image URLs already stored
  const [existingImages, setExistingImages] = useState(
    isEdit && Array.isArray(car.images) ? car.images : [],
  );
  // New local files to upload
  const [newFiles, setNewFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const fileInputRef = useRef();

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEdit) {
      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
      setForm((f) => ({ ...f, slug }));
    }
  }, [form.name, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewFiles((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [...prev, ...previews]);
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const removeNewFile = (index) => {
    URL.revokeObjectURL(newPreviews[index]);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (carId) => {
    if (!newFiles.length) return [];
    const total = newFiles.length;
    const TIMEOUT_MS = 15000; // 15 second timeout per file

    const uploadOne = (file, index) =>
      new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          try {
            task.cancel();
          } catch (_) {}
          reject(new Error("Timeout — ngarkimi zgjati shumë"));
        }, TIMEOUT_MS);

        const storageRef = ref(
          storage,
          `cars/${carId}/${Date.now()}-${index}-${file.name}`,
        );
        const task = uploadBytesResumable(storageRef, file);
        task.on(
          "state_changed",
          (snap) => {
            const progress = Math.round(
              ((index + snap.bytesTransferred / snap.totalBytes) / total) * 100,
            );
            setUploadProgress(progress);
          },
          (err) => {
            clearTimeout(timer);
            reject(err);
          },
          async () => {
            clearTimeout(timer);
            const url = await getDownloadURL(task.snapshot.ref);
            resolve(url);
          },
        );
      });

    try {
      const urls = await Promise.all(
        newFiles.map((file, i) => uploadOne(file, i)),
      );
      return urls;
    } catch (err) {
      setUploadError(
        "Ngarkimi i fotografive dështoi (CORS/Timeout). Përdorni opsionin e URL-së si alternativë.",
      );
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Emri i makinës është i detyrueshëm.");
      return;
    }

    setSaving(true);
    setUploading(newFiles.length > 0);
    setUploadError("");

    try {
      const carData = {
        ...form,
        price: isNaN(Number(form.price)) ? form.price : Number(form.price),
        year: Number(form.year),
        size: Number(form.size),
        extras: form.extras
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        updatedAt: serverTimestamp(),
      };

      let docId = isEdit ? car.id : null;

      if (!isEdit) {
        // Create document first to get ID
        const docRef = await addDoc(collection(db, "cars"), {
          ...carData,
          images: [],
          createdAt: serverTimestamp(),
        });
        docId = docRef.id;
      }

      // Upload new images
      let uploadedUrls = [];
      try {
        uploadedUrls = await uploadFiles(docId);
      } catch {
        // Upload failed (likely CORS) – skip file images, keep URL images
        uploadedUrls = [];
      }
      // Add URL-pasted images
      const urlImages = existingImages.filter(
        (u) => typeof u === "string" && u.startsWith("http"),
      );
      const finalImages = [...urlImages, ...uploadedUrls];

      if (isEdit) {
        await updateDoc(doc(db, "cars", car.id), {
          ...carData,
          images: finalImages,
        });
      } else {
        await updateDoc(doc(db, "cars", docId), { images: finalImages });
      }

      onDone();
    } catch (err) {
      console.error(err);
      setError("Gabim gjatë ruajtjes. Provo përsëri.");
    } finally {
      setSaving(false);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="admin-form-page">
      <div className="admin-topbar">
        <h1>{isEdit ? "Ndrysho Makinën" : "Shto Makinë të Re"}</h1>
      </div>

      <div className="admin-form-card">
        {error && <div className="admin-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            {/* Name */}
            <div className="admin-form-group admin-form-full">
              <label>Emri i Makinës *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="p.sh. Mercedes-Benz GLC 250d"
                required
              />
            </div>

            {/* Slug */}
            <div className="admin-form-group">
              <label>Slug (URL)</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="mercedes-glc-250d"
              />
            </div>

            {/* Type */}
            <div className="admin-form-group">
              <label>Tipi</label>
              <select name="type" value={form.type} onChange={handleChange}>
                {CAR_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Make */}
            <div className="admin-form-group">
              <label>Prodhuesi (Make)</label>
              <input
                name="carMake"
                value={form.carMake}
                onChange={handleChange}
                placeholder="p.sh. Mercedes-Benz"
              />
            </div>

            {/* Price */}
            <div className="admin-form-group">
              <label>Çmimi (€ ose "Kontakto")</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="p.sh. 25000 ose Kontakto"
              />
            </div>

            {/* Year */}
            <div className="admin-form-group">
              <label>Viti</label>
              <input
                name="year"
                type="number"
                min="1990"
                max="2030"
                value={form.year}
                onChange={handleChange}
              />
            </div>

            {/* KM */}
            <div className="admin-form-group">
              <label>Kilometrazha</label>
              <input
                name="km"
                value={form.km}
                onChange={handleChange}
                placeholder="p.sh. 130.000"
              />
            </div>

            {/* Engine Size */}
            <div className="admin-form-group">
              <label>Motori (cc)</label>
              <input
                name="size"
                type="number"
                value={form.size}
                onChange={handleChange}
                placeholder="p.sh. 2000"
              />
            </div>

            {/* Checkboxes */}
            <div className="admin-form-group admin-form-full">
              <label>Opsione</label>
              <div className="admin-checkbox-group">
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    name="gps"
                    checked={form.gps}
                    onChange={handleChange}
                  />
                  GPS / Navigator
                </label>
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    name="sportPackage"
                    checked={form.sportPackage}
                    onChange={handleChange}
                  />
                  Sport Paketa
                </label>
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                  />
                  ⭐ Makinat e Veçanta
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="admin-form-group admin-form-full">
              <label>Përshkrimi</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Shkruaj përshkrimin e makinës..."
                rows={5}
              />
            </div>

            {/* Extras */}
            <div className="admin-form-group admin-form-full">
              <label>Ekstra (një ekstra për rresht)</label>
              <textarea
                name="extras"
                value={form.extras}
                onChange={handleChange}
                placeholder={"Navigator + GPS\nKamera parkimi\nSedilje lekure"}
                rows={5}
              />
            </div>

            {/* Images */}
            <div className="admin-form-group admin-form-full">
              <label>Fotografitë</label>

              {/* Existing images */}
              {existingImages.length > 0 && (
                <div
                  className="admin-image-previews"
                  style={{ marginBottom: "0.8rem" }}
                >
                  {existingImages.map((url, i) => (
                    <div key={i} className="admin-image-preview-item">
                      <img src={url} alt={`Existing ${i + 1}`} />
                      <button
                        type="button"
                        className="admin-remove-img"
                        onClick={() => removeExistingImage(i)}
                        title="Hiq foton"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* New file previews */}
              {newPreviews.length > 0 && (
                <div
                  className="admin-image-previews"
                  style={{ marginBottom: "0.8rem" }}
                >
                  {newPreviews.map((src, i) => (
                    <div key={i} className="admin-image-preview-item">
                      <img src={src} alt={`Preview ${i + 1}`} />
                      <button
                        type="button"
                        className="admin-remove-img"
                        onClick={() => removeNewFile(i)}
                        title="Hiq foton"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div
                className="admin-image-upload-zone"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="admin-image-upload-icon">📷</div>
                <p>Kliko për të zgjedhur fotografi (mund të zgjedhësh shumë)</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />

              {uploading && (
                <div className="admin-upload-progress">
                  <div
                    className="admin-upload-progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              {uploadError && (
                <div className="admin-error" style={{ marginTop: "0.6rem" }}>
                  ⚠️ {uploadError}
                </div>
              )}

              {/* URL fallback */}
              <div style={{ marginTop: "1rem" }}>
                <label
                  style={{
                    fontSize: "0.82rem",
                    color: "#888",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  OSE shto URL të fotografisë drejtpërdrejt:
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/car.jpg"
                    style={{
                      flex: 1,
                      padding: "0.6rem 0.9rem",
                      border: "1.5px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "0.88rem",
                    }}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => {
                      if (urlInput.trim()) {
                        setExistingImages((prev) => [...prev, urlInput.trim()]);
                        setUrlInput("");
                      }
                    }}
                  >
                    + Shto URL
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form-actions">
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={onCancel}
              disabled={saving}
            >
              Anulo
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn-success"
              disabled={saving}
            >
              {saving
                ? uploading
                  ? `Duke ngarkuar... ${uploadProgress}%`
                  : "Duke ruajtur..."
                : isEdit
                  ? "Ruaj Ndryshimet"
                  : "Shto Makinën"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCarForm;
