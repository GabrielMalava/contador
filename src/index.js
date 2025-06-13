import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const ContadorNamoro = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isNamorando, setIsNamorando] = useState(false);
  const [tempoNamorando, setTempoNamorando] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const targetDate = new Date("2025-06-14T23:59:00-03:00");
      const now = new Date();

      const brasiliaTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
      );

      const difference = targetDate - brasiliaTime;

      if (difference > 0) {
        setIsNamorando(false);
        setIsDarkMode(true);

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      } else {
        setIsNamorando(true);
        setIsDarkMode(false);

        const startDate = new Date("2025-06-14T23:59:00-03:00");

        let anos = brasiliaTime.getFullYear() - startDate.getFullYear();
        let meses = brasiliaTime.getMonth() - startDate.getMonth();
        let dias = brasiliaTime.getDate() - startDate.getDate();

        if (dias < 0) {
          meses--;
          const ultimoDiaMesAnterior = new Date(
            brasiliaTime.getFullYear(),
            brasiliaTime.getMonth(),
            0
          ).getDate();
          dias += ultimoDiaMesAnterior;
        }

        if (meses < 0) {
          anos--;
          meses += 12;
        }

        setTempoNamorando({ anos, meses, dias });

        const totalDifference = brasiliaTime - startDate;
        const remainingTime = totalDifference % (1000 * 60 * 60 * 24);

        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        setTimeLeft({
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`countdown-container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="countdown-content">
        {!isNamorando ? (
          <>
            <div className="countdown-header">
              <h1 className="countdown-title">Aguarde</h1>
            </div>
            <div className="countdown-card">
              <div className="countdown-grid">
                <div className="countdown-item">
                  <div className="countdown-number">{timeLeft.days || 0}</div>
                  <div className="countdown-label">DIAS</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-number">{timeLeft.hours || 0}</div>
                  <div className="countdown-label">HORAS</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-number">
                    {timeLeft.minutes || 0}
                  </div>
                  <div className="countdown-label">MINUTOS</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-number">
                    {timeLeft.seconds || 0}
                  </div>
                  <div className="countdown-label">SEGUNDOS</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="namoro-header">
              <h1 className="namoro-title">
                💖 Estamos a{" "}
                {tempoNamorando.anos > 0
                  ? `${tempoNamorando.anos} ${
                      tempoNamorando.anos === 1 ? "ano" : "anos"
                    }, `
                  : ""}
                {tempoNamorando.meses > 0
                  ? `${tempoNamorando.meses} ${
                      tempoNamorando.meses === 1 ? "mês" : "meses"
                    } e `
                  : ""}
                {tempoNamorando.dias}{" "}
                {tempoNamorando.dias === 1 ? "dia" : "dias"} juntos! 💖
              </h1>
              <p className="namoro-subtitle">Nossa linda história de amor...</p>
            </div>
            <div className="namoro-card">
              <div className="tempo-principal">
                <div className="tempo-grid">
                  <div className="tempo-item">
                    <div className="tempo-number">{tempoNamorando.anos}</div>
                    <div className="tempo-label">
                      {tempoNamorando.anos === 1 ? "ANO" : "ANOS"}
                    </div>
                  </div>
                  <div className="tempo-item">
                    <div className="tempo-number">{tempoNamorando.meses}</div>
                    <div className="tempo-label">
                      {tempoNamorando.meses === 1 ? "MÊS" : "MESES"}
                    </div>
                  </div>
                  <div className="tempo-item">
                    <div className="tempo-number">{tempoNamorando.dias}</div>
                    <div className="tempo-label">
                      {tempoNamorando.dias === 1 ? "DIA" : "DIAS"}
                    </div>
                  </div>
                </div>
                <div className="tempo-title">💕 Tempo Juntos 💕</div>
              </div>

              <div className="tempo-adicional">
                <div className="tempo-adicional-title">
                  + Tempo adicional de hoje:
                </div>
                <div className="tempo-adicional-grid">
                  <div className="tempo-adicional-item">
                    <div className="tempo-adicional-number">
                      {timeLeft.hours || 0}
                    </div>
                    <div className="tempo-adicional-label">HORAS</div>
                  </div>
                  <div className="tempo-adicional-item">
                    <div className="tempo-adicional-number">
                      {timeLeft.minutes || 0}
                    </div>
                    <div className="tempo-adicional-label">MINUTOS</div>
                  </div>
                  <div className="tempo-adicional-item">
                    <div className="tempo-adicional-number">
                      {timeLeft.seconds || 0}
                    </div>
                    <div className="tempo-adicional-label">SEGUNDOS</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="namoro-footer">
              <p>❤️ Cada segundo ao seu lado é especial ❤️</p>
              <p className="namoro-date">
                Tempo total juntos desde 14 de Junho, 2025 - 23:59
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<ContadorNamoro />);
