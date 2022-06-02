import React, { createContext, useState } from "react";

export const KaraokeContext = createContext();

const KaraokeContextProvider = ({ children }) => {
  const [activeKara, setActiveKara] = useState(false);
  const [menuKara, setMenuKara] = useState("lyric");

  const data = { activeKara, setActiveKara, menuKara, setMenuKara };

  return (
    <KaraokeContext.Provider value={data}>{children}</KaraokeContext.Provider>
  );
};

export default KaraokeContextProvider;
