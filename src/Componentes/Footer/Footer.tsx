import React from 'react';
import styles from './Footer.module.css';

interface FooterProps {
 onDiaSemanaClick: (day: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onDiaSemanaClick }) => {
 const diasDaSemana = [
    "Paris", "Nova Iorque", "Tóquio", "Londres", "Moscou", "vancouver", "Rio de Janeiro"
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
      {diasDaSemana.map((dia) => (
        <a key={dia} href="#" className={styles.Link} onClick={() => handleDiaSemanaClick(dia)}>
          {dia}
        </a>
      ))}
    </footer>
 );
};

export default Footer;