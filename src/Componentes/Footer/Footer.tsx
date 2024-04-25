// src/componentes/footer/Footer.tsx
import React from 'react';
import styles from '../Footer/Footer.module.css';

const Footer = () => {
 return (
    <footer className={styles.footer}>
      <a href="" className={styles.Link}>Domingo</a>
      <a href="" className={styles.Link}>Segunda-feira</a>
      <a href="" className={styles.Link}>Terça-feira</a>
      <a href="" className={styles.Link}>Quarta-feira</a>
      <a href="" className={styles.Link}>Quinta-feira</a>
      <a href="" className={styles.Link}>Sexta-feira</a>
      <a href="" className={styles.Link}>Sábado</a>
    </footer>
 );
};

export default Footer;