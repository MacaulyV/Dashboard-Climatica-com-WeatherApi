import React, { useState } from "react";
import styles from "../Nav/Nav.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useHoraLocal } from "@/Componentes/Section/Grid2/HoraLocalContext"; // Ajuste o caminho conforme necessário

interface Suggestion {
  description: string;
  // Add other properties as needed
}

interface NavProps {
  setCidade: (cidade: string) => void;
  setMapCoordinates: (coordinates: { lat: number; lng: number }) => void;
}

const Nav = ({ setCidade, setMapCoordinates }: NavProps) => {
  const { setHoraLocal } = useHoraLocal();
  const [pesquisa, setPesquisa] = useState("");
  const [sugestoes, setSugestoes] = useState<Suggestion[]>([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false); // Estado para controlar a visibilidade das sugestões

  const handlePesquisaChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPesquisa(e.target.value);
    if (e.target.value.length > 2) {
      const response = await fetch(
        `/places-suggestions?query=${encodeURIComponent(e.target.value)}`
      );
      const data = await response.json();
      setSugestoes(data);
      setMostrarSugestoes(true); // Mostra sugestões ao interagir com a barra de pesquisa
    } else {
      setSugestoes([]);
    }
  };

  const handlePesquisaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCidade(pesquisa);
  
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(pesquisa)}&appid=1b267ca5664ea689f15c46015e55af37`);
      const data = await response.json();
  
      if (data && data.timezone) {
        const localTime = new Date(data.dt * 1000 + data.timezone * 1000).toLocaleTimeString();
        setHoraLocal(localTime); // Atualiza a hora local no contexto
  
        // Log de depuração para verificar o valor da hora local
        console.log("Hora local antes de passar para SectionPrincipal2:", localTime);
      } else {
        console.error('Dados não encontrados ou formato inesperado.');
      }
  
      setSugestoes([]); // Limpa sugestões após submeter
      setMostrarSugestoes(false); // Oculta sugestões após submeter
    } catch (error) {
      console.error('Erro ao buscar dados da cidade:', error);
    }
  
    // Ajuste a chamada à API para usar o método POST
    const response = await fetch("/map-location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationName: pesquisa,
      }),
    });
    const data = await response.json();
    if (data.latitude && data.longitude) {
      setMapCoordinates({ lat: data.latitude, lng: data.longitude });
    } else {
      console.error(
        "Não foi possível encontrar as coordenadas para a localização especificada."
      );
    }
  };

  const handleClickSugestao = async (suggestion: Suggestion) => {
    setPesquisa(suggestion.description);
    setCidade(suggestion.description);
    setSugestoes([]);
    setMostrarSugestoes(false); // Oculta sugestões após selecionar
  };

  const handleMouseDownSugestao = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    suggestion: Suggestion
  ) => {
    e.preventDefault(); // Impede que o clique propague para o input e feche as sugestões

    // Atualiza o valor do input com a sugestão clicada
    setPesquisa(suggestion.description);
    setCidade(suggestion.description);
    setSugestoes([]); // Limpa sugestões após selecionar
    setMostrarSugestoes(false); // Oculta sugestões após selecionar
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
          id="campoDeEntrada" // Adicione um ID ao campo de entrada
          type="text"
          placeholder="Buscar cidade"
          value={pesquisa}
          onChange={handlePesquisaChange}
          onFocus={() => setMostrarSugestoes(true)}
          onBlur={() => setMostrarSugestoes(false)}
        />
        {/* Renderização das Sugestões */}
        {mostrarSugestoes &&
          Array.isArray(sugestoes) &&
          sugestoes.map((suggestion, index) => (
            <button
              key={index}
              onMouseDown={(e) => handleMouseDownSugestao(e, suggestion)}
              className={styles.sugestao}
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size="lg"
                style={{ marginRight: "10px", color: "#007bff" }}
              />
              {suggestion.description}
            </button>
          ))}
      </form>
      <Link href="/Login">
        <motion.img
          src="/image/Conta.svg"
          alt="IconPerfil"
          className={styles.IconPerfil}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3 }}
          whileHover={{
            scale: 1.125,
            transition: { duration: 0.5 }, // Ajuste o valor da duração conforme necessário
          }}
        />
      </Link>
    </nav>
  );
};

export default Nav;
