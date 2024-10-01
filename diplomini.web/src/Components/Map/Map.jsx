import React, { useState, useEffect } from 'react';
import Country from '../Country/Country';
import SelectOrderDialog from '../SelectOrderDialog/SelectOrderDialog';
import Arrow from './Arrow';

const Map = (props) => {
  const [orderProps, setOrderProps] = useState({
    mouseIsDown: false,
    selectedArmy: null,
    originCountryId: null,
    targetCountryId: null,
    adjacentCountries: []
  });

  const [showDialog, setShowDialog] = useState(false);

  // console.log(props)

  const handleMouseDown = (startCountry) => {
    if (startCountry?.occupyingArmy?.ownerId === props.currentPlayerId) {
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

  const handleMouseUp = (endCountry) => {
    if (
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
    if (orderOption !== false) {
      const newOrders = props.updatedOrders?.map((o) =>
        o.ArmyId === orderProps.selectedArmy.id
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
      <svg width="430" height="380" xmlns="http://www.w3.org/2000/svg" onMouseUp={() => handleMouseUp()} style={{ minWidth: '100%' }} >
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
            mouseIsDown={orderProps.mouseIsDown}
            isAdjacent={orderProps.adjacentCountries}
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
                props.playerData.find((p) => p.FactionName === order.AssistFaction)
                  ?.Color
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
