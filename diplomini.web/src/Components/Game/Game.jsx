import { useState, useEffect } from "react"
import Map from "../Map/Map.jsx"
import { getUpdatedGameState, getInitialGameState, postOrders } from "../../api.js"

const Game = () => {
    const [gameState , setGameState] = useState(null)
    const [currentPlayerId , setCurrentPlayerId] = useState(1)
    const [updatedOrders, setUpdatedOrders] = useState(null);

    const resetOrders = (updatedMap) => {
        if (!updatedMap) {
            return [];
        }
        return updatedMap
            .filter(country => country.occupyingArmy)
            .map(country => ({
                ArmyId: country.occupyingArmy.id,
                OwnerId: country.occupyingArmy.ownerId,
                Contest: true,
                Support: false,
                AssistFaction: null,
                Target: country.countryId,
                Origin: country.countryId
            }));
    };

        

    const initiateGameState = async () => {
        try {
            const data = await getInitialGameState()
            setGameState(data)
        }
        catch (error) {
            console.error("Error when loading game state: ", error.message)
        }
    }
    useEffect(() => {
        initiateGameState()
      }, [])

    useEffect(() => {
    if (gameState) {
        setUpdatedOrders(resetOrders(gameState.map));  // Reset orders when gameState is available
    }
    }, [gameState]); 

    const turnAdvance = () => {
        let nextPlayer = currentPlayerId + 1;
        while (nextPlayer < gameState.players.length && gameState.players[nextPlayer].Defeated) {
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
            const response = await postOrders(updatedOrders)
            if(response.ok){
                turnAdvance();
                updateGameState();
                setUpdatedOrders(resetOrders());
            }
        }
        catch (error) {
            console.error("Error submitting orders: ", error.message);
        }
    }

    const updateGameState = async () => {
        try {
            const updateResponse = await getUpdatedGameState()

            setGameState((gameState) => {
                const updatedMap = gameState.map.map((country) => {
                    const updatedCountry = updateResponse.map.find(c => c.countryId === country.countryId)
                    if (updatedCountry) {
                        return {
                            ...country,
                            ownerId: updatedCountry.ownerId,
                            occupyingArmy: updatedCountry.occupyingArmy,
                            color: updatedCountry.color
                        }
                    }
                    return country
                })

                const updatedPlayers = gameState.players.map((player) => {
                    const isPlayerInResponse = updateResponse.players.includes(player.id)
                    return {
                        ...player,
                        defeated: !isPlayerInResponse
                    }
                })

                return {
                    ...gameState,
                    players: updatedPlayers,
                    map: updatedMap,
                    ingameDate: updateResponse.ingameDate
                }

            })
        }
        catch (error)
        {
            console.error("Error loading game state: ", error.message)
        }
    }

    return (
        
        <div>
            {gameState ? <p>Date: {gameState.ingameDate}</p> : <p>Loading...</p>}
            {/* {gameState ? <PlayerTurn playerData={gameState.players}/> : <p>Loading...</p>} */}
            {gameState ? <h2>Player {gameState.players[currentPlayerId-1].factionName}'s turn</h2> : <p>Loading...</p>}
            {gameState ?  (<Map mapData={gameState.map} playerData={gameState.players} updatedOrders={updatedOrders} setUpdatedOrders={setUpdatedOrders} currentPlayerId={currentPlayerId}/>) : <p>Loading...</p>}
            {/* <button onClick={updateGameState} >Update Game State</button> */}
            <button onClick={submitOrders}>Submit Orders</button>

        </div>
    )
}


export default Game