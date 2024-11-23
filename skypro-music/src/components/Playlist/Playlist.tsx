"use client";

import { TrackType } from "@/TrackType";
import styles from "./Playlist.module.css";
import classNames from "classnames";
import { Track } from "../Track/Track";
import { useEffect, useState } from "react";
import { getFavorites } from "../../API/trackAPI";

type PlaylistProps = {
  tracks: TrackType[];
  onDislike?: (track: TrackType) => void;
  setLikedTracks: (likedTracks: Set<string>) => void;
  likedTracks: Set<string>;
};

export const Playlist = ({
  setLikedTracks,
  likedTracks,
  tracks,
  onDislike = () => {},
}: PlaylistProps) => {
  const [favourites, setFavourites] = useState<TrackType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getFavorites();
        setFavourites(res);
      } catch (error) {}
    };
    getData();
  }, []);

  const favoriteIds = new Set(
    Array.isArray(likedTracks) ? likedTracks.map((x) => x._id) : []
  );

  return (
    <div className={styles.centerblockContent}>
      <div className={styles.contentTitle}>
        <div className={classNames(styles.playlistTitleCol, styles.col01)}>
          Трек
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col02)}>
          Исполнитель
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col03)}>
          Альбом
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col04)}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className={styles.contentPlaylist}>
        {tracks.map((track) => {
          const isLiked = favoriteIds.has(track._id);
          return (
            <Track
              onLikeToggle={() => {
                if (isLiked) {
                  onDislike(track);
                  setLikedTracks(
                    (prev) => prev.filter((x) => x._id !== track._id)
                    // likedTracks.filter((x) => x._id !== track._id)
                  );
                } else {
                  setLikedTracks((prev) => [...likedTracks, track]);
                  //   setLikedTracks([...likedTracks, track]);
                }
              }}
              playlist={tracks}
              isLiked={isLiked}
              track={track}
              key={track._id}
            />
          );
        })}
      </div>
    </div>
  );
};
