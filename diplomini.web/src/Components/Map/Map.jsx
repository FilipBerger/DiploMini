import React, { useState, useEffect } from 'react';
import Country from '../Country/Country';
import SelectOrderDialog from '../SelectOrderDialog/SelectOrderDialog';
import countries from './mockCountries';
import orders from './orderFactory';
import players from '../Game/mockPlayers';
import Arrow from './Arrow';

const Map = ( props ) => {

  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [draggingArmy, setDraggingArmy] = useState(null); // Track the army being dragged
  const [originCountry, setOriginCountry] = useState(null);  // Track the source country being dragged from
  const [adjacentCountries, setAdjacentCountries] = useState([]); // New state for adjacent countries
  const [showDialog, setShowDialog] = useState(false);
  const [targetCountry, setTargetCountry] = useState(null);
  const [updatedOrders, setUpdatedOrders] = useState(orders);


  const handleMouseDown = (country) => {  //Start dragging army to another country
    console.log(country)
    setOriginCountry(country);
    if (country.occupyingArmy) {
      setMouseIsDown(true);
      setDraggingArmy(country.occupyingArmy);
      setAdjacentCountries(country.adjacentCountriesById);
    }
  };

  const handleMouseUp = (targetCountry) => {  //"Drop" the army on a different country.
    if (draggingArmy && targetCountry &&
      adjacentCountries.includes(Number(targetCountry.id))//Ensure that we drag to an adjacent country
      // originCountry.AdjacentCountries.filter(c => c === targetCountry.id) ||
      // (originCountry.id != targetCountry.id)
      ) {
      setTargetCountry(targetCountry);
      setShowDialog(true);
    }
    setMouseIsDown(false);
    setAdjacentCountries([]);
  };

  const handleSelectOption = (orderOption) => {
    setShowDialog(false);
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
        players={props.playerData}
        />
      )}
      <svg width="430" height="380" xmlns="http://www.w3.org/2000/svg" onMouseUp={() => handleMouseUp()} 
            style={{ minWidth: '100%' }}>

        {/* Render Countries */}
        {props.mapData.map((country) => (
          <Country
            key={country.countryId}
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
            isAdjacent={adjacentCountries}
          />
        ))}

        {/* Render Arrows for each order */}
        {updatedOrders.map((order) => {
        return (
          <Arrow
            key={order.ArmyId}
            start={countries.find(c => c.id === order.Origin)}
            end={countries.find(c => c.id === order.Target)}
            color={players.find(p => p.FactionName === order.AssistFaction)?.Color}
          />
          );
        })}
      </svg>
    </>
  );
};

export default Map;
