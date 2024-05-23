import React, { useEffect, useState } from "react";
import styles from "./SectionPrincipal2.module.css";
import { motion } from "framer-motion";
import moment from "moment";

interface SectionPrincipal2Props {
  temperatura_atual: string;
  nomeCidade: string;
  descricaoClima: string;
  horaLocal: string;
  umidade: string;
  velocidadeVento: string;
  precipitacao: string;
  diaDaSemana: string;
  backgroundUrl: string;
}

const SectionPrincipal2: React.FC<SectionPrincipal2Props> = ({
  temperatura_atual,
  nomeCidade,
  descricaoClima,
  horaLocal,
  umidade,
  velocidadeVento,
  precipitacao,
  diaDaSemana,
  backgroundUrl,
}) => {
  const [dataAtual, setDataAtual] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      // Atualiza a data atual a cada minuto
      setDataAtual(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatHourWithSeconds = (timeString: string) => {
    const time = moment(timeString, "HH:mm:ss");
    return time.format("HH:mm:ss");
  };

  return (
    <motion.div
      className={styles.Grid2}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 3 }}
    >
      <div
        className={styles.Clima}
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={styles.Top}>
          <h2 className={styles.NomeCidade}>{nomeCidade}</h2>
          <div className={styles.descriçãoClimaGif}>
            <h3 className={styles.SituaçãoClima}>{descricaoClima}</h3>{" "}
            <img
              className={styles.IconClimaPai}
              src="/image/Chuva.gif"
              alt="Icon"
            />
          </div>
          <div className={styles.GrauDiaSemana}>
            <h1 className={styles.Graus}>{temperatura_atual}°C</h1>
            <p className={styles.DiaSemana}>{diaDaSemana}</p>
            <p className={styles.Hora}>{formatHourWithSeconds(horaLocal)}</p>
          </div>
          <div className={styles.Low}>
            <div className={styles.IconInformações}>
              <img
                className={styles.IconClima1}
                src="/image/Humidade.gif"
                alt="Icon"
              />
              <div className={styles.Dados}>
                <p className={styles.Valor}>{umidade}</p>{" "}
                {/* Exibindo umidade */}
                <p className={styles.TiTuloInformação}>Umidade</p>
              </div>
            </div>
            <div className={styles.IconInformações}>
              <img
                className={styles.IconClima2}
                src="/image/Vento.gif"
                alt="Icon"
              />
              <div className={styles.Dados}>
                <p className={styles.Valor}>{velocidadeVento}</p>{" "}
                {/* Exibindo velocidade do vento */}
                <p className={styles.TiTuloInformação}>Vento</p>
              </div>
            </div>
            <div className={styles.IconInformações}>
              <img
                className={styles.IconClima3}
                src="/image/Agua.gif"
                alt="Icon"
              />
              <div className={styles.Dados}>
                <p className={styles.Valor}>{precipitacao}</p>{" "}
                {/* Exibindo precipitação */}
                <p className={styles.TiTuloInformação}>Precipitação</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SectionPrincipal2;
