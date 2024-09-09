import { TrackType } from "@/TrackType";
import { Filter } from "../Filter/Filter";
import { Playlist } from "../Playlist/Playlist";
import { Search } from "../Search/Search";
import styles from "./CenterBlock.module.css";
import { TrackAll } from "@/API/TrackAPI";

export const CenterBlock = async () => {
    const track: TrackType[] = await TrackAll()

    return (
        <div className={styles.mainCenterblock}>
            <Search/>
        <h2 className={styles.centerblockH2}>Треки</h2>
            <Filter/>
            <Playlist/>
      </div>
    )
}