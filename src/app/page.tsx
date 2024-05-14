"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Nav from "@/Componentes/Nav/Nav";
import Footer from "@/Componentes/Footer/Footer";
import SectionPrincipal1 from "@/Componentes/Section/Grid1/SectionPrincipal1";
import SectionPrincipal2 from "@/Componentes/Section/Grid2/SectionPrincipal2";
import SectionPrincipal2Baixo from "@/Componentes/Section/Grid2/SectionPrincipal2Baixo";
import SectionPrincipal3 from "@/Componentes/Section/Grid3/SectionPrincipal3";

const traduzirDescricaoClima = (descricao: string) => {
  switch (descricao.toLowerCase()) {
    case "partly cloudy":
      return "Parcialmente Nublado";
    case "mostly cloudy":
      return "Maiormente Nublado";
    case "overcast":
    case "cloudy":
      return "Nublado";
    case "rain":
      return "Chuva";
    case "showers":
      return "Chuvas";
    case "light rain":
      return "Chuva Fraca";
    case "heavy rain":
      return "Chuva Forte";
    case "thunderstorm":
      return "Tempestade";
    case "drizzle":
      return "Garoa";
    case "snow":
      return "Neve";
    case "sleet":
      return "Neve e Chuva";
    case "hail":
      return "Granizo";
    case "mist":
    case "fog":
      return "Nevoeiro";
    case "smoke":
      return "Fumaça";
    case "haze":
      return "Neblina";
    case "dust":
      return "Poeira";
    case "sand":
      return "Areia";
    case "ash":
      return "Cinzas";
    case "squall":
      return "Rajada de Vento";
    case "tornado":
      return "Tornado";
    case "clear sky":
      return "Céu Limpo";
    case "partially clear":
      return "Parcialmente Limpo";
    case "mostly clear":
      return "Maiormente Limpo";
    case "sunny":
      return "Ensolarado";
    case "hot":
      return "Quente";
    case "cold":
      return "Frio";
    default:
      return descricao; // Retorna a descrição original se não houver correspondência
  }
};

const Page = () => {
  const [temperaturaAtual, setTemperaturaAtual] = useState<number | null>(null);
  const [cidade, setCidade] = useState("São Paulo");
  const [nomeCidade, setNomeCidade] = useState<string | null>(null);
  const [descricaoClima, setDescricaoClima] = useState<string | null>(null);
  const [horaLocal, setHoraLocal] = useState<string>("");
  const [umidade, setUmidade] = useState<string>("");
  const [velocidadeVento, setVelocidadeVento] = useState<string>("");
  const [precipitacao, setPrecipitacao] = useState<string>("");
  const [dataAtual, setDataAtual] = useState<Date>(new Date());
  const [cidadeInput, setCidadeInput] = useState("");
  const [temperaturaMax, setTemperaturaMax] = useState("");
  const [temperaturaMin, setTemperaturaMin] = useState("");

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/clima?cidade=${cidade}`
        );
        if (response.ok) {
          const data = await response.json();
          const temperaturaCelsius = Math.round(
            data.temperatura_atual - 273.15
          );
          setTemperaturaAtual(temperaturaCelsius);
          setNomeCidade(cidade);
          setDescricaoClima(data.descricao_clima);
          setTemperaturaMax(data.temperatura_max); // Atualizado
          setTemperaturaMin(data.temperatura_min); // Atualizado
          // Obtém a hora local atual
          const dataHoraLocal = new Date().toLocaleString("pt-BR", {
            timeZone: data.timezone,
          });
          setHoraLocal(dataHoraLocal);
          // Define os novos estados para umidade, velocidade do vento e precipitação
          setUmidade(data.umidade);
          setVelocidadeVento(data.velocidade_vento);
          setPrecipitacao(data.precipitacao);
        } else {
          setTemperaturaAtual(null);
          setNomeCidade(null);
          setDescricaoClima(null);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setTemperaturaAtual(null);
        setNomeCidade(null);
        setDescricaoClima(null);
      }
    };

    buscarDados();
  }, [cidade]);

  useEffect(() => {
    // Atualiza o nome da cidade ao carregar a página pela primeira vez
    setNomeCidade(cidade);
  }, []);

  const handleDiaSemanaClick = (day: string) => {
    // Sua lógica aqui
  };

  return (
    <div className={styles.Fundo}>
      <Nav
        setCidade={(cidade) => {
          setCidade(cidade);
        }}
      />
      <div className={styles.Section}>
        <SectionPrincipal1 clima={null} />
        {temperaturaAtual !== null && (
          <SectionPrincipal2
            temperatura_atual={temperaturaAtual.toString()}
            nomeCidade={nomeCidade || ""}
            descricaoClima={traduzirDescricaoClima(descricaoClima || "")}
            horaLocal={horaLocal}
            umidade={umidade}
            velocidadeVento={velocidadeVento}
            precipitacao={precipitacao}
            diaDaSemana={dataAtual.toLocaleDateString("pt-BR", {
              weekday: "long",
            })}
          />
        )}
        <SectionPrincipal2Baixo
          temperaturaMax={temperaturaMax}
          temperaturaMin={temperaturaMin}
          descricaoClima={descricaoClima}
        />
        <SectionPrincipal3 clima={null} />
      </div>
      <Footer onDiaSemanaClick={handleDiaSemanaClick} />
    </div>
  );
};

export default Page;
