import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PlayListContext } from "../../contexts/PlayListContextProvider";

const OutStanding = ({ playList }) => {
  const { setIdPlayList } = useContext(PlayListContext);

  return (
    <div className="item__playlist__selection">
      <Link to={playList.link} onClick={() => setIdPlayList(playList.encodeId)}>
        <div className="img__playlist__selection">
          <img src={playList.thumbnail} alt="" />

          <div className="option__playlist__selection">
            <div className="option__selection library__add__selection">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="option__selection item__play__selection">
              <i className="fa-solid fa-play"></i>
            </div>
            <div className="option__selection item__option__selection">
              <div className="option__icon__selection">● ● ●</div>
            </div>
          </div>
        </div>
      </Link>
      <div className="title__playlist__selection">
        <a href=" " className="title__one__line">
          {playList.title}
        </a>
        <div className="name__singer__all">{playList.sortDescription}</div>
      </div>
    </div>
  );
};

export default OutStanding;
