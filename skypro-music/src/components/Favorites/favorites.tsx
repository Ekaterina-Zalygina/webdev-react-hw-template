"use client"

import { getFavorites } from "@/API/trackAPI"
import { Filter } from "@/components/Filter/Filter"
import { Playlist } from "@/components/Playlist/Playlist"
import { Search } from "@/components/Search/Search"
import { TrackType } from "@/TrackType"
import { useState, useEffect, useCallback, useMemo } from "react"
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
    const [term, setTerm] = useState("")
    const [filter, setFilter] = useState("")
    const [filterValue, setFilterValue] = useState("")

    const onSelect = useCallback((type: string, filter: string) => {
        setFilter(type)
        setFilterValue(filter)
    }, [])

    const copy = useMemo(() => {
        const copy = [...favourites]
            .filter((x) => x.name.toLowerCase().includes(term.toLowerCase()))
            .filter((x) => {
                if (!filter || !filterValue) return true
                if (filter === "author") return x.author.toLowerCase() === filterValue.toLowerCase()
                if (filter === "genre") return x.genre.map((x) => x.toLowerCase()).includes(filterValue.toLowerCase())
                if (filter === "year") return true
                return false
            })

        if (filter === "year") {
            if (filterValue === "сначала новые") {
                copy.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
            }

            if (filterValue === "сначала старые") {
                copy.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime())
            }
        }

        return copy
    }, [term, filter, filterValue, favourites])

    return (
        <div className={styles.mainCenterblock}>
            <Search value={term} onChange={(e) => setTerm(e.target.value)} />
            <h2 className={styles.centerblockH2}>Мой плейлист</h2>
            <Filter selectedFilter={filter} selectedFilterValue={filterValue} tracks={favourites} onSelect={onSelect} />
            <Playlist likedTracksIds={new Set(favourites.map((x) => x._id))} setLikedTracks={() => {}} tracks={copy} />
        </div>
    )
}
