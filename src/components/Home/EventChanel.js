import React, { useState } from "react";

const EventChanel = ({ playList }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="playlist__selection">
      <div className="header__playlist__selection">
        <span>sự kiện</span>
        <div className="btn__channel">
          <span
            className={`btn__channel__prev ${
              !isActive ? "unprev__channel" : ""
            }`}
            onClick={() => setIsActive(false)}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </span>
          <span
            className={`btn__channel__next ${
              isActive ? "unprev__channel" : ""
            }`}
            onClick={() => setIsActive(true)}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </span>
        </div>
      </div>
      <div className="channel__selection">
        <div
          className="list__channel__selection"
          style={{
            transform: `${
              isActive ? "translate3d(-352px, 0 ,0)" : "translate3d(0, 0 ,0)"
            }`,
          }}
        >
          {playList.items.map((item, index) => {
            if (index < 4) {
              return (
                <div key={index} className="item__channel__selection">
                  <div className="img__channel__selection">
                    <img src={item.coverH} alt="" />
                    <span className="opacity__img__channel"></span>
                    <div className="item__tag__title">
                      <div className="tag__channel">{item.label}</div>
                      <div className="title__channel">{item.title}</div>
                      <div className="subtitle__channel">{item.startText}</div>
                    </div>
                  </div>
                  <div className="event__follow">
                    <div className="event__follow__left">
                      <div className="subtitle__follow">Lượt quan tâm</div>
                      <div className="user__follow">
                        <div className="count__follow">+{item.totalFollow}</div>
                        {item?.followers.map((i) => {
                          return (
                            <div key={i.id} className="user__item">
                              <img src={i.avatar} alt="" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="event__follow__right">
                      <span className="follower__discover">quan tâm</span>
                      {/* <span className="active__follower">Đã quan tâm</span> */}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default EventChanel;
