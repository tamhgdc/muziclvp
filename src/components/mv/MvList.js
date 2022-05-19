import React, { useContext } from "react";
import SingerItem from "../../components/Home/SingerItem";
import { useNavigate } from "react-router-dom";
import { VideoContext } from "../../contexts/VideoContextProvider";

const MvList = ({ playList }) => {
  const { setIdVideo, setCheckRenderList } = useContext(VideoContext);
  const navigate = useNavigate();

  const handleClickVideo = (item) => {
    navigate(item.link);
    setIdVideo(item.encodeId);
    localStorage.setItem("idVideo", JSON.stringify(item.encodeId));
    setCheckRenderList(true);
  };

  return (
    <div className="columns__mv">
      {playList.items.map((item, index) => {
        return (
          <div key={index} className="column__mv mt-20">
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
          </div>
        );
      })}
    </div>
  );
};

export default MvList;
