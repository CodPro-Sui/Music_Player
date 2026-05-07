import { useState } from "react";
import useTheme from "./hooks/useTheme";
import logo from "./images/logo.png";
import useUploder from "./hooks/useUploder";
import useControls from "./hooks/useControls";
import Music from "./Music";
const App = () => {
  const { songsDB, upload } = useUploder();
  const { select, index, width, selectPlaying, looping,applyLoop,play,pauseTime, forward, backward, audio } =
    useControls(songsDB);
  const { isDark, change, open, openClose } = useTheme();
  
  const [like, setLike] = useState(() => songsDB.map(() => false));
  const liked = () => {
    setLike((pre) => {
      const up = [...pre];
      up[index] = !up[index];
      return up;
    });
  };

  return (
    <div>
      {open ? (
        <Music
          selectPlaying={selectPlaying}
          index={index}
          songsDB={songsDB}
          play={play}
          audio={audio}
          looping={looping}
          applyLoop={applyLoop}
          openClose={openClose}
          backward={backward}
          forward={forward}
          pauseTime={pauseTime}
          like={like}
          liked={liked}
        />
      ) : (
        <div className={`main ${isDark ? "dark" : "light"}`}>
          {/* header */}

          <div className={` header ${isDark ? "darkHeader" : "lightHeader"}`}>
            <div className="logo">
              <img src={logo} alt="company_logo" />
            </div>

            <div
              onClick={change}
              className={`icon ${isDark ? "darkIcon" : "lightIcon"}`}
            >
              {isDark ? (
                <i className="fa-solid fa-moon"></i>
              ) : (
                <i className="fa-solid fa-sun"></i>
              )}
            </div>
          </div>

          <div className={`list ${isDark ? "darkList" : "lightList"}`}>
            <div className="space"></div>
            <ul>
              {songsDB.length > 0 ? (
                songsDB.map((file, ind) => {
                  return (
                    <li
                      key={ind}
                      onClick={() => select(ind)}
                      className={index === ind ? "current" : ""}
                    >
                      <span>{ind + 1}</span>
                      <span>
                        <i className="fa-solid fa-music"></i>
                      </span>
                      <span>{file.name}</span>
                    </li>
                  );
                })
              ) : (
                <div className="center">No Available Music</div>
              )}
              <div className="center">
                <label htmlFor="same">
                  Import <i className="fa-solid fa-plus"></i>
                </label>
                <input
                  type="file"
                  accept=".mp3"
                  id="same"
                  multiple={true}
                  onChange={upload}
                />
              </div>
            </ul>
          </div>
{/*progress*/}

<div className={`progress`}>
<div style={{width: `${width}%`}}></div>
</div>


          {/* play song */}
          <div className={`playing ${isDark ? "darkPlaying" : "lightPlaying"}`}>
            <div className={`spinner ${selectPlaying.playing?"pl":""}`}></div>

            <div className="format">
              <div className={`title ${isDark ? "darkTitle" : "lightTitle"}`}>
                <strong onClick={openClose}>{songsDB[index]?.name}</strong>
                <i
                  onClick={liked}
                  className={`fa-solid fa-heart ${like[index] ? "red" : ""}`}
                ></i>
              </div>

              <div 
                className={`ctr ${isDark ? "darkControls" : "lightControls"}`}
              >
                <span>
                  <i
                    className="fa-solid fa-backward-step"
                    onClick={backward}
                  ></i>
                </span>
                <span onClick={play}>
                  {!selectPlaying.playing ? (
                    <i className="fa-solid fa-play"></i>
                  ) : (
                    <i className="fa-solid fa-pause"></i>
                  )}
                </span>
                <span>
                  <i className="fa-solid fa-forward-step" onClick={forward}></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
