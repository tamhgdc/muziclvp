import React from "react";

const TagVideoLoader = () => {
  return (
    <>
      <video className="tag__video__mini" src=""></video>
      <div className="full__option__mini">
        <div className="option1__mini__video" style={{ display: "none" }}>
          <div className="unmini__video">
            <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
          </div>
          <div className="close__video">
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="option2__mini__video" style={{ display: "none" }}>
          <div className="btn__option__bottom">
            <div className="item__btn__bottom">
              <i className="fa-solid fa-backward-step"></i>
            </div>
            <div className="item__btn__bottom item__btn__play">
              <i className="fa-solid fa-play"></i>
            </div>
            <div className="item__btn__bottom">
              <i className="fa-solid fa-forward-step"></i>
            </div>
          </div>
        </div>
        <div className="option3__mini__video">
          <div className="media__duration__bar mini__curentime">
            <input type="range" min="0" max="100" />
            <div className="current__time">
              <div className="step__time" style={{ width: `0%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagVideoLoader;
