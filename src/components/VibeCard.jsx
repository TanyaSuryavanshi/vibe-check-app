import React from "react";
import "./VibeCard.css";

const VibeCard = ({ vibe, onRestart }) => {
  if (!vibe) return null;
  return (
    <div className="vibe-card">
      <h2>
        {vibe.emoji} {vibe.name}
      </h2>
      <p className="description">{vibe.description}</p>
      <p className="mantra">“{vibe.mantra}”</p>
      <button onClick={onRestart}>🔁 Try Again</button>
    </div>
  );
};

export default VibeCard;
