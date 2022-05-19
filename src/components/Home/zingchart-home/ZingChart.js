import React, { useContext } from "react";
import LibraryZing from "./LibraryZing";
import SingerItem from "../SingerItem";
import { HomeContext } from "../../../contexts/HomeContextProvider";
import { SongContext } from "../../../contexts/SongContextProvider";

const ZingChart = ({ playList }) => {
  const { rank } = useContext(HomeContext);
  const { setIdSong } = useContext(SongContext);

  const handleClickSong = (item) => {
    localStorage.setItem("idSong", JSON.stringify(item.encodeId));
    setIdSong(item.encodeId);
  };

  return (
    <div className="chart__home">
      <div className="bg__img__chart"></div>
      <div className="bg__alpha__chart"></div>
      <div className="selection__header">
        <a href="#" className="zingchart__btn">
          #zingchart
        </a>
        <div className="btn__random__zingchart">
          <i className="fa-solid fa-circle-play"></i>
        </div>
      </div>
      <div className="list__chart__selection">
        <div className="list__zingchart">
          {playList.items.map((item, index) => {
            if (index < 3) {
              return (
                <div
                  key={index}
                  className={`item__list__zingchart ${
                    JSON.parse(localStorage.getItem("idSong")) ===
                      item.encodeId && "active-playlist"
                  }`}
                >
                  <div className="list__zingchart__left">
                    <div className="list__item__zingchart">
                      <div
                        className={`song__prefix ${
                          index == 1
                            ? "song__prefix2"
                            : index == 2
                            ? "song__prefix3"
                            : ""
                        }`}
                      >
                        <span>{index + 1}</span>
                      </div>
                      <div
                        className="song__thumb"
                        onClick={() => handleClickSong(item)}
                      >
                        <img src={item.album.thumbnail} alt="" />

                        <div className="play__zingchart">
                          <i className="fa-solid fa-play"></i>
                        </div>
                      </div>
                      <div className="cart__infor">
                        <div className="subtitle__zingchart">
                          <a href="#" className="title__one__line">
                            {item.title}
                          </a>
                        </div>
                        <div className="name__singer__all singer__zingchart">
                          {item.artists.map((a) => {
                            return <SingerItem key={a.id} artist={a} />;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list__zingchart__right">
                    <span>{Math.round((item.score / rank) * 100)}%</span>
                  </div>
                </div>
              );
            }
          })}

          <div className="view__all__zingchart">
            <span>Xem thêm</span>
          </div>
        </div>
        <div className="chart__zingchart">
          <LibraryZing rank={rank} data={playList} />
        </div>
      </div>
    </div>
  );
};

export default ZingChart;
