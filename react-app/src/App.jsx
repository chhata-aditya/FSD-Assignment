import { useState } from "react";
import ProfileCard from "./components/ProfileCard.jsx";
import ControlledForm from "./components/ControlledForm.jsx";
import Counter from "./components/Counter.jsx";

const studioTabs = [
  { id: "profile", label: "01 · Profile Card", sub: "Props & Avatars" },
  { id: "form", label: "02 · Studio Form", sub: "Controlled State" },
  { id: "counter", label: "03 · Daily Counter", sub: "useState Hook" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="studio-shell">
      <header className="studio-header">
        <div className="badge-row">
          <span className="creator-badge">🌿 Designed by Chhata</span>
          <span className="aesthetic-badge">Matcha &amp; Cream Edition</span>
        </div>
        <h1 className="title-text">Creative Web Space</h1>
        <p className="subtitle-text">
          Interactive frontend showcase crafted with organic aesthetics, soft glassmorphism, and modern React 18 patterns.
        </p>

        <nav className="tab-bar" aria-label="Studio Navigation">
          {studioTabs.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="tab-title">{t.label}</span>
              <span className="tab-desc">{t.sub}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="studio-card">
        {activeTab === "profile" && (
          <div className="profiles-grid">
            <ProfileCard
              name="Chhata"
              role="Creative Designer & Dev"
              imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80"
              description="Passionate about aesthetic UI/UX, gentle design systems, typography, and intuitive web interactions."
            />
            <ProfileCard
              name="Maya Lin"
              role="Botanical Illustrator"
              imageUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80"
              description="Exploring minimalist palettes, nature-inspired visual arts, and peaceful digital experiences."
            />
            <ProfileCard
              name="Sofia Reed"
              role="Frontend Architect"
              imageUrl="https://broken-image.invalid/test.jpg"
              description="Fallback demonstration: Automatically renders initials badge when the image link is unavailable."
            />
          </div>
        )}

        {activeTab === "form" && <ControlledForm />}

        {activeTab === "counter" && <Counter />}
      </main>

      <footer className="studio-footer">
        <p>Crafted with care by Chhata · React &amp; Vite</p>
      </footer>
    </div>
  );
}
