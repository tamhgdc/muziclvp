import React, { useContext } from "react";
import OutStanding from "../../components/top100/OutStanding";
import SongAsia from "../../components/top100/SongAsia";
import SongVN from "../../components/top100/SongVN";
import MainLayout from "../../layout/MainLayout";
import "./top100.css";
import { HomeContext } from "../../contexts/HomeContextProvider";
import HomeLoader from "../../components/Home/HomeLoader";
import { VideoContext } from "../../contexts/VideoContextProvider";

const Top100 = () => {
  const { dataHome, loader } = useContext(HomeContext);
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
          <div className="bg-blur2"></div>
          <div className="bg-alpha2"></div>
          <div className="banner-top100"></div>
          <div
            className="topic-category mb-40 gallery"
            style={{ marginTop: "180px" }}
          >
            <div className="playlist__selection">
              <div className="header__playlist__selection">
                <span>Nổi bật</span>
              </div>
              <div className="list__playlist__selection">
                {dataHome[9].items.map((item, index) => {
                  return <OutStanding key={index} playList={item} />;
                })}
              </div>
            </div>
          </div>
          <div className="topic-category">
            <div className="section__title mt-40">
              <h3>nhạc việt nam</h3>
            </div>
            <SongVN playList={dataHome[12]} />
          </div>
          <div className="topic-category mb-40">
            <div className="section__title mt-40">
              <h3>nhạc châu á</h3>
            </div>
            <SongAsia playList={dataHome[9]} />
          </div>
          <div className="topic-top__100__item">
            <div className="section__title mt-40">
              <h3>nhạc âu mỹ</h3>
            </div>
            <SongVN playList={dataHome[12]} />
          </div>
          <div className="topic-category">
            <div className="section__title mt-40">
              <h3>nhạc hòa tấu</h3>
            </div>
            <SongVN playList={dataHome[12]} />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Top100;
