import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../../firebase";
import AdminCarForm from "./AdminCarForm";
import seedCarData from "./seedCarData";
import "./Admin.css";

const AdminPanel = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firestoreError, setFirestoreError] = useState(null);
  const [view, setView] = useState("list"); // "list" | "add" | "edit"
  const [selectedCar, setSelectedCar] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [autoSeeded, setAutoSeeded] = useState(false);

  // Auto-seed Firestore when empty
  const autoSeed = async () => {
    if (autoSeeded) return;
    setAutoSeeded(true);
    try {
      for (const car of seedCarData) {
        await addDoc(collection(db, "cars"), {
          ...car,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.warn("Auto-seed failed:", err.message);
    }
  };

  // Real-time listener for cars
  useEffect(() => {
    const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (data.length === 0 && !autoSeeded) {
          // Firestore is empty — auto-seed the 4 cars
          autoSeed();
        } else {
          setCars(data);
          setLoading(false);
          setFirestoreError(null);
        }
      },
      (err) => {
        const isNotFound =
          err.message?.includes("not found") ||
          err.code === "not-found" ||
          err.code === "unavailable";
        const isPermission = err.code === "permission-denied";
        setFirestoreError(
          isNotFound
            ? "not-found"
            : isPermission
              ? "permission-denied"
              : err.message,
        );
        setLoading(false);
      },
    );
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSeeded]);

  const handleLogout = () => signOut(auth);

  const handleDelete = async () => {
    if (!confirmDelete) return;
    await deleteDoc(doc(db, "cars", confirmDelete.id));
    setConfirmDelete(null);
  };

  const toggleFeatured = async (car) => {
    await updateDoc(doc(db, "cars", car.id), { featured: !car.featured });
  };

  const filteredCars = cars.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.carMake?.toLowerCase().includes(search.toLowerCase()),
  );

  const featuredCount = cars.filter((c) => c.featured).length;

  // Show permission error guide
  if (firestoreError === "permission-denied") {
    const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cars/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`;
    return (
      <div className="admin-layout">
        <Sidebar view={view} setView={setView} onLogout={handleLogout} />
        <div className="admin-main">
          <div
            className="admin-card"
            style={{ padding: "2rem", maxWidth: 660 }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔒</div>
            <h2 style={{ color: "#e4002b", marginBottom: "0.5rem" }}>
              Mungojnë lejet e Firestore
            </h2>
            <p
              style={{ color: "#555", marginBottom: "1.2rem", lineHeight: 1.7 }}
            >
              Rregullat e sigurisë të Firestore po bllokojnë aksesin. Ndiq
              hapat:
            </p>
            <ol
              style={{
                color: "#444",
                lineHeight: 2.2,
                paddingLeft: "1.4rem",
                marginBottom: "1.2rem",
              }}
            >
              <li>
                Shko te{" "}
                <a
                  href="https://console.firebase.google.com/project/froler/firestore/rules"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#1976d2" }}
                >
                  Firebase Console → Firestore → Rules
                </a>
              </li>
              <li>Fshi gjithçka dhe ngjit rregullat më poshtë</li>
              <li>
                Kliko <strong>"Publish"</strong>
              </li>
              <li>Rifresko këtë faqe</li>
            </ol>
            <pre
              style={{
                background: "#1e1e2e",
                color: "#a6e3a1",
                padding: "1.2rem",
                borderRadius: "10px",
                fontSize: "0.82rem",
                lineHeight: 1.7,
                overflowX: "auto",
                userSelect: "all",
                marginBottom: "1.2rem",
              }}
            >
              {rules}
            </pre>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              <button
                className="admin-btn admin-btn-secondary"
                style={{ width: "auto", padding: "0.65rem 1.2rem" }}
                onClick={() => navigator.clipboard.writeText(rules)}
              >
                📋 Kopjo Rregullat
              </button>
              <button
                className="admin-btn admin-btn-primary"
                style={{ width: "auto", padding: "0.65rem 1.2rem" }}
                onClick={() => window.location.reload()}
              >
                🔄 Rifresko
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show Firestore setup guide if database doesn't exist yet
  if (firestoreError === "not-found") {
    return (
      <div className="admin-layout">
        <Sidebar view={view} setView={setView} onLogout={handleLogout} />
        <div className="admin-main">
          <div
            className="admin-card"
            style={{ padding: "2rem", maxWidth: 620 }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚙️</div>
            <h2 style={{ color: "#e4002b", marginBottom: "0.5rem" }}>
              Firestore Database nuk u gjet
            </h2>
            <p
              style={{ color: "#555", marginBottom: "1.5rem", lineHeight: 1.6 }}
            >
              Databaza nuk është krijuar ende për projektin{" "}
              <strong>froler</strong>. Ndiq hapat më poshtë për ta konfiguruar:
            </p>
            <ol style={{ color: "#444", lineHeight: 2, paddingLeft: "1.4rem" }}>
              <li>
                Shko te{" "}
                <a
                  href="https://console.firebase.google.com/project/froler/firestore"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#1976d2" }}
                >
                  Firebase Console → Firestore Database
                </a>
              </li>
              <li>
                Kliko <strong>"Create database"</strong>
              </li>
              <li>
                Zgjidh <strong>"Start in test mode"</strong> → Next
              </li>
              <li>
                Zgjidh një lokacion (p.sh. <strong>europe-west1</strong>) →
                Enable
              </li>
              <li>
                Prit 1-2 minuta dhe <strong>rifresko faqen</strong>
              </li>
            </ol>
            <button
              className="admin-btn admin-btn-primary"
              style={{
                marginTop: "1.5rem",
                width: "auto",
                padding: "0.7rem 1.5rem",
              }}
              onClick={() => window.location.reload()}
            >
              🔄 Rifresko
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "add") {
    return (
      <div className="admin-layout">
        <Sidebar view={view} setView={setView} onLogout={handleLogout} />
        <div className="admin-main">
          <AdminCarForm
            car={null}
            onDone={() => setView("list")}
            onCancel={() => setView("list")}
          />
        </div>
      </div>
    );
  }

  if (view === "edit" && selectedCar) {
    return (
      <div className="admin-layout">
        <Sidebar view={view} setView={setView} onLogout={handleLogout} />
        <div className="admin-main">
          <AdminCarForm
            car={selectedCar}
            onDone={() => {
              setSelectedCar(null);
              setView("list");
            }}
            onCancel={() => {
              setSelectedCar(null);
              setView("list");
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar view={view} setView={setView} onLogout={handleLogout} />

      <div className="admin-main">
        {/* Header */}
        <div className="admin-topbar">
          <h1>Paneli Administrativ</h1>
          <span style={{ color: "#888", fontSize: "0.85rem" }}>
            {user.email}
          </span>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <h3>{cars.length}</h3>
            <p>Gjithsej Makina</p>
          </div>
          <div className="admin-stat-card">
            <h3>{featuredCount}</h3>
            <p>Makinat e Veçanta</p>
          </div>
          <div className="admin-stat-card">
            <h3>{cars.length - featuredCount}</h3>
            <p>Makina Normale</p>
          </div>
        </div>

        {/* Cars table */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>Të gjitha Makinat</h2>
            <div className="admin-card-header-actions">
              <input
                className="admin-search-input"
                type="text"
                placeholder="Kërko..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="admin-btn admin-btn-primary admin-btn-add"
                onClick={() => setView("add")}
              >
                + Shto Makinë
              </button>
            </div>
          </div>

          <div className="admin-table-wrapper">
            {loading ? (
              <div className="admin-loading">Duke ngarkuar...</div>
            ) : filteredCars.length === 0 ? (
              <div className="admin-loading">
                {search
                  ? "Nuk u gjet asgjë."
                  : "Nuk ka makina. Shto makinën e parë!"}
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Emri</th>
                    <th>Tipi</th>
                    <th>Viti</th>
                    <th>Çmimi</th>
                    <th>Veçanta</th>
                    <th>Veprimet</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.map((car) => (
                    <tr key={car.id}>
                      <td data-label="Foto">
                        {car.images && car.images[0] ? (
                          <img
                            className="admin-car-thumb"
                            src={car.images[0]}
                            alt={car.name}
                          />
                        ) : (
                          <div
                            className="admin-car-thumb"
                            style={{
                              background: "#f0f0f0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.2rem",
                            }}
                          >
                            🚗
                          </div>
                        )}
                      </td>
                      <td data-label="Emri">
                        <div className="admin-car-name">{car.name}</div>
                        <div className="admin-car-meta">
                          {car.carMake} · {car.km ? car.km + " km" : ""}
                        </div>
                      </td>
                      <td data-label="Tipi">{car.type}</td>
                      <td data-label="Viti">{car.year}</td>
                      <td data-label="Çmimi">
                        {typeof car.price === "number"
                          ? `€${car.price.toLocaleString()}`
                          : car.price}
                      </td>
                      <td data-label="Veçanta">
                        <span
                          className={`admin-badge ${
                            car.featured
                              ? "admin-badge-featured"
                              : "admin-badge-normal"
                          }`}
                        >
                          {car.featured ? "⭐ Veçanta" : "Normal"}
                        </span>
                      </td>
                      <td data-label="Veprimet">
                        <div className="admin-actions">
                          {/* Toggle featured */}
                          <button
                            className={`admin-btn-icon admin-btn-star ${car.featured ? "starred" : ""}`}
                            onClick={() => toggleFeatured(car)}
                            title={
                              car.featured
                                ? "Hiq nga Veçantat"
                                : "Shto te Veçantat"
                            }
                          >
                            ⭐
                          </button>
                          {/* Edit */}
                          <button
                            className="admin-btn-icon admin-btn-edit"
                            onClick={() => {
                              setSelectedCar(car);
                              setView("edit");
                            }}
                            title="Ndrysho"
                          >
                            ✏️
                          </button>
                          {/* Delete */}
                          <button
                            className="admin-btn-icon admin-btn-delete"
                            onClick={() => setConfirmDelete(car)}
                            title="Fshi"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirm dialog */}
      {confirmDelete && (
        <div className="admin-confirm-overlay">
          <div className="admin-confirm-box">
            <h3>Fshi Makinën</h3>
            <p>
              A jeni i sigurt që dëshironi të fshini{" "}
              <strong>{confirmDelete.name}</strong>? Ky veprim nuk mund të
              kthehët mbrapsht.
            </p>
            <div className="admin-confirm-actions">
              <button
                className="admin-btn admin-btn-secondary"
                onClick={() => setConfirmDelete(null)}
              >
                Anulo
              </button>
              <button
                className="admin-btn admin-btn-delete"
                style={{ background: "#e4002b", color: "#fff" }}
                onClick={handleDelete}
              >
                Po, Fshi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sidebar component
const Sidebar = ({ view, setView, onLogout }) => (
  <div className="admin-sidebar">
    <div className="admin-sidebar-logo">
      <h2>Auto Froler</h2>
      <span>Paneli Administrativ</span>
    </div>
    <nav className="admin-sidebar-nav">
      <button
        className={`admin-sidebar-btn ${view === "list" ? "active" : ""}`}
        onClick={() => setView("list")}
      >
        🚗 Makinat
      </button>
      <button
        className={`admin-sidebar-btn ${view === "add" ? "active" : ""}`}
        onClick={() => setView("add")}
      >
        ➕ Shto
      </button>
      <button
        className="admin-sidebar-btn admin-sidebar-logout-mobile"
        onClick={onLogout}
      >
        🚪 Dil
      </button>
    </nav>
    <div className="admin-sidebar-footer">
      <button className="admin-logout-btn" onClick={onLogout}>
        🚪 Dil
      </button>
    </div>
  </div>
);

export default AdminPanel;
