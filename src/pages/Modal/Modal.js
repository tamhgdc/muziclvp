import React, { useContext, useEffect, useRef, useState } from "react";
import "./modal.css";
import { PlayListContext } from "../../contexts/PlayListContextProvider";

const Modal = () => {
  const { setCheckModalVip } = useContext(PlayListContext);
  const [modal, setModal] = useState("");
  const Ref = useRef();
  useEffect(() => {
    if (Ref) setModal(Ref);
  }, []);

  useEffect(() => {
    const handleModal = (e) => {
      if (!modal.current.contains(e.target)) {
        setCheckModalVip(false);
      }
    };
    if (modal) {
      document.addEventListener("mousedown", handleModal);
    }
    return () => document.removeEventListener("mousedown", handleModal);
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={() => setCheckModalVip(false)}
        ></i>
        <div className="modal-center" ref={Ref}>
          <h3 style={{ fontSize: "20px" }}>Dành Cho Tài Khoản VIP</h3>
          <p>
            Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản VIP để
            nghe bài hát này.
          </p>
          <button>
            <span>đăng nhập tài khoản vip</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
