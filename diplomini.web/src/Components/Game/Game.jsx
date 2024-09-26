import { useState, useEffect } from "react"

const Game = () => {
    const [gameState , setGameState] = useState()

    useEffect(() => {
        const fetchGameState = async () => {

            const response = await fetch('https://localhost:7026/GetUpdatedGameState')
            const data = await response.json()
            setGameState(data)
        }
        fetchGameState()
        
      }, [])
    return (
        
        <div>
            {/* test to see if GetUpdatedGameState works as intended */}
            {gameState ? <p>Date: {gameState.ingameDate}</p> : <p>Loading...</p>}
        </div>
    )
}


export default Game