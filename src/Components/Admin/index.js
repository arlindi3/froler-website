import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

const Admin = () => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCheckingAuth(false);
    });
    return () => unsub();
  }, []);

  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a2e",
          color: "#fff",
          fontSize: "1.1rem",
        }}
      >
        Duke kontrolluar autentifikimin...
      </div>
    );
  }

  if (!user) return <AdminLogin />;
  return <AdminPanel user={user} />;
};

export default Admin;
