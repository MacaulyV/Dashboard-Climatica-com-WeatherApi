import React, { useState } from "react";
import styles from "./SectionPrincipal2Baixo.module.css";
import { motion } from "framer-motion";

interface SectionPrincipal2BaixoProps {
  forecast: { date: string; max_temp: number; min_temp: number; description: string }[];
 }

interface SectionPrincipal2BaixoProps {
  temperaturaMax: string;
  temperaturaMin: string;
  descricaoClima: string;
}

const SectionPrincipal2Baixo: React.FC<SectionPrincipal2BaixoProps> = ({
  forecast,
  temperaturaMax,
  temperaturaMin,
  descricaoClima,
}) => {
  return (
    <div className={styles.Principal}>
      <div className={styles.GridDiasSemanasTop}>
        <div className={styles.Quarta}>
          <div className={styles.DiaIcon}>
            <h3 className={styles.NomeSemana}>Quarta-feira</h3>
            <img className={styles.IconSemana} src="/image/Agua.gif" alt="" />
            <p className={styles.DescriçãoClima2}>{descricaoClima}</p>
          </div>
          <div className={styles.Temperatura}>
            <h2 className={styles.GrauMax}>{temperaturaMax}C</h2>
            <h2 className={styles.GrauMin}>{temperaturaMin}C</h2>
          </div>
        </div>
        {/* Repita o processo para os outros dias da semana */}
        <div className={styles.Quinta}>
          <div className={styles.DiaIcon}>
            <h3 className={styles.NomeSemana}>Quinta-feira</h3>
            <img className={styles.IconSemana} src="/image/Agua.gif" alt="" />
            <p className={styles.DescriçãoClima2}>{descricaoClima}</p>
          </div>
          <div className={styles.Temperatura}>
            <h2 className={styles.GrauMax}>{temperaturaMax}C</h2>
            <h2 className={styles.GrauMin}>{temperaturaMin}C</h2>
          </div>
        </div>
        <div className={styles.Sexta}>
          <div className={styles.DiaIcon}>
            <h3 className={styles.NomeSemanaS}>Sexta-feira</h3>
            <img className={styles.IconSemana} src="/image/Agua.gif" alt="" />
            <p className={styles.DescriçãoClima2}>{descricaoClima}</p>
          </div>
          <div className={styles.Temperatura}>
            <h2 className={styles.GrauMax}>{temperaturaMax}C</h2>
            <h2 className={styles.GrauMin}>{temperaturaMin}C</h2>
          </div>
        </div>
        <div className={styles.GridDiasSemanasLow}>
          <div className={styles.Sabado}>
            <div className={styles.DiaIcon}>
              <h3 className={styles.NomeSemana}>Sábado</h3>
              <img className={styles.IconSemana} src="/image/Agua.gif" alt="" />
              <p className={styles.DescriçãoClima2}>{descricaoClima}</p>
            </div>
            <div className={styles.Temperatura}>
              <h2 className={styles.GrauMax}>{temperaturaMax}C</h2>
              <h2 className={styles.GrauMin}>{temperaturaMin}C</h2>
            </div>
          </div>
          <div className={styles.Domingo}>
            <div className={styles.DiaIcon}>
              <h3 className={styles.NomeSemana}>Domingo</h3>
              <img className={styles.IconSemana} src="/image/Agua.gif" alt="" />
              <p className={styles.DescriçãoClima2}>{descricaoClima}</p>
            </div>
            <div className={styles.Temperatura}>
              <h2 className={styles.GrauMax}>{temperaturaMax}C</h2>
              <h2 className={styles.GrauMin}>{temperaturaMin}C</h2>
            </div>
          </div>
          <div className={styles.Segunda}>
            <div className={styles.DiaIcon}>
              <h3 className={styles.NomeSemana}>Segunda-feira</h3>
              <img className={styles.IconSemana} src="/image/Agua.gif" alt="" />
              <p className={styles.DescriçãoClima2}>{descricaoClima}</p>
            </div>
            <div className={styles.Temperatura}>
              <h2 className={styles.GrauMax}>{temperaturaMax}C</h2>
              <h2 className={styles.GrauMin}>{temperaturaMin}C</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionPrincipal2Baixo;
