import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./RouletteWheel.css";

const vibeData = [
  {
    option: "No thoughts, just vibes",
    name: "No thoughts, just vibes",
    emoji: "🧘‍♀️",
    description: "You are one with the universe. Brain? Never heard of it.",
    mantra: "Let it flow, let it go.",
  },
  {
    option: "Might delete later",
    name: "Might delete later",
    emoji: "📸",
    description: "A little mysterious, a little chaotic.",
    mantra: "Post now, overthink later.",
  },
  {
    option: "It’s giving main character",
    name: "It’s giving main character",
    emoji: "🎬",
    description: "All eyes are on you—and you love it.",
    mantra: "Lights, camera, slay.",
  },
  {
    option: "Silently judging",
    name: "Silently judging",
    emoji: "👀",
    description: "Observing all, saying nothing… for now.",
    mantra: "I see all, I say little.",
  },
  {
    option: "Spiritual but petty",
    name: "Spiritual but petty",
    emoji: "🔮",
    description: "Manifesting peace... and drama.",
    mantra: "Namaste, but also, no.",
  },
  {
    option: "Cursed energy",
    name: "Cursed energy",
    emoji: "👹",
    description: "You’re on a whole other wavelength—and it's chaotic.",
    mantra: "If weird is wrong, I don’t want to be right.",
  },
  {
    option: "CEO of chaos",
    name: "CEO of chaos",
    emoji: "🔥",
    description: "You don’t follow the rules. You are the rules.",
    mantra: "Why be normal when you can be unforgettable?",
  },
  {
    option: "In my villain era",
    name: "In my villain era",
    emoji: "🖤",
    description: "You’re done being nice. It's your turn now.",
    mantra: "No more apologies.",
  },
];

const RouletteWheel = ({ onResult }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrize = Math.floor(Math.random() * vibeData.length);
    setPrizeNumber(newPrize);
    setMustSpin(true);
  };

  return (
    <div className="spinner-container">
      <div className="wheel-wrapper">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={vibeData}
          backgroundColors={["#ffc4d6", "#a0dff7"]}
          textColors={["#333"]}
          outerBorderColor={"hotpink"}
          outerBorderWidth={8}
          radiusLineWidth={2}
          radiusLineColor={"#000"}
          fontSize={15}
          onStopSpinning={() => {
            setMustSpin(false);
            onResult?.(vibeData[prizeNumber]);
          }}
        />
        <div className="custom-pointer" />
      </div>
      <button className="spin-button" onClick={handleSpinClick}>
        🎯 Spin Me
      </button>
    </div>
  );
};

export default RouletteWheel;
