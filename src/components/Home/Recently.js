import React from "react";

const Recently = () => {
  return (
    <>
      <div className="item__playlist__selection">
        <a href="#">
          <div className="img__playlist__selection">
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/0/6/8/3/0683cf03b2c1f2e169a9439aea0b3d62.jpg"
              alt=""
            />

            <div className="option__playlist__selection">
              <div className="option__selection library__add__selection">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="option__selection item__play__selection">
                {/* <i className="fa-solid fa-play"></i> */}
                <span className="gif__play">
                  <img
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                    alt=""
                  />
                </span>
              </div>
              <div className="option__selection item__option__selection">
                <div className="option__icon__selection">● ● ●</div>
              </div>
            </div>
          </div>
        </a>
        <div className="title__playlist__selection">
          <a href="#" className="title__tow__line">
            Cả Một Trời Thương Nhớ (Live in HOA Concert)
          </a>
        </div>
      </div>
    </>
  );
};

export default Recently;
