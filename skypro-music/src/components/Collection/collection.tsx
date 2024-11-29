"use client"

import { Filter } from "@/components/Filter/Filter"
import { Playlist } from "@/components/Playlist/Playlist"
import { Search } from "@/components/Search/Search"
import { TrackType } from "@/TrackType"
import styles from "../../components/CenterBlock/CenterBlock.module.css"
import { useCallback, useMemo, useState } from "react"

export const Collection = (props: {
    tracks: TrackType[]
    title: string
    likedTracksIds: Set<number>
    setLikedTracks: (likedTracks: Set<number>) => void
}) => {
    const [term, setTerm] = useState("")
    const [filter, setFilter] = useState("")
    const [filterValue, setFilterValue] = useState("")

    const onSelect = useCallback((type: string, filter: string) => {
        setFilter(type)
        setFilterValue(filter)
    }, [])

    const copy = useMemo(() => {
        const copy = [...props.tracks]
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
    }, [term, filter, filterValue, props.tracks])

    return (
        <div className={styles.mainCenterblock}>
            <Search value={term} onChange={(e) => setTerm(e.target.value)} />
            <h2 className={styles.centerblockH2}>{props.title}</h2>
            <Filter selectedFilter={filter} selectedFilterValue={filterValue} tracks={copy} onSelect={onSelect} />
            <Playlist tracks={copy} likedTracksIds={props.likedTracksIds} setLikedTracks={props.setLikedTracks} />
        </div>
    )
}
