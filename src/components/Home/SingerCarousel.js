import React, { useState } from "react";

const SingerCarousel = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="carousel__wapper">
      <div
        className="zma__list__item"
        style={{
          transform: `${isActive ? "translate3d(-580px, 0 ,0)" : ""}`,
        }}
      >
        <div className="item__zma">
          <a href="#">
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png"
              alt=""
            />
          </a>
        </div>
        <div className="item__zma">
          <a href="#">
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png"
              alt=""
            />
          </a>
        </div>
        <div className="item__zma">
          <a href="#">
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png"
              alt=""
            />
          </a>
        </div>
        <div className="item__zma">
          <a href="#">
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png"
              alt=""
            />
          </a>
        </div>
        <div className="item__zma">
          <a href="#">
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png"
              alt=""
            />
          </a>
        </div>
        <div className="item__zma">
          <a href="#">
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png"
              alt=""
            />
          </a>
        </div>
        <div className="item__zma">
          <a href="#">
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png"
              alt=""
            />
          </a>
        </div>
        <div className="item__zma">
          <a href="#">
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png"
              alt=""
            />
          </a>
        </div>
        <div className="item__zma">
          <a href="#">
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png"
              alt=""
            />
          </a>
        </div>
        <div className="item__zma">
          <a href="#">
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png"
              alt=""
            />
          </a>
        </div>
        <div className="item__zma">
          <a href="#">
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png"
              alt=""
            />
          </a>
        </div>
      </div>
      <div
        className={`btn__radio__prev ${!isActive ? "unprev__carousel" : ""}`}
        onClick={() => setIsActive(false)}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <div
        className={`btn__radio__next ${isActive ? "unprev__carousel" : ""}`}
        onClick={() => {
          if (isActive) {
            return setIsActive(false);
          }
          setIsActive(true);
        }}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default SingerCarousel;
