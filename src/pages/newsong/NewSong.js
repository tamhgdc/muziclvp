import React, { useContext } from "react";
import NewSongList from "../../components/newsong/NewSongList";
import MainLayout from "../../layout/MainLayout";
import "./newsong.css";
import { VideoContext } from "../../contexts/VideoContextProvider";

const NewSong = () => {
  const { checkMiniVideo } = useContext(VideoContext);

  return (
    <MainLayout>
      <div
        className="content"
        style={{
          height: `${
            localStorage.getItem("idSong") && !checkMiniVideo
              ? ""
              : "calc(100vh - 70px)"
          }`,
        }}
      >
        <div className="bg__blur1"></div>
        <div className="bg__alpha1"></div>
        <div className="content__item">
          <div className="chart__title">
            <h3 className="title">mới phát hành</h3>
            <button>
              <i className="fa-solid fa-play"></i>
            </button>
          </div>
        </div>
        <NewSongList />
      </div>
    </MainLayout>
  );
};

export default NewSong;
