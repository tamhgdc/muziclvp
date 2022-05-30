import React, { useContext } from "react";
import MainLayout from "../../layout/MainLayout";
import "./zingchart.css";
import LibraryZing from "../../components/Home/zingchart-home/LibraryZing";
import TopSong from "../../components/zingchart/TopSong";
import TopWeekly from "../../components/zingchart/TopWeekly";
import { HomeContext } from "../../contexts/HomeContextProvider";
import HomeLoader from "../../components/Home/HomeLoader";
import { VideoContext } from "../../contexts/VideoContextProvider";

const ZingChart = () => {
  const { dataHome, loader, rank } = useContext(HomeContext);
  const { checkMiniVideo } = useContext(VideoContext);

  return (
    <MainLayout>
      {loader ? (
        <HomeLoader />
      ) : (
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
          <div className="content__item zingchart">
            <div className="chart__title">
              <h3 className="title">#zingchart</h3>
              <button>
                <i className="fa-solid fa-play"></i>
              </button>
            </div>
            <LibraryZing rank={rank} data={dataHome[8]} />
          </div>
          <TopSong />
          <div className="zingchart__weekly">
            <div className="bg__blur"></div>
            <div className="bg__alpha"></div>
            <div className="bxh__week">
              <a href="">bảng xếp hạng tuần</a>
            </div>
            <TopWeekly />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ZingChart;
