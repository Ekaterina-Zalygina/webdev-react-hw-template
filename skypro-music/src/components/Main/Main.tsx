"use client";

import { CenterBlock } from "../CenterBlock/CenterBlock";
import { Nav } from "../Nav/Nav";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./Main.module.css";

export const Main = ({ likedTracks, setLikedTracks }) => {
  return (
    <main className={styles.main}>
      <Nav />
      <CenterBlock likedTracks={likedTracks} setLikedTracks={setLikedTracks} />
      <Sidebar />
    </main>
  );
};
