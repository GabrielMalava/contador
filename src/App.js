import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [relationshipTime, setRelationshipTime] = useState({});
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);

  const startDate = new Date("June 14, 2025 23:59:00 GMT-0300");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      if (now >= startDate) {
        setIsCountdownComplete(true);

        const diffTime = Math.abs(now - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths = Math.floor(diffDays / 30);
        const remainingDays = diffDays % 30;
        const diffYears = Math.floor(diffMonths / 12);
        const remainingMonths = diffMonths % 12;

        setRelationshipTime({
          years: diffYears,
          months: remainingMonths,
          days: remainingDays,
        });
      } else {
        const diffTime = Math.abs(startDate - now);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(
          (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const diffMinutes = Math.floor(
          (diffTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        setTimeLeft({
          days: diffDays,
          hours: diffHours,
          minutes: diffMinutes,
          seconds: diffSeconds,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`App ${isCountdownComplete ? "relationship" : "waiting"}`}>
      <div className="container">
        <h1 className="title">
          {isCountdownComplete ? "💖 Estamos Juntos! 💖" : "Aguarde"}
        </h1>

        {isCountdownComplete ? (
          <div className="counter-container">
            <div className="counter-box">
              <div className="number">{relationshipTime.years}</div>
              <div className="label">ANOS</div>
            </div>
            <div className="counter-box">
              <div className="number">{relationshipTime.months}</div>
              <div className="label">MESES</div>
            </div>
            <div className="counter-box">
              <div className="number">{relationshipTime.days}</div>
              <div className="label">DIAS</div>
            </div>
            <div className="subtitle">
              💖 Estamos a{" "}
              {relationshipTime.years > 0
                ? `${relationshipTime.years} anos, `
                : ""}
              {relationshipTime.months > 0
                ? `${relationshipTime.months} meses e `
                : ""}
              {relationshipTime.days} dias juntos! 💖
            </div>
          </div>
        ) : (
          <>
            <div className="counter-container">
              <div className="counter-box">
                <div className="number">{timeLeft.days}</div>
                <div className="label">DIAS</div>
              </div>
              <div className="counter-box">
                <div className="number">{timeLeft.hours}</div>
                <div className="label">HORAS</div>
              </div>
              <div className="counter-box">
                <div className="number">{timeLeft.minutes}</div>
                <div className="label">MINUTOS</div>
              </div>
              <div className="counter-box">
                <div className="number">{timeLeft.seconds}</div>
                <div className="label">SEGUNDOS</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
