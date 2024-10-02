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
      setCountryColor(colorData[color].CountryAdjacent); // Lighten adjacent country color
      setStrokeColor(countryColor);
      if (isHovered || originCountryId === id) {
        setCountryColor(colorData[color].CountrySelected); // Lighten the origin country
        setStrokeColor('black'); // Change stroke to black for hover or origin
      }
    } else {
      setCountryColor(colorData[color].CountryBase); // Reset to original fill
      setStrokeColor(colorData[color].CountryBase); // Reset to original stroke
    }
  }, [mouseIsDown, isHovered, adjacentCountriesById, originCountryId, color, id]);

  // Handle hover effects
  const handleMouseEnter = () => {
    if (mouseIsDown) {
      setIsHovered(true); // Only highlight if the mouse button is down
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Reset hover state
  };

  return (
    <>
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
      />

      <text x={center[0]} y={center[1] - 5} textAnchor="middle" fill="white">
        {name}
      </text>

      {occupyingArmy && (
        <image
          href={ArmyIcon}
          x={center[0] - 5} // Adjust position based on country center
          y={center[1] - 2} // Adjust position based on country center
          width="20"        // Set size for army icon
          height="20"
        />
      )}

      {isSupplyPoint && <circle cx={center[0] - 15} cy={center[1] + 10} r="5" fill="white" />}
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Country);
