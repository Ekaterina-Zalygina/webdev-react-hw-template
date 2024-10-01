import { TrackType } from "@/TrackType";
import styles from "./Track.module.css";

type TrackProps = {
  track: TrackType;
  setCurrentTrack: (track: TrackType) => void;
};

export const Track = ({ track, setCurrentTrack }: TrackProps) => {

  const onClickTrack = () => {
    setCurrentTrack(track)
  }

  // const trackTime = () => {

  // }

  return (
    <div onClick={onClickTrack} key={track._id} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <a className={styles.trackTitleLink} href="http://">
              {track.name} <span className={styles.trackTitleSpan}></span>
            </a>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="http://">
            {track.author}
          </a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="http://">
            {track.album}
          </a>
        </div>
        <div className={styles.TrackTime}>
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.trackTimeText}>
            {Math.floor(track.duration_in_seconds / 60)} : {Math.floor(track.duration_in_seconds % 60)}
          </span>
        </div>
      </div>
    </div>
  );
};
