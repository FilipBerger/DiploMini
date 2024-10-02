// Replace IP in base URL with your local IP
const baseUrl = "https://192.168.0.221:7026"

export const getInitialGameState = async () => {
    try {
        console.log("Making get request")
        const response = await fetch(`${baseUrl}/GetInitialGameState`)
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`)
        }
        console.log(response)
        const data = await response.json()
        console.log(data)
        return data
    }
    catch (error) {
        console.error("Error when getting initial game state: ", error.message)
    }
}

export const getUpdatedGameState = async () => {
    const response = await fetch(`${baseUrl}/GetUpdatedGameState`)
    const data = await response.json()
    return data
}

export const postOrders = async ( orders ) => {
    try {
        const response = await fetch(
            `${baseUrl}/PostOrders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orders)
            }
        )

        if (!response.ok) {
            throw new Error(`Status: ${response.status} - ${response.statusText}`)
        }
        return response
    }
    catch (error) {
        console.error("Error in postOrders: ", error)
        throw error;
    }

}