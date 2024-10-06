import React, { useEffect, useState, memo } from 'react';
import ArmyIcon from '../../assets/army_star_icon.svg';
import colorData from '../../../colorData';

const Country = ({
  shape,
  color,
  id,
  name,
  occupyingArmy,
  isSupplyPoint,
  center,
  onMouseDown,
  onMouseUp,
  mouseIsDown,
  originCountryId,
  adjacentCountriesById
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [countryColor, setCountryColor] = useState(colorData[color].CountryBase); // Country color state
  const [strokeColor, setStrokeColor] = useState(colorData[color].CountryBase); // Set initial stroke to the passed stroke prop

  // Update the country color based on hover and dragging state
  useEffect(() => {
    if (mouseIsDown && (adjacentCountriesById.includes(Number(id)) || originCountryId === id)) {
      setCountryColor(colorData[color].CountryAdjacent); 
      setStrokeColor(colorData[color].CountryBase);
      if (isHovered || originCountryId === id) {
        setCountryColor(colorData[color].CountrySelected);
        setStrokeColor('black'); // Change stroke to black for hover or origin
      }
    } else {  // Reset to original color
      setCountryColor(colorData[color].CountryBase);
      setStrokeColor(colorData[color].CountryBase); 
    }
  }, [mouseIsDown, isHovered, adjacentCountriesById, originCountryId, color, id]);

  // Handle hover effects
  const handleMouseEnter = () => {
    if (mouseIsDown) {
      setIsHovered(true); // Only highlight if the mouse button is down
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
        {/* // Define SVG filter for country shapes and names */}
        <defs>  
          <filter id="f1">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.7"/>
          </filter>
        </defs>

        {/* Shape representing country */}
       <path
        d={shape}
        fill={countryColor}
        stroke={strokeColor}
        strokeWidth={4}
        id={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        filter="url(#f1)"
      />

      {/* Country name */}
      <text x={center[0]} y={center[1] - 5} // Set position based on country center
      textAnchor="middle" fill="white" fontFamily="helvetica" fontWeight="bold" paintOrder="stroke" stroke="#000000" strokeWidth="3px" filter="url(#f1)">
        {name}
      </text>

      {/* Occupying army, if any */}
      {occupyingArmy && (
        <image
          href={ArmyIcon}
          x={center[0] - 5} // Adjust position based on country center
          y={center[1] - 2}
          width="20"        
          height="20"
        />
      )}

      {/* Supply point, if any */}
      {isSupplyPoint && 
        <circle 
          cx={center[0] - 15} // Adjust position based on country center
          cy={center[1] + 10} 
          r="5" 
          fill="white" 
        />}
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Country);
