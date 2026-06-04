import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [x, setX] = useState(10);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (clickCount > 0 && clickCount % 3 === 0) {
      setX((prevX) => prevX * 2);
    }
  }, [clickCount]);

  return (
    <div className="container">
      <h1>Value of X: {x}</h1>
      <h2>Total Clicks: {clickCount}</h2>

      <button onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}

export default App;