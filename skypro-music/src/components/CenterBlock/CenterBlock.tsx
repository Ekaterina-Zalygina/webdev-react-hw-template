"use client";

import { TrackType } from "@/TrackType";
// import { TrackType } from "@/TrackType";
import { Filter } from "../Filter/Filter";
import { Playlist } from "../Playlist/Playlist";
import { Search } from "../Search/Search";
import styles from "./CenterBlock.module.css";
import { TrackAll } from "@/API/TrackAPI";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { setTrackState } from "@/store/features/trackSlice";
// import { useEffect } from "react";

// type props = {
//   setCurrentTrack: (track: TrackType) => void;
// };

export const CenterBlock = () => {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [err, setErr] = useState<string | null>(null)
  // const dispatch = useAppDispatch()

  useEffect(() => {
    const getData = async() => {
      try {
        const res = await TrackAll();
        // dispatch(setTrackState(res))
        setTracks(res)
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          setErr(error.message);
        }
      }
    };
    getData()
  });

  // let tracks: TrackType[] = []
  // let err: string | null = null;

  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracks={tracks} />
      <Playlist tracks={tracks} />
    </div>
  );
};
