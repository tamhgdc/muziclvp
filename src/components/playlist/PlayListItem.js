import React, { useContext, useEffect } from "react";
import { SongContext } from "../../contexts/SongContextProvider";
import { useParams } from "react-router-dom";
import { PlayListContext } from "../../contexts/PlayListContextProvider";
import loadingGift from "../../assets/images/loading.gif";
import { VideoContext } from "../../contexts/VideoContextProvider";

const PlayListItem = ({ data }) => {
  const { setIdSong, setLoaderSong, loaderSong, infoSong } =
    useContext(SongContext);
  const {
    setCheckPlayAudio,
    checkPlayAudio,
    setCheckModalVip,
    setCheckPlayList,
    setCheckSearch,
    checkSearch,
  } = useContext(PlayListContext);

  const { setIdVideo, setCheckMiniVideo, setCheckChangeVideo } =
    useContext(VideoContext);

  const params = useParams();

  const handleOnclick = () => {
    if (JSON.parse(localStorage.getItem("idSong")) !== data.encodeId) {
      if (params.playlist === "album" || data.streamingStatus !== 2) {
        localStorage.setItem("idSong", JSON.stringify(data.encodeId));
        setIdSong(data.encodeId);
        setLoaderSong(true);
        setCheckPlayAudio(true);
        setCheckPlayList(true);
      } else {
        setCheckModalVip(true);
      }
    } else {
      setCheckPlayAudio(!checkPlayAudio);
    }
    setCheckSearch(true);
    setCheckChangeVideo(false);
    setCheckMiniVideo(false);
    setIdVideo("");
  };

  useEffect(() => {
    if (!loaderSong && infoSong && checkSearch) {
      if (infoSong.album) {
        localStorage.setItem(
          "playList",
          JSON.stringify({
            encodeId: infoSong.album.encodeId,
            url: infoSong.album.link,
            playListSong: [{ ...infoSong }],
          })
        );
      }
      setCheckSearch(false);
    }
  }, [infoSong, checkSearch, loaderSong]);

  return (
    <li
      className={`music__library ${
        JSON.parse(localStorage.getItem("idSong")) === data.encodeId &&
        "active-playlist"
      }`}
    >
      <div>
        <div className="title__sumenu__left">
          <div className="icon__music__library">
            <i className="fa-solid fa-music"></i>
          </div>
          <div className="checkbox__music__library">
            <input type="checkbox" className="select__all__music" />
          </div>
          <div
            className="img__music__library"
            onClick={handleOnclick}
            style={{ cursor: "pointer" }}
          >
            <img src={data.thumbnail} alt="" />
            <div className="option__playlist__selection">
              <div className="option__selection">
                {!loaderSong &&
                checkPlayAudio &&
                JSON.parse(localStorage.getItem("idSong")) === data.encodeId ? (
                  <span
                    className="gif__play"
                    style={{ border: "none", width: "10px", height: "10px" }}
                  >
                    <img
                      src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                      alt=""
                    />
                  </span>
                ) : loaderSong &&
                  JSON.parse(localStorage.getItem("idSong")) ===
                    data.encodeId ? (
                  <img
                    src={loadingGift}
                    style={{
                      width: "20px",
                      height: "20px",
                      padding: "8px",
                    }}
                  />
                ) : (
                  <i className="fa-solid fa-play"></i>
                )}
              </div>
            </div>
          </div>
          <div className="title__music__library">
            <div className="item__title__album">
              {data.title ? data.title : ""}

              {((params.playlist && params.playlist !== "album") ||
                data.streamingStatus === 2) && <span>vip</span>}
            </div>
            <nav className="subsinger__music__library item__title__album1">
              {data.artists &&
                data.artists.map((a) => {
                  return a.name;
                })}
            </nav>
          </div>
        </div>
        <div className="subtitle__sumenu__content">
          <a href="#">{data.album ? data.album.title : ""}</a>
        </div>
        <div className="option__sumenu__right">
          <div className="icon__mic_library">
            <i className="fa-solid fa-microphone"></i>
          </div>
          <div className="delete__library">
            <i className="fa-solid fa-heart"></i>
          </div>
          <div className="item__music__library">
            <div>● ● ●</div>
          </div>
          <div className="time__music__library"></div>
        </div>
      </div>
    </li>
  );
};

export default PlayListItem;
