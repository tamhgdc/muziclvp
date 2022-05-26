import React, { useContext } from "react";
import "./rightbar.css";
import { PlayListContext } from "../../contexts/PlayListContextProvider";
import SingerItem from "../../components/Home/SingerItem";
import { SongContext } from "../../contexts/SongContextProvider";
import { useParams } from "react-router-dom";
import loadingGift from "../../assets/images/loading.gif";

const Rightbar = () => {
  const {
    showRightBar,
    playListData,
    loaderPlayList,
    checkPlayAudio,
    setCheckPlayAudio,
    setCheckModalVip,
  } = useContext(PlayListContext);
  const { loaderSong, setIdSong, setLoaderSong } = useContext(SongContext);
  const params = useParams();

  const handleOnclick = (data) => {
    if (JSON.parse(localStorage.getItem("idSong")) !== data.encodeId) {
      if (params.playlist === "album" && data.streamingStatus !== 2) {
        localStorage.setItem("idSong", JSON.stringify(data.encodeId));
        setIdSong(data.encodeId);
        setLoaderSong(true);
        setCheckPlayAudio(!checkPlayAudio);
      } else {
        setCheckModalVip(true);
      }
    } else {
      setCheckPlayAudio(!checkPlayAudio);
    }
  };

  return (
    <div className={`rightbar ${showRightBar && "show__rightbar"}`}>
      <div className="header-rightbar">
        <div>
          <button>Danh sách phát</button>
        </div>
      </div>
      <div className="sidebar__scrollbar header-center">
        {!loaderPlayList &&
          playListData.song.items.map((item, index) => {
            return (
              <div
                key={index}
                className={`rightbar__playlist ${
                  JSON.parse(localStorage.getItem("idSong")) ===
                    item.encodeId && "active__rightbar__item"
                }`}
              >
                <div className="right">
                  <div onClick={() => handleOnclick(item)}>
                    <img src={item.thumbnail} />
                    <div
                      className="option__playlist__selection"
                      style={{
                        opacity: `${
                          JSON.parse(localStorage.getItem("idSong")) ===
                          item.encodeId
                            ? "1"
                            : "0"
                        }`,
                      }}
                    >
                      <div
                        className="option__selection"
                        style={{ cursor: "pointer" }}
                      >
                        {!loaderSong &&
                        checkPlayAudio &&
                        JSON.parse(localStorage.getItem("idSong")) ===
                          item.encodeId ? (
                          <span
                            className="gif__play"
                            style={{
                              border: "none",
                              width: "10px",
                              height: "10px",
                            }}
                          >
                            <img
                              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                              alt=""
                            />
                          </span>
                        ) : loaderSong &&
                          JSON.parse(localStorage.getItem("idSong")) ===
                            item.encodeId ? (
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
                  <div className="item__title__album title__rightbar">
                    <p>{item.title}</p>
                    <div className="singer__rightbar">
                      {item.artists &&
                        item.artists.map((a, index) => {
                          return <SingerItem key={index} artist={a} />;
                        })}
                    </div>
                  </div>
                </div>
                <div className="center"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Rightbar;
