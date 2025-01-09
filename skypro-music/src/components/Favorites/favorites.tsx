"use client";

import { getFavorites } from "@/API/trackAPI";
import { Filter } from "@/components/Filter/Filter";
import { Playlist } from "@/components/Playlist/Playlist";
import { Search } from "@/components/Search/Search";
import { Bar } from "@/components/Bar/Bar";
import { TrackType } from "@/TrackType";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setThisTrack } from "@/store/features/trackSlice";
import styles from "../../components/CenterBlock/CenterBlock.module.css";

export const Favorites = () => {
  const dispatch = useAppDispatch();
  const [favourites, setFavourites] = useState<TrackType[]>([]);
  const { thisTrack } = useAppSelector((state) => state.tracksSlice);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getFavorites();
        setFavourites(res);
      } catch (error) {
        console.error("Error fetching favorite tracks:", error);
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

  const filteredTracks = useMemo(() => {
    return favourites
      .filter((track) => track.name.toLowerCase().includes(term.toLowerCase()))
      .filter((track) => {
        if (!filter || !filterValue) return true;
        if (filter === "author")
          return track.author.toLowerCase() === filterValue.toLowerCase();
        if (filter === "genre")
          return track.genre
            .map((genre) => genre.toLowerCase())
            .includes(filterValue.toLowerCase());
        if (filter === "year") return true;
        return false;
      });
  }, [term, filter, filterValue, favourites]);

  const onTrackClick = (track: TrackType) => {
    dispatch(
      setThisTrack({
        currentTrack: track,
        currentPlaylist: favourites,
      })
    );
  };

  const likedTracksIds = useMemo(
    () => new Set(favourites.map((track) => track._id)),
    [favourites]
  );

  return (
    <div className={styles.mainCenterblock}>
      <Search value={term} onChange={(e) => setTerm(e.target.value)} />
      <h2 className={styles.centerblockH2}>Мой плейлист</h2>
      <Filter
        selectedFilter={filter}
        selectedFilterValue={filterValue}
        tracks={favourites}
        onSelect={onSelect}
      />
      <Playlist
        likedTracksIds={likedTracksIds}
        setLikedTracks={() => {}}
        tracks={filteredTracks}
      />
      {thisTrack && (
        <Bar
          currentTrack={thisTrack}
          likedTracksIds={likedTracksIds}
          isLiked={likedTracksIds.has(thisTrack._id)}
          onLikeToggle={() => {
            if (likedTracksIds.has(thisTrack._id)) {
              likedTracksIds.delete(thisTrack._id);
            } else {
              likedTracksIds.add(thisTrack._id);
            }
          }}
        />
      )}
    </div>
  );
};
