import React, { useContext, useEffect, useRef, useState } from "react";
import "./modal.css";
import { PlayListContext } from "../../contexts/PlayListContextProvider";

const ModalVideoVip = () => {
  const { setCheckModalVideoVip } = useContext(PlayListContext);
  const Ref = useRef();
  useEffect(() => {
    if (Ref) {
      const handleModal = (e) => {
        if (!Ref.current.contains(e.target)) {
          setCheckModalVideoVip(false);
        }
      };
      document.addEventListener("mousedown", handleModal);
      return () => document.removeEventListener("mousedown", handleModal);
    }
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={() => setCheckModalVideoVip(false)}
        ></i>
        <div className="modal-center" ref={Ref}>
          <h3 style={{ fontSize: "20px" }}>Dành Cho Tài Khoản VIP</h3>
          <p>
            Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản VIP để
            xem video này.
          </p>
          <button>
            <span>đăng nhập tài khoản vip</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVideoVip;
