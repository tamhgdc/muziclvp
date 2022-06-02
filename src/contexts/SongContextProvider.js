import React, { createContext, useEffect, useState } from "react";
import getHome from "../apis/home.api";
import getInfoSong from "../apis/getInfoSong.api";
import getLyric from "../apis/lyric.api";

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
  const [lyric, setLyric] = useState("");
  const [second, setSeccond] = useState("00:00");

  const getSong = async () => {
    await getHome(`song?id=${idSong}`).then((data) => {
      setSongUrl(data.data.data[128]);
    });
    await getInfoSong(`${idSong}`).then((data) => {
      setInfoSong(data.data.data);
    });
    setLoaderSong(false);
  };

  const getLyricData = async () => {
    await getLyric(idSong).then((data) => {
      setLyric(data.data.data);
    });
  };

  useEffect(() => {
    if (idSong) {
      localStorage.setItem("idSong", JSON.stringify(idSong));
      setLoaderSong(true);
      getSong();
      getLyricData();
    }
  }, [idSong]);

  const data = {
    songUrl,
    infoSong,
    setIdSong,
    loaderSong,
    setLoaderSong,
    lyric,
    setSeccond,
    second,
  };

  return <SongContext.Provider value={data}>{children}</SongContext.Provider>;
};

export default SongContextProvider;
