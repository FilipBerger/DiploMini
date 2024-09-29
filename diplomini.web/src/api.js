export const fetchGameState = async () => {

    const response = await fetch("https://localhost:7026/GetUpdatedGameState")
    const data = await response.json()
    return data
}