"use client";

// import Image from "next/image";
import styles from "../page.module.css";
import { Bar } from "@/components/Bar/Bar";
import { Main } from "@/components/Main/Main";
import { useAppSelector } from "@/store/store";
import { useState } from "react";

export default function Home() {
  const currentTrack = useAppSelector((state) => state.tracksSlice.thisTrack);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Main likedTracks={likedTracks} setLikedTracks={setLikedTracks} />
        {currentTrack && (
          <Bar currentTrack={currentTrack} likedTracks={likedTracks} />
        )}
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
