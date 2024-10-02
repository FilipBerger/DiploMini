import React from 'react';
import colorData from '../../../colorData';

// Arrow component to connect two countries based on their center points
const Arrow = ({ start, end, color, assistedFaction }) => {
  const arrowColor = color == null ? 'Black' : colorData[color].Arrow;

  // Ensure start and end points are valid
  if (!start || !end || start === end) return null;

  // Sanitize the color to generate a valid marker ID
  const markerId = `arrowhead-${start.center[0]}-${start.center[1]}`;

  if (start !== end) 
    console.log(color, arrowColor)

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
          <polygon points="0 0, 5 3.5, 0 7" fill={arrowColor} />
        </marker>
      </defs>

      <line
        x1={start.center[0]} y1={start.center[1]}
        x2={end.center[0]} y2={end.center[1]}
        stroke={arrowColor}
        strokeWidth="2"
        markerEnd={`url(#${markerId})`} // Attach arrow marker at the end
      />

      {assistedFaction && 
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
