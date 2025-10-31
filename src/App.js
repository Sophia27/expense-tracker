import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("spass");
  const [limit, setLimit] = useState("");
  const [entries, setEntries] = useState([]);

  const total = entries.reduce((sum, e) => sum + e.amount, 0);
  const remaining = limit ? limit - total : null;

  const handleAdd = () => {
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0) {
      setEntries([...entries, { amount: num, category }]);
      setAmount("");
    }
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: 400,
        margin: "30px auto",
        padding: 20,
        background: "#f9fafb",
        borderRadius: 12,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>💰 Ausgaben-Tracker</h1>

      <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Betrag"
          style={{ flex: 1, padding: 6 }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ flex: 1, padding: 6 }}
        >
          <option value="spass">Spaß</option>
          <option value="lebensmittel">Lebensmittel</option>
          <option value="sonstiges">Sonstiges</option>
        </select>
        <button onClick={handleAdd} style={{ padding: "6px 10px" }}>
          Hinzufügen
        </button>
      </div>

      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        placeholder="Limit (optional)"
        style={{ width: "100%", marginTop: 10, padding: 6 }}
      />

      {limit && (
        <div
          style={{
            marginTop: 8,
            textAlign: "center",
            color: remaining < 0 ? "red" : "green",
            fontWeight: 600,
          }}
        >
          Verbleibend: {remaining.toFixed(2)} CHF
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <h3>Einträge</h3>
        <ul style={{ listStyle: "none", padding: 0, maxHeight: 200, overflowY: "auto" }}>
          {entries.map((entry, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span>{entry.category}</span>
              <span>{entry.amount.toFixed(2)} CHF</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div
        style={{
          marginTop: 10,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.1em",
        }}
      >
        Gesamtsumme: {total.toFixed(2)} CHF
      </div>
    </div>
  );
}

