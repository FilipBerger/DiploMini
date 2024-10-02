import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
//import Country from './Country';  // Import when implemented
import SelectOrderDialog from './SelectOrderDialog'; // Import when implemented
//import Arrow from './Arrow'; // Import when implemented

const Map = (props) => {
    const [orderProps, setOrderProps] = useState({
        mouseIsDown: false,
        selectedArmy: null,
        originCountryId: null,
        targetCountryId: null,
        adjacentCountries: [],
    });

    const [showDialog, setShowDialog] = useState(false);

    const handleTouchStart = (startCountry) => {
        if (startCountry?.occupyingArmy?.ownerId === props.currentPlayerId) {
        setOrderProps((prevState) => ({
            ...prevState,
            mouseIsDown: true,
            selectedArmy: startCountry.occupyingArmy,
            originCountryId: startCountry.countryId,
            adjacentCountries: startCountry.adjacentCountriesById,
            targetCountryId: null,
        }));
        }
    };

    const handleTouchEnd = (endCountry) => {
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
        adjacentCountries: [],
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
        selectedArmy: null,
        }));
    };

    return (
        <>
        
        {/* {showDialog && (
            <SelectOrderDialog
            onSelectOption={handleSelectOption}
            players={props.playerData}
            />
        )} */}
        
        <View style={styles.mapContainer}>
            {/* Render Countries */}
            {/* {props.mapData.map((country) => (
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
                onTouchStart={() => handleTouchStart(country)}
                onTouchEnd={() => handleTouchEnd(country)}
                originCountryId={orderProps.originCountryId}
            />
            ))} */}

            {/* Render Arrows for each order */}
            {/* {props.updatedOrders?.map((order) => {
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
            })} */}
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: 'lightblue',
        paddingTop: 30,
    },
});

export default Map;
