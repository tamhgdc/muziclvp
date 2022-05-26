import React, { createContext, useState, useEffect } from "react";
import searchSong from "../apis/search.api";

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [keyword, setKeyWord] = useState("");
  const [searchData, setSearchData] = useState("");
  const getSearch = async () => {
    return await searchSong(keyword).then((data) => {
      setSearchData(data.data.data);
    });
  };

  useEffect(() => {
    if (keyword) {
      getSearch();
    }
  }, [keyword]);

  const data = {
    searchData,
    setKeyWord,
    keyword,
  };

  return (
    <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;
