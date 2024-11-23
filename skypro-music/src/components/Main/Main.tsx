"use client"

import { CenterBlock } from "../CenterBlock/CenterBlock"
import { Nav } from "../Nav/Nav"
import { Sidebar } from "../Sidebar/Sidebar"
import styles from "./Main.module.css"

type Props = {
    likedTracks: Set<number>
    setLikedTracks: (likedTracks: Set<number>) => void
}

export const Main = ({ likedTracks, setLikedTracks }: Props) => {
    return (
        <main className={styles.main}>
            <Nav />
            <CenterBlock likedTracks={likedTracks} setLikedTracks={setLikedTracks} />
            <Sidebar />
        </main>
    )
}
