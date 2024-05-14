import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "./SectionPrincipal1.module.css";

interface SectionPrincipal1Props {
  clima: any;
}

interface ClimaData {
  temperatura_atual: number;
  umidade: number;
  velocidade_vento: number;
  sensacao_termica: number;
}

const SectionPrincipal1: React.FC<SectionPrincipal1Props> = ({ clima }) => {
  const [localClima, setLocalClima] = useState<ClimaData | null>({
    temperatura_atual: 0,
    umidade: 0,
    velocidade_vento: 0,
    sensacao_termica: 0,
  });
  const [ativo, setAtivo] = useState(false);
  const [apiChamada, setApiChamada] = useState(false);
  const [coordenadas, setCoordenadas] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((posicao) => {
        setCoordenadas({
          lat: posicao.coords.latitude,
          lon: posicao.coords.longitude,
        });
      });
    } else {
      alert("Geolocalização não é suportada por este navegador.");
    }
  }, []);

  const obterClimaLocal = () => {
    const { lat, lon } = coordenadas;
    axios
      .get(`http://127.0.0.1:5000/geolocalizacao?lat=${lat}&lon=${lon}`)
      .then((response) => {
        setLocalClima(response.data);
        setApiChamada(true);
      })
      .catch((error) => {
        console.error("Erro ao obter dados de clima:", error);
        setApiChamada(false);
      });
  };

  const resetarClima = () => {
    setLocalClima({
      temperatura_atual: 0,
      umidade: 0,
      velocidade_vento: 0,
      sensacao_termica: 0,
    });
    setApiChamada(false);
  };

  const handleClick = () => {
    if (!apiChamada) {
      obterClimaLocal();
    } else {
      resetarClima();
    }
    setAtivo(!ativo);
  };

  return (
    <section className={styles.ContainerPrincipal}>
      <motion.div
        className={styles.Grid1}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <div className={styles.Top1}>
          <div className={styles.Top1ConteudoCima}>
            <img
              className={styles.LocationSvg}
              src="/image/Location.svg"
              alt="Ícone"
              onClick={handleClick}
            />
            <h2 className={styles.Subtitulo}>Habilitar Localização</h2>
            <motion.img
              className={`${styles.ButtonSvg} ${ativo ? styles.ativo : ""}`}
              src={ativo ? "/image/ButtonEscuro.svg" : "/image/ButtonClaro.svg"}
              alt="Ícone"
              onClick={handleClick}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 1.0 }}
            />
          </div>
          <div className={styles.Top1ConteudoBaixo}>
            <img
              className={styles.thermostat}
              src="/image/thermostat.png"
              alt="Ícone"
            />
            <h4 className={styles.Temp}>Temperatura</h4>
            <div>
              <h3 className={styles.Graus}>
                {localClima?.temperatura_atual
                  ? `${Math.round(localClima.temperatura_atual - 273.15)}°C`
                  : "0°C"}
              </h3>
            </div>
          </div>
          <div className={styles.Low1}>
            <div className={styles.MiniBox}>
              <img
                className={styles.IconVento}
                src="/image/IconWind.gif"
                alt="Ícone"
                onClick={handleClick}
              />
              <p className={styles.SubParagrafo}>Vento</p>
              <p className={styles.Valor}>{localClima.velocidade_vento} km/h</p>
            </div>
            <div className={styles.MiniBox}>
              <img
                className={styles.Icon}
                src="/image/IconWater.gif"
                alt="Ícone"
                onClick={handleClick}
              />
              <p className={styles.SubParagrafo}>Umidade do ar</p>
              <p className={styles.Valor}>{localClima.umidade}%</p>
            </div>
            <div className={styles.MiniBox}>
              <img
                className={styles.Icon}
                src="/image/IconTheme.gif"
                alt="Ícone"
                onClick={handleClick}
              />
              <p className={styles.SubParagrafo}>Sensação termica</p>
              <p className={styles.Valor}>
                {localClima.sensacao_termica
                  ? `${Math.round(localClima.sensacao_termica - 273.15)}°C`
                  : "0°C"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SectionPrincipal1;
