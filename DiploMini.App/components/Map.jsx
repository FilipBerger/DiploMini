import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import Svg from 'react-native-svg';
import Country from './Country'; // Updated Country component
import { ScrollView } from 'react-native';

const Map = (props) => {
  const [orderProps, setOrderProps] = useState({
    selectedArmy: null,
    originCountryId: null,
    adjacentCountries: [],
  });

  const [showDialog, setShowDialog] = useState(false);

  const handleCountryPress = (country) => {
    if (!orderProps.selectedArmy && country?.occupyingArmy?.ownerId === props.currentPlayerId) {
      setOrderProps({
        selectedArmy: country.occupyingArmy,
        originCountryId: country.countryId,
        adjacentCountries: country.adjacentCountriesById,
      });
    } else if (orderProps.selectedArmy && orderProps.adjacentCountries.includes(Number(country.countryId))) {
      setShowDialog(true);
      setOrderProps({
        selectedArmy: null,
        originCountryId: null,
        adjacentCountries: [],
      });
    }
  };

  return (
      <View style={styles.mapContainer}>

        {/* Render the map with countries */}
        <Pressable>
          <Svg
            viewBox='0 0 430 380'
            preserveAspectRatio='xMidyMid meet'
            style={{ width: '100%', height: '100%' }}
          >
            {props.mapData.map((country) => (
              <Country
                key={country.countryId}
                id={country.countryId}
                shape={country.shape}
                center={country.center}
                isSupplyPoint={country.isSupplyPoint}
                occupyingArmy={country.occupyingArmy}
                color={country.color}
                isSelected={orderProps.originCountryId === country.countryId}
                isAdjacent={orderProps.adjacentCountries.includes(Number(country.countryId))}
                onPress={() => handleCountryPress(country)}
              />
            ))}
          </Svg>
        </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  armyIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  iconImage: {
    width: '100%',
    height: '100%',
  }
});

export default Map;
