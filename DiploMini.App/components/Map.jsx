import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Pressable,TouchableHighlight } from 'react-native';
import Svg from 'react-native-svg';
import Country from './Country'; // Updated Country component

const Map = (props) => {
  const [orderProps, setOrderProps] = useState({
    selectedArmy: null,
    originCountryId: null,
    adjacentCountries: [],
  });

  const [showDialog, setShowDialog] = useState(false);

  const handleCountryPress = (country) => {
    console.log(country)
    console.log(orderProps);
    if (!orderProps.selectedArmy && country?.occupyingArmy?.ownerId === props.currentPlayerId) {
      setOrderProps({
        selectedArmy: country.occupyingArmy,
        originCountryId: country.countryId,
        adjacentCountries: country.adjacentCountriesById,
        
      });
      console.log(orderProps, "HEJ");
    } else if (orderProps.selectedArmy && orderProps.adjacentCountries.includes(Number(country.countryId))) {
      setShowDialog(true);
      setOrderProps({
        selectedArmy: null,
        originCountryId: null,
        adjacentCountries: [],
      });
      console.log(orderProps, "DÅ")
    }

  };

  return (
    <View style={styles.mapContainer}>
      {/* Render the map with countries */}
      <Pressable> 
        <Svg>
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

      {/* Render army icons over the map */}
      {props.mapData.map((country) => {
        if (country.occupyingArmy) {
          return (
            <View
              key={`army-${country.countryId}`}
              style={[
                styles.armyIcon,
                {
                  left: country.center[0] - 10,
                  top: country.center[1] - 10,
                },
              ]}
            >
              <Image
                source={require('../assets/army_star_icon.svg')}
                style={styles.iconImage}
              />
            </View>
          );
        }
        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '100%',
    position: 'relative', // Allow absolute positioning of icons
  },
  armyIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  iconImage: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
