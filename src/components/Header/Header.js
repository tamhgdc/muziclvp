import React, { useEffect, useState, useRef, useContext } from "react";
import avatar from "../../assets/images/avatar.jpg";
import { SearchContext } from "../../contexts/SearchContextProvider";
import SingerItem from "../../components/Home/SingerItem";
import loadingGift from "../../assets/images/loading.gif";
import { PlayListContext } from "../../contexts/PlayListContextProvider";
import { SongContext } from "../../contexts/SongContextProvider";
import { useNavigate } from "react-router-dom";
import { VideoContext } from "../../contexts/VideoContextProvider";

let useClickOutSide = (handler) => {
  let domNode = useRef();
  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Header = () => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isFullscreen, setIsFullScreen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [musicQuality, setMusicQuality] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);
  const [value, setValue] = useState("");

  const { searchData, setKeyWord, keyword, setLoaderData } =
    useContext(SearchContext);
  const { setIdSong, setLoaderSong, loaderSong, infoSong } =
    useContext(SongContext);
  const { setCheckChangeVideo, setIdVideo, setCheckMiniVideo } =
    useContext(VideoContext);
  const {
    setCheckPlayAudio,
    checkPlayAudio,
    setCheckModalVip,
    setCheckSearch,
    checkSearch,
  } = useContext(PlayListContext);
  const navigate = useNavigate();
  const handleOnclick = (item) => {
    if (JSON.parse(localStorage.getItem("idSong")) !== item.encodeId) {
      if (item.streamingStatus !== 2) {
        localStorage.setItem("idSong", JSON.stringify(item.encodeId));
        setIdSong(item.encodeId);
        setLoaderSong(true);
        setCheckPlayAudio(true);
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
            title: infoSong.album.title,
          })
        );
      }
      setCheckSearch(false);
    }
  }, [infoSong, checkSearch, loaderSong]);

  useEffect(() => {
    let searchTimeOut;
    if (value !== "") {
      searchTimeOut = setTimeout(() => {
        setKeyWord(value);
      }, 200);
    } else {
      setKeyWord("");
    }
    return () => clearTimeout(searchTimeOut);
  }, [value]);

  let domNode = useClickOutSide(() => {
    setIsDisplay(false);
  });
  let suggestNode = useClickOutSide(() => {
    setShowSuggest(false);
  });

  return (
    <div className="header">
      <div className="header__menu">
        <div className="header__left">
          <div className="move__arow">
            <a href="#">
              <i className="fa-solid fa-arrow-left"></i>
            </a>
            <a href="#">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div className="search__input" ref={suggestNode}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setShowSuggest(true);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate(`/tim-kiem/${value}`);
                  setLoaderData(true);
                  setShowSuggest(false);
                }
              }}
              onClick={() => setShowSuggest(true)}
            />
            <div
              className="close__keyword"
              style={{ display: `${value !== "" ? "block" : "none"}` }}
              onClick={() => setValue("")}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
            <div
              className="suggest__search"
              style={{ display: `${showSuggest ? "block" : "none"}` }}
            >
              <span>Gợi ý kết quả</span>
              <div className="sidebar__scrollbar list__item__all__ft">
                {searchData &&
                  keyword &&
                  searchData.songs &&
                  searchData.songs.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="list__item__ft item__noactive"
                      >
                        <div className="item__list__ft">
                          <a
                            className="img__list__ft"
                            onClick={() => handleOnclick(item)}
                            style={{ cursor: "pointer" }}
                          >
                            <img src={item.thumbnail} alt="thumbnail" />
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
                              <div className="option__selection">
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
                          </a>
                          <div className="subtitle__list__ft">
                            <div
                              className="item__title__album"
                              style={{ cursor: "pointer" }}
                            >
                              {item.title}
                              {item.streamingStatus === 2 && <span>vip</span>}
                            </div>
                            <nav className="subsinger__music__library item__title__album1">
                              {item.artists &&
                                item.artists.map((artist, index) => {
                                  return (
                                    <SingerItem
                                      key={index}
                                      artist={artist}
                                    ></SingerItem>
                                  );
                                })}
                            </nav>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="header__right">
          <div className="item__header">
            <i className="fa-solid fa-shirt"></i>
          </div>
          <div className="item__header">
            <i className="fa-solid fa-gem"></i>
          </div>
          <div className="item__header">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </div>
          <div className="item__header item__header__setting" ref={domNode}>
            <i
              className="fa-solid fa-gear"
              onClick={() => {
                setIsDisplay(!isDisplay);
              }}
            ></i>
            {isDisplay && (
              <div className="setting" style={{ display: "block" }}>
                <ul className="setting__one">
                  <li>
                    <i className="fa-solid fa-ban"></i>
                    Danh sách chặn
                  </li>
                  <li>
                    <span className="setting__resolution">HQ</span>
                    Chất lượng âm nhạc
                    <nav>
                      <i className="fa-solid fa-angle-right"></i>
                    </nav>
                    <div className="setting__child">
                      <ul>
                        <li onClick={() => setMusicQuality(true)}>
                          SQ ● 128
                          <div className="resolution__sub">
                            <span className="resolution__sub__title">
                              Giảm sử dụng dữ liệu cho các kết nối chậm hơn.
                            </span>
                          </div>
                          {musicQuality && (
                            <span className="ischeck">
                              <i className="fa-solid fa-check"></i>
                            </span>
                          )}
                        </li>
                        <li onClick={() => setMusicQuality(false)}>
                          HQ ● 320
                          <div className="resolution__sub">
                            <span className="resolution__sub__title">
                              Kết hợp tốt nhất giữa việc sử dụng dữ liệu và chất
                              lượng âm thanh.
                            </span>
                          </div>
                          {!musicQuality && (
                            <span className="ischeck">
                              <i className="fa-solid fa-check"></i>
                            </span>
                          )}
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="setting__theme">
                    <i className="fa-regular fa-circle-play"></i>
                    Giao diện
                    <nav>
                      <i className="fa-solid fa-angle-right"></i>
                    </nav>
                    <div className="setting__theme__list">
                      <ul>
                        <li onClick={() => setIsFullScreen(!isFullscreen)}>
                          <div className="setting__theme__item">
                            <span>Luôn phát nhạc toàn màn hình</span>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={isFullscreen}
                                onChange={() => setIsFullScreen(isFullscreen)}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </li>
                        <li onClick={() => setIsChecked(!isChecked)}>
                          <div className="setting__theme__item">
                            <span>Hiệu ứng</span>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => setIsChecked(isChecked)}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <ul className="setting__one setting__two">
                  <li>
                    <i className="fa-solid fa-circle-exclamation"></i>
                    Giới thiệu
                  </li>
                  <li>
                    <i className="fa-solid fa-font-awesome"></i>
                    Góp ý
                  </li>
                  <li>
                    <i className="fa-solid fa-phone"></i>
                    Liên hệ
                  </li>
                  <li>
                    <i className="fa-solid fa-rectangle-ad"></i>
                    Quảng cáo
                  </li>
                  <li>
                    <i className="fa-solid fa-file-lines"></i>
                    Thỏa thuận sử dụng
                  </li>
                  <li>
                    <i className="fa-solid fa-shield-halved"></i>
                    Chính sách bảo mật
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="item__header">
            <img src={avatar} alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
