import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import ItemSongSearch from "./ItemSongSearch";
import "./resultsearch.css";
import { NavLink } from "react-router-dom";
import { PlayListContext } from "../../contexts/PlayListContextProvider";
import SingerItem from "../../components/Home/SingerItem";
import { SongContext } from "../../contexts/SongContextProvider";
import { useParams } from "react-router-dom";
import loadingGift from "../../assets/images/loading.gif";
import MvSearch from "./MvSearch";
import ItemPlayList from "../Home/ItemPlayList";
import searchSong from "../../apis/search.api";
import ResultSearchLoader from "./ResultSearchLoader";
import { SearchContext } from "../../contexts/SearchContextProvider";
import { VideoContext } from "../../contexts/VideoContextProvider";

const ResultSearchData = () => {
  const [dataSearch, setDataSearch] = useState("");
  const { loaderData, setLoaderData } = useContext(SearchContext);
  const {
    checkPlayAudio,
    setCheckPlayAudio,
    setCheckModalVip,
    setIdPlayList,
    setCheckPlayList,
  } = useContext(PlayListContext);
  const { loaderSong, setIdSong, setLoaderSong } = useContext(SongContext);
  const { setIdVideo, setCheckMiniVideo, setCheckChangeVideo, checkMiniVideo } =
    useContext(VideoContext);
  const params = useParams();

  const handleOnclick = (data) => {
    if (JSON.parse(localStorage.getItem("idSong")) !== data.encodeId) {
      if (params.playlist === "album" || data.streamingStatus !== 2) {
        localStorage.setItem("idSong", JSON.stringify(data.encodeId));
        setIdSong(data.encodeId);
        setLoaderSong(true);
        setCheckPlayAudio(true);
        if (data.album) {
          setCheckPlayList(true);
          setIdPlayList(data.album.encodeId);
        } else {
          localStorage.setItem("playlist", "");
        }
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
  const getSearch = async () => {
    return await searchSong(params.keyword).then((data) => {
      setDataSearch(data.data.data);
      setLoaderData(false);
    });
  };
  useEffect(() => {
    getSearch();
  }, [params.keyword]);

  return (
    <MainLayout>
      {loaderData ? (
        <ResultSearchLoader />
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
          <div className="navbar__mv">
            <h3>Kết quả tìm kiếm</h3>
            <ul>
              <li className="active__check">
                <NavLink to="IWZ9Z08I" className="active">
                  tất cả
                </NavLink>
              </li>
              <li className="active__check">
                <NavLink to="IWZ9Z08O">bài hát</NavLink>
              </li>
              <li className="active__check">
                <NavLink to="IWZ9Z08W">playlist/album</NavLink>
              </li>
              <li className="active__check">
                <NavLink to="IWZ9Z086">nghệ sĩ/oa</NavLink>
              </li>
              <li className="active__check">
                <NavLink to="IWZ9Z086">mv</NavLink>
              </li>
            </ul>
          </div>
          {dataSearch && dataSearch.top && (
            <>
              <div className="top__reult" style={{ marginTop: "80px" }}>
                <h3>
                  Top kết quả: <i>"{params.keyword}"</i>
                </h3>
              </div>
              <div className="rightbar__playlist search__top">
                <div className="right fix__search">
                  <div onClick={() => handleOnclick(dataSearch.top)}>
                    <img src={dataSearch.top.thumbnail} />
                    <div
                      className="option__playlist__selection"
                      style={{
                        opacity: `${
                          JSON.parse(localStorage.getItem("idSong")) ===
                          dataSearch.top.encodeId
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
                          dataSearch.top.encodeId ? (
                          <span
                            className="gif__play"
                            style={{
                              border: "none",
                              width: "50px",
                              height: "50px",
                            }}
                          >
                            <img
                              style={{
                                width: "50px",
                                height: "50px",
                              }}
                              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                              alt=""
                            />
                          </span>
                        ) : loaderSong &&
                          JSON.parse(localStorage.getItem("idSong")) ===
                            dataSearch.top.encodeId ? (
                          <img
                            src={loadingGift}
                            style={{
                              width: "50px",
                              height: "50px",
                              padding: "8px",
                            }}
                          />
                        ) : (
                          <i
                            className="fa-solid fa-play"
                            style={{
                              fontSize: "50px",
                            }}
                          ></i>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="item__title__album title__rightbar search__title">
                    <div>
                      <p>{dataSearch.top.title}</p>
                      <div className="singer__rightbar">
                        {dataSearch.top.artists &&
                          dataSearch.top.artists.map((a, index) => {
                            return <SingerItem key={index} artist={a} />;
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="center"></div>
              </div>
            </>
          )}
          {dataSearch && dataSearch.songs && (
            <ul className="item__music__list list__song__item search__header">
              <li className="title__submenu">
                <div className="title__submenu__left">
                  <div className="submenu__left__one active__submenu__labrary">
                    <div className="item__submenu__left"></div>
                    <div className="item__submenu__right fix__search-all">
                      bài hát
                    </div>
                  </div>
                </div>
                <div className="title__sumenu__content"></div>
                <div className="title__sumenu__right">
                  <a className="fix__search-time">
                    tất cả <i className="fa-solid fa-angle-right"></i>
                  </a>
                </div>
              </li>
              {dataSearch.songs.map((item, index) => {
                return <ItemSongSearch data={item} key={index} />;
              })}
            </ul>
          )}
          {dataSearch && dataSearch.playlists && (
            <ul className="item__music__list list__song__item search__header">
              <li className="title__submenu">
                <div className="title__submenu__left">
                  <div className="submenu__left__one active__submenu__labrary">
                    <div className="item__submenu__left"></div>
                    <div className="item__submenu__right fix__search-all">
                      Playlist/Album
                    </div>
                  </div>
                </div>
                <div className="title__sumenu__content"></div>
                <div className="title__sumenu__right">
                  <a className="fix__search-time">
                    tất cả <i className="fa-solid fa-angle-right"></i>
                  </a>
                </div>
              </li>
              <div className="list__playlist__selection">
                {dataSearch.playlists.map((item, index) => {
                  if (index < 5)
                    return <ItemPlayList playList={item} key={index} />;
                })}
              </div>
            </ul>
          )}
          {dataSearch && dataSearch.videos && (
            <ul className="item__music__list list__song__item search__header">
              <li className="title__submenu">
                <div className="title__submenu__left">
                  <div className="submenu__left__one active__submenu__labrary">
                    <div className="item__submenu__left"></div>
                    <div className="item__submenu__right fix__search-all">
                      MV
                    </div>
                  </div>
                </div>
                <div className="title__sumenu__content"></div>
                <div className="title__sumenu__right">
                  <a className="fix__search-time">
                    tất cả <i className="fa-solid fa-angle-right"></i>
                  </a>
                </div>
              </li>
              {<MvSearch playList={dataSearch.videos} />}
            </ul>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default ResultSearchData;
