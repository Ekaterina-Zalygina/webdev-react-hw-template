"use client"

import { Filter } from "@/components/Filter/Filter"
import { Playlist } from "@/components/Playlist/Playlist"
import { Search } from "@/components/Search/Search"
import { TrackType } from "@/TrackType"
import styles from "../../components/CenterBlock/CenterBlock.module.css"

export const Collection = (props: {
    tracks: TrackType[]
    title: string
    likedTracksIds: Set<number>
    setLikedTracks: (likedTracks: Set<number>) => void
}) => {
    return (
        <div className={styles.mainCenterblock}>
            <Search />
            <h2 className={styles.centerblockH2}>{props.title}</h2>
            <Filter tracks={props.tracks} />
            <Playlist
                tracks={props.tracks}
                likedTracksIds={props.likedTracksIds}
                setLikedTracks={props.setLikedTracks}
            />
        </div>
    )
}
