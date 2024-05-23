"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Nav from "@/Componentes/Nav/Nav";
import Footer from "@/Componentes/Footer/Footer";
import SectionPrincipal1 from "@/Componentes/Section/Grid1/SectionPrincipal1";
import SectionPrincipal2 from "@/Componentes/Section/Grid2/SectionPrincipal2";
import GoogleMaps from "@/Componentes/Section/Grid3/GoogleMaps";
import { HoraLocalContext } from "@/Componentes/Section/Grid2/HoraLocalContext";

const traduzirDescricaoClima = (descricao: string) => {
  switch (descricao.toLowerCase()) {
    case "partly cloudy":
      return "Parcialmente Nublado";
    case "mostly cloudy":
      return "Maiormente Nublado";
    case "overcast clouds":
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

type CityKey =
  | "Paris"
  | "Nova York"
  | "Tokyo"
  | "London"
  | "Moscow"
  | "Vancouver"
  | "Rio de Janeiro"
  | "Sao Paulo";

const cityBackgrounds: Record<CityKey, string> = {
  Paris: "/Gifs/paris.gif",
  "Nova York": "/Gifs/new-york.gif",
  Tokyo: "/Gifs/tokyoo.gif",
  London: "/Gifs/london.gif",
  Moscow: "/Gifs/moscow.gif",
  Vancouver: "/Gifs/vancouver.gif",
  "Rio de Janeiro": "/Gifs/rio.gif",
  "São Paulo": "/Gifs/saopaulo.gif",
};

const Page = () => {
  const [temperaturaAtual, setTemperaturaAtual] = useState<number | null>(null);
  const [cidade, setCidade] = useState("São Paulo");
  const [nomeCidade, setNomeCidade] = useState<string | null>(null);
  const [descricaoClima, setDescricaoClima] = useState<string | null>(null);
  const [horaLocalApi, setHoraLocalApi] = useState(""); // Renomeado para evitar conflito
  const [umidade, setUmidade] = useState<string>("");
  const [velocidadeVento, setVelocidadeVento] = useState<string>("");
  const [precipitacao, setPrecipitacao] = useState<string>("");
  const [dataAtual, setDataAtual] = useState<Date>(new Date());
  const [mapCoordinates, setMapCoordinates] = useState<{
    lat: number;
    lng: number;
  }>({ lat: -23.55052, lng: -46.633308 }); // Coordenadas de São Paulo

  useEffect(() => {
    console.log("Sessão carregada");
  }, []);

  useEffect(() => {
    const buscarCoordenadas = async () => {
      try {
        const response = await fetch(
          `/map-location?locationName=${encodeURIComponent(cidade)}`
        );
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

    buscarCoordenadas();
  }, [cidade]);

  // Busca dados climáticos atualizados sempre que a cidade mudar
  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=1b267ca5664ea689f15c46015e55af37`
        );
        if (!response.ok) throw new Error("Erro na busca dos dados climáticos");
        const data = await response.json();

        // Atualizando os estados locais com os dados recebidos
        setTemperaturaAtual(Math.round(data.main.temp - 273.15)); // Convertendo Kelvin para Celsius
        setNomeCidade(cidade);
        setDescricaoClima(data.weather[0].description);
        setUmidade(data.main.humidity + "%");
        setVelocidadeVento(data.wind.speed + " km/h");
        setPrecipitacao(data.rain ? data.rain["1h"] : "0 mm"); // Exemplo para chuva nos últimos 1h
        setHoraLocalApi(new Date().toLocaleString("pt-BR"));
      } catch (error) {
        console.error("Erro ao carregar dados climáticos:", error);
      }
    };

    buscarDados();
  }, [cidade]);

  const handleDiaSemanaClick = (day: string) => {
    setCidade(day);
  };

  return (
    <div className={styles.Fundo}>
      <Nav
        setCidade={(cidade) => {
          setCidade(cidade);
        }}
        setMapCoordinates={setMapCoordinates}
      />
      <div className={styles.Section}>
        <SectionPrincipal1 clima={null} />
        {temperaturaAtual !== null && (
          <SectionPrincipal2
            backgroundUrl={
              cityBackgrounds[nomeCidade as keyof typeof cityBackgrounds] ||
              "/gifs/default.gif"
            }
            temperatura_atual={temperaturaAtual.toString()}
            nomeCidade={nomeCidade || ""}
            descricaoClima={traduzirDescricaoClima(descricaoClima || "")}
            horaLocal={horaLocalApi} 
            umidade={umidade}
            velocidadeVento={velocidadeVento}
            precipitacao={precipitacao}
            diaDaSemana={dataAtual.toLocaleDateString("pt-BR", {
              weekday: "long",
            })}
          />
        )}
        <div className={styles.container}>
          {mapCoordinates && <GoogleMaps center={mapCoordinates} />}
        </div>
      </div>
      <Footer onDiaSemanaClick={handleDiaSemanaClick} />
    </div>
  );
};

export default Page;
