import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SingerItem from "./SingerItem";
import { PlayListContext } from "../../contexts/PlayListContextProvider";

const ItemPlayList = ({ playList, checkTitle }) => {
  const { setIdPlayList, idPlayList, checkPlayAudio } =
    useContext(PlayListContext);

  const handlePlaylist = () => {
    setIdPlayList(playList.encodeId);
  };
  return (
    <div className="item__playlist__selection">
      <Link to={`${playList.link}`} onClick={handlePlaylist}>
        <div className="img__playlist__selection">
          <img src={playList.thumbnail} alt="" />

          <div
            className="option__playlist__selection"
            style={{
              opacity: `${
                playList.encodeId === idPlayList && checkPlayAudio ? "1" : ""
              }`,
            }}
          >
            <div className="option__selection library__add__selection">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="option__selection item__play__selection">
              {playList.encodeId === idPlayList && checkPlayAudio ? (
                <span className="gif__play">
                  <img
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                    alt=""
                  />
                </span>
              ) : (
                <i className="fa-solid fa-play"></i>
              )}
              {/* <i className="fa-solid fa-play"></i> */}
            </div>
            <div className="option__selection item__option__selection">
              <div className="option__icon__selection">● ● ●</div>
            </div>
          </div>
        </div>
      </Link>
      <div className="title__playlist__selection">
        <a href="#" className="title__one__line">
          {playList.title}
        </a>
        <div className="name__singer__all">
          {!checkTitle ? (
            playList.artists ? (
              playList.artists.map((artist) => {
                return <SingerItem artist={artist} key={artist.id} />;
              })
            ) : (
              <a href="">{playList.artistsNames}</a>
            )
          ) : (
            playList.sortDescription
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemPlayList;
