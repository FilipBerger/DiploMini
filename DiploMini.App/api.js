import { baseUrl } from "./baseUrl"// Create your own personal baseUrl.js file

export const getInitialGameState = async () => {
    try {
        const response = await fetch(`${baseUrl}/GetInitialGameState`,
            {
                method: "GET"
            }
        )
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`)
        }
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error("Error when getting initial game state: ", error.message)
    }
}

export const getUpdatedGameState = async () => {
    const response = await fetch(`
        ${baseUrl}/GetUpdatedGameState`, 
        {method: "GET"}
    )
    
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