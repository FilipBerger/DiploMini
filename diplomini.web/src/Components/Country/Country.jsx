import React, { useEffect, useState } from 'react';
import ArmyIcon from '../../assets/army_star_icon.svg'

const Country = ({ d, fill, stroke, strokeWidth, id, name, occupyingArmy, isSupplyPoint, center, onMouseDown, onMouseUp, mouseIsDown, originCountry }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [countryColor, setCountryColor] = useState(fill);  // Country color state

  // Update the country color based on hover and dragging state
  useEffect(() => {
    if (mouseIsDown && (isHovered || originCountry.id === id)) {
      setCountryColor('#ccc');  // Light up color when hovered or dragged
    } else {
      setCountryColor(fill);  // Default color when not hovered or dragged
    }
  }, [mouseIsDown, isHovered, originCountry, fill, id]);

  // Handle mouse enter (hover)
  const handleMouseEnter = () => {
    if (mouseIsDown) {
      setIsHovered(true);  // Only highlight if the mouse button is down
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);  // Reset hover state
  };

  return (
    <>
      <path
        d={d}
        fill={countryColor}
        stroke={stroke}
        strokeWidth={strokeWidth}
        id={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
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
      )}

      {/* Supply Point Marker (if applicable) */}
      {isSupplyPoint && (
        <circle cx={center[0] - 15} cy={center[1] + 10} r="5" fill="white" />
      )}
    </>

  );
};

export default Country;
