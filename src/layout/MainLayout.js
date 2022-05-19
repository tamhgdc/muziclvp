import React, { useContext } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Modal from "../pages/Modal/Modal";
import { PlayListContext } from "../contexts/PlayListContextProvider";
import Rightbar from "../components/rightbar/Rightbar";

const MainLayout = ({ children }) => {
  const { checkModalVip } = useContext(PlayListContext);

  return (
    <>
      {checkModalVip && <Modal />}
      <Sidebar />
      <div className="main">
        <Header />
        {children}
      </div>
      <Rightbar />
    </>
  );
};

export default MainLayout;
