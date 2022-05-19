import MainLayout from "../../layout/MainLayout";
import React from "react";
import "./personal.css";
import PlayList from "../../components/personal/PlayList";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Personal = () => {
  const location = useLocation();

  return (
    <MainLayout>
      <div className="content">
        <div className="title__library">
          Thư viện
          <span className="icon__play__library">
            <i className="fa-solid fa-play"></i>
          </span>
        </div>
        <div className="playlist__library">
          <div className="title__playlist__library">
            <div className="title__playlist__left">
              <span>playlist</span>
              <span className="icon__playlist__left">
                <i className="fa-solid fa-plus"></i>
              </span>
            </div>
            <div className="title__playlist__reight">
              <span>tất cả</span>
              <span className="icon__playlist__reight">
                <i className="fa-solid fa-angle-right"></i>
              </span>
            </div>
          </div>
          <PlayList />

          <div className="menu__library">
            <ul>
              <li className={`item__menu__library`}>
                <NavLink
                  className={`${
                    location.pathname == "/personal" ? "active" : ""
                  }`}
                  to="/personal/song"
                >
                  bài hát
                </NavLink>
              </li>
              <li className={`item__menu__library`}>
                <NavLink to="/personal/podcast">podcast</NavLink>
              </li>
              <li className={`item__menu__library `}>
                <NavLink to="/personal/album">ALBUM</NavLink>
              </li>
              <li className={`item__menu__library`}>
                <NavLink to="/personal/mv">MV</NavLink>
              </li>
            </ul>
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Personal;
