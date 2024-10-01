import { useState, useEffect } from "react"
import playerData from "./mockPlayers.jsx"
// import Buttons from "../Buttons/Buttons.jsx"
import Map from "../Map/Map.jsx"
import { getUpdatedGameState, getInitialGameState, postOrders } from "../../api.js"
import orders from "../Map/orderFactory.jsx"

const Game = () => {
    const [gameState , setGameState] = useState(null)
    let orders = null;

    const initiateGameState = async () => {
        try {
            const data = await getInitialGameState()
            setGameState(data)
        }
        catch 
        {
            console.error("Error when loading game state.")
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
        }
        catch (error)
        {
            console.error("Error occured when submitting orders: ", error.message);
        }
    }

      // updateGameState has to be reworked 

    // const updateGameState = async () => {
    //     try {
    //         const data = await GetUpdatedGameState()
    //         setGameState(data)
    //     }
    //     catch 
    //     {
    //         console.error("Error loading game state")
    //     }
    // }
    // useEffect(() => {
    //     updateGameState()
    //   }, [])

    return (
        
        <div>
            {gameState ? <p>Date: {gameState.ingameDate}</p> : <p>Loading...</p>}
            {/* <Buttons /> */}
            {gameState ?  (<Map mapData={gameState.map} playerData={playerData} handleParentOrdersUpdate={handleOrdersUpdate}/>) : <p>Loading...</p>}
            {/* <button onClick={updateGameState} >Update Game State</button> */}
            <button onClick={submitOrders}>Submit Orders</button>
        </div>
    )
}


export default Game