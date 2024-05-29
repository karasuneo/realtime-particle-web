import { useState } from "react";
import "../App.css";
import { CORRECT_TRAJECTORY } from "../demo/trajectory";
import { WalkingParameter } from "../types/walkingParameter";

function App() {
  const [currentWalkingParameter, setCurrentWalkingParameter] =
    useState<WalkingParameter>(CORRECT_TRAJECTORY[0]);

  const onClickStartButton = () => {
    CORRECT_TRAJECTORY.forEach((position, index) => {
      setTimeout(() => {
        setCurrentWalkingParameter(position);
        fetch("http://localhost:8000/api/walk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(position),
        });
      }, 1000 * index);
    });
  };

  return (
    <>
      <h1>歩幅と角度の変化量（デモデータ）をPFするサーバに送る蔵</h1>
      <div className="card">
        <button onClick={onClickStartButton}>正解軌跡を送り始める</button>
        <p>歩幅: {currentWalkingParameter.stride}</p>
        <p>角度の変化量: {currentWalkingParameter.angleVariation}</p>
      </div>
    </>
  );
}

export default App;
