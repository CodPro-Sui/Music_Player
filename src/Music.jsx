import useTheme from "./hooks/useTheme";
import "./hooks/Music.css";
import music from "./images/play.png";
import visualiser from "./hooks/visualiser";
import useTimeFormat from "./hooks/useTimeFormat";
import Inc from "./Inc";
import Timer from "./Timer";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Animate from "./Animate";
const Music = ({
  selectPlaying,
  index,
  songsDB,
  play,
  audio,
  openClose,
  forward,
  looping,
  applyLoop,
  liked,
  like,
  pauseTime,
  backward,
}) => {
  const visualizers = useRef([]);
  const [val, setVal] = useState(0);
  const [skip, setSkip] = useState(false);
  const [speed, setSpeed] = useState({ start: false, spd: 1 });
  const [length, setLength] = useState({ curr: 0, total: 0 });
  const [timer, setTimer] = useState({
    start: false,
    value: 0,
    sec: 0,
    running: false,
  });
  const inputRef = useRef(null);
  const currentLength = useTimeFormat(length.curr);
  const totalLength = useTimeFormat(length.total);
  const timerFormat = useTimeFormat(timer.value);

  const BARS = 128;
  const { isDark, change } = useTheme();
  useLayoutEffect(() => {
    const deg = 360 / BARS;
    let curr = deg;
    visualizers.current.forEach((ele) => {
      if (ele) {
        ele.style.transform = `rotate(${curr}deg) translateY(-125px)`;
        curr += deg;
      }
    });
  }, []);

  useEffect(() => {
    visualiser(audio, visualizers);
  }, [index, audio]);

  useEffect(() => {
    if (!audio || !audio.duration || isNaN(audio.duration)) return;

    const updateTime = () => {
      setLength({ total: audio.duration || 0, curr: audio.currentTime || 0 });
      setVal(((audio.currentTime) / (audio.duration)) * 100);
      // if (inputRef.current) inputRef.current.style.width = `${val}%`;
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [audio]);

  useEffect(() => {
    if (!speed.start) return;
    let interval;

    if (speed.start) {
      interval = setTimeout(() => {
        setSpeed((pre) => ({ ...pre, start: false }));
      }, 7000);
    }

    return () => {
      clearTimeout(interval);
    };
  }, [speed.start]);

  useEffect(() => {
    if (!audio || !audio.duration) return;
    audio.playbackRate = speed.spd || 1;
  }, [speed.spd, audio]);

  useEffect(() => {
    if (!timer.start) return;
    let init = setTimeout(() => {
      setTimer((pre) => ({ ...pre, start: false }));
    }, 5000);

    return () => clearTimeout(init);
  }, [timer.start]);

  useEffect(() => {
    if (!timer.running || !selectPlaying.playing) return;
    const interval = setInterval(() => {
      setTimer((pre) => {
        if (pre.value <= 1) {
          pauseTime();
          return { ...pre, running: false, value: 0 };
        }
        return { ...pre, value: pre.value - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer.running, audio]);

  const running = (e) => {
    if (!audio.duration) return;
    if (audio.currentTime === audio.duration) forward();
    let perct = (e.target.value / 100) * audio.duration;
    audio.currentTime = perct;
    setVal(e.target.value);
    //if (inputRef.current) inputRef.current.style.width = `${val}%`;
  };

  let h =
    currentLength.hours > 9 ? currentLength.hours : "0" + currentLength.hours;
  let m =
    currentLength.minutes > 9
      ? currentLength.minutes
      : "0" + currentLength.minutes;
  let s =
    currentLength.seconds > 9
      ? currentLength.seconds
      : "0" + currentLength.seconds;

  let th = totalLength.hours > 9 ? totalLength.hours : "0" + totalLength.hours;
  let tm =
    totalLength.minutes > 9 ? totalLength.minutes : "0" + totalLength.minutes;
  let ts =
    totalLength.seconds > 9 ? totalLength.seconds : "0" + totalLength.seconds;

  const increase = () =>
    setSpeed((pre) => ({ ...pre, spd: pre.spd < 8 ? pre.spd + 0.1 : pre.spd }));
  const decrease = () =>
    setSpeed((pre) => ({
      ...pre,
      spd: pre.spd > 0.3 ? pre.spd - 0.1 : pre.spd,
    }));

  const get = (mess) => {
    if (mess === "off") {
      setTimer((pre) => ({ ...pre, running: false }));
    } else {
      setTimer((pre) => ({ ...pre, running: true, value: mess * 60 }));
    }
  };
  const cancel = () => {
    setTimer((pre) => ({ ...pre, start: false }));
  };

  return (
    <div className={`cen ${isDark ? "dc" : "lc"}`}>
      <div className={`music ${isDark ? "darkMusic" : "lightMusic"}`}>
        <div className="back">
          <div>
            <i onClick={openClose} className="fa-solid fa-arrow-left"></i>
          </div>
          <Animate text={songsDB[index]?.name}/>
        </div>

        <div className="musicWave">
          <div className="wave">
            <img src={music} alt="play" />
          </div>
          <div className="visu">
            {Array.from({ length: BARS }).map((_, i) => (
              <div key={i} ref={(el) => (visualizers.current[i] = el)} />
            ))}
          </div>
        </div>
        <div className="function">
          <div className="mainFn">
            <div className="skipingMode" onClick={() => setSkip((pre) => !pre)}>
              <i
                className={`fa-solid fa-person-running ${skip ? "clr" : ""}`}
              ></i>
            </div>
            <div className="timer">
              {speed.start ? (
                <Inc
                  text={speed.spd}
                  fd={true}
                  decrease={decrease}
                  increase={increase}
                />
              ) : (
                <i
                  onClick={() => setSpeed((pre) => ({ ...pre, start: true }))}
                  className={`fa-solid fa-gauge-high ${speed.start ? "clr" : ""}`}
                ></i>
              )}
            </div>
            <div className="speed">
              {timer.start ? (
                <Timer get={get} cancel={cancel} />
              ) : timer.running ? (
                <span onClick={() => get("off")}>
                  {timerFormat.minutes.toString().padStart(2, "0")}:
                  {timerFormat.seconds.toString().padStart(2, "0")}
                </span>
              ) : (
                <i
                  onClick={() => setTimer((pre) => ({ ...pre, start: true }))}
                  className={`fa-solid fa-clock ${timer.start ? "clr" : ""}`}
                ></i>
              )}
            </div>
          </div>

          <div className="range">
            <div className="cDuration">{`${currentLength.hours > 0 ? h : ""}${currentLength.hours > 0 ? ":" : ""}${currentLength.minutes > 0 ? m : "00"}:${currentLength.seconds > 0 ? s : "00"}`}</div>
            <div>
              <div style={{ width: `${val}%` }}></div>
              <input
                type="range"
                value={val || 0}
                name="musicDuration"
                id="misicDuration"
                onChange={running}
                step={0.01}
                min={0}
                max={100}
              />
            </div>
            <div className="tDuration">{`${totalLength.hours > 0 ? th : ""}${totalLength.hours > 0 ? ":" : ""}${totalLength.minutes > 0 ? tm : "00"}:${totalLength.seconds > 0 ? ts : "00"}`}</div>
          </div>

          <div className="mainCtr">
            <div onClick={applyLoop}>
              <i className={`fa-solid fa-repeat ${looping?"clr":""}`}></i>
            </div>
            <div>
              <span>
                {skip ? (
                  <i
                    onDoubleClick={() => {
                      if (audio && audio.duration && audio.currentTime >= 5) {
                        audio.currentTime = audio.currentTime - 5;
                      }
                    }}
                    className="fa-solid fa-backward"
                  ></i>
                ) : (
                  <i
                    onClick={() => {
                      if (!selectPlaying.playing) {
                        play();
                      }
                      backward();
                    }}
                    className="fa-solid fa-backward-step"
                  ></i>
                )}
              </span>
              <span
                onClick={() => {
                  play();
                  visualiser(audio, visualizers);
                }}
              >
                {!selectPlaying.playing ? (
                  <i className="fa-solid fa-play"></i>
                ) : (
                  <i className="fa-solid fa-pause"></i>
                )}
              </span>
              <span>
                {skip ? (
                  <i
                    onClick={() => {
                      if (
                        audio &&
                        audio.duration &&
                        audio.currentTime <= audio.duration
                      ) {
                        audio.currentTime = audio.currentTime + 5;
                      }
                    }}
                    className="fa-solid fa-forward"
                  ></i>
                ) : (
                  <i
                    onClick={() => {
                      if (!selectPlaying.playing) {
                        play();
                      }
                      forward();
                    }}
                    className="fa-solid fa-forward-step"
                  ></i>
                )}
              </span>
            </div>
            <div onClick={liked}>
              <i
                className={`fa-solid fa-heart ${like[index] ? "red" : ""}`}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
