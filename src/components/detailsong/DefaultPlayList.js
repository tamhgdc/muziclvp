import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { KaraokeContext } from "../../contexts/KaraokeContextProvider";
import { PlayListContext } from "../../contexts/PlayListContextProvider";
import { SongContext } from "../../contexts/SongContextProvider";
import { VideoContext } from "../../contexts/VideoContextProvider";
import loadingGift from "../../assets/images/loading.gif";

const DefaultPlayList = () => {
  const playListLocal = JSON.parse(localStorage.getItem("playList"));
  const idSongLocal = JSON.parse(localStorage.getItem("idSong"));
  const [position, setPosition] = useState("");
  const [indexDefault, setIndexDefault] = useState("");

  const [showNext, setShowNext] = useState(true);
  const { activeKara } = useContext(KaraokeContext);
  const { checkPlayAudio, setCheckPlayAudio, setCheckModalVip } =
    useContext(PlayListContext);
  const { setIdSong, setLoaderSong, loaderSong } = useContext(SongContext);
  const { setIdVideo, setCheckMiniVideo, setCheckChangeVideo } =
    useContext(VideoContext);

  const params = useParams();

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

  const handleOnclick = (data) => {
    if (JSON.parse(localStorage.getItem("idSong")) !== data.encodeId) {
      if (params.playlist === "album" || data.streamingStatus !== 2) {
        localStorage.setItem("idSong", JSON.stringify(data.encodeId));
        setIdSong(data.encodeId);
        setLoaderSong(true);
        setCheckPlayAudio(true);
      } else {
        setCheckModalVip(true);
      }
    } else {
      setCheckPlayAudio(!checkPlayAudio);
    }
    setCheckChangeVideo(false);
    setCheckMiniVideo(false);
    setIdVideo("");
  };

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
                style={{ cursor: "pointer" }}
              >
                <div
                  className="detail__center__img"
                  onClick={() => handleOnclick(item)}
                >
                  <img src={item.thumbnailM} />
                  <div className="option__detail__song">
                    {!loaderSong &&
                    checkPlayAudio &&
                    idSongLocal === item.encodeId ? (
                      <i
                        className="fa-solid fa-pause"
                        style={{
                          padding: "10px 18px 10px 18px",
                          border: "2px solid white",
                          borderRadius: "50%",
                        }}
                      ></i>
                    ) : loaderSong && idSongLocal === item.encodeId ? (
                      <img
                        src={loadingGift}
                        style={{
                          width: "35px",
                          height: "35px",
                          padding: "12px",
                          border: "2px solid white",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <i className="fa-solid fa-play"></i>
                    )}
                  </div>
                  <div>
                    {!loaderSong &&
                      checkPlayAudio &&
                      idSongLocal === item.encodeId && (
                        <span className="gif__play default__play">
                          <img
                            src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                            alt=""
                          />
                        </span>
                      )}
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
