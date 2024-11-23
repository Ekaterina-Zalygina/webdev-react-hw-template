"use client"

import { getFavorites } from "@/API/trackAPI"
// import Image from "next/image";
import styles from "../page.module.css"
import { Bar } from "@/components/Bar/Bar"
import { Main } from "@/components/Main/Main"
import { useAppSelector } from "@/store/store"
import { useEffect, useState } from "react"

export default function Home() {
    const track = useAppSelector((state) => state.tracksSlice.thisTrack)
    const [likedTracksIds, setLikedTracks] = useState<Set<number>>(new Set())

    const isLiked = likedTracksIds.has(track?._id ?? -1)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getFavorites()
                setLikedTracks(new Set(res.map((x) => x._id)))
            } catch (error) {}
        }
        getData()
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Main likedTracks={likedTracksIds} setLikedTracks={setLikedTracks} />
                {track && (
                    <Bar
                        isLiked={isLiked}
                        onLikeToggle={() => {
                            if (isLiked) {
                                setLikedTracks(new Set([...likedTracksIds].filter((x) => x !== track._id)))
                            } else {
                                setLikedTracks(new Set([...likedTracksIds, track._id]))
                            }
                        }}
                        currentTrack={track}
                        likedTracksIds={likedTracksIds}
                    />
                )}
                <footer className="footer"></footer>
            </div>
        </div>
    )
}
