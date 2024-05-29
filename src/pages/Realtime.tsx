import { useEffect, useState } from "react";
import "../App.css";

export function Realtime() {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const timestamp = new Date().getTime(); // キャッシュバスター用のタイムスタンプ
        const response = await fetch(
          `http://localhost:8000/api/floor_map/get?cb=${timestamp}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "image/png",
            },
          }
        );
        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        setImageSrc(imageObjectURL);
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };

    fetchImage();

    const intervalId = setInterval(fetchImage, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      <h1>パーティクルフィルタ結果</h1>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Fetched from FastAPI"
          className="responsive-image"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Realtime;
