import React from "react";

const ZingChoice = ({ item, index }) => {
  return (
    <div className="item__favorite__artist">
      <a href="#">
        <img src={item.thumbnail} alt="" />
        <span className="opacity__img__channel"></span>
        <div className="option__playlist__selection">
          <div className="option__selection item__play__selection favorite__artist__option">
            <i className="fa-solid fa-play"></i>
            {/* <span className="gif__play">
                                        <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                                            alt=""/>
                                    </span>  */}
          </div>
        </div>
        <div className="mix__content">
          <div className="sub__mix__content">
            {index === 0
              ? "Có thể bạn yêu thích"
              : index === 1
              ? "vì bạn nghe nhiều"
              : "bạn nghe gần đây"}
          </div>
          <div className="title__mix__content">{item.artistsNames}</div>
          <div className="thumbs__mix__content">
            {item.song.items.map((a, index) => {
              return (
                <div key={index} className="item__thumb__mix">
                  <img src={a.thumbnail} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ZingChoice;
