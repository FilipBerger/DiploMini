import { useState, useEffect } from "react"
import Buttons from "../Buttons/Buttons.jsx"
import Map from "../Map/Map.jsx"
import { fetchGameState } from "../../api.js"
import PlayerTurn  from "../PlayerTurns/PlayerTurn.jsx"

const Game = () => {
    const [gameState , setGameState] = useState(null)
    
    const updateGameState = async () => {
        try {
            const data = await fetchGameState()
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
            <Buttons />
            {gameState ? (<PlayerTurn playerData={gameState.players} />) : <p>Loading...</p>}
            {gameState ?  (<Map mapData={gameState.map} />) : <p>Loading...</p>}
            <button onClick={updateGameState} >Update Game State</button>
        </div>
    )
}


export default Game