import React, { createContext, useEffect, useState } from "react";
import getHome from "../apis/home.api";
import getInfoSong from "../apis/getInfoSong.api";

export const SongContext = createContext();

const SongContextProvider = ({ children }) => {
  const [idSong, setIdSong] = useState(
    localStorage.hasOwnProperty("idSong")
      ? JSON.parse(localStorage.getItem("idSong"))
      : ""
  );
  const [songUrl, setSongUrl] = useState("");
  const [infoSong, setInfoSong] = useState("");
  const [loaderSong, setLoaderSong] = useState(true);

  const getSong = async () => {
    await getHome(`song?id=${idSong}`).then((data) => {
      setSongUrl(data.data.data[128]);
    });
    await getInfoSong(`${idSong}`).then((data) => {
      setInfoSong(data.data.data);
    });
    setLoaderSong(false);
  };

  useEffect(() => {
    if (idSong) {
      localStorage.setItem("idSong", JSON.stringify(idSong));
      setLoaderSong(true);
      getSong();
    }
  }, [idSong]);

  const data = {
    songUrl,
    infoSong,
    setIdSong,
    loaderSong,
    setLoaderSong,
  };

  return <SongContext.Provider value={data}>{children}</SongContext.Provider>;
};

export default SongContextProvider;
