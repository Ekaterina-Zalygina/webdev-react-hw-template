"use client"

import { TrackType } from "@/TrackType"
import styles from "./Playlist.module.css"
import classNames from "classnames"
import { Track } from "../Track/Track"
import { useEffect, useState } from "react"
import { getFavorites } from "../../API/trackAPI"

type PlaylistProps = {
    tracks: TrackType[]
    setLikedTracks: (likedTracks: Set<number>) => void
    likedTracksIds: Set<number>
}

export const Playlist = ({ setLikedTracks, likedTracksIds, tracks }: PlaylistProps) => {
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getFavorites()
                setLikedTracks(new Set(res.map((x) => x._id)))
            } catch (error) {}
        }
        getData()
    }, [])

    const favoriteIds = new Set([...likedTracksIds].map((x) => x))

    return (
        <div className={styles.centerblockContent}>
            <div className={styles.contentTitle}>
                <div className={classNames(styles.playlistTitleCol, styles.col01)}>Трек</div>
                <div className={classNames(styles.playlistTitleCol, styles.col02)}>Исполнитель</div>
                <div className={classNames(styles.playlistTitleCol, styles.col03)}>Альбом</div>
                <div className={classNames(styles.playlistTitleCol, styles.col04)}>
                    <svg className={styles.playlistTitleSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
                    </svg>
                </div>
            </div>
            <div className={styles.contentPlaylist}>
                {tracks.map((track) => {
                    const isLiked = favoriteIds.has(track._id)
                    return (
                        <Track
                            onLikeToggle={() => {
                                if (isLiked) {
                                    setLikedTracks(new Set([...likedTracksIds].filter((x) => x !== track._id)))
                                } else {
                                    setLikedTracks(new Set([...likedTracksIds, track._id]))
                                }
                            }}
                            playlist={tracks}
                            isLiked={isLiked}
                            track={track}
                            key={track._id}
                        />
                    )
                })}
            </div>
        </div>
    )
}
