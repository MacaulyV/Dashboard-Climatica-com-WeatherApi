import React from "react";
import styles from "./Footer.module.css";

interface FooterProps {
  onDiaSemanaClick: (day: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onDiaSemanaClick }) => {
  const cities = [
    "Paris",
    "Nova York",
    "Tokyo",
    "London",
    "Moscow",
    "Vancouver",
    "Rio de Janeiro",
  ];

  const handleDiaSemanaClick = (day: string) => {
    console.log("Dia da semana clicado:", day);
    onDiaSemanaClick(day);
  };

  const handleDiaSemanaSelect = (day: string) => {
    console.log("Dia da semana selecionado:", day);
    // Lógica para atualizar os dados com base no dia da semana selecionado
  };

  return (
    <footer className={styles.footer}>
      {cities.map((city) => (
        <a
          key={city}
          href="#"
          className={styles.Link}
          onClick={() => handleDiaSemanaClick(city)}
        >
          {city}
        </a>
      ))}
    </footer>
  );
};

export default Footer;
