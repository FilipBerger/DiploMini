import { useState, useEffect } from "react"
import playerData from "./mockPlayers.jsx"
import Map from "../Map/Map.jsx"
import { getUpdatedGameState, getInitialGameState, postOrders } from "../../api.js"
import orders from "../Map/orderFactory.jsx"

const Game = () => {
    const [gameState , setGameState] = useState(null)
    const [currentPlayerId , setCurrentPlayerId] = useState(1)
    const [updatedOrders, setUpdatedOrders] = useState(
        orders.filter((o) => o.OwnerId === currentPlayerId)
      );

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

    const submitOrders = async () => {
        try {
            const response = await postOrders(updatedOrders)
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
                            occupyingArmy: updatedCountry.occupyingArmy 
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
            {gameState ?  (<Map mapData={gameState.map} playerData={playerData} updatedOrders={updatedOrders} setUpdatedOrders={setUpdatedOrders} currentPlayerId={currentPlayerId}/>) : <p>Loading...</p>}
            <button onClick={updateGameState} >Update Game State</button>
            <button onClick={submitOrders}>Submit Orders</button>

        </div>
    )
}


export default Game