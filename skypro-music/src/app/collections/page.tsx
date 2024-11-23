"use client"

import styles from "../../components/Main/Main.module.css"
import { useAppSelector } from "@/store/store"
import { Nav } from "@/components/Nav/Nav"
import { Favorites } from "@/components/Favorites/favorites"
import { Sidebar } from "@/components/Sidebar/Sidebar"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getFavorites, getTrackCollection, getTrackCollections, trackAll } from "@/API/trackAPI"
import { Collection } from "@/components/Collection/collection"
import { TrackType } from "@/TrackType"
import { Bar } from "@/components/Bar/Bar"

export type CollectionItem = {
    name: string
    items: number[]
}

export default function Collections() {
    const track = useAppSelector((state) => state.tracksSlice.thisTrack)
    const [tracks, setTracks] = useState<TrackType[]>([])
    const [likedTracksIds, setLikedTracks] = useState<Set<number>>(new Set())

    useEffect(() => {
        trackAll().then((res) => setTracks(res))
    }, [])

    const params = useSearchParams()

    const [trackCollection, setTrackCollection] = useState<null | CollectionItem>(null)
    const id = Number(params.get("id"))

    useEffect(() => {
        getTrackCollection(id).then(setTrackCollection)
    }, [id])

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getFavorites()
                setLikedTracks(new Set(res.map((x) => x._id)))
            } catch (error) {}
        }
        getData()
    }, [])

    const ids = trackCollection?.items ?? []

    const isLiked = likedTracksIds.has(track?._id ?? -1)

    return (
        <main className={styles.main}>
            <Nav />
            {track && (
                <Bar
                    currentTrack={track}
                    isLiked={isLiked}
                    likedTracksIds={likedTracksIds}
                    onLikeToggle={() => {
                        if (isLiked) {
                            setLikedTracks(new Set([...likedTracksIds].filter((x) => x !== track._id)))
                        } else {
                            setLikedTracks(new Set([...likedTracksIds, track._id]))
                        }
                    }}
                />
            )}
            <Collection
                title={trackCollection?.name ?? ""}
                tracks={tracks.filter((x) => ids.includes(x._id))}
                likedTracksIds={likedTracksIds}
                setLikedTracks={setLikedTracks}
            />
            <Sidebar />
        </main>
    )
}
