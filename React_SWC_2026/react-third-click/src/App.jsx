// import { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [x, setX] = useState(10);
//   const [clickCount, setClickCount] = useState(0);

//   const handleClick = () => {
//     setClickCount((prev) => prev + 1);
//   };

//   useEffect(() => {
//     if (clickCount > 0 && clickCount % 3 === 0) {
//       setX((prevX) => prevX * 2);
//     }
//   }, [clickCount]);

//   return (
//     <div className="container">
//       <h1>Value of X: {x}</h1>
//       <h2>Total Clicks: {clickCount}</h2>

//       <button onClick={handleClick}>
//         Click Me
//       </button>
//     </div>
//   );
// }

// export default App;
import { useState } from "react";

function App() {
  const [history, setHistory] = useState(["h1"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentValue = history[currentIndex];

  const handleRedo = () => {
    if (currentValue === "h1") {
      const newHistory = [...history.slice(0, currentIndex + 1), "object"];
      setHistory(newHistory);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {currentValue === "h1" ? (
        <h1>h1</h1>
      ) : (
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "lightblue",
            margin: "auto",
          }}
        >
          Object
        </div>
      )}

      <button onClick={handleUndo} style={{ marginRight: "10px" }}>
        Undo
      </button>

      <button onClick={handleRedo}>
        Redo
      </button>
    </div>
  );
}

export default App;