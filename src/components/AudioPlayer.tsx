"use client";

import { useEffect, useRef, useState } from "react";

const NOW_PLAYING = "now playing: dijon — talk down";
const TYPE_SPEED_MS = 35;

// Minimal text-only audio player: a single button toggling play/pause.
// No native controls, no loop — when the track ends it reverts to "play".
// On play the now-playing text types out and the ⏸ symbol gently pulses.
export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [typed, setTyped] = useState("");

  // run the typewriter for as long as the track is playing
  useEffect(() => {
    if (!playing) return;
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(NOW_PLAYING.slice(0, i));
      if (i >= NOW_PLAYING.length) clearInterval(id);
    }, TYPE_SPEED_MS);
    return () => clearInterval(id);
  }, [playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        className="cursor-pointer text-left hover:underline hover:underline-offset-[3px]"
      >
        {playing ? (
          // ⏸ shows immediately; only the text after it types out
          <span>⏸ {typed}</span>
        ) : (
          "▶ play"
        )}
      </button>
      <audio
        ref={audioRef}
        src="/talk-down.mp3"
        preload="none"
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
