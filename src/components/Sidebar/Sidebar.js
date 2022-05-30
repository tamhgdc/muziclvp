import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { MvContext } from "../../contexts/MvContextProvider";
import { HomeContext } from "../../contexts/HomeContextProvider";
import { useNavigate } from "react-router-dom";
import { VideoContext } from "../../contexts/VideoContextProvider";

const Sidebar = () => {
  const { setId } = useContext(MvContext);
  const { setLoadPage } = useContext(HomeContext);
  const { checkMiniVideo } = useContext(VideoContext);
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="navbar">
        <div className="navbar__logo">
          <span>
            <img
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
              alt="logo"
              onClick={() => {
                setLoadPage(false);
                navigate("/");
              }}
            />
          </span>
        </div>
        <div className="navbar__menu">
          <ul className="navbar__menu__one">
            <li className={`menu__item`}>
              <NavLink to="/personal">
                <div className="btn__random__song">
                  <i className="fas fa-random"></i>
                </div>
                <i className="fa-solid fa-tv"></i> Cá Nhân
              </NavLink>
            </li>

            <li
              className={`menu__item`}
              onClick={() => {
                setLoadPage(false);
              }}
            >
              <NavLink to="/">
                <i className="fa-solid fa-compact-disc"></i> Khám Phá
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/zingchart">
                <div className="btn__random__song">
                  <i className="fas fa-random"></i>
                </div>
                <i className="fa-solid fa-chart-line"></i> #zingchart
              </NavLink>
            </li>
            <li className="menu__item">
              <a href="#">
                <div className="btn__random__song">
                  <i className="fas fa-random"></i>
                </div>
                <i className="fa-solid fa-podcast"></i> Radio
                <span className="menu__img__live">
                  <img
                    src="https://zjs.zmdcdn.me/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg"
                    alt=""
                  />
                </span>
              </a>
            </li>
            <li className="menu__item">
              <NavLink to="/follow">
                <i className="fa-solid fa-file-invoice"></i> Theo Dõi
              </NavLink>
            </li>
          </ul>
          <div className="navbar__underlined"></div>
          <ul
            className="sidebar__scrollbar"
            style={{
              height: `${
                localStorage.getItem("idSong") && !checkMiniVideo ? "" : "100%"
              }`,
            }}
          >
            <li className={`menu__item`}>
              <div className="btn__random__song">
                <i className="fas fa-random"></i>
              </div>
              <NavLink to="/newsong">
                <div className="btn__random__song">
                  <i className="fas fa-random"></i>
                </div>
                <i className="fa-solid fa-music"></i> Nhạc Mới
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/category">
                <div className="icon__category">
                  <i className="item__category1 fa-regular fa-square"></i>
                  <i className="item__category2 fa-regular fa-circle"></i>
                  <i className="item__category3 fa-regular fa-heart"></i>
                  <i className="item__category4 fa-solid fa-play"></i>
                </div>
                Thể Loại
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/top100">
                <i className="fa-regular fa-star"></i> Top 100
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/the-loai-video" onClick={() => setId("IWZ9Z08I")}>
                <span className="mv__item">MV</span> MV
              </NavLink>
            </li>
            <div className="vip__banner__side">
              <div className="vip__banner__title">
                Nghe nhạc không quảng cáo cùng kho nhạc VIP
              </div>
              <Link to="#" className="vip__upgrade">
                NÂNG CẤP VIP
              </Link>
            </div>
            <li className="menu__item list__library">
              <a>
                Thư viện
                <div className="filter__library">
                  <i className="fa-solid fa-pen"></i>
                </div>
              </a>
              <ul className="list__library__item">
                <li className="menu__item">
                  <Link to="#">
                    <span className="icon__library">
                      <img
                        src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-song.cf0cb0b4.svg"
                        alt=""
                      />
                    </span>
                    <div className="btn__random__song">
                      <i className="fas fa-random"></i>
                    </div>
                    <span>Bài hát</span>
                  </Link>
                </li>
                <li className="menu__item">
                  <Link to="#">
                    <span className="icon__library">
                      <img
                        src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-playlist.7e92a5f0.svg"
                        alt=""
                      />
                    </span>
                    <span>Playlist</span>
                  </Link>
                </li>
                <li className="menu__item">
                  <Link to="#">
                    <span className="icon__library">
                      <img
                        src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-album.24e3332b.svg"
                        alt=""
                      />
                    </span>
                    <span>Album</span>
                  </Link>
                </li>
                <li className="menu__item">
                  <Link to="#">
                    <span className="icon__library">
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                    </span>
                    <span>Nhạc tải lên</span>
                  </Link>
                </li>
                <li className="menu__item">
                  <Link to="#">
                    <span className="icon__library">
                      <img
                        src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg"
                        alt=""
                      />
                    </span>
                    <span>Gần đây</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div
          className="add__playlist__sidebar"
          style={{
            bottom: `${
              localStorage.getItem("idSong") && !checkMiniVideo ? "" : "10px"
            }`,
          }}
        >
          <i className="fa-solid fa-plus"></i>
          <span>Tạo playlist mới</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
