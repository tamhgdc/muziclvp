import React, { createContext, useState, useEffect } from "react";
import getMvApi from "../apis/mv.api";
import getCategory from "../apis/category.api";

export const MvContext = createContext();

const MvContextProvider = ({ children }) => {
  const [dataMv, setDataMv] = useState("");
  const [loader, setLoader] = useState(true);
  const [id, setId] = useState("IWZ9Z08I");
  const [categories, setCategories] = useState("");
  const [nameCategory, setNameCategory] = useState("");

  const getMV = async () => {
    await getMvApi(`${id}&page=1&count=15`).then((data) => {
      setDataMv(data);
      setLoader(false);
    });
  };

  const getCategoryApi = async () => {
    await getCategory(id).then((data) => {
      setCategories(data.data.data.childs);
    });
  };

  useEffect(() => {
    getMV();
  }, []);

  useEffect(() => {
    getMV();
    getCategoryApi();
    setLoader(true);
    setNameCategory("");
    if (categories) {
      categories.map((item) => {
        if (id === item.id) {
          setNameCategory(item.name);
        }
      });
    }
  }, [id]);

  const data = {
    dataMv,
    loader,
    setId,
    categories,
    id,
    nameCategory,
    setNameCategory,
  };

  return <MvContext.Provider value={data}>{children}</MvContext.Provider>;
};

export default MvContextProvider;
