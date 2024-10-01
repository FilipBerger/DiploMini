import React, { useEffect, useState } from 'react';
import ArmyIcon from '../../assets/army_star_icon.svg'

const Country = ({ d, fill, stroke, strokeWidth, id, name, occupyingArmy, isSupplyPoint, center, onMouseDown, onMouseUp, mouseIsDown, originCountryId, adjacentCountries  }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [countryColor, setCountryColor] = useState(fill);  // Country color state
  const [strokeColor, setStrokeColor] = useState(fill);

  //console.log(isAdjacent);
  const lightenHSLColor = (hslColor, percent) => {
    // Extract the H, S, and L values from the HSL string
    const hslRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
    const match = hslColor.match(hslRegex);
  
    if (match) {
      const hue = match[1];
      const saturation = match[2];
      let lightness = parseFloat(match[3]);
  
      // Adjust the lightness by the percentage provided
      lightness = Math.min(100, Math.max(0, lightness + percent));
  
      // Return the new HSL color string with adjusted lightness
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    return hslColor; // Return original if no match
  };

  // Update the country color based on hover and dragging state
  useEffect(() => {

    //console.log(isAdjacent, id, originCountry)
    if (mouseIsDown && (adjacentCountries.includes(Number(id)) || originCountryId === id)) {
      setCountryColor(lightenHSLColor(fill, 10));  // Lighten adjacent country color
      setStrokeColor(fill);
      if (isHovered || originCountryId === id) {
        setCountryColor(lightenHSLColor(fill, 20));  // Lighten adjacent country color
        setStrokeColor("black");
      };
    }
    if (!mouseIsDown) {
      setCountryColor(fill);  // Default color when not hovered or dragged
      setStrokeColor(fill);
    }
  }, [mouseIsDown, isHovered, adjacentCountries, originCountryId, fill, id]);

  const handleMouseEnter = () => {  // Handle mouse enter (hover)
    if (mouseIsDown) {
      setIsHovered(true);  // Only highlight if the mouse button is down
    }
  };

  const handleMouseLeave = () => { // Handle mouse leave
    setIsHovered(false);  // Reset hover state
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
