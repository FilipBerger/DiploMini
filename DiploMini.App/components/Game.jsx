import React, { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
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
    <View style={{ padding: 20 }}>
      {gameState ? (<Text>Date: {gameState.ingameDate}</Text>) : (<ActivityIndicator size="large" color="#0000ff" />)}

      {gameState ? (
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Player {gameState.players[currentPlayerId - 1].factionName}'s turn
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
        <Map
          mapData={gameState.map}
          playerData={gameState.players}
          updatedOrders={updatedOrders}
          setUpdatedOrders={setUpdatedOrders}
          currentPlayerId={currentPlayerId}
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )} 

      <Button title="Submit Orders" onPress={submitOrders} />
    </View>
  );
};

export default Game;
