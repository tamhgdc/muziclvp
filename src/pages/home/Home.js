import React, { useContext } from "react";
import GalleryCarousel from "../../components/Home/GalleryCarousel";
import MainLayout from "../../layout/MainLayout";
import ItemPlayList from "../../components/Home/ItemPlayList";
import "./home.css";
import Radio from "../../components/Home/Radio";
import SingerCarousel from "../../components/Home/SingerCarousel";
import EventChanel from "../../components/Home/EventChanel";
import MixtapItem from "../../components/Home/MixtapItem";
import NewRelease from "../../components/Home/NewRelease";
import ZingChart from "../../components/Home/zingchart-home/ZingChart";
import HomeLoader from "../../components/Home/HomeLoader";
import ZingChoice from "../../components/Home/ZingChoice";
import { HomeContext } from "../../contexts/HomeContextProvider";
import { VideoContext } from "../../contexts/VideoContextProvider";

const Home = () => {
  const { dataHome, loader, loader2, lazyLoading } = useContext(HomeContext);
  const { checkMiniVideo } = useContext(VideoContext);

  return (
    <MainLayout>
      {loader ? (
        <HomeLoader />
      ) : (
        <div
          className="content"
          onScroll={lazyLoading}
          style={{
            height: `${
              localStorage.getItem("idSong") && !checkMiniVideo
                ? ""
                : "calc(100vh - 70px)"
            }`,
          }}
        >
          <div className="gallery">
            <GalleryCarousel banner={dataHome[0]} />

            <div className="playlist__selection">
              <div className="header__playlist__selection">
                <span>Gần Đây</span>
                <div className="btn__view__all">
                  TẤT CẢ <i className="fa-solid fa-angle-right"></i>
                </div>
              </div>
              <div className="list__playlist__selection">
                {dataHome[5].items.map((item, index) => {
                  if (index <= 4) {
                    return (
                      <ItemPlayList
                        playList={item}
                        key={index}
                        checkTitle={true}
                      />
                    );
                  }
                })}
              </div>
            </div>

            <div className="playlist__selection">
              <div className="header__playlist__selection">
                <span>Có Thể Bạn Muốn Nghe</span>
              </div>
              <div className="list__playlist__selection">
                {dataHome[3].items.map((item, index) => {
                  if (index <= 4) {
                    return (
                      <ItemPlayList
                        playList={item}
                        key={index}
                        checkTitle={false}
                      />
                    );
                  }
                })}
              </div>
            </div>

            <div className="playlist__selection">
              <div className="header__playlist__selection">
                <span>Lựa Chọn Hôm Nay</span>
              </div>
              <div className="list__playlist__selection">
                {dataHome[4].items.map((item, index) => {
                  if (index <= 4) {
                    return (
                      <ItemPlayList
                        playList={item}
                        key={index}
                        checkTitle={true}
                      />
                    );
                  }
                })}
              </div>
            </div>

            <div className="playlist__selection">
              <div className="header__playlist__selection">
                <span>XONE's CORNER</span>
              </div>
              <div className="list__playlist__selection">
                {dataHome[5].items.map((item, index) => {
                  if (index <= 4) {
                    return (
                      <ItemPlayList
                        playList={item}
                        key={index}
                        checkTitle={true}
                      />
                    );
                  }
                })}
              </div>
            </div>

            {loader2 ? (
              <div>ha</div>
            ) : (
              <>
                <div className="audio__selection">
                  <div className="header__playlist__selection">
                    <span>Radio Nổi Bật</span>
                    <div className="btn__view__all">
                      TẤT CẢ <i className="fa-solid fa-angle-right"></i>
                    </div>
                  </div>
                  {dataHome[6].items && <Radio playList={dataHome[6]} />}
                </div>

                <div className="playlist__selection">
                  <div className="header__playlist__selection">
                    <div className="fan__playlist__selection">
                      <a href="#" className="fan__playlist__img">
                        <img
                          src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/b/d/e/c/bdec30800a424a4ab622294453dd31c7.jpg"
                          alt=""
                        />
                      </a>
                      <div className="fan__playlist__subtitle">
                        <span>Dành Cho fan</span>
                        <div className="name__singer__fan">
                          <a href="#">Anh Quân Idol</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list__playlist__selection">
                    {dataHome[5].items &&
                      dataHome[5].items.map((item, index) => {
                        if (index <= 4) {
                          return (
                            <ItemPlayList
                              playList={item}
                              key={index}
                              checkTitle={true}
                            />
                          );
                        }
                      })}
                  </div>
                </div>

                <div className="playlist__selection">
                  <div className="header__playlist__selection">
                    <span>Nhạc Mới Mỗi Ngày</span>
                  </div>
                  <div className="list__playlist__selection">
                    {dataHome[7].items &&
                      dataHome[7].items.map((item, index) => {
                        if (index <= 4) {
                          return (
                            <ItemPlayList
                              playList={item}
                              key={index}
                              checkTitle={false}
                            />
                          );
                        }
                      })}
                  </div>
                </div>
                {dataHome[8].items && <ZingChart playList={dataHome[8]} />}

                <div className="option__zingchart">
                  <div className="item__option__zingchart">
                    <a href="#">
                      <img
                        src="https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/song-vn-2x.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="item__option__zingchart">
                    <a href="#">
                      <img
                        src="https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/web_song_usuk.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="item__option__zingchart">
                    <a href="#">
                      <img
                        src="https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/web_song_kpop.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                </div>

                <div className="zma__section">
                  <SingerCarousel />
                </div>

                <div className="playlist__selection">
                  <div className="header__playlist__selection">
                    <span>Top 100</span>
                    <div className="btn__view__all">
                      TẤT CẢ <i className="fa-solid fa-angle-right"></i>
                    </div>
                  </div>
                  <div className="list__playlist__selection">
                    {dataHome[11].items &&
                      dataHome[11].items.map((item, index) => {
                        if (index <= 4) {
                          return (
                            <ItemPlayList
                              playList={item}
                              key={index}
                              checkTitle={false}
                            />
                          );
                        }
                      })}
                  </div>
                </div>

                <EventChanel playList={dataHome[12]} />

                <div className="playlist__selection">
                  <div className="header__playlist__selection">
                    <span>Mixtape Yêu Thích</span>
                  </div>
                  <div className="list__playlist__selection">
                    <MixtapItem />
                  </div>
                </div>

                <div className="playlist__selection">
                  <div className="header__playlist__selection">
                    <span>Mới phát hành</span>
                    <div className="btn__view__all">
                      TẤT CẢ <i className="fa-solid fa-angle-right"></i>
                    </div>
                  </div>
                  <div className="new__release">
                    {dataHome[13].items && (
                      <NewRelease playList={dataHome[13]} />
                    )}
                  </div>
                  <div className="list__playlist__selection">
                    {dataHome[15].items &&
                      dataHome[15].items.map((item, index) => {
                        if (index <= 4) {
                          return (
                            <ItemPlayList
                              playList={item}
                              key={index}
                              checkTitle={false}
                            />
                          );
                        }
                      })}
                  </div>
                </div>

                <div className="playlist__selection">
                  <div className="header__playlist__selection">
                    <span>nghệ sĩ Zing Choice</span>
                  </div>
                  <div className="list__playlist__selection">
                    <div className="favorite__artist">
                      {dataHome[16] &&
                        dataHome[16].items.map((item, index) => {
                          if (index < 3) {
                            return (
                              <ZingChoice
                                key={index}
                                item={item}
                                index={index}
                              />
                            );
                          }
                        })}
                    </div>
                  </div>
                </div>

                <div className="music__partner">
                  <div className="title__music__partner">đối tác âm nhạc</div>
                  <div className="logos__partner">
                    <div className="item__logo__partner">
                      <img
                        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/yg.png"
                        alt=""
                      />
                    </div>
                    <div className="item__logo__partner">
                      <img
                        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/Kakao-M.png"
                        alt=""
                      />
                    </div>
                    <div className="item__logo__partner">
                      <img
                        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/universal-1.png"
                        alt=""
                      />
                    </div>
                    <div className="item__logo__partner">
                      <img
                        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/sony.png"
                        alt=""
                      />
                    </div>
                    <div className="item__logo__partner">
                      <img
                        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/FUGA.png"
                        alt=""
                      />
                    </div>
                    <div className="item__logo__partner">
                      <img
                        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/SM-Entertainment.png"
                        alt=""
                      />
                    </div>
                    <div className="item__logo__partner">
                      <img
                        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/monstercat.png"
                        alt=""
                      />
                    </div>
                    <div className="item__logo__partner">
                      <img
                        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/beggers.png"
                        alt=""
                      />
                    </div>
                    <div className="item__logo__partner">
                      <img
                        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/empire.png"
                        alt=""
                      />
                    </div>
                    <div className="item__logo__partner">
                      <img
                        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/orcahrd.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
