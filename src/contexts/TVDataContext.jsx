import { createContext, useContext, useState } from "react";

const TVContext = createContext();

export const TVProvider = ({ children }) => {
  const [tvData, setTVData] = useState(null);

  return (
    <TVContext.Provider value={{ tvData, setTVData }}>
      {children}
    </TVContext.Provider>
  );
};

export const useTVContext = () => useContext(TVContext);
