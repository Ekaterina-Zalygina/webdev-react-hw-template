import { TrackType } from "@/TrackType";
// import { TrackType } from "@/TrackType";
import { Filter } from "../Filter/Filter";
import { Playlist } from "../Playlist/Playlist";
import { Search } from "../Search/Search";
import styles from "./CenterBlock.module.css";
import { TrackAll } from "@/API/TrackAPI";
// import { useEffect } from "react";

export const CenterBlock = async () => {
  let tracks: TrackType[] = []
  let err: string | null = null

  try {
    tracks = await TrackAll()
    console.log(tracks)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      err = error.message
    }
  }

  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracks={tracks}/>
      <Playlist tracks={tracks}/>
    </div>
  );
};
