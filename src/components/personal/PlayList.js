import React from "react";

const PlayList = () => {
  return (
    <div className="list__playlist__library">
      <div className="item__list__library">
        <a href="#">
          <div className="img__playlist__selection">
            <img
              src="https://photo-playlist-zmp3.zmdcdn.me/s1/user-playlist?src=HavwqN7EvKCI1oYSFOdq0r9DOvnjYVi30bipXMc1-0PHNs23FTNvK5q6OzOosQXUKW5dY3pQg5fBMtQDC9pwKG0PFzLxoBC6JLLun3lQ-KnD27Z5EuVkJ5jQ8SuqWhn72rvmm3E0kaLJNIB3FD2yG01VSvDfchTJLrCrmMBHzHe86668CfovNHbOBi9rdBXT6LWls7Y6j5172NlJ9zRYLay4ATvmsR1NI05uWIRRuG0T267QD8JjHay3AfXzsgOI1b9dr3hBvb9CGMU0EfBc1W8RSD8-bRjHNaicr3wIx0TU67RKOP2wN0aPSevXaEGGKWijWdq&size=thumb/240_240"
              alt=""
            />

            <div className="option__playlist__selection">
              <div className="option__selection library__add__selection">
                <i className="fa-solid fa-xmark"></i>
              </div>
              <div className="option__selection item__play__selection">
                <i className="fa-solid fa-play"></i>
                {/* <span className="gif__play">
                                        <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                                            alt=""/>
                                    </span> */}
              </div>
              <div className="option__selection item__option__selection">
                <div className="option__icon__selection">● ● ●</div>
              </div>
            </div>
          </div>
        </a>
        <div className="title__playlist__selection">
          <a href="#" className="title__one__line">
            love
          </a>
          <div>Việt Phú</div>
        </div>
      </div>
    </div>
  );
};

export default PlayList;
