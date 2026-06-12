import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/open-positions/2026-06-12')
    .then(res => res.json())
    .then(json => setData(json));
  }, []);

  return (
    <div>
      <h1>SLBM Dashboard</h1>
      <p>Records: {data.length}</p>
    </div>
  );
}

export default App;