import React, { useEffect, memo } from "react";
import store from "../../store/store";

const MixtapItem = () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  useEffect(() => {
    const itemMixtape = Array($$(".item__playlist__animation"));
    const imgAnimation = Array($$(".img__playlist__animation img"));
    const imgFilter = Array($$(".img__filter__animation img"));

    const autoMixtape = () => {
      let mixtape5 = 5;
      let mixtape10 = 10;
      let mixtape15 = 15;
      let mixtape20 = 20;

      const handleAnimation = (items, index) => {
        for (let i = 0; i < 5; i++) {
          switch (i) {
            case 1:
              setTimeout(() => {
                imgAnimation[0][1].src = store[mixtape5].url;
                imgFilter[0][1].src = store[mixtape5].url;
                if (index == 4) mixtape5 = 5;
                else mixtape5++;
              }, 7000);
              break;
            case 2:
              setTimeout(() => {
                imgAnimation[0][2].src = store[mixtape10].url;
                imgFilter[0][2].src = store[mixtape10].url;
                if (index == 4) mixtape10 = 10;
                else mixtape10++;
              }, 9000);
              break;
            case 3:
              setTimeout(() => {
                imgAnimation[0][3].src = store[mixtape15].url;
                imgFilter[0][3].src = store[mixtape15].url;
                if (index == 4) mixtape15 = 15;
                else mixtape15++;
              }, 11000);
              break;
            case 4:
              setTimeout(() => {
                imgAnimation[0][4].src = store[mixtape20].url;
                imgFilter[0][4].src = store[mixtape20].url;
                if (index == 4) {
                  handleAnimation(itemMixtape, 0);
                  mixtape20 = 20;
                } else {
                  handleAnimation(itemMixtape, index + 1);
                  mixtape20++;
                }
              }, 13000);
              break;
            default:
              setTimeout(() => {
                imgAnimation[0][0].src = store[index].url;
                imgFilter[0][0].src = store[index].url;
              }, 5000);
              break;
          }
        }
      };

      handleAnimation(itemMixtape, 0);
    };

    autoMixtape();
  }, []);

  return (
    <>
      <div className="item__playlist__animation">
        <div className="img__playlist__animation">
          <img
            src="https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_jpeg/covers/6/e/6e7b90d96728c9ce1b4c2a104d622784_1507799020.jpg"
            alt=""
          />
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
        <div className="title__playlist__animation">
          <div className="img__filter__animation">
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_jpeg/covers/6/e/6e7b90d96728c9ce1b4c2a104d622784_1507799020.jpg"
              alt=""
            />
          </div>
          <div className="subtitle__playlist__animation">
            Mixtape Yêu Thương Nhau Gì Đâu
          </div>
        </div>
      </div>
      <div className="item__playlist__animation">
        <div className="img__playlist__animation">
          <img
            src="https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_jpeg/covers/6/e/6e7b90d96728c9ce1b4c2a104d622784_1507799020.jpg"
            alt=""
          />
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
        <div className="title__playlist__animation">
          <div className="img__filter__animation">
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_jpeg/covers/6/e/6e7b90d96728c9ce1b4c2a104d622784_1507799020.jpg"
              alt=""
            />
          </div>
          <div className="subtitle__playlist__animation">
            Mixtape Yêu Thương Nhau Gì Đâu
          </div>
        </div>
      </div>
      <div className="item__playlist__animation">
        <div className="img__playlist__animation">
          <img
            src="https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_jpeg/covers/6/e/6e7b90d96728c9ce1b4c2a104d622784_1507799020.jpg"
            alt=""
          />
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
        <div className="title__playlist__animation">
          <div className="img__filter__animation">
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_jpeg/covers/6/e/6e7b90d96728c9ce1b4c2a104d622784_1507799020.jpg"
              alt=""
            />
          </div>
          <div className="subtitle__playlist__animation">
            Mixtape Yêu Thương Nhau Gì Đâu
          </div>
        </div>
      </div>
      <div className="item__playlist__animation">
        <div className="img__playlist__animation">
          <img
            src="https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_jpeg/covers/6/e/6e7b90d96728c9ce1b4c2a104d622784_1507799020.jpg"
            alt=""
          />
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
        <div className="title__playlist__animation">
          <div className="img__filter__animation">
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_jpeg/covers/6/e/6e7b90d96728c9ce1b4c2a104d622784_1507799020.jpg"
              alt=""
            />
          </div>
          <div className="subtitle__playlist__animation">
            Mixtape Yêu Thương Nhau Gì Đâu
          </div>
        </div>
      </div>
      <div className="item__playlist__animation">
        <div className="img__playlist__animation">
          <img
            src="https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_jpeg/covers/6/e/6e7b90d96728c9ce1b4c2a104d622784_1507799020.jpg"
            alt=""
          />
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
        <div className="title__playlist__animation">
          <div className="img__filter__animation">
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_jpeg/covers/6/e/6e7b90d96728c9ce1b4c2a104d622784_1507799020.jpg"
              alt=""
            />
          </div>
          <div className="subtitle__playlist__animation">
            Mixtape Yêu Thương Nhau Gì Đâu
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(MixtapItem);
