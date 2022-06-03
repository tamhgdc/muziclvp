import React, { useState, useContext, useEffect } from "react";
import { SongContext } from "../../contexts/SongContextProvider";

const Karaoke = () => {
  const [indexLyric1, setIndexLyric1] = useState(0);
  const [indexLyric2, setIndexLyric2] = useState(1);

  const { lyric, second, loaderSong, infoSong } = useContext(SongContext);

  const getIndexLyric = () => {
    lyric.sentences.forEach((item, index) => {
      if (second + 1500 >= item.words[0].startTime) {
        if (index % 2 === 0) {
          setIndexLyric1(index);
        } else {
          setIndexLyric2(index);
        }
      }
    });
  };

  useEffect(() => {
    if (!loaderSong && lyric.sentences) {
      getIndexLyric();
    }
  }, [loaderSong, second]);

  return (
    <>
      {lyric.sentences ? (
        <div className="detail__song__karaoke">
          {second === "00:00" ||
          (infoSong &&
            second + 1500 <= lyric.sentences[0].words[0].startTime) ? (
            <div>
              <p
                style={{
                  fontSize: "65px",
                  fontWeight: "700",
                  textTransform: "capitalize",
                }}
              >
                {infoSong.title}
              </p>
              <div className="singer__kara">
                <p style={{ fontSize: "35px", fontWeight: "700" }}>
                  {infoSong.artistsNames}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="lyric__song">
                {indexLyric1 !== "" &&
                  lyric.sentences[indexLyric1].words.map((word, index) => {
                    let percent = "0";
                    if (second >= word.startTime && second <= word.endTime) {
                      percent = (second * 100) / word.endTime;
                    }
                    return (
                      <span key={index}>
                        <span className="word--kara">
                          {word.data}
                          <div
                            className={`animation__test word ${
                              percent == 0 ? "" : "transition-kara"
                            }`}
                            data-text={word.data}
                            style={{
                              width: `${
                                second >= word.endTime ? 100 : percent
                              }%`,
                            }}
                          ></div>
                        </span>
                        <> </>
                      </span>
                    );
                  })}
              </div>
              <div className="lyric__song">
                {lyric.sentences[indexLyric2].words.map((word, index) => {
                  let percent = "0";
                  if (second >= word.startTime && second <= word.endTime) {
                    percent = (second * 100) / word.endTime;
                  }
                  return (
                    <span key={index}>
                      <span className="word--kara">
                        {word.data}
                        <div
                          className={`animation__test word ${
                            percent == 0 ? "" : "transition-kara"
                          }`}
                          data-text={word.data}
                          style={{
                            width: `${second >= word.endTime ? 100 : percent}%`,
                          }}
                        ></div>
                      </span>
                      <> </>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="detail__song__karaoke">
          <p style={{ textTransform: "capitalize" }}>đang cập nhật karaoke</p>
        </div>
      )}
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
