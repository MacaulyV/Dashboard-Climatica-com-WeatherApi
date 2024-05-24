import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../Nav/Nav.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

interface Suggestion {
  description: string;
}

interface NavProps {
  setCidade: (cidade: string) => void;
  setMapCoordinates: (coordinates: { lat: number; lng: number }) => void;
  userName: string | null;
}

const Nav = ({ setCidade, setMapCoordinates }: NavProps) => {
  const router = useRouter();
  const { name } = router.query;
  const [userName, setUserName] = useState<string>("");
  const [pesquisa, setPesquisa] = useState<string>("");
  const [sugestoes, setSugestoes] = useState<Suggestion[]>([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  useEffect(() => {
    if (router.isReady) {
     
      if (typeof queryName === "string") {
        setPesquisa(queryName);
      }
    }
  }, [router]);

  const handlePesquisaChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valorPesquisa = e.target.value;
    setPesquisa(valorPesquisa);

    if (valorPesquisa.length > 2) {
      try {
        const response = await fetch(
          `/places-suggestions?query=${encodeURIComponent(valorPesquisa)}`
        );
        const data = await response.json();
        setSugestoes(data);
        setMostrarSugestoes(true);
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
      }
    } else {
      setSugestoes([]);
      setMostrarSugestoes(false);
    }
  };

  const handlePesquisaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          pesquisa
        )}&appid=1b267ca5664ea689f15c46015e55af37`
      );
      const data = await response.json();

      if (data && data.timezone) {
        const localTime = new Date(
          data.dt * 1000 + data.timezone * 1000
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        console.log(
          "Hora local antes de passar para SectionPrincipal2:",
          localTime
        );
      } else {
        console.error("Dados não encontrados ou formato inesperado.");
      }

      setSugestoes([]);
      setMostrarSugestoes(false);
    } catch (error) {
      console.error("Erro ao buscar dados da cidade:", error);
    }

    try {
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
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error);
    }
  };

  const handleClickSugestao = async (suggestion: Suggestion) => {
    setPesquisa(suggestion.description);
    setCidade(suggestion.description);
    setSugestoes([]);
    setMostrarSugestoes(false);
  };

  const handleMouseDownSugestao = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    suggestion: Suggestion
  ) => {
    e.preventDefault();
    setPesquisa(suggestion.description);
    setCidade(suggestion.description);
    setSugestoes([]);
    setMostrarSugestoes(false);
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
          id="campoDeEntrada"
          type="text"
          placeholder="Buscar cidade"
          value={pesquisa}
          onChange={handlePesquisaChange}
          onFocus={() => setMostrarSugestoes(true)}
          onBlur={() => setMostrarSugestoes(false)}
        />
        {mostrarSugestoes &&
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
      <Link href="/">
        <motion.img
          src="/image/Conta.svg"
          alt="IconPerfil"
          className={styles.IconPerfil}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3 }}
          whileHover={{
            scale: 1.125,
            transition: { duration: 0.5 },
          }}
        />
      </Link>
      {name && (
            <h3 className={styles.Welcome}>
              Olá <span>{name}</span>
              <br />
              <span className={styles.Welcome2}>Seja bem-vindo</span>
            </h3>
          )}
    </nav>
  );
};

export default Nav;