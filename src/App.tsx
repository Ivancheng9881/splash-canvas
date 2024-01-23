import "./App.css";
import React, { useState } from "react";

type TPoint = {
  x: number;
  y: number;
};

function App() {
  const [points, setPoints] = useState<TPoint[]>([]);
  const [deletedPoints, setDeletedPoints] = useState<TPoint[]>([]);

  function handlePlaceCircle(e: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX, y: clientY }]);
  }

  function handleUndo() {
    const newPoints = [...points];
    const deleted = newPoints.pop();
    if (!deleted) return;
    setDeletedPoints([...deletedPoints, deleted]);
    setPoints(newPoints);
  }

  function handleRedo() {
    const newDeleted = [...deletedPoints];
    const newPoints = [...points];
    const deleted = newDeleted.pop();
    if (!deleted) return;
    newPoints.push(deleted);
    setDeletedPoints(newDeleted);
    setPoints(newPoints);
  }

  function handleClear() {
    const newPoints: TPoint[] = [];
    const newDeletedPoints: TPoint[] = [];
    setPoints(newPoints);
    setDeletedPoints(newDeletedPoints);
  }

  return (
    <>
      <div className="title">Click Anywhere</div>
      <div className="body-container">
        <div className="button-container">
          <button className="button-style" onClick={handleUndo}>
            Undo
          </button>
          <button className="button-style" onClick={handleRedo}>
            Redo
          </button>
          <button className="button-style" onClick={handleClear}>
            Clear
          </button>
        </div>
        <div className="canvas" onClick={handlePlaceCircle}>
          {points.map((point) => (
            <div
              className="point"
              style={{
                left: point.x - 5 + "px",
                top: point.y - 5 + "px",
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
