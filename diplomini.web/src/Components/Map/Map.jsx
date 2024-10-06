import React, { useState, useEffect } from 'react';
import Country from '../Country/Country';
import SelectOrderDialog from '../SelectOrderDialog/SelectOrderDialog';
import Arrow from './Arrow';

const Map = (props) => {
  const [orderProps, setOrderProps] = useState({  // Values passed down to render and validate orders and order input
    mouseIsDown: false,                           
    selectedArmy: null,     // Army being moved 
    originCountryId: null,  // Start dragging from this country
    targetCountryId: null,  // Drop onto this country
    adjacentCountries: []   // While dragging, these are set to adjacent countries of originCountry 
  });

  const [showDialog, setShowDialog] = useState(false);

  const handleMouseDown = (startCountry) => { // Fetch values from Country via callback function
    if (startCountry?.occupyingArmy?.ownerId === props.currentPlayerId) { // Only allow army owner to move army 
      setOrderProps((prevState) => ({ 
        ...prevState,
        mouseIsDown: true,
        selectedArmy: startCountry.occupyingArmy,
        originCountryId: startCountry.countryId,
        adjacentCountries: startCountry.adjacentCountriesById,
        targetCountryId: null
      }));
    }
  };

  const handleMouseUp = (endCountry) => { // Fetch values from Country via callback function
    if (  // Ensure dialog is only shown if move was made with army to proper target  
      orderProps.selectedArmy &&
      endCountry &&
      orderProps.adjacentCountries.includes(Number(endCountry.countryId))
    ) {
      setOrderProps((prevState) => ({ 
        ...prevState,
        targetCountryId: endCountry.countryId,
      }));
      setShowDialog(true);
    }

    setOrderProps((prevState) => ({ 
      ...prevState,
      mouseIsDown: false,
      adjacentCountries: []
    }));
  };

  const handleSelectOption = (orderOption) => {
    setShowDialog(false);
    if (orderOption !== false) {  // "Move/Attack" returns null, false equals aborted order (unclear, adjust logic)
      const newOrders = props.updatedOrders?.map((o) =>
        o.ArmyId === orderProps.selectedArmy.id   // Orders for selected army is updated with new values 
          ? {
            ...o,
            Contest: orderOption === null,
            Support: orderOption != null,
            AssistFaction: orderOption,
            Target: orderProps.targetCountryId,
            Origin: orderProps.originCountryId,
          }
          : o
      );
      props.setUpdatedOrders(newOrders);
    }

    setOrderProps((prevState) => ({
      ...prevState,
      selectedArmy: null
    }));
  };

  return (
    <>
      {/* Render order dialog */}
      {showDialog && (
        <SelectOrderDialog
          onSelectOption={handleSelectOption}
          players={props.playerData}
        />
      )}
      {/* Render Countries */}
      <svg width="100%"
        height="100%"
        viewBox="0 0 430 380" xmlns="http://www.w3.org/2000/svg" onMouseUp={() => handleMouseUp()} style={{ minWidth: '100%' }} >
        {props.mapData.map((country) => (
          <Country
            key={country.countryId}
            id={country.countryId}
            shape={country.shape}
            center={country.center}
            name={country.name}
            isSupplyPoint={country.isSupplyPoint}
            occupyingArmy={country.occupyingArmy}
            color={country.color}
            mouseIsDown={orderProps.mouseIsDown}
            adjacentCountriesById={orderProps.adjacentCountries}
            onMouseDown={() => handleMouseDown(country)}
            onMouseUp={() => handleMouseUp(country)}
            originCountryId={orderProps.originCountryId}
          />
        ))}

        {/* Render Arrows for each order */}
        {props.updatedOrders?.map((order) => {
          return (
            <Arrow
              key={order.ArmyId}
              start={props.mapData.find((c) => c.countryId === order.Origin)}
              end={props.mapData.find((c) => c.countryId === order.Target)}
              color={
                props.playerData.find((p) => p.factionName === order.AssistFaction)
                  ?.color
              }
              assistedFaction={order.AssistFaction}
            />
          );
        })}
      </svg>
    </>
  );
};

export default Map;
