import React, { useState, useContext } from "react";
import { MvContext } from "../../contexts/MvContextProvider";

const SearchMV = () => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isDisplay2, setIsDisplay2] = useState(false);
  const { categories, setId, nameCategory, setNameCategory } =
    useContext(MvContext);

  return (
    <div className="mv__content">
      <div
        className="all__select"
        onBlur={() => setIsDisplay(false)}
        tabIndex="0"
      >
        <div
          className="all__select__item"
          onClick={() => setIsDisplay(!isDisplay)}
        >
          <div>
            <i className="fa-solid fa-music mr-5"></i>
            <p className="mr-20">{nameCategory ? nameCategory : "tất cả"}</p>
            {isDisplay ? (
              <div className="angle-icon-all">
                <i className="fa-solid fa-angle-up"></i>
              </div>
            ) : (
              <div className="angle-icon-all">
                <i className="fa-solid fa-angle-down"></i>
              </div>
            )}
          </div>
        </div>
        {isDisplay && (
          <div className="list__all__select">
            {categories.map((item, index) => {
              return (
                <div
                  key={index}
                  className="list__item__select__all"
                  onClick={() => setId(item.id)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div
        className="most__listen"
        tabIndex="0"
        onBlur={() => setIsDisplay2(false)}
      >
        <div
          className="most__listen__item"
          onClick={() => setIsDisplay2(!isDisplay2)}
        >
          <i className="fa-solid fa-bars-staggered mr-5"></i>
          <p className="mr-20">nghe nhiều</p>
          {isDisplay2 ? (
            <div className="angle-icon-all">
              <i className="fa-solid fa-angle-up"></i>
            </div>
          ) : (
            <div className="angle-icon-all">
              <i className="fa-solid fa-angle-down"></i>
            </div>
          )}
        </div>
        {isDisplay2 && (
          <div className="list__most__listen">
            <div className="list__item__listen__all">nghe nhiều</div>
            <div className="list__item__listen__all">nổi bật</div>
            <div className="list__item__listen__all">mới nhất</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMV;
