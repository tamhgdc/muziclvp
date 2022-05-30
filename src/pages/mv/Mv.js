import React, { useContext } from "react";
import "./mv.css";
import MainLayout from "../../layout/MainLayout";
import { MvContext } from "../../contexts/MvContextProvider";
import HomeLoader from "../../components/Home/HomeLoader";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { VideoContext } from "../../contexts/VideoContextProvider";

const Mv = () => {
  const { loader, setId } = useContext(MvContext);
  const location = useLocation();
  const { checkMiniVideo } = useContext(VideoContext);

  return (
    <MainLayout>
      {loader ? (
        <HomeLoader />
      ) : (
        <div
          className="content"
          style={{
            height: `${
              localStorage.getItem("idSong") && !checkMiniVideo
                ? ""
                : "calc(100vh - 70px)"
            }`,
          }}
        >
          <div className="navbar__mv">
            <h3>mv</h3>
            <ul>
              <li className="active__check" onClick={() => setId("IWZ9Z08I")}>
                <NavLink
                  to="IWZ9Z08I"
                  className={
                    location.pathname === "/the-loai-video" && "active"
                  }
                >
                  việt nam
                </NavLink>
              </li>
              <li className="active__check" onClick={() => setId("IWZ9Z08O")}>
                <NavLink to="IWZ9Z08O">us-uk</NavLink>
              </li>
              <li className="active__check" onClick={() => setId("IWZ9Z08W")}>
                <NavLink to="IWZ9Z08W">kpop</NavLink>
              </li>
              <li className="active__check" onClick={() => setId("IWZ9Z086")}>
                <NavLink to="IWZ9Z086">hòa tấu</NavLink>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      )}
    </MainLayout>
  );
};

export default Mv;
