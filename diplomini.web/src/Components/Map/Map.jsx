import React, { useState, useEffect } from 'react';
import Country from '../Country/Country';
import SelectOrderDialog from '../SelectOrderDialog/SelectOrderDialog';
import countries from './mockCountries';
import orders from './orderFactory';
import players from '../Game/mockPlayers';
import Arrow from './Arrow';

const Map = ( props ) => {

  const [orderProps, setorderProps] = useState({ mouseIsDown: false, selectedArmy: null, originCountry: null, targetCountry: null, adjacentCountries: []})
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [draggingArmy, setDraggingArmy] = useState(null); // Track the army being dragged
  const [originCountry, setOriginCountry] = useState(null);  // Track the source country being dragged from
  const [adjacentCountries, setAdjacentCountries] = useState([]); // New state for adjacent countries
  const [targetCountry, setTargetCountry] = useState(null);



  const [showDialog, setShowDialog] = useState(false);
  const [updatedOrders, setUpdatedOrders] = useState(orders.filter(o => o.OwnerId === props.currentPlayerId));



  const handleMouseDown = (startCountry) => {  //Start dragging army to another country
    
    if (startCountry?.occupyingArmy?.ownerId === props.currentPlayerId) {

      setOriginCountry(startCountry);
      setMouseIsDown(true);
      setDraggingArmy(startCountry.occupyingArmy);
      setAdjacentCountries(startCountry.adjacentCountriesById);
    }
  };

  const handleMouseUp = (endCountry) => {  //"Drop" the army on a different country.
    if (draggingArmy && endCountry &&
      adjacentCountries.includes(Number(endCountry.countryId))//Ensure that we drag to an adjacent country
      ) {
      setTargetCountry(endCountry);
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
            adjacentCountries={adjacentCountries}
            onMouseDown={() => handleMouseDown(country)}
            onMouseUp={() => handleMouseUp(country)}
            originCountryId={originCountry?.countryId}
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
            assistedFaction={order.AssistFaction}
          />
          );
        })}
      </svg>
    </>
  );
};

export default Map;
