// TelaInicial.tsx

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./page.module.css";

const TelaInicial = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Adicione validações aqui, se necessário

    // Navega para a Dashboard com os parâmetros de nome e cidade
    window.location.href = `/Dashboard?name=${encodeURIComponent(
      userName
    )}&city=${encodeURIComponent(cityName)}`;
  };

  return (
    <main className={styles.TelaInicial}>
      <motion.div
        className={styles.main}
        initial={{ scale: 0.2, opacity: 0 }} // Começa menor e invisível
        animate={{ scale: 1, opacity: 1 }} // Cresce para o tamanho total e fica visível
        transition={{ duration: 3, ease: "easeOut" }} // Ajusta a duração e a suavidade
      >
        <video
          className={styles.Capa}
          src="/video/Costelacao.webm"
          autoPlay
          loop
          muted
        ></video>
      </motion.div>
      <motion.img
        src="/image/Logo.svg"
        alt=""
        className={styles.Logo}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <form className={styles.Form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>
          Seja bem-vindo à <br /> <span className={styles.title2}>Climate Future</span>
        </h2>
        <div className={styles.Restante}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              required
              className={styles.input}
              value={userName}
              onChange={handleNameChange}
              id="userName"
            />
            <label htmlFor="userName">Digite Seu nome:</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              required
              className={styles.input}
              value={cityName}
              onChange={handleCityChange}
              id="cityName"
            />
            <label htmlFor="cityName">Digite uma cidade:</label>
          </div>
          <div className={styles.remember}>
            <label className={styles.label}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span className={styles.checkbox}></span>
              <span className={styles.label}>Receber notificações?</span>
            </label>
          </div>
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </div>
      </form>
    </main>
  );
};

export default TelaInicial;
