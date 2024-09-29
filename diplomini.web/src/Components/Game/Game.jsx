import { useState, useEffect } from "react"
// import Buttons from "../Buttons/Buttons.jsx"
import Map from "../Map/Map.jsx"
import { GetUpdatedGameState, GetInitialGameState } from "../../api.js"

const Game = () => {
    const [gameState , setGameState] = useState(null)

    const initiateGameState = async () => {
        try {
            const data = await GetInitialGameState()
            setGameState(data)
        }
        catch 
        {
            console.error("Error loading game state")
        }
    }
    useEffect(() => {
        initiateGameState()
      }, [])
    

    const updateGameState = async () => {
        try {
            const data = await GetUpdatedGameState()
            setGameState(data)
        }
        catch 
        {
            console.error("Error loading game state")
        }
    }
    useEffect(() => {
        updateGameState()
      }, [])

    return (
        
        <div>
            {gameState ? <p>Date: {gameState.ingameDate}</p> : <p>Loading...</p>}
            {/* <Buttons /> */}
            {gameState ?  (<Map mapData={gameState.map} playerData={gameState.playerData} />) : <p>Loading...</p>}
            <button onClick={updateGameState} >Update Game State</button>
        </div>
    )
}


export default Game