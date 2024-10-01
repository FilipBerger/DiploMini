import { useState, useEffect } from "react"
import playerData from "./mockPlayers.jsx"
// import Buttons from "../Buttons/Buttons.jsx"
import Map from "../Map/Map.jsx"
import { getUpdatedGameState, getInitialGameState, postOrders } from "../../api.js"
import orders from "../Map/orderFactory.jsx"
import PlayerTurn  from "../PlayerTurns/PlayerTurn.jsx"

const Game = () => {
    const [gameState , setGameState] = useState(null)
    const [currentPlayerId , setCurrentPlayerId] = useState(1)
    let orders = null;

    const initiateGameState = async () => {
        try {
            const data = await getInitialGameState()
            setGameState(data)
        }
        catch (error)
        {
            console.error("Error when loading game state: ", error.message)
        }
    }
    useEffect(() => {
        initiateGameState()
      }, [])
    
    const handleOrdersUpdate = (newOrders) => {
        orders = newOrders
        // console.log(orders)
    }

    const submitOrders = async () => {
        try 
        {
            const response = await postOrders(orders)
            //console.log("Status code: ", response.status)
           if(response.ok){
            turnAdvance();
           }
        }
        catch (error)
        {
            console.error("Error submitting orders: ", error.message);
        }
    }

    //   updateGameState has to be reworked 

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
            {/* <Buttons /> */}
            {gameState ? <PlayerTurn/> : <p>Loading...</p>}
            {gameState ?  (<Map mapData={gameState.map} playerData={playerData} handleParentOrdersUpdate={handleOrdersUpdate}/>) : <p>Loading...</p>}
{gameState ?  (<Map mapData={gameState.map} playerData={playerData} handleParentOrdersUpdate={handleOrdersUpdate} currentPlayerId={currentPlayerId}/>) : <p>Loading...</p>}
            <button onClick={updateGameState} >Update Game State</button>
            <button onClick={submitOrders}>Submit Orders</button>

        </div>
    )
}


export default Game