import React from "react";

const Sparkline = ({
  data = [],
  width = 100,
  height = 32,
  color = "#00BFA6",
  strokeWidth = 1.5,
}) => {
  if (!data || data.length < 2) {
    return <svg width={width} height={height} />;
  }

  const step = Math.max(1, Math.floor(data.length / 24));
  const points = data.filter((_, i) => i % step === 0);

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((val, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block" }}
    >
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Sparkline;
