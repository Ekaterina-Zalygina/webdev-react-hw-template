import { TrackType } from "@/TrackType";
import { CenterBlock } from "../CenterBlock/CenterBlock"
import { Nav } from "../Nav/Nav"
import { Sidebar } from "../Sidebar/Sidebar"
import styles from "./Main.module.css";

type props = {
    setCurrentTrack: (track: TrackType) => void
}

export const Main = ({setCurrentTrack}: props) => {
    return (
        <main className={styles.main}>
        <Nav/>
        <CenterBlock setCurrentTrack={setCurrentTrack}/>
        <Sidebar/>
      </main>
    )
}