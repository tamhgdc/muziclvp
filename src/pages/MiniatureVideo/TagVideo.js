import React, { useContext, useRef, useEffect, useState } from "react";
import { VideoContext } from "../../contexts/VideoContextProvider";
import { useNavigate } from "react-router-dom";

const TagVideo = () => {
  const {
    setCheckMiniVideo,
    recommends,
    dataVideo,
    setCurrentTimeShared,
    currentTimeShared,
    setIdVideo,
    idVideo,
    loaderSong,
    repeatVideo,
    autoPlayVideo,
    checkRenderList,
    setReCommends,
    setCheckChangeVideo,
    checkMiniVideo,
    setChangeMiniVideToVideo,
  } = useContext(VideoContext);
  const [video, setVideo] = useState("");
  const [isPlay, setIsPlay] = useState(false);
  const [widthVideo, setWidthVideo] = useState("0");
  const [saveWidthVideo, setSaveWidthVideo] = useState("");
  const [checkWidthVideo, setCheckWidthVideo] = useState(false);

  const navigate = useNavigate();
  const Ref = useRef();

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
    if (!checkRenderList && dataVideo) {
      setReCommends([dataVideo, ...dataVideo.recommends]);
    }
  }, [checkRenderList]);

  useEffect(() => {
    if (video && !isPlay) {
      playVideo();
    } else if (video && isPlay) {
      pauseVideo();
    }
  }, [isPlay, video]);

  //play khi vào route
  useEffect(() => {
    if (video && checkMiniVideo) {
      playVideo();
      video.currentTime = currentTimeShared;
      video.volume = JSON.parse(localStorage.getItem("volumevideo")) / 100;
    }
  }, [video, checkMiniVideo]);

  // Play & pause video
  const playVideo = () => {
    video.play();
    updateOnTime();
    onEnded();
  };
  const pauseVideo = () => {
    video.pause();
    updateOnTime();
  };

  //update Video
  const updateOnTime = () => {
    video.ontimeupdate = () => {
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
  };

  const prevVideo = () => {
    getIndex();
    if (i === 0) {
      i = length - 1;
    } else {
      i = i - 1;
    }
    setIdVideo(canListen[i].encodeId);
  };

  useEffect(() => {
    if (checkWidthVideo) {
      playVideo();
    }
  }, [checkWidthVideo]);

  //change Video
  const handleChangeVideo = (e) => {
    setWidthVideo(e.target.value);
    setSaveWidthVideo(e.target.value);
    setCurrentTimeShared(video.currentTime);
    let seekTime = (e.target.value / 100) * video.duration;
    video.currentTime = seekTime;
    setCheckWidthVideo(true);
  };
  return (
    <>
      <video
        className="tag__video__mini"
        src={loaderSong ? "" : dataVideo.streaming.mp4["720p"]}
        ref={Ref}
      ></video>
      <div className="full__option__mini">
        <div className="option1__mini__video">
          <div
            className="unmini__video ldt__before__-20 ldt__after__10"
            data-title="Phóng to"
          >
            <i
              className="fa-solid fa-up-right-and-down-left-from-center"
              onClick={() => {
                setCheckMiniVideo(false);
                navigate(dataVideo.link);
                setChangeMiniVideToVideo(true);
              }}
            ></i>
          </div>
          <div
            className="close__video ldt__before__-20 ldt__after__10"
            data-title="Đóng"
          >
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                setCheckMiniVideo(false);
                setIdVideo("");
                if (localStorage.getItem("idSong")) setCheckChangeVideo(false);
              }}
            ></i>
          </div>
        </div>
        <div className="option2__mini__video">
          <div className="btn__option__bottom">
            <div className="item__btn__bottom">
              <i className="fa-solid fa-backward-step" onClick={prevVideo}></i>
            </div>
            <div
              className="item__btn__bottom item__btn__play"
              onClick={() => {
                setIsPlay(!isPlay);
              }}
            >
              {!isPlay ? (
                <i className="fa-solid fa-pause"></i>
              ) : (
                <i className="fa-solid fa-play"></i>
              )}
            </div>
            <div className="item__btn__bottom">
              <i className="fa-solid fa-forward-step" onClick={nextVideo}></i>
            </div>
          </div>
        </div>
        <div className="option3__mini__video">
          <div className="media__duration__bar mini__curentime">
            <input
              type="range"
              min="0"
              max="100"
              value={checkWidthVideo ? saveWidthVideo : widthVideo}
              onChange={handleChangeVideo}
            />
            <div className="current__time">
              <div
                className="step__time"
                style={{
                  width: `${checkWidthVideo ? saveWidthVideo : widthVideo}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagVideo;
