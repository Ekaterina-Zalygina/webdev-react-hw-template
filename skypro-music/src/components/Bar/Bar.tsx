"use client";

import { TrackType } from "@/TrackType";
import styles from "./Bar.module.css";
import classNames from "classnames";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setIsShuffleTrack,
  setNextTrack,
  setPrevTrack,
} from "@/store/features/trackSlice";
import { addToFavorite, deleteFromFavorite } from "@/API/trackAPI";

type props = {
  currentTrack: TrackType;
  likedTracksIds: Set<number>;

  onLikeToggle: () => void;
  isLiked: boolean;
};

export const Bar = ({
  currentTrack,
  likedTracksIds: likedTracks,
  isLiked,
  onLikeToggle,
}: props) => {
  const [currentProgress, setCurrentProgress] = useState(() => {
    const init = JSON.parse(localStorage.getItem("currentProgress") ?? "0");
    return (
      init || {
        currentTime: 0,
        duration: 0,
      }
    );
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isShuffle } = useAppSelector((state) => state.tracksSlice);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.currentTime = currentProgress.currentTime || 0;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (!isPlay) {
        audioRef.current.play();
        setIsPlay(true);
      } else {
        audioRef.current.pause();
        setIsPlay(false);
      }
    }
  }, [currentTrack]);

  //плей или пауза песни
  const onTogglePlay = () => {
    if (audioRef.current) {
      if (isPlay) {
        setIsPlay(false);
        audioRef.current.pause();
      } else {
        setIsPlay(true);
        audioRef.current.play();
      }
    }
  };

  //настраивает звук музыки
  const onChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value) / 100;
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  //перемотка трека с помощью ползунка
  const inChangeTime = (e: ChangeEvent<HTMLAudioElement>) => {
    localStorage.setItem(
      "currentProgress",
      JSON.stringify({
        currentTime: e.currentTarget.currentTime,
        duration: e.currentTarget.duration,
      })
    );
    setCurrentProgress({
      currentTime: e.currentTarget.currentTime,
      duration: e.currentTarget.duration,
    });
  };

  //репит трека
  const timeLoop = () => {
    if (audioRef.current) {
      if (isLoop) {
        audioRef.current.loop = false;
        setIsLoop(false);
      } else {
        audioRef.current.loop = true;
        setIsLoop(true);
      }
    }
  };

  //полоса прогресса
  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    const currentTime = Number(e.target.value);
    localStorage.setItem(
      "currentProgress",
      JSON.stringify({
        ...currentProgress,
        currentTime,
      })
    );
    setCurrentProgress({
      ...currentProgress,
      currentTime,
    });
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  };

  //следующая песня
  const next = () => {
    dispatch(setNextTrack());
  };

  //предыдущая песня
  const prev = () => {
    dispatch(setPrevTrack());
  };

  //перемешивание треков
  const toggleShuffle = () => {
    dispatch(setIsShuffleTrack());
  };

  return (
    <div className={styles.bar}>
      <audio
        className={styles.onTimeUpdate}
        onTimeUpdate={inChangeTime}
        ref={audioRef}
        onEnded={next}
        controls
        src={currentTrack?.track_file}
      />
      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress}>
          <ProgressBar
            max={currentProgress.duration || 0}
            value={currentProgress.currentTime}
            step={0.01}
            onChange={onChangeProgress}
          />
        </div>
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div className={styles.playerBtnPrev} onClick={prev}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div className={styles.playerBtnPlay} onClick={onTogglePlay}>
                <svg className={styles.playerBtnPlaySvg}>
                  <use
                    xlinkHref={`img/icon/sprite.svg#icon-${
                      isPlay ? "pause" : "play"
                    }`}></use>
                </svg>
              </div>
              <div className={styles.playerBtnNext} onClick={next}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={timeLoop}
                className={classNames(styles.playerBtnRepeat, {
                  [styles.btnIcon]: isLoop,
                })}>
                <svg className={styles.playerBtnRepeatSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.playerBtnShuffle, {
                  [styles.btnIcon]: isShuffle,
                })}
                onClick={toggleShuffle}>
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div
              className={classNames(styles.playerTrackPlay, styles.trackPlay)}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href="http://">
                    {currentTrack?.name}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="http://">
                    {currentTrack?.author}
                  </a>
                </div>
              </div>

              <div className={styles.trackPlayLikeDis}>
                <div
                  className={classNames(styles.trackPlayLike, styles.btnIcon)}>
                  <svg
                    className={styles.trackPlayLikeSvg}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!user) return;
                      onLikeToggle();

                      isLiked
                        ? deleteFromFavorite(currentTrack._id)
                        : addToFavorite(currentTrack._id);
                    }}>
                    <use
                      style={{ fill: isLiked ? "red" : "" }}
                      xlinkHref="img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={classNames(styles.barVolumeBlock, styles.volume)}>
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volumeProgress, styles.btn)}>
                <input
                  onChange={onChangeVolume}
                  className={classNames(styles.volumeProgressLine, styles.btn)}
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
