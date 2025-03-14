import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Az API-nak kell biztosítania egy végpontot, pl. /users/:username, ami visszaadja a profil adatait
    fetch(`http://localhost:3000/users/${username}`)
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error("Hiba a profil adatok lekérésekor:", error));
  }, [username]);

  if (!profileData) return <p>Betöltés...</p>;

  return (
    <div>
      <h2>{profileData.username} profilja</h2>
      <p>Pontszám: {profileData.points}</p>
      <h3>Kérdések</h3>
      {profileData.questions && profileData.questions.length > 0 ? (
        profileData.questions.map((q) => (
          <div key={q.id} className="card p-3 mt-3 shadow-sm">
            <h5>{q.title}</h5>
            <p>{q.body}</p>
          </div>
        ))
      ) : (
        <p>Nincsenek kérdések.</p>
      )}
      <h3>Hozzászólások</h3>
      {profileData.comments && profileData.comments.length > 0 ? (
        profileData.comments.map((c) => (
          <div key={c.id} className="card p-2 mt-2">
            <p>{c.text}</p>
          </div>
        ))
      ) : (
        <p>Nincsenek hozzászólások.</p>
      )}
    </div>
  );
};

export default ProfilePage;
