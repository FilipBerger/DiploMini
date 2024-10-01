import React, { useEffect, useState, memo } from 'react';
import ArmyIcon from '../../assets/army_star_icon.svg';

const Country = ({
  d,
  fill,
  stroke,
  strokeWidth,
  id,
  name,
  occupyingArmy,
  isSupplyPoint,
  center,
  onMouseDown,
  onMouseUp,
  mouseIsDown,
  originCountryId,
  isAdjacent
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [countryColor, setCountryColor] = useState(fill); // Country color state
  const [strokeColor, setStrokeColor] = useState(fill); // Set initial stroke to the passed stroke prop

  console.log(originCountryId)

  // Function to lighten HSL color
  const lightenHSLColor = (hslColor, percent) => {
    const hslRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
    const match = hslColor.match(hslRegex);

    if (match) {
      const hue = match[1];
      const saturation = match[2];
      let lightness = parseFloat(match[3]);

      // Adjust the lightness by the percentage provided
      lightness = Math.min(100, Math.max(0, lightness + percent));

      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    return hslColor; // Return original if no match
  };

  // Update the country color based on hover and dragging state
  useEffect(() => {
    if (mouseIsDown && (isAdjacent.includes(Number(id)) || originCountryId === id)) {
      setCountryColor(lightenHSLColor(fill, 10)); // Lighten adjacent country color
      setStrokeColor(fill);
      if (isHovered || originCountryId === id) {
        setCountryColor(lightenHSLColor(fill, 20)); // Lighten the origin country
        setStrokeColor('black'); // Change stroke to black for hover or origin
      }
    } else {
      setCountryColor(fill); // Reset to original fill
      setStrokeColor(fill); // Reset to original stroke
    }
  }, [mouseIsDown, isHovered, isAdjacent, originCountryId, fill, stroke, id]);

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
        d={d}
        fill={countryColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
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
