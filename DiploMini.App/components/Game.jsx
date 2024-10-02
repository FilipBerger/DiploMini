import React, { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet, ScrollView, Pressable } from "react-native";
import Map from "./Map"; // Import when Map component is ported
import { getUpdatedGameState, getInitialGameState, postOrders } from "../api";

const Game = () => {
  const [gameState, setGameState] = useState(null);
  const [currentPlayerId, setCurrentPlayerId] = useState(1);
  const [updatedOrders, setUpdatedOrders] = useState(null);

  const resetOrders = (updatedMap) => {
    if (!updatedMap) {
      return [];
    }
    return updatedMap
      .filter((country) => country.occupyingArmy)
      .map((country) => ({
        ArmyId: country.occupyingArmy.id,
        OwnerId: country.occupyingArmy.ownerId,
        Contest: true,
        Support: false,
        AssistFaction: null,
        Target: country.countryId,
        Origin: country.countryId,
      }));
  };

  const initiateGameState = async () => {
    try {
      const data = await getInitialGameState();
      setGameState(data);
    } catch (error) {
      console.error("Error when loading game state: ", error.message);
    }
  };

  useEffect(() => {
    initiateGameState();
  }, []);

  useEffect(() => {
    if (gameState) {
      setUpdatedOrders(resetOrders(gameState.map)); // Reset orders when gameState is available
    }
  }, [gameState]);

  const turnAdvance = () => {
    let nextPlayer = currentPlayerId + 1;
    while (
      nextPlayer < gameState.players.length &&
      gameState.players[nextPlayer].Defeated
    ) {
      nextPlayer++;
    }
    if (nextPlayer <= gameState.players.length) {
      setCurrentPlayerId(nextPlayer);
    } else {
      setCurrentPlayerId(1);
    }
  };

  const submitOrders = async () => {
    try {
      const response = await postOrders(updatedOrders);
      if (response.ok) {
        turnAdvance();
        updateGameState();
        setUpdatedOrders(resetOrders());
      }
    } catch (error) {
      console.error("Error submitting orders: ", error.message);
    }
  };

  const updateGameState = async () => {
    try {
      const updateResponse = await getUpdatedGameState();

      setGameState((gameState) => {
        const updatedMap = gameState.map.map((country) => {
          const updatedCountry = updateResponse.map.find(
            (c) => c.countryId === country.countryId
          );
          if (updatedCountry) {
            return {
              ...country,
              ownerId: updatedCountry.ownerId,
              occupyingArmy: updatedCountry.occupyingArmy,
              color: updatedCountry.color,
            };
          }
          return country;
        });

        const updatedPlayers = gameState.players.map((player) => {
          const isPlayerInResponse = updateResponse.players.includes(player.id);
          return {
            ...player,
            defeated: !isPlayerInResponse,
          };
        });

        return {
          ...gameState,
          players: updatedPlayers,
          map: updatedMap,
          ingameDate: updateResponse.ingameDate,
        };
      });
    } catch (error) {
      console.error("Error loading game state: ", error.message);
    }
  };

  return (
    <View style={styles.gameContainer}>
      {gameState ? (<Text style={styles.ingameDateTxt}>{gameState.ingameDate}</Text>
          ) : (
          <ActivityIndicator size="large" color="#0000ff" />)}

      {gameState ? (
          <Text style={styles.playerTurnTxt}>
          {gameState.players[currentPlayerId - 1].factionName}'s turn
          </Text>
          ) : (
          <ActivityIndicator size="large" color="#0000ff" />
      )}

    {/* {gameState ? (
      <svg width="430" height="380" xmlns="http://www.w3.org/2000/svg" 
      style={{ minWidth: '100%' }} >
        {console.log(gameState)}
        {gameState.map.map((country) => (
          <path
            d={country.shape}
            fill={country.color}
            stroke={country.color}
            strokeWidth={4}
            id={country.countryId}
          />
        ))}
      </svg>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )} */}

      {/* Uncomment when Map component is ready */}
      {gameState ? (

          <View style={styles.mapContainer}>
            <Map
              mapData={gameState.map}
              playerData={gameState.players}
              updatedOrders={updatedOrders}
              setUpdatedOrders={setUpdatedOrders}
              currentPlayerId={currentPlayerId}
            />
          </View>
        
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )} 

        <Pressable
          onPress={submitOrders}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#43A047" : "#4CAF50",
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
              borderRadius: 5,
            },
          ]}
        >
            <Text style={styles.buttonText}>Submit Orders</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
      flex: 1,
      paddingTop: 30,
      width: '100%'
  },
  buttonText: {
      color: 'white',
      fontSize: 20,
  },
  playerTurnTxt: {
      fontSize: 20, 
      fontWeight: "bold",
      textAlign: "center"
  },
  ingameDateTxt: {
      fontSize: 20, 
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10
  },
  mapContainer: {
    flex: 1
  }
});

export default Game;
