import React, { useState } from "react";
import playerData from "../Game/mockPlayers";

const PlayerTurn = () => {
    // const players = [
    //     { id: 1, name: 'Player 1', factionName: 'Faction 1', Defeated: false },
    //     { id: 2, name: 'Player 2', factionName: 'Faction 2', Defeated: true }, // Hardcoded as defeated
    //     { id: 3, name: 'Player 3', factionName: 'Faction 3', Defeated: false },
    // ];
    const [currentTurn, setCurrentTurn] = useState(0);
    

    // Handles the end of the round and resets the game state
    const handleRoundEnd = () => {
        setCurrentTurn(0);
    };

    // Goes to next player's turn or ends round
    const turnAdvance = () => {
        let nextPlayer = currentTurn + 1;
        while (nextPlayer < playerData.length && playerData[nextPlayer].Defeated) {
            nextPlayer++;
        }
        if (nextPlayer < playerData.length) {
            setCurrentTurn(nextPlayer);
        } else {
            handleRoundEnd();
        }
    };

    return (
        <>
            <h2>Player {playerData[currentTurn].FactionName}'s turn</h2>
        </>
    );
};

export default PlayerTurn;