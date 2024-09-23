"use client";
import { TrackType } from "@/TrackType";
import { Filter } from "../Filter/Filter";
import { Playlist } from "../Playlist/Playlist";
import { Search } from "../Search/Search";
import styles from "./CenterBlock.module.css";
import { TrackAll } from "@/API/TrackAPI";
import { useEffect } from "react";

export const CenterBlock = () => {
  useEffect(() => {
    try {
      const tracks = async () => {
        const response = await TrackAll();
      };
      tracks();
    } catch (error) {
      console.warn(error);
    }
  }, []);

  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter />
      <Playlist />
    </div>
  );
};
