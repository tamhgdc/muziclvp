import React, { useEffect, useState, useRef } from "react";
import avatar from "../../assets/images/avatar.jpg";

let useClickOutSide = (handler) => {
  let domNode = useRef();
  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Header = () => {
  const [isDisplay, setIsDisplay] = useState(false);

  const [isFullscreen, setIsFullScreen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [musicQuality, setMusicQuality] = useState(false);

  let domNode = useClickOutSide(() => {
    setIsDisplay(false);
  });

  return (
    <div className="header">
      <div className="header__menu">
        <div className="header__left">
          <div className="move__arow">
            <a href="#">
              <i className="fa-solid fa-arrow-left"></i>
            </a>
            <a href="#">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div className="search__input">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
            />
          </div>
        </div>
        <div className="header__right">
          <div className="item__header">
            <i className="fa-solid fa-shirt"></i>
          </div>
          <div className="item__header">
            <i className="fa-solid fa-gem"></i>
          </div>
          <div className="item__header">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </div>
          <div className="item__header item__header__setting" ref={domNode}>
            <i
              className="fa-solid fa-gear"
              onClick={() => {
                setIsDisplay(!isDisplay);
              }}
            ></i>
            {isDisplay && (
              <div className="setting" style={{ display: "block" }}>
                <ul className="setting__one">
                  <li>
                    <i className="fa-solid fa-ban"></i>
                    Danh sách chặn
                  </li>
                  <li>
                    <span className="setting__resolution">HQ</span>
                    Chất lượng âm nhạc
                    <nav>
                      <i className="fa-solid fa-angle-right"></i>
                    </nav>
                    <div className="setting__child">
                      <ul>
                        <li onClick={() => setMusicQuality(true)}>
                          SQ ● 128
                          <div className="resolution__sub">
                            <span className="resolution__sub__title">
                              Giảm sử dụng dữ liệu cho các kết nối chậm hơn.
                            </span>
                          </div>
                          {musicQuality && (
                            <span className="ischeck">
                              <i className="fa-solid fa-check"></i>
                            </span>
                          )}
                        </li>
                        <li onClick={() => setMusicQuality(false)}>
                          HQ ● 320
                          <div className="resolution__sub">
                            <span className="resolution__sub__title">
                              Kết hợp tốt nhất giữa việc sử dụng dữ liệu và chất
                              lượng âm thanh.
                            </span>
                          </div>
                          {!musicQuality && (
                            <span className="ischeck">
                              <i className="fa-solid fa-check"></i>
                            </span>
                          )}
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="setting__theme">
                    <i className="fa-regular fa-circle-play"></i>
                    Giao diện
                    <nav>
                      <i className="fa-solid fa-angle-right"></i>
                    </nav>
                    <div className="setting__theme__list">
                      <ul>
                        <li onClick={() => setIsFullScreen(!isFullscreen)}>
                          <div className="setting__theme__item">
                            <span>Luôn phát nhạc toàn màn hình</span>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={isFullscreen}
                                onChange={() => setIsFullScreen(isFullscreen)}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </li>
                        <li onClick={() => setIsChecked(!isChecked)}>
                          <div className="setting__theme__item">
                            <span>Hiệu ứng</span>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => setIsChecked(isChecked)}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <ul className="setting__one setting__two">
                  <li>
                    <i className="fa-solid fa-circle-exclamation"></i>
                    Giới thiệu
                  </li>
                  <li>
                    <i className="fa-solid fa-font-awesome"></i>
                    Góp ý
                  </li>
                  <li>
                    <i className="fa-solid fa-phone"></i>
                    Liên hệ
                  </li>
                  <li>
                    <i className="fa-solid fa-rectangle-ad"></i>
                    Quảng cáo
                  </li>
                  <li>
                    <i className="fa-solid fa-file-lines"></i>
                    Thỏa thuận sử dụng
                  </li>
                  <li>
                    <i className="fa-solid fa-shield-halved"></i>
                    Chính sách bảo mật
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="item__header">
            <img src={avatar} alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
