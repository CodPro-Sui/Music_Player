import { useEffect, useRef, useState } from "react";

const useControls = (songsDB) => {
    const [selectPlaying, setSelectPlaying] = useState({
        select: false,
        playing: false,
    });
    const [index, setIndex] = useState(0);
    const [looping, setLooping] = useState(0);

    const [width, setWidth] = useState(0);

    const refM = useRef(new Audio);
    const audio = refM.current;

    const select = (index) => {
        setIndex(index);
        audio.src = songsDB[index]?.url;
        audio.load();
        audio.play();
        setSelectPlaying({ playing: true, select: true });
    }

    function play() {
        if (audio.paused) {
            audio.play();
            setSelectPlaying(pre => ({ ...pre, playing: true }));
        } else {
            audio.pause();
            setSelectPlaying(pre => ({ ...pre, playing: false }));
        }
    }

    const forward = () => {
        if (!songsDB.length) return;
        setIndex(pre => (pre + 1) % songsDB.length);
    }

    const backward = () => {
        if (!songsDB.length) return;
        setIndex(pre => (pre - 1 + songsDB.length) % songsDB.length);
    }

    useEffect(() => {
        if (!songsDB.length) return;
        audio.src = songsDB[index]?.url;
        audio.load();
        if (selectPlaying.playing) {
            audio.play()
        }

    }, [index, songsDB]);

    useEffect(() => {
        audio.onended = () => {
            if (looping) {
                audio.currentTime = 0;
                audio.play();
            } else {
                forward();
            }
        };

    }, [index, looping])

    useEffect(() => {
        let fn = () => {
            setWidth((audio.currentTime / audio.duration) * 100)

        }
        audio.addEventListener("timeupdate", fn)

        return () => audio.removeEventListener("timeupdate", fn)
    }, [index, songsDB]);

    const applyLoop = () => setLooping(pre => !pre);

    const pauseTime = () => {
        audio?.pause();
        setSelectPlaying((pre) => ({ ...pre, playing: false }))
    }


    return {
        selectPlaying,
        select,
        index,
        looping,
        applyLoop,
        play,
        pauseTime,
        forward,
        backward,
        audio,
        width
    }
}

export default useControls