"use client"

import { CenterBlock } from "../CenterBlock/CenterBlock"
import { Nav } from "../Nav/Nav"
import { Sidebar } from "../Sidebar/Sidebar"
import styles from "./Main.module.css"

export const Main = () => {
    return (
        <main className={styles.main}>
            <Nav />
            <CenterBlock />
            <Sidebar />
        </main>
    )
}
