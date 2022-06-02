import React, { useContext, useEffect, useRef, useState } from "react";
import "./modal.css";
import { PlayListContext } from "../../contexts/PlayListContextProvider";

const Modal = () => {
  const { setCheckModalStart } = useContext(PlayListContext);
  const [modal, setModal] = useState("");
  const Ref = useRef();
  useEffect(() => {
    if (Ref) setModal(Ref);
  }, []);

  useEffect(() => {
    const handleModal = (e) => {
      if (!modal.current.contains(e.target)) {
        setCheckModalStart(false);
      }
    };
    if (modal) {
      document.addEventListener("mousedown", handleModal);
    }
    return () => document.removeEventListener("mousedown", handleModal);
  });

  return (
    <div className="modal">
      <div className="modal-content fix__modal-start" ref={Ref}>
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={() => setCheckModalStart(false)}
        ></i>
        <div className="modal-center">
          <h3>Chức năng trang web ZingPV</h3>
          <div className="content__modal">
            <div>
              <p>
                <i className="fa-solid fa-minus"></i> Chức năng Audio(nghe
                nhạc):
                <br />{" "}
                <i
                  className="fa-solid fa-check"
                  style={{ textIndent: "20px" }}
                ></i>{" "}
                play,pause
                <br />{" "}
                <i
                  className="fa-solid fa-check"
                  style={{ textIndent: "20px" }}
                ></i>{" "}
                next,prev trong playList
                <br />{" "}
                <i
                  className="fa-solid fa-check"
                  style={{ textIndent: "20px" }}
                ></i>{" "}
                tua bài hát,cập nhật currentTime
                <br />{" "}
                <i
                  className="fa-solid fa-check"
                  style={{ textIndent: "20px" }}
                ></i>{" "}
                phát ngẫu nhiên ,repeatAll,repeatOne trong playList
                <br />{" "}
                <i
                  className="fa-solid fa-check"
                  style={{ textIndent: "20px" }}
                ></i>{" "}
                điều chỉnh volume, tắt âm, bật âm
                <br /> <i className="fa-solid fa-minus"></i> Chức năng MV(tương
                tự chức năng audio)
                <br /> <i className="fa-solid fa-minus"></i> Chức năng tìm kiếm
                bài hát
                <br /> <i className="fa-solid fa-minus"></i> Chức năng xem
                playList
                <br /> <i className="fa-solid fa-minus"></i> Chức năng karaoke
                và lyric
              </p>
            </div>
          </div>

          <h3 style={{ color: "yellow" }}>
            Trang web này làm ra để phục vụ mục đích học react js của mình{" "}
            <br /> và không có tính thương mại hóa
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Modal;
