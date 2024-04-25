// page.tsx
"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import Nav from "@/Componentes/Nav/Nav";
import Footer from "@/Componentes/Footer/Footer";

export default function Home() {
 useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
 }, []);

 return (
    <div className={styles.Fundo}>
      <Nav />
      {/* Aqui você pode adicionar o conteúdo principal da sua página */}
      <Footer />
    </div>
 );
}