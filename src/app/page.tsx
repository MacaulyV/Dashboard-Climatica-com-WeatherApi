"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className={styles.Fundo}>
      <nav className={styles.nav}>
        <motion.img
          src="/image/Logo.svg"
          alt=""
          className={styles.Logo}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.h1
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles.Titulo}
        >
          ClimaticFuture
        </motion.h1>
        <form className={styles.BarraPesquisa}>
          <input type="text" placeholder="Buscar cidade" />
        </form>
        <img
          src="/image/Conta.svg"
          alt=""
          className={styles.IconLogin}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </nav>
      <main className={styles.main}>
        <div className={styles.gridItem}>
          <h1></h1>
        </div>
        <div className={styles.gridItem}>
          <p>Grid Item 2</p>
        </div>
        <div className={styles.gridItem}>
          <p>Grid Item 3</p>
        </div>
      </main>
      <footer className={styles.footer}>
      <a href="" className={styles.Link}>Heading</a>
      <a href="" className={styles.Link}>Heading</a>
      <a href="" className={styles.Link}>Heading</a>
      <a href="" className={styles.Link}>Heading</a>
      <a href="" className={styles.Link}>Heading</a>
      <a href="" className={styles.Link}>Heading</a>
      <a href="" className={styles.Link}>Heading</a>
      <a href="" className={styles.Link}>Heading</a>
      </footer>
    </div>
  );
}
