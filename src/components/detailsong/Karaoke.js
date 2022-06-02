import React, { useState, useContext, useEffect } from "react";
import { SongContext } from "../../contexts/SongContextProvider";

const Karaoke = () => {
  const [lyric1, setLyric1] = useState("");
  const [lyric2, setLyric2] = useState("");
  const [indexLyric1, setIndexLyric1] = useState(0);
  const [indexLyric2, setIndexLyric2] = useState(1);
  const [lengthWords1, setLengthWords1] = useState(0);
  const [lengthWords2, setLengthWords2] = useState(0);
  const [totalTime1, setTotalTime1] = useState(0);
  const [totalTime2, setTotalTime2] = useState(0);

  const { lyric, second, loaderSong, infoSong } = useContext(SongContext);

  const getIndexLyric = () => {
    lyric.sentences.forEach((item, index) => {
      if (second + 1500 >= item.words[0].startTime) {
        if (index % 2 === 0) {
          setIndexLyric1(index);
          setLengthWords1(item.words.length);
        } else {
          setIndexLyric2(index);
          setLengthWords2(item.words.length);
        }
      }
    });
  };

  useEffect(() => {
    if (!loaderSong) {
      getIndexLyric();
      let lrc1 = "";
      let time1 = 0;
      for (let i = 0; i < lengthWords1; i++) {
        lrc1 += lyric.sentences[indexLyric1].words[i].data + " ";
        time1 +=
          lyric.sentences[indexLyric1].words[i].endTime -
          lyric.sentences[indexLyric1].words[i].startTime;
      }
      setTotalTime1(time1 / 1000);
      setLyric1(lrc1);
      let lrc2 = "";
      let time2 = 0;
      for (let i = 0; i < lengthWords2; i++) {
        lrc2 += lyric.sentences[indexLyric2].words[i].data + " ";
        time2 +=
          lyric.sentences[indexLyric2].words[i].endTime -
          lyric.sentences[indexLyric2].words[i].startTime;
      }
      setLyric2(lrc2);
      setTotalTime2(time2 / 1000);
    }
  }, [loaderSong, second]);

  return (
    <>
      <div className="detail__song__karaoke">
        {second === "00:00" && (
          <div>
            <p style={{ fontSize: "65px", fontWeight: "700" }}>
              {infoSong.title}
            </p>
            <div className="singer__kara">
              <p style={{ fontSize: "35px", fontWeight: "700" }}>
                {infoSong.artistsNames}
              </p>
            </div>
          </div>
        )}
        {infoSong && second + 1500 <= lyric.sentences[0].words[0].startTime ? (
          <div>
            <p style={{ fontSize: "70px" }}>{infoSong.title}</p>
            <div className="singer__kara">
              <p style={{ fontSize: "40px" }}>{infoSong.artistsNames}</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="lyric__song">
              <span data-text={lyric1} className="word">
                {lyric1}
              </span>
            </div>
            <div className="lyric__song">
              <span data-text={lyric2} className="word">
                {lyric2}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="detail__name__song">
        {infoSong && infoSong.title} {" - "}
        <span style={{ marginLeft: "8px", color: "hsla(0, 0%, 100%, 0.4)" }}>
          {infoSong && infoSong.artistsNames}
        </span>
      </div>{" "}
      ;
    </>
  );
};

export default Karaoke;
