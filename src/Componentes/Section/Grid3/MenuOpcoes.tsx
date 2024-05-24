import React from "react";
import Link from "next/link";
import styles from "./MenuOpcoes.module.css";
import { motion } from "framer-motion";

const MenuOpcoes = ({
  handleTemperatureConversion,
}: {
  handleTemperatureConversion: () => void;
}) => {
  return (
    <section>
      <motion.div
        className={styles.main}
        initial={{ x: "100vw", opacity: 0 }} // Começa fora da tela à esquerda
        animate={{ x: 0, opacity: 1 }} // Anima para a posição inicial e opacidade completa
        transition={{ type: "spring", duration: 5, bounce: 0.25 }}
      >
        <div className={styles.SubDiv1}>
          <img className={styles.Icon} src="/image/IconF.svg" alt="Icon" />
          <h4 className={styles.Title}>Fahrenheit</h4>
          <div className={styles.TextButton}>
            <p className={styles.OnOff}>ON</p>
            <img
              className={styles.Button}
              src="/image/FButton.gif"
              alt="Icon"
              onClick={handleTemperatureConversion}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MenuOpcoes;
