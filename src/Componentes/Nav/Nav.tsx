// Nav.tsx
import React, { useState } from "react";
import styles from "../Nav/Nav.module.css"; // Ajuste o caminho do arquivo de acordo com a sua estrutura de arquivos
import { motion } from "framer-motion";
import Link from "next/link";

interface NavProps {
  setCidade: (cidade: string) => void; // Adicione esta prop
}

const Nav = ({ setCidade }: NavProps) => {
  const [pesquisa, setPesquisa] = useState(""); // Novo estado para o valor do campo de pesquisa

  const handlePesquisaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisa(e.target.value);
  };

  const handlePesquisaSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCidade(pesquisa); // Atualiza a cidade com o valor atual do campo de pesquisa
  };

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
      <form className={styles.BarraPesquisa} onSubmit={handlePesquisaSubmit}>
        <input
          type="text"
          placeholder="Buscar cidade"
          value={pesquisa}
          onChange={handlePesquisaChange}
        />
      </form>
      <Link href="/Login">
        <div>
          <motion.img
            src="/image/Conta.svg"
            alt="Icon do Perfil"
            className={styles.IconLogin}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.2 }} // Aumenta a escala da imagem em 20% quando o mouse passa sobre ela
            transition={{ duration: 0.5 }}
          />
        </div>
      </Link>
    </nav>
  );
};

export default Nav;
