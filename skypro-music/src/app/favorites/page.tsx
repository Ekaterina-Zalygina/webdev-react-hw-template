"use client"

import { Nav } from "@/components/Nav/Nav"
import { Sidebar } from "@/components/Sidebar/Sidebar"
import { Favorites } from "@/components/Favorites/favorites"
import styles from "../../components/Main/Main.module.css"

export const Main = () => {
    return (
        <main className={styles.main}>
            <Nav />
            <Favorites />
            <Sidebar />
        </main>
    )
}

export default Main
