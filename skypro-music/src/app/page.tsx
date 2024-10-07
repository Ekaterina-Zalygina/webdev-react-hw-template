"use client"

// import Image from "next/image";
import styles from "./page.module.css";
import { Bar } from "@/components/Bar/Bar";
import { useState } from "react";
import { TrackType } from "@/TrackType";
import { Main } from "@/components/Main/Main";

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null)
  console.log(currentTrack)
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Main setCurrentTrack={setCurrentTrack}/>
        {currentTrack && <Bar currentTrack={currentTrack}/>}
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
