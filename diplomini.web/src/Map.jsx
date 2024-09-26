import React from 'react';
import Country from './Country';

const Map = () => {
  // The path data for each "country" shape
  const countries = [
    {
      id: "svg_1",
      d: "m72,170l-33,-18l-20,-58l36,-38l28,29l56,-17l35,45l-34,51l-68,6z",
      fill: "#999999",
      stroke: "#000000",
      name: "Country A",
      center: [100, 120],  // Example center point
      isSupplyPoint: false,  // No supply point
      occupyingArmy: "Army X"
    },
    {
      id: "svg_2",
      d: "m90,187l65,-6l36,-60l49,-2l42,65l-82,10l-68,49l-40,-25l-2,-31z",
      fill: "#999999",
      stroke: "#000000",
      name: "Country B",
      center: [170, 190],  // Example center point
      isSupplyPoint: true,  // This country has a supply point
      occupyingArmy: "Army Y"
    },
    {
      id: "svg_3",
      d: "m194,102l-32,-36l70,-40l95,28l-15,47l-47,22l-20,-24l-51,3z",
      fill: "#999999",
      stroke: "#000000",
      name: "Country C",
      center: [240, 70],  // Example center point
      isSupplyPoint: false,  // No supply point
      occupyingArmy: "Army Z"
    },
    {
      id: "svg_4",
      d: "m276,139l51,-23l14,-48l47,26l14,67l-38,20l-69,-2l-19,-40z",
      fill: "#999999",
      stroke: "#000000",
      name: "Country D",
      center: [340, 130],  // Example center point
      isSupplyPoint: false,
      occupyingArmy: "Army W"
    },
    {
      id: "svg_5",
      d: "m74,185l-37,-16l-21,59l27,77l44,13l45,-57l-60,-34l2,-42z",
      fill: "#999999",
      stroke: "#000000",
      name: "Country E",
      center: [60, 250],  // Example center point
      isSupplyPoint: false,
      occupyingArmy: null  // No occupying army
    },
    {
      id: "svg_6",
      d: "m104,326l45,-56l26,35l54,0l24,-19l27,15l-62,44l-114,-19z",
      fill: "#999999",
      stroke: "#000000",
      name: "Country F",
      center: [180, 310],  // Example center point
      isSupplyPoint: true,  // This country has a supply point
      occupyingArmy: "Army Q"
    },
    {
      id: "svg_8",
      d: "m267,272l35,-39l10,-39l58,-1l24,-4l18,70c0,0 -51,6 -52,6c-1,0 -71,25 -71,25c0,0 -22,-18 -22,-18z",
      fill: "#999999",
      stroke: "#000000",
      name: "Country G",
      center: [350, 230],  // Example center point
      isSupplyPoint: false,
      occupyingArmy: "Army B"
    },
    {
      id: "svg_9",
      d: "m256,338l43,-37l62,-22l30,-4l-20,52c0,0 -35,17 -37,19c-2,2 -61,10 -62,10c-1,0 -16,-18 -16,-18z",
      center: [330, 320],  // Center point for Småland
      name: "Småland",
      isSupplyPoint: true,  // Småland is a supply point
      occupyingArmy: "Army 11",  // Assuming occupyingArmy is represented as "Army 11"
      fill: "#999999",
      stroke: "#000000",
    }
  ];

  return (
    <svg width="430" height="380" xmlns="http://www.w3.org/2000/svg">
      {countries.map((country) => (
        <Country
          key={country.id}
          id={country.id}
          d={country.d}
          center={country.center}
          name={country.name}
          isSupplyPoint={country.isSupplyPoint}
          occupyingArmy={country.occupyingArmy}
          fill={country.fill}
          stroke={country.stroke}
          strokeWidth={country.strokeWidth}
        />
      ))}
    </svg>
  );
};

export default Map;
