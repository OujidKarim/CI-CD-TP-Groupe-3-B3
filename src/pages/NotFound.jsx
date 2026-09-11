import { NavLink } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
        gap: "20px"
      }}>
        <div style={{ fontSize: "72px" }}>😵‍💫</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: "800", color: "var(--text-main)" }}>
          404 - Page Introuvable
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "480px" }}>
          Oups ! Ce Pokémon semble s'être échappé dans les hautes herbes... La page que vous cherchez n'existe pas.
        </p>
        <NavLink
          to="/"
          style={{
            marginTop: "10px",
            padding: "12px 28px",
            background: "linear-gradient(135deg, var(--poke-red) 0%, #b91c1c 100%)",
            color: "white",
            borderRadius: "var(--radius-md)",
            fontWeight: "700",
            fontSize: "15px",
            boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)",
            transition: "all 0.2s"
          }}
        >
          ⚡ Retour à l'accueil
        </NavLink>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;