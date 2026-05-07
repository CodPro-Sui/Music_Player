import { useRef } from "react";
let musicCtx = { current: null };
let analyser = { current: null };
let source = { current: null };
let dataLength = { current: null };
const visualiser = (audio, visualizers) => {
    if (!musicCtx.current) {
        musicCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (!source.current) {
        source.current = musicCtx.current.createMediaElementSource(audio);
    }
    if (!analyser.current) {
        analyser.current = musicCtx.current.createAnalyser();
        source.current.connect(analyser.current);
        analyser.current.connect(musicCtx.current.destination);
        analyser.current.fftSize = 256; // 128 * 2
    }
    if (musicCtx.current.state === "suspended") {
        musicCtx.current.resume()
    }
    const bufferLen = analyser.current.frequencyBinCount;
    dataLength.current = new Uint8Array(bufferLen);

    function animate() {
        requestAnimationFrame(animate);
        analyser.current.getByteFrequencyData(dataLength.current);

        const len = visualizers.current.length;
        const MIN = 7;
        const MAX = 50;

        visualizers.current.forEach((el, i) => {
            if (!el) return;
            const idx = i < len / 2 ? i : len - i;
            let value = dataLength.current[idx];
            value = Math.max(value, 15);
            const n = value / 255;
            const height = n * (MAX - MIN) + MIN;
            el.style.height = `${height}px`;
        });
    }
    if(!audio.paused) animate()
}

export default visualiser