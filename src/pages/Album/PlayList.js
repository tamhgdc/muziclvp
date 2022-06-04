import React, { useContext, useEffect, useState, useRef } from "react";
import MainLayout from "../../layout/MainLayout";
import "./playlist.css";
import PlayListItem from "../../components/playlist/PlayListItem";
import { PlayListContext } from "../../contexts/PlayListContextProvider";
import LoadList from "../../components/playlist/LoadList";
import { SongContext } from "../../contexts/SongContextProvider";
import { useParams, useNavigate } from "react-router-dom";
import { VideoContext } from "../../contexts/VideoContextProvider";

const PlayList = () => {
  const {
    playListData,
    setCheckPlayAudio,
    checkPlayAudio,
    loaderPlayList,
    setIdPlayList,
    setModalPlayAudio,
  } = useContext(PlayListContext);

  const { loaderSong } = useContext(SongContext);
  const { checkMiniVideo } = useContext(VideoContext);
  const [liked, setLiked] = useState("");
  const params = useParams();
  const Ref = useRef();
  const navigate = useNavigate();
  const idSongLocal = JSON.parse(localStorage.getItem("idSong"));
  const playListSongLocal = JSON.parse(localStorage.getItem("playList"));

  let i;
  let data;

  const changePlayAudio = () => {
    if (params.id.split(".")[0] === playListSongLocal.encodeId) {
      setCheckPlayAudio(!checkPlayAudio);
    } else {
      setModalPlayAudio(true);
    }
  };
  useEffect(() => {
    setIdPlayList(params.id.split(".")[0]);
  }, []);

  const findIndex = () => {
    if (playListSongLocal && idSongLocal) {
      data = playListSongLocal.playListSong.filter((item) => {
        return item.streamingStatus !== 2;
      });
      data.find((item, index) => {
        if (item.encodeId === idSongLocal) i = index;
      });
    }
  };

  useEffect(() => {
    if (Ref && Ref.current) {
      findIndex();
      if (i !== "") {
        Ref.current.scrollTop = 60 * i - 49;
      }
    }
    navigate(playListData.link);
  }, [idSongLocal, Ref, playListData]);

  useEffect(() => {
    if (playListData) {
      let data = String(playListData.like).split("");
      playListData.like >= 1000 && setLiked(data[0] + "k");
      playListData.like >= 10000 && setLiked(data[0] + data[1] + "k");
      playListData.like >= 100000 &&
        setLiked(data[0] + data[1] + data[2] + "k");
      playListData.like >= 1000000 && setLiked(data[0] + "m");
    }
  }, [playListData]);
  return (
    <MainLayout>
      {loaderPlayList ? (
        <LoadList />
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
          ref={Ref}
        >
          <div className="List__song__main">
            <div className="List__song__right">
              <div className="List__song__img" onClick={changePlayAudio}>
                <img src={playListData.thumbnail} alt="" />
                <div className="option__playlist__selection">
                  <div className="option__selection item__play__selection">
                    {!loaderSong &&
                    checkPlayAudio &&
                    playListSongLocal &&
                    params.id.split(".")[0] === playListSongLocal.encodeId ? (
                      <span className="gif__play">
                        <img
                          src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                          alt=""
                        />
                      </span>
                    ) : (
                      <i className="fa-solid fa-play"></i>
                    )}
                  </div>
                </div>
              </div>
              <div className="List__song__description">
                <div className="description__name"></div>
                <div className="description__date">
                  Cập nhật: {playListData.releaseDate}
                </div>
                <div className="description__singer"></div>
                <div className="description__count__like">
                  {liked} người yêu thích
                </div>
                <div
                  className="description__play__song"
                  onClick={changePlayAudio}
                >
                  <span>
                    <i
                      className={`fa-solid ${
                        !loaderSong &&
                        checkPlayAudio &&
                        playListSongLocal &&
                        params.id.split(".")[0] === playListSongLocal.encodeId
                          ? "fa-pause"
                          : "fa-play"
                      }`}
                    ></i>{" "}
                    {!loaderSong &&
                    checkPlayAudio &&
                    playListSongLocal &&
                    params.id.split(".")[0] === playListSongLocal.encodeId
                      ? "tạm dừng"
                      : "tiếp tục phát"}
                  </span>
                </div>
              </div>
            </div>
            <div className="List__song__left">
              <div className="List__song__subTitle">
                lời tựa <span>{playListData.sortDescription}</span>
              </div>
              <ul className="item__music__list list__song__item">
                <li className="title__submenu">
                  <div className="title__submenu__left">
                    <div className="submenu__left__one active__submenu__labrary">
                      <div className="item__submenu__left"></div>
                      <div className="item__submenu__right">bài hát</div>
                    </div>
                    <div className="submenu__left__two">
                      <div>
                        <div className="item__submenu__left">
                          <input
                            type="checkbox"
                            className="select__all__music"
                          />
                        </div>
                        <div className="item__submenu__content">
                          <i className="fa-solid fa-play"></i> thêm vào danh
                          sách phát
                        </div>
                        <div className="item__submenu__right">
                          <div className="option__submenu__right">● ● ●</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="title__sumenu__content">album</div>
                  <div className="title__sumenu__right">thời gian</div>
                </li>
                {playListData.song.items.map((item, index) => {
                  return <PlayListItem data={item} key={index} />;
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default PlayList;
