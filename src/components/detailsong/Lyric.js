import axios from "axios";
import React, { useContext, useState, useEffect, useRef } from "react";
import { SongContext } from "../../contexts/SongContextProvider";
import { Lrc } from "react-lrc";

const Lyric = () => {
  const { lyric, second, infoSong } = useContext(SongContext);
  const [dataLyric, setDataLyric] = useState("");
  const [indexChange, setIndexChange] = useState("");
  useEffect(() => {
    if (lyric.file) {
      const getData = async () => {
        return await axios
          .get(lyric.file)
          .then((data) => {
            setDataLyric(data.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
      getData();
    }
  }, [lyric]);

  const Ref = useRef();

  useEffect(() => {
    if (Ref && Ref.current) {
      setIndexChange(Ref.current.getCurrentLine().index);
    }
  });

  return (
    <>
      <div className="detail__song__lyric">
        <div className="detail__lyric__img">
          <img src={infoSong.thumbnailM} />
        </div>
        {dataLyric && lyric.file ? (
          <Lrc
            ref={Ref}
            lrc={dataLyric}
            lineRenderer={({ index, line, active }) => (
              <div
                className={`detail__lyric__item ${
                  active ? "lyric__item__active " : ""
                }${indexChange > index ? "lyric__item__over" : ""}`}
              >
                {line.content}
              </div>
            )}
            className="detail__lyric"
            currentMillisecond={second}
            autoScroll={true}
          />
        ) : (
          <div className="lyric__error">
            <h1 className="lyric__error-h1">Lời bài hát đang cập nhật</h1>
          </div>
        )}
      </div>
      <div className="detail__name__song">
        {infoSong && infoSong.title} {" - "}
        <span style={{ marginLeft: "8px", color: "hsla(0, 0%, 100%, 0.4)" }}>
          {infoSong && infoSong.artistsNames}
        </span>
      </div>
      ;
    </>
  );
};

export default Lyric;
