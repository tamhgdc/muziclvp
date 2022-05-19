import React, { useContext } from "react";
import MvList from "./MvList";
import SearchMV from "./SearchMV";
import { MvContext } from "../../contexts/MvContextProvider";

const MvItem = () => {
  const { dataMv } = useContext(MvContext);

  return (
    <>
      <SearchMV />
      <MvList playList={dataMv.data.data} />
    </>
  );
};

export default MvItem;
