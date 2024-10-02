import { baseUrl } from "./baseUrl"

export const getInitialGameState = async () => {
    const response = await fetch(`${baseUrl}/GetInitialGameState`)
    const data = await response.json()
    return data
}

export const getUpdatedGameState = async () => {
    const response = await fetch(`${baseUrl}/GetUpdatedGameState`)
    const data = await response.json()
    return data
}

export const postOrders = async (orders) => {
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