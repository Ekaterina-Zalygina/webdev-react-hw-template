export const URL = 'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/'

export const TrackAll = async() => {
    const response = await fetch(URL);
    if(!response.ok) {
        throw new Error("Ошибка данных")
    }
    const data = await response.json()
    return data.data
}