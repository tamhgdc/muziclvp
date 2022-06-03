import React, { useContext } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Modal from "../pages/Modal/Modal";
import ModalStart from "../pages/Modal/ModalStart";
import { PlayListContext } from "../contexts/PlayListContextProvider";
import Rightbar from "../components/rightbar/Rightbar";
import ModalPlayAudio from "../pages/Modal/ModalPlayAudio";

const MainLayout = ({ children }) => {
  const { checkModalVip, checkModalStart, modalPlayAudio } =
    useContext(PlayListContext);

  return (
    <>
      {checkModalVip && <Modal />}
      {checkModalStart && <ModalStart />}
      {modalPlayAudio && <ModalPlayAudio />}
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
