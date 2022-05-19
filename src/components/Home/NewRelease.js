import React, { useRef, useEffect } from "react";
import SingerItem from "./SingerItem";

const NewRelease = ({ playList }) => {
  const ref = useRef();
  let today = new Date();
  useEffect(() => {
    let a1;
    let a2;
    let a3;
    let a4;
    if (ref) {
      const AnimationRelease = () => {
        a1 = setTimeout(() => {
          ref.current.classList.add("animation__translate");
          ref.current.style.transform = "translate3d(-1036px, 0px, 0px)";
        }, 5000);

        a2 = setTimeout(() => {
          ref.current.style.transform = "translate3d(-2080px, 0px, 0px)";
        }, 10000);

        a3 = setTimeout(() => {
          ref.current.style.transform = "translate3d(-3121px, 0px, 0px)";
          a4 = setTimeout(() => {
            ref.current.classList.remove("animation__translate");
            ref.current.style.transform = "translate3d( 0px, 0px, 0px)";
          }, 1000);
        }, 15000);
      };
      AnimationRelease();
      let nextAnimationRelease = setInterval(AnimationRelease, 20000);

      return () => {
        clearInterval(nextAnimationRelease);
        clearTimeout(a1);
        clearTimeout(a2);
        clearTimeout(a3);
        clearTimeout(a4);
      };
    }
  }, []);

  return (
    <div className="animation__new__release" ref={ref}>
      {playList.items.map((item, index) => {
        return (
          <div key={index} className="item__new__release">
            <div className="item__release__child">
              <div className="media__release">
                <div className="media__left__release">
                  <div className="img__media">
                    <img src={item.thumbnail} alt="" />
                    <div className="option__playlist__selection">
                      <div className="option__selection item__play__selection">
                        <i className="fa-solid fa-play"></i>
                        {/* <span className="gif__play">
                    <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                        alt=""/>
                </span> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="media__reight__release">
                  <div className="subtitle__release">
                    <a href="#" className="title__one__line">
                      {item.title}
                    </a>
                    <div className="name__singer__all">
                      {item.artists.map((a) => {
                        return <SingerItem key={a.id} artist={a} />;
                      })}
                    </div>
                  </div>
                  <div className="rank__release">
                    <span className="number__rank">#{index + 1}</span>
                    <span className="date__rank">
                      {today.getDate() +
                        "." +
                        (today.getMonth() + 1) +
                        "." +
                        today.getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="item__new__release">
        <a className="view__all__release" href="#">
          Xem tất cả
        </a>
      </div>
      {playList.items.map((item, index) => {
        if (index < 3) {
          return (
            <div key={index} className="item__new__release">
              <div className="item__release__child">
                <div className="media__release">
                  <div className="media__left__release">
                    <div className="img__media">
                      <img src={item.thumbnail} alt="" />
                      <div className="option__playlist__selection">
                        <div className="option__selection item__play__selection">
                          <i className="fa-solid fa-play"></i>
                          {/* <span className="gif__play">
                      <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                          alt=""/>
                  </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="media__reight__release">
                    <div className="subtitle__release">
                      <a href="#" className="title__one__line">
                        {item.title}
                      </a>
                      <div className="name__singer__all">
                        {item.artists.map((a) => {
                          return <SingerItem key={a.id} artist={a} />;
                        })}
                      </div>
                    </div>
                    <div className="rank__release">
                      <span className="number__rank">#{index + 1}</span>
                      <span className="date__rank">
                        {today.getDate() +
                          "." +
                          (today.getMonth() + 1) +
                          "." +
                          today.getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default NewRelease;
