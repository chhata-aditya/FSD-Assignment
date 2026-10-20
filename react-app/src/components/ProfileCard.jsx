import { useState } from "react";

/**
 * Aesthetic Profile Card
 * Author: Chhata
 * Organic glassmorphism, prop handling, and dynamic fallback avatar
 */
export default function ProfileCard({ name, role, imageUrl, description }) {
  const [loadFailed, setLoadFailed] = useState(false);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="profile-item">
      <div className="banner-wave" />
      <div className="avatar-holder">
        {loadFailed ? (
          <div className="avatar-fallback" aria-label={name}>
            {initials}
          </div>
        ) : (
          <img
            className="avatar-pic"
            src={imageUrl}
            alt={name}
            onError={() => setLoadFailed(true)}
            loading="lazy"
          />
        )}
      </div>

      <div className="profile-details">
        <h3 className="profile-title">{name}</h3>
        {role && <span className="profile-tag">{role}</span>}
        <p className="profile-summary">{description}</p>

        <div className="profile-footer">
          <button className="btn-visit" onClick={() => alert(`Visiting ${name}'s portfolio!`)}>
            Say Hello
          </button>
        </div>
      </div>
    </article>
  );
}
