export const GetInitialGameState = async () => {

    const response = await fetch("https://localhost:7026/GetInitialGameState")
    const data = await response.json()
    return data
}

export const GetUpdatedGameState = async () => {

    const response = await fetch("https://localhost:7026/GetUpdatedGameState")
    const data = await response.json()
    return data
}