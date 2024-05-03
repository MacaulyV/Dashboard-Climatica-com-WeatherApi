// page.tsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Nav from "@/Componentes/Nav/Nav";
import Footer from "@/Componentes/Footer/Footer";
import SectionPrincipal from "@/Componentes/Section/SectionPrincipal";

// Definição da interface ClimaData
interface ClimaData {
 descricao_clima: string;
 temperatura_atual: number;
 temperatura_minima: number;
 temperatura_maxima: number;
 umidade: number;
 velocidade_vento: number;
 sensacao_termica: number;
}

export default function Home() {
 const [cidade, setCidade] = useState('');
 const [clima, setClima] = useState<ClimaData | null>(null);

 const buscarDados = async () => {
    const response = await fetch(`http://localhost:5000/clima?cidade=${cidade}`);
    const data = await response.json();
    setClima(data);
 };

 useEffect(() => {
    if (cidade) {
      buscarDados();
    }
 }, [cidade]);

 return (
    <div className={styles.Fundo}>
      <Nav setCidade={setCidade} /> {/* Passe a função setCidade para o componente Nav */}
      <SectionPrincipal clima={clima} /> {/* Passe os dados climáticos para o componente SectionPrincipal */}
      <Footer />
    </div>
 );
}