import React from 'react';

// Arrow component to connect two countries based on their center points
const Arrow = ({ start, end, color }) => {
  color = color == null ? 'black' : color;
  if (!start || !end || start === end) return null;

  const sanitizedColor = color.replace(/[(),\s]/g, '-'); // Remove problematic characters
  const markerId = `arrowhead-${sanitizedColor}`;

  return (
    <>
      <defs>
        <marker
          id={markerId}
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
            <polygon points="0 0, 5 3, 0 6" fill={color} />
          </marker>
      </defs>

      <line
        x1={start.center[0]} y1={start.center[1]}
        x2={end.center[0]} y2={end.center[1]}
        stroke={color}
        strokeWidth="2"
        markerEnd={`url(#${markerId})`}
      />    
    </>
  );
};

export default Arrow;