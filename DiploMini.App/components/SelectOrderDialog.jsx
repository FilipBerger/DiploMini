import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import colorData from '../colorData.js';

const { width, height } = Dimensions.get('window');

const SelectOrderDialog = ({ onSelectOption, players }) => {
  const options = [
    { Description: 'Move/Attack', Support: null, Color: null },
    ...players.map((player) => ({
      Description: `Support ${player.factionName}`,
      Support: player.factionName,
      Color: colorData[player.color]?.CountryBase, 
    })),
  ];

  return (
    <>
      {/* Overlay for dismissing the dialog */}
      <TouchableOpacity
        style={styles.overlay}
        onPress={() => onSelectOption(false)}
        activeOpacity={1}
      />
      
      {/* Dialog content */}
      <View style={styles.dialogContainer}>
        <Text style={styles.dialogTitle}>Select order</Text>

        {options.map((option) => (
          <TouchableOpacity
            key={option.Description}
            onPress={() => onSelectOption(option.Support)}
            style={[styles.optionButton, { backgroundColor: option.Color || 'gray' }]}
          >
            <Text style={styles.optionText}>{option.Description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.3,
    zIndex: 999,
  },
  dialogContainer: {
    position: 'absolute',
    top: height / 2 - 150,
    left: width / 2 - (width * 0.5) / 2,
    width: '50%',
    backgroundColor: 'grey',
    padding: 20,
    zIndex: 1000,
    opacity: 0.9,
    borderRadius: 10,
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  optionButton: {
    width: '100%',
    paddingVertical: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    color: 'white',
  },
});

export default SelectOrderDialog;
