import React from "react";
import { motion } from "framer-motion";
import styles from "./DiaSemana.module.css";

interface Forecast {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
}

interface DiadaSemanaProps {
  forecasts: Forecast[];
}

const DiadaSemana: React.FC<DiadaSemanaProps> = ({ forecasts }) => {
  // Filtrar os próximos 5 resultados
  const proximasHoras = forecasts.slice(0, 4);

  return (
    <motion.div
      className={styles.main}
      initial={{ x: "-100vw", opacity: 0 }} // Começa fora da tela à esquerda
      animate={{ x: 0, opacity: 1 }} // Anima para a posição inicial e opacidade completa
      transition={{ type: "spring", duration: 5, bounce: 0.25 }} 
    >
      <h1 className={styles.Titulo}>PREVISÃO HORARÍA:</h1>
      <div className={styles.diadaSemana}>
        {proximasHoras.map((forecast, index) => (
          <div key={index} className={styles.dia}>
            <div className={styles.diaInfo}>
              <div className={styles.hora}>
                <span>
                  {new Date(forecast.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className={styles.IconTemp}>
                <div className={styles.diaInfoRight}>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt={forecast.weather[0].main}
                    className={styles.weatherIcon}
                  />
                </div>
                <div className={styles.diaInfoLeft}>
                  <span className={styles.temperatura}>
                    {Math.round(forecast.main.temp - 273.15)}°C
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DiadaSemana;
