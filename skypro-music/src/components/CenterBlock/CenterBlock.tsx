"use client";

import { TrackType } from "@/TrackType";
import { Filter } from "../Filter/Filter";
import { Playlist } from "../Playlist/Playlist";
import { Search } from "../Search/Search";
import styles from "./CenterBlock.module.css";
import { trackAll } from "@/API/trackAPI";
import { useCallback, useEffect, useMemo, useState } from "react";

type CenterBlockProps = {
  setLikedTracks: (likedTracks: Set<number>) => void;
  likedTracks: Set<number>;
};

export const CenterBlock = ({
  setLikedTracks,
  likedTracks,
}: CenterBlockProps) => {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await trackAll();
        setTracks(res);
      } catch (error) {
        if (error instanceof Error) {
          setErr(error.message);
        }
      }
    };
    getData();
  }, []);

  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const onSelect = useCallback((type: string, filter: string) => {
    setFilter(type);
    setFilterValue(filter);
  }, []);

  const copy = useMemo(() => {
    const copy = [...tracks]
      .filter((x) => x.name.toLowerCase().includes(term.toLowerCase()))
      .filter((x) => {
        if (!filter || !filterValue) return true;
        if (filter === "author")
          return x.author.toLowerCase() === filterValue.toLowerCase();
        if (filter === "genre")
          return x.genre
            .map((x) => x.toLowerCase())
            .includes(filterValue.toLowerCase());
        if (filter === "year") return true;
        return false;
      });

    if (filter === "year") {
      if (filterValue === "сначала новые") {
        copy.sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );
      }

      if (filterValue === "сначала старые") {
        copy.sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
      }
    }

    return copy;
  }, [term, filter, filterValue, tracks]);

  return (
    <div className={styles.mainCenterblock}>
      <Search value={term} onChange={(e) => setTerm(e.target.value)} />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter
        selectedFilter={filter}
        selectedFilterValue={filterValue}
        tracks={tracks}
        onSelect={onSelect}
      />
      <Playlist
        tracks={copy}
        setLikedTracks={setLikedTracks}
        likedTracksIds={likedTracks}
      />
    </div>
  );
};
