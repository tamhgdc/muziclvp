import React, { useContext, useEffect, useState } from "react";
import DefaultPlayList from "../../components/detailsong/DefaultPlayList";
import { KaraokeContext } from "../../contexts/KaraokeContextProvider";
import Karaoke from "../../components/detailsong/Karaoke";
import Lyric from "../../components/detailsong/Lyric";
import { SongContext } from "../../contexts/SongContextProvider";

import "./detailSong.css";

const DetailSong = () => {
  const { activeKara, setActiveKara, setMenuKara, menuKara } =
    useContext(KaraokeContext);
  const { lyric } = useContext(SongContext);
  const [fullScreen, setFullScreen] = useState(false);
  useEffect(() => {
    if (fullScreen) {
      document.body.requestFullscreen();
    } else {
      if (activeKara) document.exitFullscreen();
    }
  }, [fullScreen]);

  return (
    <>
      <div
        className="detail__main"
        style={{ top: `${!activeKara ? "100vh" : "0"}`, transition: "1.2s" }}
      >
        <div className="detail__song">
          <div className="detail__song__top">
            <div className="detail__top__left">
              <div className="detail__logo__top">
                <img src="https://zjs.zmdcdn.me/zmp3-desktop/dev/119956/static/media/icon_zing_mp3_60.f6b51045.svg" />
              </div>
              <div className="detail__title__top">
                <div>Từ playlist</div>
                <div className="detail__title__top2">
                  {localStorage.getItem("playList") &&
                    JSON.parse(localStorage.getItem("playList")).title}
                </div>
              </div>
            </div>
            <div className="detail__top__center">
              <div className="detail__form__menu">
                <div className="detail__top__menu">
                  <div
                    className={`item__detail__menu ${
                      menuKara === "default" ? "active__detail__menu" : ""
                    }`}
                    onClick={() => {
                      if (localStorage.getItem("playList"))
                        setMenuKara("default");
                    }}
                  >
                    Danh sách phát
                  </div>
                  <div
                    className={`item__detail__menu ${
                      menuKara === "karaoke" ? "active__detail__menu" : ""
                    }`}
                    onClick={() => {
                      setMenuKara("karaoke");
                    }}
                  >
                    Karaoke
                  </div>
                  <div
                    className={`item__detail__menu ${
                      menuKara === "lyric" ? "active__detail__menu" : ""
                    }`}
                    onClick={() => setMenuKara("lyric")}
                  >
                    Lời bài hát
                  </div>
                </div>
              </div>
            </div>
            <div className="detail__top__right">
              <div
                className="item__detail__top__right bdt__after tdt__after__47 tdt__before__55"
                onClick={() => setFullScreen(!fullScreen)}
                data-title={
                  !fullScreen ? "Toàn màn hình" : "Thoát toàn màn hình"
                }
              >
                <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
              </div>
              <div className="item__detail__top__right">
                <i className="fa-solid fa-gear"></i>
              </div>
              <div
                className="item__detail__top__right bdt__after tdt__after__47 tdt__before__55"
                onClick={() => {
                  setActiveKara(false), setFullScreen(false);
                }}
                data-title={"Đóng"}
              >
                <i className="fa-solid fa-angle-down"></i>
              </div>
            </div>
          </div>
          {menuKara === "default" && <DefaultPlayList />}
          {menuKara === "karaoke" && <Karaoke />}
          {menuKara === "lyric" && <Lyric />}
        </div>
      </div>
    </>
  );
};

export default DetailSong;
