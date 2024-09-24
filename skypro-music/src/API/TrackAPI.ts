export const URL = 'https://webdev-music-003b5b991590.herokuapp.com'

export const TrackAll = async() => {
    const response = await fetch(URL + '/catalog/track/all/');
    if(!response.ok) {
        throw new Error("Ошибка данных")
    }
    return response.json().then((tracksData) => tracksData.data)
    
}