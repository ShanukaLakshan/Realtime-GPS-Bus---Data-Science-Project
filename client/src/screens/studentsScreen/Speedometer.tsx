import React from "react";

interface SpeedometerProps {
  speed: number;
  maxSpeed: number;
}

const Speedometer: React.FC<SpeedometerProps> = ({ speed, maxSpeed }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - ((speed / maxSpeed) * circumference) / 2;

  return (
    <div>
      <svg width="120" height="70">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="grey"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="blue"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div>Speed: {speed} km/h</div>
    </div>
  );
};

export default Speedometer;
