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


  // useEffect(() => {
  //   console.log(updatedOrders)
  // }); [updatedOrders]

  const handleMouseDown = (country) => {  //Start dragging army to another country
    //console.log(country)
    setOriginCountry(country);
    if (country.occupyingArmy) {
      setMouseIsDown(true);
      setDraggingArmy(country.occupyingArmy);
      setAdjacentCountries(country.adjacentCountriesById);
      //console.log("AdjecentCountriesById: ", country.adjacentCountriesById)
      
    }
  };

  const handleMouseUp = (targetCountry) => {  //"Drop" the army on a different country.
    
    // console.log("targetCountry: ", targetCountry)
    
    if (draggingArmy && targetCountry &&
      adjacentCountries.includes(Number(targetCountry.countryId))//Ensure that we drag to an adjacent country
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
        o.ArmyId === draggingArmy.id ? {
          ...o,
          Contest: orderOption === null,
          Support: orderOption != null,
          AssistFaction: orderOption,
          Target: targetCountry.countryId,
          Origin: originCountry.countryId
        } : o
      );
      setUpdatedOrders(newOrders)
      
      //console.log(updatedOrders);
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
            id={country.countryId}
            d={country.d}
            center={country.center}
            name={country.name}
            isSupplyPoint={country.isSupplyPoint}
            occupyingArmy={country.occupyingArmy}
            fill={country.fill} 
            stroke={country.stroke}
            strokeWidth={country.strokeWidth}
            mouseIsDown={mouseIsDown}
            isAdjacent={adjacentCountries}
            onMouseDown={() => handleMouseDown(country)}
            onMouseUp={() => handleMouseUp(country)}
            originCountry={originCountry}
            
          />
        ))}

        {/* Render Arrows for each order */}
        {updatedOrders.map((order) => {
        return (
          <Arrow
            key={order.ArmyId}
            start={props.mapData.find(c => c.countryId === order.Origin)}
            end={props.mapData.find(c => c.countryId === order.Target)}
            color={props.playerData.find(p => p.FactionName === order.AssistFaction)?.Color}
          />
          );
        })}
      </svg>
    </>
  );
};

export default Map;
