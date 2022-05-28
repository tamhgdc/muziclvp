import React, { useContext } from "react";
import SingerItem from "../Home/SingerItem";
import { useNavigate } from "react-router-dom";
import { VideoContext } from "../../contexts/VideoContextProvider";
import { PlayListContext } from "../../contexts/PlayListContextProvider";

const MvSearch = ({ playList }) => {
  const { setIdVideo, setCheckRenderList, setCheckChangeVideo } =
    useContext(VideoContext);
  const { setCheckModalVip } = useContext(PlayListContext);
  const navigate = useNavigate();

  const handleClickVideo = (item) => {
    if (item.streaming) {
      navigate(item.link);
      setIdVideo(item.encodeId);
      localStorage.setItem("idVideo", JSON.stringify(item.encodeId));
      setCheckRenderList(true);
      setCheckChangeVideo(true);
    } else {
      setCheckModalVip(true);
    }
  };

  return (
    <div className="columns__mv">
      {playList.map((item, index) => {
        if (index < 3) {
          return (
            <div key={index} className="column__mv mt-20 video__search">
              <div onClick={() => handleClickVideo(item)}>
                <div className="image__mv">
                  <img src={item.thumbnail} alt="" />
                  <span className="controller__itemmedia play__item">
                    <i className="far fa-play-circle"></i>
                  </span>
                </div>
              </div>

              <div className="profile">
                <div className="avatar__profile">
                  <img src={item.artist.thumbnail} alt="" />
                </div>
                <div className="profle__content">
                  <p>
                    <a href="">{item.title}</a>{" "}
                  </p>
                  <div className="name__singer__all">
                    {item.artists.map((artist) => {
                      return <SingerItem artist={artist} key={artist.id} />;
                    })}
                  </div>
                </div>
              </div>
              {item.streamingStatus === 2 && (
                <div className="video__vip">Vip</div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default MvSearch;
