import React, { createContext, useContext, useState } from 'react';


type HoraLocalContextType = {
  horaLocal: string;
  setHoraLocal: React.Dispatch<React.SetStateAction<string>>;
};

export const HoraLocalContext = createContext<HoraLocalContextType>({
  horaLocal: '',
  setHoraLocal: () => {},
});

export const useHoraLocal = () => useContext(HoraLocalContext);