import React, { useState } from 'react';
import ArmyIcon from '../../assets/army_star_icon.svg'

const Country = ({ d, fill, stroke, strokeWidth, id, name, occupyingArmy, isSupplyPoint, center }) => {
  //console.log(isSupplyPoint);


  return (
    <>
      <path
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        id={id}
      />    

      <text x={center[0]} y={center[1] - 5 } textAnchor="middle" fill="white">
        {name}
      </text>

      {occupyingArmy && (
        <image
          href={ArmyIcon}  // href is used to reference the external SVG file
          x={center[0] - 5}  // Adjust position according to the center of the country
          y={center[1] - 2}  // Adjust position according to the center of the country
          width="20"          // Adjust the size of the army icon
          height="20"
        />
        // <text x={center[0] + 15} y={center[1] + 14} textAnchor="middle" fill="red">
        //   {occupyingArmy}
        // </text>
      )}

      {/* Supply Point Marker (if applicable) */}
      {isSupplyPoint && (
        <circle cx={center[0] - 15} cy={center[1] + 10} r="5" fill="white" />
      )}
    </>

  );
};

export default Country;
