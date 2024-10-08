"use client"

// import Image from "next/image";
import styles from "./page.module.css";
import { Bar } from "@/components/Bar/Bar";
import { useState } from "react";
import { TrackType } from "@/TrackType";
import { Main } from "@/components/Main/Main";
import { useAppSelector } from "@/store/store";

export default function Home() {
  const currentTrack = useAppSelector(state => state.tracksSlice.thisTrack)
  console.log("THIS TRACK", currentTrack)
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Main />
        {currentTrack && <Bar currentTrack={currentTrack}/>}
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
