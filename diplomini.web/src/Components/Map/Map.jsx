import React, { useState } from 'react';
import Country from '../Country/Country';
import SelectOrderDialog from '../SelectOrderDialog/SelectOrderDialog';
import countries from './mockCountries';
import orders from './orderFactory';
import Arrow from './Arrow';

const Map = () => {

  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [draggingArmy, setDraggingArmy] = useState(null); // Track the army being dragged
  const [originCountry, setOriginCountry] = useState(null);  // Track the source country being dragged from
  const [showDialog, setShowDialog] = useState(false);
  const [targetCountry, setTargetCountry] = useState(null);
  const [updatedOrders, setUpdatedOrders] = useState(orders);

  const handleMouseDown = (country) => {  //Start dragging army to another country
    setOriginCountry(country);
    if (country.occupyingArmy) {
      setMouseIsDown(true);
      setDraggingArmy(country.occupyingArmy);
    }
  };

  const handleMouseUp = (targetCountry) => {  //"Drop" the army on a different country.
    if (draggingArmy && //Ensure that we drag to an adjacent country
      // originCountry.AdjacentCountries.filter(c => c === targetCountry.id) ||
      (originCountry.id != targetCountry.id)
      ) {
      setTargetCountry(targetCountry);
      setShowDialog(true);
    }
    setMouseIsDown(false);
  };

  const handleMouseUp2 = () => {  //"Drop" the army on a different country.
    console.log("triggered");
    setMouseIsDown(false);
  };

  const handleSelectOption = (orderOption) => {
    setShowDialog(false);
    console.log(targetCountry.id);
    console.log(originCountry.id);
    if (orderOption !== false) {
      const newOrders = updatedOrders.map(o => 
        o.ArmyId === draggingArmy.Id ? {
          ...o,
          Contest: orderOption === null,
          Support: orderOption != null,
          AssistFaction: orderOption,
          Target: targetCountry.id,
          Origin: originCountry.id
        } : o
      );
      setUpdatedOrders(newOrders)
      console.log(updatedOrders);
    }
    setDraggingArmy(null);  // Reset the dragging state
  };

  return (
    <>
      {showDialog && (
        <SelectOrderDialog 
        onSelectOption={handleSelectOption}
        />
      )}
      <svg width="430" height="380" xmlns="http://www.w3.org/2000/svg" onMouseUp={() => handleMouseUp2()} 
            style={{ minWidth: '100%' }}>

        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>

        {/* Render Countries */}
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
            mouseIsDown={mouseIsDown}
            onMouseDown={() => handleMouseDown(country)}
            onMouseUp={() => handleMouseUp(country)}
            originCountry={originCountry}
          />
        ))}

        {/* Render Arrows for each order */}
        {updatedOrders.map((order) => {
        const originCountry = countries.find(c => c.id === order.Origin);
        const targetCountry = countries.find(c => c.id === order.Target);
        if (!originCountry || !targetCountry ) return null; // Skip if countries not found or same country
        // || originCountry === targetCountry

        return (
          <Arrow
            key={order.ArmyId}
            start={originCountry.center}
            end={targetCountry.center}
            color={order.AssistFaction}
          />
          );
        })}
      </svg>
    </>
  );
};

export default Map;
