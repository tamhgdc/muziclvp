import React, { useContext } from "react";
import SingerItem from "../../components/Home/SingerItem";
import { Link } from "react-router-dom";
import { PlayListContext } from "../../contexts/PlayListContextProvider";

const SongVN = ({ playList }) => {
  const { setIdPlayList, idPlayList, checkPlayAudio } =
    useContext(PlayListContext);

  return (
    <div className="columns">
      {playList.items.map((item, index) => {
        return (
          <div key={index} className="top__100__item mt-20">
            <Link
              className="cate"
              to={item.link}
              onClick={() => setIdPlayList(item.encodeId)}
            >
              <figure className="figure-cate">
                <img src={item.thumbnail} alt="" />
                <div
                  className="icon__top__song"
                  style={{
                    display: `${
                      item.encodeId === idPlayList && checkPlayAudio
                        ? "flex"
                        : ""
                    }`,
                  }}
                >
                  <div className="media__narrow">
                    <div>
                      <i className="fa-solid fa-heart"></i>
                    </div>
                  </div>
                  <span className="controller__itemmedia play__item">
                    {item.encodeId === idPlayList && checkPlayAudio ? (
                      <span className="gif__play">
                        <img
                          src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                          alt=""
                        />
                      </span>
                    ) : (
                      <i className="far fa-play-circle"></i>
                    )}
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
                {item.artists.map((artist) => {
                  return <SingerItem artist={artist} key={artist.id} />;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SongVN;
