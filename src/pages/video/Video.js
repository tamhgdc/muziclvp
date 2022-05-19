import React, { useContext, useEffect, useState } from "react";
import "./video.css";
import { VideoContext } from "../../contexts/VideoContextProvider";
import SingerItem from "../../components/Home/SingerItem";
import VideoList from "../../components/video/VideoList";
import { useNavigate } from "react-router-dom";
import VideoMv from "./VideoMv";

const Video = () => {
  const {
    dataVideo,
    loaderVideo,
    autoPlayVideo,
    setAutoPlayVideo,
    setRepeatVideo,
    repeatVideo,
    checkZoom,
    checkRenderList,
    idVideo,
    setIdVideo,
  } = useContext(VideoContext);
  const [recommends, setReCommends] = useState("");

  const navigate = useNavigate();
  //bật tắt route video
  const changeRoute = () => {
    navigate("/the-loai-video");
  };
  const hanlePlayVideo = () => {
    setAutoPlayVideo(!autoPlayVideo);
    setRepeatVideo(!repeatVideo);
  };

  useEffect(() => {
    if (!checkRenderList && dataVideo) {
      setReCommends([dataVideo, ...dataVideo.recommends]);
    }
  }, [checkRenderList]);

  const handleVideo = (item) => {
    navigate(item.link);
    setIdVideo(item.encodeId);
    localStorage.setItem("idVideo", JSON.stringify(item.encodeId));
  };

  return (
    <div className="sidebar__scrollbar container-video">
      <div className="header__video">
        <div className="header__video__left">
          {!loaderVideo && (
            <>
              <div className="image__singer__video">
                <img src={dataVideo?.artist.thumbnail} alt="" />
              </div>
              <div className="title__header_video">
                <div className="header__song">{dataVideo?.title}</div>
                <div className="singer__rightbar video__singer">
                  {dataVideo?.artists &&
                    dataVideo.artists.map((a, index) => {
                      return <SingerItem key={index} artist={a} />;
                    })}
                </div>
              </div>
            </>
          )}

          <div className="menu__header__video">
            <div className="menu__click__">
              <i className="fa fa-heart" aria-hidden="true"></i>
            </div>
            <div className="menu__click__">
              <i className="fa fa-music" aria-hidden="true"></i>
            </div>
            <div className="menu__click__">
              <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="header__video__right">
          <div className="menu__click__">
            <i className="fa fa-compress" aria-hidden="true"></i>
          </div>
          <div
            className="menu__click__"
            style={{ marginRight: "0" }}
            onClick={changeRoute}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="video__all__playlist">
        {loaderVideo ? (
          <div className="video__container"></div>
        ) : (
          <VideoMv recommends={recommends} />
        )}
        {/* ấ */}
        <div
          className="list__video"
          style={{ display: `${checkZoom ? "none" : ""}` }}
        >
          <div className="list__play">
            <div className="playlist__video__">danh sách phát</div>
            <div className="auto__video">
              tự động phát
              <label className="switch">
                <input
                  type="checkbox"
                  checked={autoPlayVideo}
                  onChange={hanlePlayVideo}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="sidebar__scrollbar video__list">
            {!checkRenderList && recommends ? (
              recommends.map((item, index) => {
                return <VideoList key={index} data={item} />;
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {checkZoom && (
        <div className="anny__video">
          <div className="playmv__list__bottom">
            <div className="playmv__right__top">
              <div className="playmv__top__left">Danh Sách Phát</div>
              <div className="playmv__top__right">
                <span>Tự động phát</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={hanlePlayVideo}
                    checked={autoPlayVideo}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="playmv__all__list">
              {!checkRenderList && recommends ? (
                recommends.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="playmv__list__item2"
                      onClick={() => handleVideo(item)}
                    >
                      <div
                        className={`playmv__list__img2 ${
                          item.encodeId === idVideo ? "active__anny" : ""
                        }`}
                      >
                        <img src={item.thumbnail} alt="" />
                        <div className="option__image">
                          <i
                            className="fa-solid fa-play"
                            style={{
                              display: `${
                                item.encodeId === idVideo ? "none" : "block"
                              }`,
                            }}
                          ></i>
                          <p className="playing">đang phát</p>
                        </div>
                      </div>
                      <div className="playmv__list__title__singer playmv__title__singer2">
                        <div className="playmv__list__title">{item.title}</div>

                        <div className="playmv__list__singer">
                          {item.artists.map((artist, index) => {
                            return <SingerItem key={index} artist={artist} />;
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
