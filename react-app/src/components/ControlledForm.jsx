import { useState } from "react";

/**
 * Controlled Studio Form
 * Author: Chhata
 * Dynamic input synchronization, custom theme, and live state viewer
 */
export default function ControlledForm() {
  const blankState = {
    displayName: "",
    contactEmail: "",
    artDiscipline: "UI / Aesthetic Design",
    projectIdea: "",
    receiveLetter: true,
  };

  const [formFields, setFormFields] = useState(blankState);
  const [showToast, setShowToast] = useState(false);

  function handleField(e) {
    const { name, value, type, checked } = e.target;
    setFormFields((old) => ({
      ...old,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleReset() {
    setFormFields(blankState);
    setShowToast(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  }

  return (
    <div className="form-split">
      <form className="form-column" onSubmit={handleSubmit}>
        <div className="section-head">
          <h3>Creative Profile Questionnaire</h3>
          <p>Values synchronize smoothly across React components.</p>
        </div>

        <div className="form-group">
          <label htmlFor="displayName">Your Name</label>
          <input
            id="displayName"
            name="displayName"
            placeholder="Chhata"
            value={formFields.displayName}
            onChange={handleField}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail">Email Address</label>
          <input
            id="contactEmail"
            type="email"
            name="contactEmail"
            placeholder="chhata@studio.com"
            value={formFields.contactEmail}
            onChange={handleField}
          />
        </div>

        <div className="form-group">
          <label htmlFor="artDiscipline">Discipline / Passion</label>
          <select
            id="artDiscipline"
            name="artDiscipline"
            value={formFields.artDiscipline}
            onChange={handleField}
          >
            <option>UI / Aesthetic Design</option>
            <option>Frontend Engineering</option>
            <option>Botanical Art &amp; Layouts</option>
            <option>Interactive Storytelling</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="projectIdea">Project Vision</label>
          <textarea
            id="projectIdea"
            name="projectIdea"
            rows="3"
            placeholder="Tell us what you'd love to build..."
            value={formFields.projectIdea}
            onChange={handleField}
          />
        </div>

        <label className="checkbox-wrap">
          <input
            type="checkbox"
            name="receiveLetter"
            checked={formFields.receiveLetter}
            onChange={handleField}
          />
          <span>Receive gentle design inspirations &amp; tips</span>
        </label>

        <div className="action-row">
          <button type="submit" className="btn-confirm">Save Profile</button>
          <button type="button" className="btn-clear" onClick={handleReset}>Clear</button>
        </div>

        {showToast && (
          <div className="toast-banner">
            ✨ Profile details saved to state!
          </div>
        )}
      </form>

      {/* Live State Inspector */}
      <aside className="inspector-column">
        <div className="inspector-head">
          <span className="leaf-status">🌱</span>
          <h4>Live State Reflection</h4>
        </div>

        <div className="data-list">
          <div className="data-item">
            <span className="key-name">Name</span>
            <span className="val-text">{formFields.displayName || "—"}</span>
          </div>
          <div className="data-item">
            <span className="key-name">Email</span>
            <span className="val-text">{formFields.contactEmail || "—"}</span>
          </div>
          <div className="data-item">
            <span className="key-name">Discipline</span>
            <span className="val-text highlighted">{formFields.artDiscipline}</span>
          </div>
          <div className="data-item">
            <span className="key-name">Vision</span>
            <span className="val-text">{formFields.projectIdea || "—"}</span>
          </div>
          <div className="data-item">
            <span className="key-name">Newsletter</span>
            <span className="val-text status-badge">{formFields.receiveLetter ? "Yes, please" : "Opted out"}</span>
          </div>
        </div>

        <div className="json-box">
          <span className="json-tag">REACT STATE OBJECT</span>
          <code>{JSON.stringify(formFields, null, 2)}</code>
        </div>
      </aside>
    </div>
  );
}
