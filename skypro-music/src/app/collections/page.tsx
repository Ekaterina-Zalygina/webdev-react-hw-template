"use client";

import styles from "../../components/Main/Main.module.css";
import { useAppSelector } from "@/store/store";
import { Nav } from "@/components/Nav/Nav";
import { Favorites } from "@/components/Favorites/favorites";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getTrackCollection,
  getTrackCollections,
  trackAll,
} from "@/API/trackAPI";
import { Collection } from "@/components/Collection/collection";
import { TrackType } from "@/TrackType";
import { Bar } from "@/components/Bar/Bar";

export default function Collections() {
  const currentTrack = useAppSelector((state) => state.tracksSlice.thisTrack);
  const [tracks, setTracks] = useState<TrackType[]>([]);

  useEffect(() => {
    trackAll().then((res) => setTracks(res));
  }, []);

  // localStorage.setItem('currentProgress', JSON.stringify(currentProgress))

  const params = useSearchParams();

  const [trackCollection, setTrackCollection] = useState(null);
  const id = Number(params.get("id"));

  useEffect(() => {
    // getTrackCollections()
    getTrackCollection(id).then(setTrackCollection);
  }, [id]);

  const ids = trackCollection?.items ?? [];

  return (
    <main className={styles.main}>
      <Nav />
      {currentTrack && <Bar currentTrack={currentTrack} />}
      <Collection
        title={trackCollection?.name ?? ""}
        tracks={tracks.filter((x) => ids.includes(x._id))}
      />
      <Sidebar />
    </main>
  );
}
