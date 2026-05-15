"use client";

import { useEffect, useState } from "react";

// the airport codes cycle in the footer, one shown at a time
const cities = ["lax", "jfk", "dxb", "bom"];

const VISIBLE_MS = 3000; // how long each city stays fully visible
const FADE_MS = 400; // how long the fade out / fade in takes

export default function CityRotator() {
  const [index, setIndex] = useState(0);
  // 1 = fully visible, 0 = faded out. drives the css opacity transition.
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // after the city has been visible a while, start fading it out
    const fadeOut = setTimeout(() => setOpacity(0), VISIBLE_MS);

    // once it has faded out, swap to the next city and fade back in.
    // swapping the text while opacity is 0 hides any width change.
    const swap = setTimeout(() => {
      setIndex((current) => (current + 1) % cities.length);
      setOpacity(1);
    }, VISIBLE_MS + FADE_MS);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(swap);
    };
  }, [index]);

  return (
    // fixed-width inline-block sized to a 3-letter airport code so the
    // footer line never shifts horizontally when the code changes
    <span
      style={{
        opacity,
        transition: `opacity ${FADE_MS}ms ease-in-out`,
        display: "inline-block",
        minWidth: "3ch",
        textAlign: "left",
      }}
    >
      {cities[index]}
    </span>
  );
}
