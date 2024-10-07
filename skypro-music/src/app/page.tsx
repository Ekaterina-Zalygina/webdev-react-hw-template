"use client"

// import Image from "next/image";
import styles from "./page.module.css";
import { Bar } from "@/components/Bar/Bar";
import { useState } from "react";
import { TrackType } from "@/TrackType";
import { Main } from "@/components/Main/Main";
import { useAppSelector } from "@/store/store";

export default function Home() {
  // const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null)
  const {thisTrack} = useAppSelector(state => state.tracksSlice)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Main thisTrack={thisTrack}/>
        {thisTrack && <Bar thisTrack={thisTrack}/>}
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
