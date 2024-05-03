// src/componentes/SectionPrincipal/SectionPrincipal.tsx
import React from 'react';

interface ClimaData {
 descricao_clima: string;
 temperatura_atual: number;
 temperatura_minima: number;
 temperatura_maxima: number;
 umidade: number;
 velocidade_vento: number;
 sensacao_termica: number;
}

interface SectionPrincipalProps {
 clima: ClimaData | null;
}

const SectionPrincipal: React.FC<SectionPrincipalProps> = ({ clima }) => {
 if (!clima) {
    return <div>Carregando dados do clima...</div>;
 }

 return (
    <div>
      <h2>Clima em {clima.descricao_clima}</h2>
      <p>Descrição do Clima: {clima.descricao_clima}</p>
      <p>Temperatura Atual: {Math.round(clima.temperatura_atual - 273.15)}°C</p>
      <p>Temperatura Mínima: {Math.round(clima.temperatura_minima - 273.15)}°C</p>
      <p>Temperatura Máxima: {Math.round(clima.temperatura_maxima - 273.15)}°C</p>
      <p>Umidade: {clima.umidade}%</p>
      <p>Velocidade do Vento: {clima.velocidade_vento} m/s</p>
      <p>Sensação Térmica: {Math.round(clima.sensacao_termica - 273.15)}°C</p>
    </div>
 );
};

export default SectionPrincipal;