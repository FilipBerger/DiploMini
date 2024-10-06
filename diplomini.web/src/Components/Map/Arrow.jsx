import React from 'react';
import colorData from '../../../colorData';

// Arrow component to connect two countries based on their center points
const Arrow = ({ start, end, color, assistedFaction }) => {
  const arrowColor = color == null ? 'Black' : colorData[color].Arrow; // Set color to black for non-assist orders 

  if (!start || !end || start === end) // Ensure valid start- and end-points 
    return null; 

  const markerId = `arrowhead-${start.center[0]}-${start.center[1]}`; // Form unique id for arrowhead

  return (
    <>
      {/* Define arrowhead marker */}
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

      {/* Line from center of origin coutnry to center of target country */}
      <line
        x1={start.center[0]} y1={start.center[1]}
        x2={end.center[0]} y2={end.center[1]}
        stroke={arrowColor}
        strokeWidth="2"
        markerEnd={`url(#${markerId})`} // Attaches arrowhead at end
      />

      {/* Display name of assisted faction, if any */}
      {assistedFaction && 
        <text
          x={(start.center[0] + end.center[0]) / 2} // Positions in the middle of the line
          y={(start.center[1] + end.center[1]) / 2}
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
