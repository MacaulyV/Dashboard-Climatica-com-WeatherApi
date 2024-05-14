// Assuming SectionPrincipal3 is in file:///c%3A/Users/Desktop/OneDrive/Documentos/ClimaticFuture/src/Componentes/Section/Grid3/SectionPrincipal3.tsx

import React from "react";
import styles from "./SectionPrincipal3.module.css"; // Adjust the import path as necessary

// Define the props type for SectionPrincipal3
interface SectionPrincipal3Props {
  clima: any; // Replace 'any' with the actual type of 'clima' if known
}

// Use the props type in the component
const SectionPrincipal3: React.FC<SectionPrincipal3Props> = ({ clima }) => {
  return (
    <div className={styles.Grid3}>
      <div className={styles.Container1}>

      </div>
      <div className={styles.Container2}></div>
      <div className={styles.Container3}></div>
      <div className={styles.Container4}></div>
    </div>
  );
};

export default SectionPrincipal3;
