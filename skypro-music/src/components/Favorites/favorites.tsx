"use client"

import { getFavorites } from "@/API/trackAPI"
import { Filter } from "@/components/Filter/Filter"
import { Playlist } from "@/components/Playlist/Playlist"
import { Search } from "@/components/Search/Search"
import { TrackType } from "@/TrackType"
import { useState, useEffect } from "react"
import styles from "../../components/CenterBlock/CenterBlock.module.css"

export const Favorites = () => {
    const [favourites, setFavourites] = useState<TrackType[]>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getFavorites()
                setFavourites(res)
            } catch (error) {}
        }
        getData()
    }, [])

    return (
        <div className={styles.mainCenterblock}>
            <Search />
            <h2 className={styles.centerblockH2}>Мой плейлист</h2>
            <Filter tracks={favourites} />
            <Playlist
                likedTracksIds={new Set(favourites.map((x) => x._id))}
                setLikedTracks={() => {}}
                tracks={favourites}
            />
        </div>
    )
}
