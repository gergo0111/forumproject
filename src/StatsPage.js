import React, { useEffect, useState } from "react";


const StatsPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Az API-nak kell egy /stats végpontot biztosítania, ami az aggregált statisztikákat adja vissza
    fetch("http://localhost:3000/stats")
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Hiba a statisztikák lekérésekor:", error));
  }, []);

  if (!stats) return <p>Betöltés...</p>;

  return (
    <div>
      <h2>Aktivitási statisztikák</h2>
      <h3>Legaktívabb felhasználók</h3>
      <ul>
        {stats.topUsers.map((user) => (
          <li key={user.id}>
            {user.username}: {user.points} pont
          </li>
        ))}
      </ul>
      <h3>Ranglista</h3>
      <ul>
        {stats.leaderboard.map((user, index) => (
          <li key={user.id}>
            #{index + 1} {user.username} - {user.rank}
          </li>
        ))}
      </ul>
      {/* Bővítsd a statisztikákat további adatokkal, például like/dislike arányokkal */}
    </div>
  );
};

export default StatsPage;
