import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import PlayListItem from "../playlist/PlayListItem";
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

const ResultSearchData = () => {
  const [dataSearch, setDataSearch] = useState("");
  const { loaderData, setLoaderData } = useContext(SearchContext);
  const { checkPlayAudio, setCheckPlayAudio, setCheckModalVip } =
    useContext(PlayListContext);
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
        <div className="content">
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

          <div className="top__reult" style={{ marginTop: "80px" }}>
            <h3>
              Top kết quả: <i>"{params.keyword}"</i>
            </h3>
          </div>
          <div className="rightbar__playlist search__top">
            <div className="right fix__search" onClick={handleOnclick}>
              <div>
                <img src={dataSearch && dataSearch.top.thumbnail} />
                <div className="option__playlist__selection">
                  <div
                    className="option__selection"
                    style={{ cursor: "pointer" }}
                  >
                    {!loaderSong &&
                    dataSearch &&
                    checkPlayAudio &&
                    JSON.parse(localStorage.getItem("idSong")) ===
                      dataSearch.top.encodeId ? (
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
                      dataSearch &&
                      JSON.parse(localStorage.getItem("idSong")) ===
                        dataSearch.top.encodeId ? (
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
              <div className="item__title__album title__rightbar search__title">
                <div>
                  <p>{dataSearch && dataSearch.top.title}</p>
                  <div className="singer__rightbar">
                    {dataSearch &&
                      dataSearch.top.artists &&
                      dataSearch.top.artists.map((a, index) => {
                        return <SingerItem key={index} artist={a} />;
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="center"></div>
          </div>

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
            {dataSearch &&
              dataSearch.songs.map((item, index) => {
                return <PlayListItem data={item} key={index} />;
              })}
          </ul>
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
              {dataSearch &&
                dataSearch.playlists.map((item, index) => {
                  if (index < 5)
                    return <ItemPlayList playList={item} key={index} />;
                })}
            </div>
          </ul>
          <ul className="item__music__list list__song__item search__header">
            <li className="title__submenu">
              <div className="title__submenu__left">
                <div className="submenu__left__one active__submenu__labrary">
                  <div className="item__submenu__left"></div>
                  <div className="item__submenu__right fix__search-all">MV</div>
                </div>
              </div>
              <div className="title__sumenu__content"></div>
              <div className="title__sumenu__right">
                <a className="fix__search-time">
                  tất cả <i className="fa-solid fa-angle-right"></i>
                </a>
              </div>
            </li>
            {dataSearch && <MvSearch playList={dataSearch.videos} />}
          </ul>
        </div>
      )}
    </MainLayout>
  );
};

export default ResultSearchData;
