import React, { useEffect, useState } from "react";
import styles from "./SectionPrincipal2.module.css";
import { motion } from "framer-motion";

interface SectionPrincipal2Props {
  temperatura_atual: string;
  nomeCidade: string;
  descricaoClima: string;
  horaLocal: string;
  umidade: string;
  velocidadeVento: string;
  precipitacao: string;
  diaDaSemana: string;
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
}) => {
  const [dataAtual, setDataAtual] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDataAtual(new Date());
    }, 60000); // Atualiza a data atual a cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={styles.Grid2}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 3 }}
    >
      <div className={styles.Clima}>
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
          </div>
          <div className={styles.Low}>
            <div className={styles.IconInformações}>
              <img
                className={styles.IconClima1}
                src="/image/Humidade.gif"
                alt="Icon"
              />
              <div className={styles.Dados}>
                <p className={styles.Valor}>{umidade}%</p>{" "}
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
                <p className={styles.Valor}>{velocidadeVento} km/h</p>{" "}
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
                <p className={styles.Valor}>{precipitacao} mm</p>{" "}
                {/* Exibindo precipitação */}
                <p className={styles.TiTuloInformação}>Precipitação</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.Music}></div>
    </motion.div>
  );
};

export default SectionPrincipal2;
