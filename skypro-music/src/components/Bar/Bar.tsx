"use client";

import { TrackType } from "@/TrackType";
import styles from "./Bar.module.css";
import classNames from "classnames";
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";

type props = {
  thisTrack: TrackType;
};

export const Bar = ({ thisTrack }: props) => {
  const [currentProgress, setCurrentProgress] = useState({
    currentTime: 0,
    duration: 0,
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  // const [isShuffle, setIsShuffle] = useState(false)

  useEffect(() => {
    if(audioRef.current && thisTrack) {
      if(!isPlay) {
        audioRef.current.play()
        setIsPlay(true)
      } else {
        audioRef.current.pause()
        setIsPlay(false)
      }
    } 
  }, [thisTrack])

  // const [isPlaying, setIsPlaying] = useState(false);
  // const [volume, setVolume] = useState(0.5);
  // const [actualTime, setActualTime] = useState(0);
  // const lasting = 0;

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

    setCurrentProgress({
      ...currentProgress,
      currentTime,
    });
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  };

  //перемешивание треков 
  // const timeShuffle = () => {
  //   if (audioRef.current) {
  //     if (isLoop) {
  //       audioRef.current. = false;
  //       setIsLoop(false);
  //     } else {
  //       audioRef.current.loop = true;
  //       setIsLoop(true);
  //     }
  //   }
  // };

  //полоса прогресса
  // const stripProgress = (e: SyntheticEvent<HTMLAudioElement>) => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef.current.pause();
  //     } else {
  //       audioRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  return (
    <div className={styles.bar}>
      <audio
        className={styles.onTimeUpdate}
        onTimeUpdate={inChangeTime}
        ref={audioRef}
        controls
        src={thisTrack.track_file}
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
              <div className={styles.playerBtnPrev}>
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
              <div className={styles.playerBtnNext}>
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
              <div className={classNames(styles.playerBtnShuffle)}>
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
                    {thisTrack.name}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="http://">
                    {thisTrack.author}
                  </a>
                </div>
              </div>

              <div className={styles.trackPlayLikeDis}>
                <div
                  className={classNames(styles.trackPlayLike, styles.btnIcon)}>
                  <svg className={styles.trackPlayLikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlayDislike,
                    styles.btnIcon
                  )}>
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
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
