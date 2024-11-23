"use client"

import { TrackType } from "@/TrackType"
// import { TrackType } from "@/TrackType";
import { Filter } from "../Filter/Filter"
import { Playlist } from "../Playlist/Playlist"
import { Search } from "../Search/Search"
import styles from "./CenterBlock.module.css"
import { trackAll } from "@/API/trackAPI"
import { useEffect, useState } from "react"

type CenterBlockProps = {
    setLikedTracks: (likedTracks: Set<number>) => void
    likedTracks: Set<number>
}

export const CenterBlock = ({ setLikedTracks, likedTracks }: CenterBlockProps) => {
    const [tracks, setTracks] = useState<TrackType[]>([])
    const [err, setErr] = useState<string | null>(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await trackAll()
                setTracks(res)
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                    setErr(error.message)
                }
            }
        }
        getData()
    }, [])

    return (
        <div className={styles.mainCenterblock}>
            <Search />
            <h2 className={styles.centerblockH2}>Треки</h2>
            <Filter tracks={tracks} />
            <Playlist tracks={tracks} setLikedTracks={setLikedTracks} likedTracksIds={likedTracks} />
        </div>
    )
}
