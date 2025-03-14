import React, { useState } from "react";

const API_URL = "http://localhost:3000";

const LikeDislike = ({ entity, id, initialLikes = 0, initialDislikes = 0 }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  const handleVote = async (voteType) => {
    try {
      const response = await fetch(`${API_URL}/${entity}/${id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteType }),
      });

      if (!response.ok) {
        throw new Error("Hiba a szavazat küldésekor");
      }

      // Optimista frissítés
      if (voteType === "like") {
        setLikes(likes + 1);
      } else if (voteType === "dislike") {
        setDislikes(dislikes + 1);
      }
    } catch (error) {
      console.error("Szavazási hiba:", error);
      alert("Hiba történt a szavazás során!");
    }
  };

  return (
    <div className="like-dislike mt-2">
      <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleVote("like")}>
        👍 {likes}
      </button>
      <button className="btn btn-sm btn-outline-danger" onClick={() => handleVote("dislike")}>
        👎 {dislikes}
      </button>
    </div>
  );
};

export default LikeDislike;
