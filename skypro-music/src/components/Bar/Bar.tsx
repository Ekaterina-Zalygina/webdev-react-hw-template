import styles from "./Bar.module.css";
import classNames from "classnames"

export const Bar = () => {
    return (
        <div className={styles.bar}>
          <div className={styles.barContent}>
            <div className={styles.barPlayerProgress}></div>
            <div className={styles.barPlayerBlock}>
              <div className={styles.barPlayer}>
                <div className={styles.playerControls}>
                  <div className={styles.playerBtnPrev}>
                    <svg className={styles.playerBtnPrevSvg}>
                      <use xlinkHref="image/icon/sprite.svg#icon-prev"></use>
                    </svg>
                  </div>
                  <div className={styles.playerBtnPlay}>
                    <svg className={styles.playerBtnPlaySvg}>
                      <use xlinkHref="image/icon/sprite.svg#icon-play"></use>
                    </svg>
                  </div>
                  <div className={styles.playerBtnNext}>
                    <svg className={styles.playerBtnNextSvg}>
                      <use xlinkHref="image/icon/sprite.svg#icon-next"></use>
                    </svg>
                  </div>
                  <div className={classNames(styles.playerBtnRepeat, styles.btnIcon)}>
                    <svg className={styles.playerBtnRepeatSvg}>
                      <use xlinkHref="image/icon/sprite.svg#icon-repeat"></use>
                    </svg>
                  </div>
                  <div className={classNames(styles.playerBtnShuffle, styles.btnIcon)}>
                    <svg className={styles.playerBtnShuffleSvg}>
                      <use xlinkHref="image/icon/sprite.svg#icon-shuffle"></use>
                    </svg>
                  </div>
                </div>

                <div className={classNames(styles.playerTrackPlay, styles.trackPlay)}>
                  <div className={styles.trackPlayContain}>
                    <div className={styles.trackPlayImage}>
                      <svg className={styles.trackPlaySvg}>
                        <use xlinkHref="image/icon/sprite.svg#icon-note"></use>
                      </svg>
                    </div>
                    <div className={styles.trackPlayAuthor}>
                      <a className={styles.trackPlayAuthorLink} href="http://"
                        >Ты та...</a>
                    </div>
                    <div className={styles.trackPlayAlbum}>
                      <a className={styles.trackPlayAlbumLink} href="http://">Баста</a>
                    </div>
                  </div>

                  <div className={styles.trackPlayLikeDis}>
                    <div className={classNames(styles.trackPlayLike, styles.btnIcon)}>
                      <svg className={styles.trackPlayLikeSvg}>
                        <use xlinkHref="image/icon/sprite.svg#icon-like"></use>
                      </svg>
                    </div>
                    <div className={classNames(styles.trackPlayDislike, styles.btnIcon)}>
                      <svg className={styles.trackPlayDislikeSvg}>
                        <use
                          xlinkHref="image/icon/sprite.svg#icon-dislike"
                        ></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classNames(styles.barVolumeBlock, styles.volume)}>
                <div className={styles.volumeContent}>
                  <div className={styles.volumeImage}>
                    <svg className={styles.volumeSvg}>
                      <use xlinkHref="image/icon/sprite.svg#icon-volume"></use>
                    </svg>
                  </div>
                  <div className={classNames(styles.volumeProgress, styles.btn)}>
                    <input
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
    )
}