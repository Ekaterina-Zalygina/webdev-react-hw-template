import { TrackType } from "@/TrackType"

export const URL = "https://webdev-music-003b5b991590.herokuapp.com"

export const trackAll = async (): Promise<TrackType[]> => {
    const response = await fetch(URL + "/catalog/track/all/")
    if (!response.ok) {
        throw new Error("Ошибка данных")
    }
    return response.json().then((tracksData) => tracksData.data)
}

export const addToFavorite = async (id: number): Promise<TrackType[]> => {
    const tokens = getTokens()

    const response = await fetch(URL + `/catalog/track/${id}/favorite/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${tokens.access}`,
        },
    })
    if (!response.ok) {
        throw new Error("Ошибка данных")
    }
    return response.json().then((tracksData) => tracksData.data)
}

export const deleteFromFavorite = async (id: number): Promise<TrackType[]> => {
    const tokens = getTokens()

    const response = await fetch(URL + `/catalog/track/${id}/favorite/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${tokens.access}`,
        },
    })
    if (!response.ok) {
        throw new Error("Ошибка данных")
    }
    return response.json().then((tracksData) => tracksData.data)
}

export const getFavorites = async (): Promise<TrackType[]> => {
    const tokens = getTokens()

    const response = await fetch(URL + `/catalog/track/favorite/all/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${tokens.access}`,
        },
    })
    if (!response.ok) {
        throw new Error("Ошибка данных")
    }
    return response.json().then((tracksData) => tracksData.data)
}

export function getTokens(): { access: string; refresh: string } {
    const token = localStorage.getItem("token") ?? "{}"
    return JSON.parse(token)
}
