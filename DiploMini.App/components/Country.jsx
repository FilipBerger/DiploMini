import React, { useState, useEffect, memo } from 'react';
import { G, Path, Svg, Circle, Rect } from 'react-native-svg';
import { Pressable, TouchableHighlight } from 'react-native';
import colorData from '../colorData';

const Country = ({
  id,
  shape,
  center,
  isSupplyPoint,
  occupyingArmy,
  color,
  isSelected,
  isAdjacent,
  onPress,
}) => {
  const [countryColor, setCountryColor] = useState(colorData[color].CountryBase);
  const [strokeColor, setStrokeColor] = useState(colorData[color].CountryBase);

  // Update colors based on selected or adjacent state
  useEffect(() => {
    if (isSelected) {
      setCountryColor(colorData[color].CountrySelected);
      setStrokeColor('black');
    } else if (isAdjacent) {
      setCountryColor(colorData[color].CountryAdjacent);
      setStrokeColor(colorData[color].CountryBase);
    } else {
      setCountryColor(colorData[color].CountryBase);
      setStrokeColor(colorData[color].CountryBase);
    }
  }, [isSelected, isAdjacent, color]);

  return (
    <G>
      {/* Path for the country shape */}
      <Path
        d={shape}
        fill={countryColor}
        stroke={strokeColor}
        strokeWidth={2}
        onPress={onPress}
      />
      {/* Render supply point if necessary */}
      {isSupplyPoint && (
        <Circle cx={center[0]} cy={center[1]} r={5} fill="white" />
      )}

      {/* Render army icon if occupying army exists */}
      {occupyingArmy && (
          <Rect
            x={center[0] - 4} // Adjust to center the rectangle
            y={center[1] - 4} // Adjust to center the rectangle
            width={20} // Width of the rectangle
            height={20} // Height of the rectangle
            fill="yellow" // You can change this to any color you prefer
          />
          // <Rect
          //   x={center[0] - 4} // Adjust to center the rectangle
          //   y={center[1] - 4} // Adjust to center the rectangle
          //   width={20} // Width of the rectangle
          //   height={20} // Height of the rectangle
          //   transform={`rotate(45, ${center[0] - 4 + 20 / 2}, ${center[1] - 4 + 20 / 2})`}
          //   fill="yellow" // You can change this to any color you prefer
          // />
      )}
    </G>
  );
};

export default memo(Country);
