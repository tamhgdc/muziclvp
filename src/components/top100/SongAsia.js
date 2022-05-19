import React, { useContext } from "react";
import SingerItem from "../Home/SingerItem";
import { Link } from "react-router-dom";
import { PlayListContext } from "../../contexts/PlayListContextProvider";

const SongAsia = ({ playList }) => {
  const { setIdPlayList } = useContext(PlayListContext);

  return (
    <div className="columns">
      {playList.items.map((item, index) => {
        if (index < 5) {
          return (
            <div key={index} className="top__100__item mt-20">
              <Link
                className="cate"
                to={item.link}
                onClick={() => setIdPlayList(item.encodeId)}
              >
                <figure className="figure-cate">
                  <img src={item.thumbnail} alt="" />
                  <div className="icon__top__song">
                    <div className="media__narrow">
                      <div>
                        <i className="fa-solid fa-heart"></i>
                      </div>
                    </div>
                    <span className="controller__itemmedia play__item">
                      <i className="far fa-play-circle"></i>
                    </span>
                    <div className="media__narrow">
                      <div>
                        <div className="np__menu__option">● ● ●</div>
                      </div>
                    </div>
                  </div>
                </figure>
              </Link>
              <div className="cate-song-singer title__playlist__selection">
                <a className="cate-song" href="" style={{ display: "block" }}>
                  {item.title}
                </a>
                <div className="name__singer__all">
                  {item.artists.map((artist, index) => {
                    return <SingerItem artist={artist} key={index} />;
                  })}
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default SongAsia;
