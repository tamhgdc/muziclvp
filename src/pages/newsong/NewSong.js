import React from "react";
import NewSongList from "../../components/newsong/NewSongList";
import MainLayout from "../../layout/MainLayout";
import "./newsong.css";

const NewSong = () => {
  return (
    <MainLayout>
      <div className="content">
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
