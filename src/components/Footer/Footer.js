import React, { useState, useRef, useEffect, useContext } from "react";
import { SongContext } from "../../contexts/SongContextProvider";
import { PlayListContext } from "../../contexts/PlayListContextProvider";
import { useParams, useNavigate } from "react-router-dom";
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

const Footer = () => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [audio, setAudio] = useState("");
  const [played, setPlayed] = useState(false);
  const [timeUpdateSong, setTimeUpdateSong] = useState("00:00");
  const [updateTime, setUpdateTime] = useState("");
  const [timeUpdateChange, setTimeUpdateChange] = useState("");
  const [timeChange, setTimeChange] = useState(0);
  const [replaceTime, setReplaceTime] = useState(false);
  const [activeSound, setActiveSound] = useState(false);
  const [widthSound, setWidthSound] = useState("100");
  const [saveSound, setSaveSound] = useState("");
  const [repeatTolltip, setRepeatTolltip] = useState(
    JSON.parse(localStorage.getItem("repeatTolltip")) || ""
  );
  const [randomPlayList, setRandomPlayList] = useState(
    JSON.parse(localStorage.getItem("randomPlayList")) || ""
  );
  const idLocalSong = JSON.parse(localStorage.getItem("idSong"));
  const playListSongLocal = JSON.parse(localStorage.getItem("playList"));

  let newRef = useRef();
  let domNode = useClickOutSide(() => setIsDisplay(false));
  const params = useParams();
  const navigate = useNavigate();

  const { songUrl, infoSong, setIdSong } = useContext(SongContext);
  const { setCheckPlayAudio, checkPlayAudio, setShowRightBar, showRightBar } =
    useContext(PlayListContext);
  const { checkChangeVideo } = useContext(VideoContext);

  let i = "";
  let data = [];
  let length;

  const checkSongInPlayList = () => {
    if (playListSongLocal !== "") {
      data = playListSongLocal.playListSong.filter((item) => {
        return params.playlist !== "album" && item.streamingStatus !== 2;
      });
      data.find((item, index) => {
        if (item.encodeId === idLocalSong) i = index;
      });
      length = data.length;

      if (i !== "") {
        if (i + 1 >= length) {
          if (!repeatTolltip) {
            pauseAudio();
          } else {
            i = 0;
          }
        } else {
          i = i + 1;
        }
        setIdSong(data[i].encodeId);
      } else {
        pauseAudio();
      }
    }
  };

  const randomRepeat = () => {
    if (playListSongLocal !== "") {
      data = playListSongLocal.playListSong.filter((item) => {
        return params.playlist !== "album" && item.streamingStatus !== 2;
      });
      data.find((item, index) => {
        if (item.encodeId === idLocalSong) i = index;
      });
      length = data.length;

      if (i !== "") {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * length);
        } while (newIndex === i);
        setIdSong(data[newIndex].encodeId);
      }
    }
  };

  function convertMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (minutes < 10) {
      minutes = "0" + minutes;

      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds; // Return is HH : MM : SS
    }
  }
  const playAudio = () => {
    setPlayed(true);
    audio.play();
    timeUpdate();
  };

  const pauseAudio = () => {
    setPlayed(false);
    audio.pause();
    timeUpdate();
    setCheckPlayAudio(false);
  };

  const timeUpdate = () => {
    audio.ontimeupdate = () => {
      setTimeUpdateSong(convertMS(Math.round(audio.currentTime)));
      let percent = Math.floor(
        (audio.currentTime / Math.round(audio.duration)) * 100
      );
      setUpdateTime(percent);
      audio.onended = () => {
        switch (randomPlayList) {
          case "":
            switch (repeatTolltip) {
              case "repeatAll":
                checkSongInPlayList();
                break;
              case "repeatOne":
                playAudio();
                break;
              default:
                checkSongInPlayList();
                break;
            }
            break;

          default:
            switch (repeatTolltip) {
              case "repeatAll":
                randomRepeat();
                break;
              case "repeatOne":
                playAudio();
                break;
              default:
                randomRepeat();
                break;
            }
            break;
        }
      };
    };
  };

  useEffect(() => {
    if (checkChangeVideo) {
      pauseAudio();
    }
  }, [checkChangeVideo]);

  useEffect(() => {
    localStorage.setItem("repeatTolltip", JSON.stringify(repeatTolltip));
  }, [repeatTolltip]);

  useEffect(() => {
    if (newRef) {
      setAudio(newRef.current);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("randomPlayList", JSON.stringify(randomPlayList));
  }, [randomPlayList]);

  const handleSong = () => {
    if (!played) {
      playAudio();
      setCheckPlayAudio(true);
    } else {
      pauseAudio();
      setCheckPlayAudio(false);
    }
  };

  useEffect(() => {
    if (audio && checkPlayAudio) {
      playAudio();
    } else if (audio && !checkPlayAudio) {
      pauseAudio();
    }
  }, [checkPlayAudio, audio]);

  const handleChange = (e) => {
    setTimeChange(e.target.value);
    let seekTime = (audio.duration / 100) * e.target.value;
    setTimeUpdateChange(convertMS(Math.round(seekTime)));
    setReplaceTime(true);
  };

  const handleMouse = (e) => {
    setUpdateTime(e.target.value);
    let seekTime = (audio.duration / 100) * e.target.value;
    setTimeUpdateSong(convertMS(Math.round(seekTime)));
    audio.currentTime = seekTime;
    setReplaceTime(false);
  };

  //volume
  // muted & unmuted volume
  const handleClickSound = () => {
    setActiveSound(!activeSound);
  };

  useEffect(() => {
    if (audio) {
      if (!activeSound) {
        setWidthSound("100");
        audio.volume = 1;

        audio.muted = false;

        if (saveSound) {
          setWidthSound(saveSound);
          audio.volume = saveSound / 100;
        }
      } else {
        setWidthSound("0");
        audio.muted = true;
      }
    }
  }, [audio, activeSound]);

  //change volume
  const changeVolume = (e) => {
    if (e.target.value > 0) {
      setWidthSound(e.target.value);
      setSaveSound(e.target.value);
      audio.volume = e.target.value / 100;
      setActiveSound(false);
    } else {
      setActiveSound(true);
    }
  };

  const nextSongPlayList = () => {
    if (randomPlayList !== "") {
      randomRepeat();
    } else {
      checkSongInPlayList();
    }
    playAudio();
  };

  const prevSongPlayList = () => {
    if (randomPlayList === "") {
      if (playListSongLocal !== "") {
        data = playListSongLocal.playListSong.filter((item) => {
          return params.playlist !== "album" && item.streamingStatus !== 2;
        });
        data.find((item, index) => {
          if (item.encodeId === idLocalSong) i = index;
        });
        length = data.length;

        if (i !== "") {
          if (i - 1 === 0) {
            i = length - 1;
          } else {
            i = i - 1;
          }
          setIdSong(data[i].encodeId);
        }
      }
    } else {
      randomRepeat();
    }
    playAudio();
  };
  return (
    <div className="footer">
      <audio src={songUrl} ref={newRef}></audio>
      <div className="media__left">
        <div className="media__left__item">
          <div
            className="media__thumbnail"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <div className="thumbnail">
              <img src={infoSong.thumbnail} alt="thumbnail" />
            </div>
          </div>
          <div className="content__left">
            <div className="item__song">{infoSong.title}</div>
            <div className="item__single">
              {infoSong.artists.map((a) => {
                return a.name;
              })}
            </div>
            s
          </div>
          <div className="options__left">
            <div className="media__heart">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="np__menu" ref={domNode}>
              <div
                className="np__menu__option"
                onClick={() => {
                  setIsDisplay(!isDisplay);
                }}
              >
                ● ● ●
              </div>
              {isDisplay && (
                <ul className="np__menu__children" style={{ display: "block" }}>
                  <div className="option__chindren__one">
                    <div className="option__chindren__img">
                      <div>
                        <img src={infoSong.thumbnail} alt="" />
                      </div>
                    </div>
                    <div className="option__chindren__sub">
                      <h2>{infoSong.title}</h2>
                      <div>
                        <span>
                          <i className="fa-regular fa-heart"></i>
                        </span>
                        <span>
                          <i className="fa-solid fa-headphones"></i> 138K
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="option__chindren__two">
                    <div className="option__two__item option__chindren__down">
                      <i className="fa-solid fa-download"></i>
                      <div>Tải xuống</div>
                    </div>
                    <div className="option__two__item option__chindren__sing">
                      <i className="fa-solid fa-microphone"></i>
                      <div>Lời bài hát</div>
                    </div>
                    <div className="option__two__item option__chindren__block">
                      <i className="fa-solid fa-ban"></i>
                      <div>Chặn</div>
                    </div>
                  </div>
                  <li className="active__playlist">
                    <i className="fa-solid fa-circle-plus"></i>
                    <span>
                      Thêm vào playlist{" "}
                      <i className="fa-solid fa-chevron-right"></i>
                    </span>
                    <ul className="form__playList">
                      <div>
                        <input
                          type="text"
                          name="search__playlist"
                          className="search__playlist"
                          placeholder="Tìm playlist"
                        />
                      </div>
                      <li>
                        <i className="fa fa-plus-square"></i> Tạo playlist mới
                      </li>
                      <nav className="list__playlist">
                        <li>
                          <div className="list_playlist__item">
                            <nav>
                              <i className="fa fa-list-ol"></i>
                            </nav>
                            Love
                          </div>
                        </li>
                      </nav>
                    </ul>
                  </li>
                  <li>
                    <i className="fa fa-microphone"></i>
                    <span>Phát cùng lời bài hát</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-comment"></i>
                    <span>Bình luận</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-link"></i>
                    <span>Sao chép link</span>
                  </li>
                  <li className="option__share">
                    <i className="fa-solid fa-share"></i>
                    <span>
                      Chia sẻ <i className="fa-solid fa-chevron-right"></i>
                    </span>
                    <ul className="item__share">
                      <li className="icon__fb">
                        <i className="fa-brands fa-facebook"></i> Faboock
                      </li>
                      <li className="icon__zalo">
                        <i className="fa-solid fa-comment-dots"></i> Zalo
                      </li>
                      <li>
                        <i className="fa-solid fa-code"></i> Mã nhúng
                      </li>
                    </ul>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="media__content">
        <div className="controller__media">
          <span
            className={`controller__itemmedia ${
              randomPlayList === "random" ? "active__tolltip" : ""
            }`}
            onClick={() =>
              setRandomPlayList(randomPlayList === "" ? "random" : "")
            }
          >
            <i className="fas fa-random"></i>
          </span>
          <span className="controller__itemmedia" onClick={prevSongPlayList}>
            <i className="fas fa-step-backward"></i>
          </span>
          <span
            className="controller__itemmedia play__item"
            onClick={handleSong}
            style={{ cursor: "pointer" }}
          >
            {played ? (
              <i className="far fa-pause-circle"></i>
            ) : (
              <i className="far fa-play-circle"></i>
            )}
          </span>

          <span className="controller__itemmedia" onClick={nextSongPlayList}>
            <i className="fas fa-step-forward"></i>
          </span>
          <span
            className={`controller__itemmedia ${
              repeatTolltip && "active__tolltip"
            }`}
            onClick={() =>
              setRepeatTolltip(
                (!repeatTolltip && "repeatAll") ||
                  (repeatTolltip === "repeatAll" && "repeatOne") ||
                  (repeatTolltip === "repeatOne" && "")
              )
            }
          >
            <i
              className={`fas fa-redo ${
                repeatTolltip === "repeatOne" && "repeatOne"
              }`}
            ></i>
          </span>
        </div>
        <div className="media__duration__bar">
          <div className="time__start">
            {replaceTime ? timeUpdateChange : timeUpdateSong}
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={replaceTime ? timeChange : updateTime}
            onChange={handleChange}
            onMouseUp={handleMouse}
          />
          <div className="current__time">
            <div
              className="step__time"
              style={{
                width: `${replaceTime ? timeChange : updateTime}%`,
              }}
            ></div>
          </div>
          <div className="time__end">{convertMS(infoSong.duration)}</div>
        </div>
      </div>
      <div className="media__right">
        <div className="media__narrow unclick">
          <div className="mv__item">MV</div>
        </div>
        <div className="media__narrow">
          <div>
            <i className="fa fa-microphone"></i>
          </div>
        </div>
        <div className="media__narrow">
          <div>
            <i className="fa fa-window-restore"></i>
          </div>
        </div>
        <div className="media__volume">
          <div className="icont__volume" onClick={handleClickSound}>
            {!activeSound ? (
              <i className="fa fa-volume-up"></i>
            ) : (
              <i className="fa-solid fa-volume-xmark"></i>
            )}
          </div>
          <div className="volume">
            <input
              type="range"
              min="0"
              max="100"
              value={widthSound}
              onChange={changeVolume}
            />
            <div className="current__volume">
              <div
                className="step__volume"
                style={{
                  width: widthSound + "%",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="media__divide">
          <span className="divide"></span>
        </div>
        <div
          className="media__narrow media__list__item"
          onClick={() => setShowRightBar(!showRightBar)}
          style={{
            background: `${showRightBar ? "var(--purple-primary)" : ""}`,
          }}
        >
          <div>
            <i className="fa fa-align-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
