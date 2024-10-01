import React from 'react';

// Arrow component to connect two countries based on their center points
const Arrow = ({ start, end, color, assistedFaction }) => {
  color = color == null ? 'black' : color;

  console.log(assistedFaction)

  // Ensure start and end points are valid
  if (!start || !end || start === end) return null;

  // Sanitize the color to generate a valid marker ID
  const sanitizedColor = color.replace(/[(),\s]/g, '-');
  const markerId = `arrowhead-${sanitizedColor}`;

  return (
    <>
      {/* Define the arrow marker */}
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
          <polygon points="0 0, 5 3.5, 0 7" fill={color} />
        </marker>
      </defs>

      <line
        x1={start.center[0]} y1={start.center[1]}
        x2={end.center[0]} y2={end.center[1]}
        stroke={color}
        strokeWidth="2"
        markerEnd={`url(#${markerId})`} // Attach arrow marker at the end
      />

      {(color != 'black') && 
        <text
          x={(start.center[0] + end.center[0]) / 2} // Position in the middle of x
          y={(start.center[1] + end.center[1]) / 2} // Position in the middle of y
          fill="black"
          fontSize="12"
          textAnchor="middle"
        >
          <tspan x={(start.center[0] + end.center[0]) / 2} dy="0">Assist</tspan>
          <tspan x={(start.center[0] + end.center[0]) / 2} dy="15">{assistedFaction}</tspan>
        </text>      
      }
    </>
  );
};

export default Arrow;
