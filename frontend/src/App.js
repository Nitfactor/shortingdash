import { useState, useEffect } from "react";

const API_BASE = "http://127.0.0.1:8000";

function App() {
  const [data, setData] = useState([]);
  const path = window.location.pathname;

  useEffect(() => {
    if (!path.startsWith("/api/")) return;

    fetch(`${API_BASE}${path}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [path]);

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <h1>SLBM Dashboard</h1>
      <p>Records: {data.length}</p>

      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id ?? index}>
                {columns.map((col) => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
