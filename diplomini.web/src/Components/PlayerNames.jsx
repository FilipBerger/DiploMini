import react, {useState} from 'react'

const PlayerNames = () => {
    
    const [players, setPlayers] = useState(['']);
    
    const handlePlayerNameChange = (e, index) => {
        const newPlayers = [...players];
        newPlayers[index] = e.target.value;
        setPlayers(newPlayers);
    };

    const handleAddPlayer = () => {
        if(players.length < 7){
        setPlayers([...players, '']);
        } else {
            alert('Max 7 spelare')
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(players);
        const response = await fetch('https://localhost:7026/PostPlayers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(players),
    });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Players</h1>
                {players.map((name, index) => (
                    <div key={index}>
                        <label>Player {index +1}:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => handlePlayerNameChange(e, index)}
                        />
                    </div>
                    ))}
            <button type="button" onClick={handleAddPlayer}>+</button>
            <button type="submit">Start Game</button>
        </form>
    )
}

export default PlayerNames;