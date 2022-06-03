import React, { useContext, useEffect, useRef, useState } from "react";
import "./modal.css";
import { PlayListContext } from "../../contexts/PlayListContextProvider";

const ModalPlayAudio = () => {
  const { setModalPlayAudio } = useContext(PlayListContext);
  const [modal, setModal] = useState("");
  const Ref = useRef();
  useEffect(() => {
    if (Ref) setModal(Ref);
  }, []);

  useEffect(() => {
    const handleModal = (e) => {
      if (!modal.current.contains(e.target)) {
        setModalPlayAudio(false);
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
