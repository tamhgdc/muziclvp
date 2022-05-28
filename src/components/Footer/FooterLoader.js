import React, { useContext, useEffect } from "react";
import loadingGift from "../../assets/images/loading.gif";
import { VideoContext } from "../../contexts/VideoContextProvider";

const FooterLoader = () => {
  const { checkChangeVideo, setCheckChangeVideo } = useContext(VideoContext);

  useEffect(() => {
    setCheckChangeVideo(true);
  }, []);

  return (
    <div
      className="footer"
      style={{ display: `${checkChangeVideo ? "none" : "flex"}` }}
    >
      <audio></audio>
      <div className="media__left">
        <div className="media__left__item">
          <div className="media__thumbnail">
            <div className="thumbnail"></div>
          </div>
          <div className="content__left">
            <div className="item__song"></div>
            <div className="item__single"></div>
          </div>
          <div className="options__left">
            <div className="media__heart">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="np__menu">
              <div className="np__menu__option">● ● ●</div>
              <ul className="np__menu__children">
                <div className="option__chindren__one">
                  <div className="option__chindren__img">
                    <div>
                      <img src="" alt="" />
                    </div>
                  </div>
                  <div className="option__chindren__sub">
                    <h2>Cả Một Trời Thương Nhớ (Live in HOA Concert)</h2>
                    <div>
                      <span>
                        <i className="fa-regular fa-heart"></i> 6K
                      </span>
                      <span>
                        <i className="fa-solid fa-headphones"></i> 138K
                      </span>
                    </div>
                  </div>
                </div>
                <div className="option__chindren__two">
                  <div className="option__two__item option__chindren__down">
                    <i className="fa-solid fa-download"></i>
                    <div>Tải xuống</div>
                  </div>
                  <div className="option__two__item option__chindren__sing">
                    <i className="fa-solid fa-microphone"></i>
                    <div>Lời bài hát</div>
                  </div>
                  <div className="option__two__item option__chindren__block">
                    <i className="fa-solid fa-ban"></i>
                    <div>Chặn</div>
                  </div>
                </div>
                <li className="active__playlist">
                  <i className="fa-solid fa-circle-plus"></i>
                  <span>
                    Thêm vào playlist{" "}
                    <i className="fa-solid fa-chevron-right"></i>
                  </span>
                  <ul className="form__playList">
                    <div>
                      <input
                        type="text"
                        name="search__playlist"
                        className="search__playlist"
                        placeholder="Tìm playlist"
                      />
                    </div>
                    <li>
                      <i className="fa fa-plus-square"></i> Tạo playlist mới
                    </li>
                    <nav className="list__playlist">
                      <li>
                        <div className="list_playlist__item">
                          <nav>
                            <i className="fa fa-list-ol"></i>
                          </nav>
                          Love
                        </div>
                      </li>
                    </nav>
                  </ul>
                </li>
                <li>
                  <i className="fa fa-microphone"></i>
                  <span>Phát cùng lời bài hát</span>
                </li>
                <li>
                  <i className="fa-solid fa-comment"></i>
                  <span>Bình luận</span>
                </li>
                <li>
                  <i className="fa-solid fa-link"></i>
                  <span>Sao chép link</span>
                </li>
                <li className="option__share">
                  <i className="fa-solid fa-share"></i>
                  <span>
                    Chia sẻ <i className="fa-solid fa-chevron-right"></i>
                  </span>
                  <ul className="item__share">
                    <li className="icon__fb">
                      <i className="fa-brands fa-facebook"></i> Faboock
                    </li>
                    <li className="icon__zalo">
                      <i className="fa-solid fa-comment-dots"></i> Zalo
                    </li>
                    <li>
                      <i className="fa-solid fa-code"></i> Mã nhúng
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="media__content">
        <div className="controller__media">
          <span className="controller__itemmedia">
            <i className="fas fa-random"></i>
          </span>
          <span className="controller__itemmedia">
            <i className="fas fa-step-backward"></i>
          </span>
          <span className="controller__itemmedia play__item">
            <img
              src={loadingGift}
              style={{
                width: "20px",
                height: "20px",
                border: "1px solid white",
                borderRadius: "50%",
                padding: "8px",
              }}
            />
          </span>

          <span className="controller__itemmedia">
            <i className="fas fa-step-forward"></i>
          </span>
          <span className="controller__itemmedia">
            <i className="fas fa-redo"></i>
          </span>
        </div>
        <div className="media__duration__bar">
          <div className="time__start">00:00</div>
          <input type="range" min="0" max="100" />
          <div className="current__time">
            <div className="step__time"></div>
          </div>
          <div className="time__end">00:00</div>
        </div>
      </div>
      <div className="media__right">
        <div className="media__narrow unclick">
          <div className="mv__item">MV</div>
        </div>
        <div className="media__narrow">
          <div>
            <i className="fa fa-microphone"></i>
          </div>
        </div>
        <div className="media__narrow">
          <div>
            <i className="fa fa-window-restore"></i>
          </div>
        </div>
        <div className="media__volume">
          <div className="icont__volume">
            <i className="fa fa-volume-up"></i>
          </div>
          <div className="volume">
            <input type="range" min="0" max="100" />
            <div className="current__volume">
              <div className="step__volume"></div>
            </div>
          </div>
        </div>
        <div className="media__divide">
          <span className="divide"></span>
        </div>
        <div className="media__narrow media__list__item">
          <div>
            <i className="fa fa-align-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLoader;
