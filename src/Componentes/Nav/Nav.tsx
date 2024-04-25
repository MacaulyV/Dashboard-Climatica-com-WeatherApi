// src/componentes/nav/Nav.tsx
import React from 'react';
import styles from '../Nav/Nav.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Nav = () => {
 return (
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
      <Link href="/Login">
        <div>
          <img
            src="/image/Conta.svg"
            alt=""
            className={styles.IconLogin}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </Link>
    </nav>
 );
};

export default Nav;