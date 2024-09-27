import React from 'react';

// Arrow component to connect two countries based on their center points
const Arrow = ({ start, end, color }) => {
  let strokeColor = "black";
  console.log(color + " faktion");
  if (color === "Dödspatrullen")
    strokeColor = "red";
  if (color === "Bumbibjörnarna")
    strokeColor = "green";
  
  return (
    <line
      x1={start[0]} y1={start[1]}
      x2={end[0]} y2={end[1]}
      stroke={strokeColor}
      strokeWidth="2"
      markerEnd="url(#arrowhead)"
    />
  );
};

export default Arrow;