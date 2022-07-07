import React, { useRef, useEffect, useState, useContext } from "react";
import { VideoContext } from "../../contexts/VideoContextProvider";
import { useNavigate } from "react-router-dom";

const useQuality = (value) => {
  let qualityRef = useRef();

  useEffect(() => {
    const handleHiddenQuality = (e) => {
      if (!qualityRef.current.contains(e.target)) {
        value(false);
      }
    };

    document.addEventListener("mousedown", handleHiddenQuality);
    return () => document.removeEventListener("mousedown", handleHiddenQuality);
  });

  return qualityRef;
};

const VideoMv = () => {
  const {
    dataVideo,
    setIdVideo,
    idVideo,
    autoVideo,
    autoPlayVideo,
    setAutoPlayVideo,
    repeatVideo,
    setRepeatVideo,
    setCheckZoom,
    checkZoom,
    recommends,
    convertMS,
    setCurrentTimeShared,
    currentTimeShared,
    checkMiniVideo,
  } = useContext(VideoContext);
  const [isPlay, setIsPlay] = useState(false);
  const [isPlayTimeOut, setIsPlayTimeOut] = useState(false);
  const [video, setVideo] = useState("");
  const [hiddenTolltip, setHiddenTolltip] = useState(true);
  //xử lý volume
  const [activeSound, setActiveSound] = useState(false);
  const [widthSound, setWidthSound] = useState("100");
  const [saveSound, setSaveSound] = useState(
    JSON.parse(localStorage.getItem("volumevideo")) || ""
  );
  //xử lý video
  const [currentTime, setCurrentTime] = useState("");
  const [saveCurrentTime, setSaveCurrentTime] = useState("");
  const [widthVideo, setWidthVideo] = useState("0");
  const [saveWidthVideo, setSaveWidthVideo] = useState("");
  const [checkWidthVideo, setCheckWidthVideo] = useState(false);
  const [setting, setSetting] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const [checkQuality, setCheckQuality] = useState("720p");

  const Ref = useRef();
  const qualityRef = useQuality(setSetting);
  const navigate = useNavigate();

  let timeOut;
  let length;
  let i;
  let canListen = [];

  //hanlde Video

  //video
  useEffect(() => {
    if (Ref) {
      setVideo(Ref.current);
    }
  }, []);

  useEffect(() => {
    if (video && isPlay) {
      playVideo();
    } else if (video && !isPlay) {
      pauseVideo();
    }
  }, [isPlay, video]);

  //play khi vào route
  useEffect(() => {
    if (video && autoVideo) {
      playVideo();
      setIsPlay(true);
      timeOut = setTimeout(() => {
        setHiddenTolltip(false);
      }, 5000);
      if (!checkMiniVideo) {
        video.currentTime = currentTimeShared;
        setCurrentTime(currentTimeShared);
      }
    }
    return () => clearTimeout(timeOut);
  }, [video, autoVideo]);

  // Play & pause video
  const playVideo = () => {
    video.play();
    updateOnTime();
    setIsPlay(true);
    onEnded();
    timeOut = setTimeout(() => {
      setHiddenTolltip(false);
    }, 2000);
    return () => clearTimeout(timeOut);
  };
  const pauseVideo = () => {
    video.pause();
    updateOnTime();
    setIsPlay(false);
    clearTimeout(timeOut);
    setHiddenTolltip(true);
  };

  //update Video
  const updateOnTime = () => {
    video.ontimeupdate = () => {
      setCurrentTime(convertMS(video.currentTime));
      setSaveCurrentTime(video.currentTime);
      setCurrentTimeShared(video.currentTime);
      if (video.duration) {
        let percent = (video.currentTime / video.duration) * 100;
        setWidthVideo(percent);
        if (saveWidthVideo) {
          setSaveWidthVideo(percent);
        }
      }
    };
  };
  //on ended
  const onEnded = () => {
    video.onended = () => {
      //autoPlayVideo
      if (autoPlayVideo) {
        getIndex();
        if (i === length - 1) {
          pauseVideo();
        } else {
          nextVideo();
        }
      } else {
        //repeatVideo
        if (repeatVideo) {
          playVideo();
        } else {
          pauseVideo();
        }
      }
    };
  };

  // play when saveWidthVideo
  useEffect(() => {
    if (checkWidthVideo) {
      playVideo();
    }
  }, [checkWidthVideo]);

  //change Video
  const handleChangeVideo = (e) => {
    setWidthVideo(e.target.value);
    setSaveWidthVideo(e.target.value);
    let seekTime = (e.target.value / 100) * video.duration;
    video.currentTime = seekTime;
    setCheckWidthVideo(true);
  };
  //repeatVideo
  const handleRepeat = () => {
    setRepeatVideo(!repeatVideo);
    setAutoPlayVideo(!autoPlayVideo);
  };

  useEffect(() => {
    if (video && urlVideo) {
      setUrlVideo(urlVideo);
      playVideo();
      video.currentTime = saveCurrentTime;
    }
  }, [video, urlVideo]);

  //change url
  const changeQuality = (url) => {
    setUrlVideo(dataVideo.streaming.mp4[url]);
    setCheckQuality(url);
  };

  //fullscreen
  const handleFullScreen = () => {
    video.requestFullscreen();
  };

  //icon play/pause hidden
  const handleTimeoutPlay = () => {
    setIsPlayTimeOut(!isPlayTimeOut);
    setIsPlay(!isPlay);
  };

  useEffect(() => {
    let a;
    if (isPlayTimeOut) {
      a = setTimeout(() => {
        setIsPlayTimeOut(false);
      }, 300);
    }
    return () => clearTimeout(a);
  }, [isPlayTimeOut]);

  // next & prev

  const getIndex = () => {
    recommends.forEach((recommend) => {
      if (recommend.streamingStatus === 1) {
        canListen.push(recommend);
      }
    });
    canListen.find((item, index) => {
      if (item.encodeId === idVideo) {
        i = index;
      }
    });
    length = canListen.length;
  };

  const nextVideo = () => {
    getIndex();
    if (i + 1 >= length) {
      i = 0;
    } else {
      i = i + 1;
    }
    setIdVideo(canListen[i].encodeId);
    navigate(canListen[i].link);
  };

  const prevVideo = () => {
    getIndex();
    if (i === 0) {
      i = length - 1;
    } else {
      i = i - 1;
    }
    setIdVideo(canListen[i].encodeId);
    navigate(canListen[i].link);
  };

  //volume
  // muted & unmuted volume
  const handleClickSound = () => {
    setActiveSound(!activeSound);
    video.muted = !activeSound;
  };

  useEffect(() => {
    if (video) {
      if (!video.muted && saveSound) {
        setWidthSound(saveSound);
        video.volume = saveSound / 100;
        localStorage.setItem("volumevideo", JSON.stringify(saveSound));
      } else if (!video.muted) {
        setWidthSound("100");
        localStorage.setItem("volumevideo", JSON.stringify("100"));
      } else if (video.muted) {
        setWidthSound("0");
        localStorage.setItem("volumevideo", JSON.stringify("0"));
      }
    }
  }, [video, activeSound]);

  // //change volume
  const changeVolume = (e) => {
    setWidthSound(e.target.value);
    setSaveSound(e.target.value);
    video.volume = e.target.value / 100;
    if (e.target.value > 0) {
      setActiveSound(false);
      video.muted = false;
    } else {
      setActiveSound(true);
      setSaveSound("30");
    }
    localStorage.setItem("volumevideo", JSON.stringify(e.target.value));
  };

  return (
    <div
      className="video__container"
      style={{ width: `${checkZoom ? "1366px" : ""}` }}
    >
      <video
        className="video"
        src={
          urlVideo
            ? urlVideo
            : dataVideo.streaming.mp4["720p"] && dataVideo.streaming.mp4["480p"]
        }
        ref={Ref}
        onClick={handleTimeoutPlay}
      ></video>

      <div
        className={`click__center__video ${
          isPlayTimeOut ? "change__play" : ""
        }`}
      >
        <div className={`play__video ${isPlayTimeOut ? "changeI" : ""}`}>
          {!isPlay ? (
            <i className="fa-solid fa-pause"></i>
          ) : (
            <i className="fa-solid fa-play"></i>
          )}
        </div>
      </div>
      <div className={`line__video ${!hiddenTolltip ? "tolltip" : ""}`}>
        <div className="media__duration__bar media__video">
          <input
            className="current__time__video"
            type="range"
            min="0"
            max="100"
            value={saveWidthVideo ? saveWidthVideo : widthVideo}
            onChange={handleChangeVideo}
          />
          <div className="current__time current__time__video">
            <div
              className="step__time fix__step"
              style={{
                width: `${saveWidthVideo ? saveWidthVideo : widthVideo}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className={`controls__menu ${!hiddenTolltip ? "tolltip" : ""}`}>
        <div className="controls__video">
          <div className="controls__video__left">
            <div className="controls__item__video" onClick={prevVideo}>
              <i className="fa-solid fa-backward-step"></i>
            </div>
            <div
              className="controls__item__video adjust__play"
              onClick={() => setIsPlay(!isPlay)}
            >
              {isPlay ? (
                <i className="fa-solid fa-pause"></i>
              ) : (
                <i className="fa-solid fa-play"></i>
              )}
            </div>
            <div className="controls__item__video" onClick={nextVideo}>
              <i className="fa-solid fa-forward-step"></i>
            </div>
            <div className="controls__item__video adjust__volume">
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
                    onChange={changeVolume}
                    value={widthSound}
                  />
                  <div className="current__volume">
                    <div
                      className="step__volume fix__step"
                      style={{
                        width: `${widthSound}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="controls__item__video adjust__time">
              {currentTime}
              <span>|</span>
              {convertMS(dataVideo?.duration)}
            </div>
          </div>
          <div className="controls__video__right">
            <div className="controls__item__video" onClick={handleRepeat}>
              <i
                className="fas fa-redo"
                style={{
                  color: `${repeatVideo ? "var(--text-item-hover)" : ""}`,
                }}
              ></i>
            </div>
            <div
              className="controls__item__video"
              onClick={() => setSetting(!setting)}
              ref={qualityRef}
            >
              <i className="fa-solid fa-gear"></i>
              <div
                className="controls__quality"
                style={{ opacity: `${setting ? "1" : "0"}` }}
              >
                <div>
                  <div className="quality__">Chất lượng</div>

                  <div
                    className="quality__item un__active__video"
                    style={{ marginTop: "10px" }}
                    onClick={() =>
                      dataVideo.streaming.mp4["1080p"] && changeQuality("1080p")
                    }
                  >
                    1080p (VIP)
                    {checkQuality === "1080p" && (
                      <div className="any">
                        <i className="fa-solid fa-check"></i>
                      </div>
                    )}
                  </div>
                  <div
                    className="quality__item"
                    onClick={() => changeQuality("720p")}
                  >
                    720p
                    {checkQuality === "720p" && (
                      <div className="any">
                        <i className="fa-solid fa-check"></i>
                      </div>
                    )}
                  </div>
                  <div
                    className="quality__item"
                    onClick={() => changeQuality("480p")}
                  >
                    {checkQuality === "480p" && (
                      <div className="any">
                        <i className="fa-solid fa-check"></i>
                      </div>
                    )}
                    480p
                  </div>
                  <div
                    className="quality__item"
                    onClick={() => changeQuality("360p")}
                  >
                    {checkQuality === "360p" && (
                      <div className="any">
                        <i className="fa-solid fa-check"></i>
                      </div>
                    )}
                    360p
                  </div>

                  <div className="quality__item">tự động</div>
                </div>
              </div>
            </div>
            <div
              className="controls__item__video"
              onClick={() => {
                setCheckZoom(!checkZoom);
                localStorage.setItem("checkZoom", JSON.stringify(!checkZoom));
              }}
            >
              <span className="controls__square"></span>
            </div>
            <div className="controls__item__video" onClick={handleFullScreen}>
              <i className="fa-solid fa-expand"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMv;
