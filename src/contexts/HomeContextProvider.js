import React, { createContext, useEffect, useState } from "react";
import getHome from "../apis/home.api";

export const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
  const [dataHome, setDataHome] = useState("");
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [rank, setRank] = useState(0);
  const [loadPage, setLoadPage] = useState(true);
  let ab = 0;
  const getApiHome = async () => {
    let data = [];
    await Promise.all([
      getHome("home?page=1"),
      getHome("home?page=2"),
      getHome("home?page=3"),
      getHome("home?page=4"),
      getHome("home?page=5"),
    ]).then((items) => {
      items.forEach((item) => {
        data.push(...item.data.data.items);
      });
      setDataHome(data);
    });
  };
  useEffect(() => {
    getApiHome();
  }, []);

  useEffect(() => {
    if (dataHome) {
      setLoader(false);
      dataHome[7].items.forEach((a, index) => {
        if (index < 3) ab += a.score;
      });
      setRank(ab);
    }
  }, [dataHome]);

  useEffect(() => {
    if (!loadPage) {
      setLoader(true);
      getApiHome();
      setLoadPage(true);
    }
  }, [loadPage]);

  const lazyLoading = (e) => {
    if (e.target.scrollTop >= 1000) {
      setLoader2(false);
    }
  };

  const data = {
    lazyLoading,
    dataHome,
    loader,
    loader2,
    rank,
    setLoadPage,
  };
  return <HomeContext.Provider value={data}>{children}</HomeContext.Provider>;
};

export default HomeContextProvider;
