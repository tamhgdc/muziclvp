import React, { useState, useEffect, useContext } from "react";
import { KaraokeContext } from "../../contexts/KaraokeContextProvider";

const DefaultPlayList = () => {
  const playListLocal = JSON.parse(localStorage.getItem("playList"));
  const idSongLocal = JSON.parse(localStorage.getItem("idSong"));
  const [position, setPosition] = useState("");
  const [indexDefault, setIndexDefault] = useState("");
  const [showNext, setShowNext] = useState(true);
  const { activeKara } = useContext(KaraokeContext);

  let indexSong;

  const findIndex = () => {
    playListLocal.playListSong.find((item, index) => {
      if (item.encodeId === idSongLocal) {
        indexSong = index;
      }
    });
  };

  useEffect(() => {
    if (activeKara && idSongLocal) {
      findIndex();
      setPosition(480 - 360 * indexSong);
      setIndexDefault(indexSong);
    }
  }, [activeKara, idSongLocal]);

  useEffect(() => {
    if (indexDefault + 1 >= playListLocal.playListSong.length) {
      setShowNext(false);
    } else {
      setShowNext(true);
    }
  }, [indexDefault, position]);

  return (
    <>
      <div className="sidebar__scrollbar detail__song__center">
        <div
          className="detail__center__all__item active__center__item"
          style={{ transform: `translateX(${position}px)` }}
        >
          {playListLocal.playListSong.map((item, index) => {
            return (
              <div
                className={`detail__center__item ${
                  idSongLocal === item.encodeId ? "active__center__item2" : ""
                }`}
                key={index}
              >
                <div className="detail__center__img">
                  <img src={item.thumbnailM} />
                  <div className="option__detail__song">
                    <i className="fa-solid fa-play"></i>
                  </div>
                </div>
                <div className="detail__center__description">
                  <div
                    className="detail__center__title"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.title}
                  </div>
                  <div className="detail__center__singer">
                    {item.artistsNames}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="detail__center__prev"
        style={{
          display: `${position < 480 ? "flex" : "none"}`,
        }}
        onClick={() => {
          setIndexDefault(indexDefault - 1);
          setPosition(position + 360);
        }}
      >
        <i className="fa-solid fa-angle-left"></i>
      </div>
      <div
        className="detail__center__next"
        style={{
          display: `${showNext ? "flex" : "none"}`,
        }}
        onClick={() => {
          setIndexDefault(indexDefault + 1);
          setPosition(position - 360);
        }}
      >
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </>
  );
};

export default DefaultPlayList;
