"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Nav from "@/Componentes/Nav/Nav";
import Footer from "@/Componentes/Footer/Footer";
import SectionPrincipal1 from "@/Componentes/Section/Grid1/SectionPrincipal1";
import SectionPrincipal2 from "@/Componentes/Section/Grid2/SectionPrincipal2";
import GoogleMaps from "@/Componentes/Section/Grid3/GoogleMaps";
import MenuOpcoes from "@/Componentes/Section/Grid3/MenuOpcoes";
import DiadaSemana from "@/Componentes/Section/Grid2/DiasSemanas/DiadaSemana";

const traduzirDescricaoClima = (descricao: string) => {
  switch (descricao.toLowerCase()) {
    case "partly cloudy":
      return "Parcialmente Nublado";
       case "scattered clouds":
      return "nuvens dispersas";
      case "broken clouds":
        return "nuvens quebradas";
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
  | "São Paulo"
  | "Alaska";

const cityBackgrounds: Record<CityKey, string> = {
  Paris: "/Gifs/paris.gif",
  "Nova York": "/Gifs/new-york.gif",
  Tokyo: "/Gifs/tokyoo.gif",
  London: "/Gifs/london.gif",
  Moscow: "/Gifs/moscow.gif",
  Vancouver: "/Gifs/vancouver.gif",
  "Rio de Janeiro": "/Gifs/rio.gif",
  "São Paulo": "/Gifs/saopaulo.gif",
  Alaska: "/Gifs/Alaska.gif",
};


const Dashboard = () => {
  const router = useRouter();
  const { name, city } = router.query;
  const [temperaturaAtual, setTemperaturaAtual] = useState<number | null>(null);
  const [cidade, setCidade] = useState("São Paulo");
  const [nomeCidade, setNomeCidade] = useState<string | null>(null);
  const [descricaoClima, setDescricaoClima] = useState<string | null>(null);
  const [horaLocalApi, setHoraLocalApi] = useState(""); // Renomeado para evitar conflito
  const [umidade, setUmidade] = useState<string>("");
  const [velocidadeVento, setVelocidadeVento] = useState<string>("");
  const [precipitacao, setPrecipitacao] = useState<string>("");
  const [dataAtual, setDataAtual] = useState<Date>(new Date());
  const [dadosClimaticos, setDadosClimaticos] = useState<Forecast[]>([]); // Ajustado para array de Forecast
  const [mapCoordinates, setMapCoordinates] = useState<{
    lat: number;
    lng: number;
  }>({ lat: -23.55052, lng: -46.633308 }); // Coordenadas de São Paulo

  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [convertedTemperatures, setConvertedTemperatures] = useState<number[]>(
    []
  );

  const convertToCelsius = (temperature: number) =>
    Math.round(temperature - 273.15);

  const convertToFahrenheit = (temperature: number) =>
    Math.round(((temperature - 273.15) * 9) / 5 + 32);

  const handleTemperatureConversion = () => {
    setIsFahrenheit(!isFahrenheit);
    if (isFahrenheit) {
      setConvertedTemperatures(
        dadosClimaticos.map((forecast) => convertToCelsius(forecast.main.temp))
      );
    } else {
      setConvertedTemperatures(
        dadosClimaticos.map((forecast) =>
          convertToFahrenheit(forecast.main.temp)
        )
      );
    }
  };

  async function buscarDados() {
    try {
      // Validação básica do nome da cidade
      if (!cidade || !cidade.match(/^[a-zA-Z\s]+$/)) {
        console.error("Nome de cidade inválido.");
        return;
      }

      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cidade || ""
        )}&appid=1b267ca5664ea689f15c46015e55af37`
      );

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();
      // Processamento dos dados...
      // Atualiza os estados locais com os dados recebidos
      setTemperaturaAtual(Math.round(data.main.temp - 273.15));
      setNomeCidade(cidade);
      setDescricaoClima(data.weather[0].description);
      setUmidade(data.main.humidity + "%");
      setVelocidadeVento(data.wind.speed + " km/h");
      setPrecipitacao(data.rain ? data.rain["1h"] + " mm/h" : "0 mm/h");
      // Obtém a hora local da API para ajustar a exibição
      const localTime = new Date(
        data.dt * 1000 + data.timezone * 1000
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setHoraLocalApi(localTime);
      // Log de depuração para verificar o valor da hora local
      console.log("Hora local obtida da API:", localTime);
    } catch (error) {
      console.error("Erro ao buscar dados climáticos:", error);
    }
  }

  useEffect(() => {
    // Verifica se o nome foi passado como parâmetro na rota
    if (router.query.name) {
      setNomeCidade(router.query.name as string);
    } else {
      // Define uma cidade padrão caso não haja nome na rota
      setNomeCidade("São Paulo");
    }
  }, [router.query.name]);

  useEffect(() => {
    // Verifica se a cidade foi passada como parâmetro na rota
    if (router.query.city) {
      setCidade(router.query.city as string);
    } else {
      // Define uma cidade padrão caso não haja cidade na rota
      setCidade("São Paulo");
    }
  }, [router.query.city]);

  useEffect(() => {
    buscarDados();
  }, [cidade]);

  useEffect(() => {
    console.log("Sessão carregada");
  }, []);

  useEffect(() => {
    const buscarPrevisaoHoraria = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            cidade || ""
          )}&appid=1b267ca5664ea689f15c46015e55af37&lang=pt_br`
        );
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        setDadosClimaticos(data.list); // Define os dados da previsão horária
      } catch (error) {
        console.error("Erro ao buscar previsão horária:", error);
      }
    };

    if (cidade) {
      buscarPrevisaoHoraria();
    }
  }, [cidade]);

  useEffect(() => {
    const buscarCoordenadas = async () => {
      try {
        const response = await fetch(`/map-location?locationName=${encodeURIComponent(cidade || "")}`);
        const data = await response.json();
        if (data.latitude && data.longitude) {
          setMapCoordinates({ lat: data.latitude, lng: data.longitude });
        } else {
          console.error("Não foi possível encontrar as coordenadas para a localização especificada.");
        }
      } catch (error) {
        console.error("Erro ao buscar coordenadas:", error);
      }
    };
  }, [cidade]);

  // Busca dados climáticos atualizados sempre que a cidade mudar
  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${
            cidade || ""
          }&appid=1b267ca5664ea689f15c46015e55af37`
        );
        if (!response.ok) throw new Error("Erro na busca dos dados climáticos");
        const data = await response.json();

        // Atualizando os estados locais com os dados recebidos
        setTemperaturaAtual(Math.round(data.main.temp - 273.15)); // Convertendo Kelvin para Celsius
        setNomeCidade(cidade);
        setDescricaoClima(data.weather[0].description);
        setUmidade(data.main.humidity + "%");
        setVelocidadeVento(data.wind.speed + " km/h");
        setPrecipitacao(data.rain ? data.rain["1h"] + " mm/h" : "0 mm/h");
        // Obtém a hora local da API para ajustar a exibição
        const localTime = new Date(
          data.dt * 1000 + data.timezone * 1000
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setHoraLocalApi(localTime);
        // Log de depuração para verificar o valor da hora local
        console.log("Hora local obtida da API:", localTime);
      } catch (error) {
        console.error("Erro ao buscar dados climáticos:", error);
      }
    };

    if (cidade) {
      buscarDados();
    }
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
        userName="Nome do Usuário" // Substituir pelo nome do usuário
      />
      <div className={styles.Section}>
        <SectionPrincipal1 clima={null} />
        <div>
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
          <DiadaSemana
            forecasts={isFahrenheit ? convertedTemperatures : dadosClimaticos}
          />
        </div>
        <div className={styles.container}>
          {mapCoordinates && <GoogleMaps center={mapCoordinates} />}
          <MenuOpcoes />
        </div>
      </div>
      <Footer onDiaSemanaClick={handleDiaSemanaClick} />
    </div>
  );
};

export default Dashboard;
