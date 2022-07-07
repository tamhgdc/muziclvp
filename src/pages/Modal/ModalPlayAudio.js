import React, { useContext, useEffect, useRef } from "react";
import "./modal.css";
import { PlayListContext } from "../../contexts/PlayListContextProvider";

const ModalPlayAudio = () => {
  const { setModalPlayAudio } = useContext(PlayListContext);
  const Ref = useRef();
  useEffect(() => {
    if (Ref) {
      const handleModal = (e) => {
        if (!Ref.current.contains(e.target)) {
          setModalPlayAudio(false);
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
          onClick={() => setModalPlayAudio(false)}
        ></i>
        <div className="modal-center" ref={Ref}>
          <p>Không cùng playlist với bài hát hiện tại</p>
        </div>
      </div>
    </div>
  );
};

export default ModalPlayAudio;
