import Image from "next/image";
import styles from "./page.module.css";
import { Nav } from "@/components/Nav/Nav";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Nav/>
          <>
          <div className="main__sidebar sidebar">
            <div className="sidebar__personal">
              <p className="sidebar__personal-name">Sergey.Ivanov</p>
              <div className="sidebar__icon">
                <svg>
                  <use xlinkHref="image/icon/sprite.svg#logout"></use>
                </svg>
              </div>
            </div>
            <div className="sidebar__block">
              <div className="sidebar__list">
                <div className="sidebar__item">
                  <a className="sidebar__link" href="#">
                    <Image
                      className="sidebar__image"
                      src="/img/playlist01.png"
                      alt="day's playlist"
                      width={250} 
                      height={170}
                    />
                  </a>
                </div>
                <div className="sidebar__item">
                  <a className="sidebar__link" href="#">
                    <Image
                      className="sidebar__image"
                      src="/img/playlist02.png"
                      alt="day's playlist"
                      width={250} 
                      height={170}
                    />
                  </a>
                </div>
                <div className="sidebar__item">
                  <a className="sidebar__link" href="#">
                    <Image
                      className="sidebar__image"
                      src="/img/playlist03.png"
                      alt="day's playlist"
                      width={250} 
                      height={170}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="bar">
          <div className="bar__content">
            <div className="bar__player-progress"></div>
            <div className="bar__player-block">
              <div className="bar__player player">
                <div className="player__controls">
                  <div className="player__btn-prev">
                    <svg className="player__btn-prev-svg">
                      <use xlinkHref="image/icon/sprite.svg#icon-prev"></use>
                    </svg>
                  </div>
                  <div className="player__btn-play _btn">
                    <svg className="player__btn-play-svg">
                      <use xlinkHref="image/icon/sprite.svg#icon-play"></use>
                    </svg>
                  </div>
                  <div className="player__btn-next">
                    <svg className="player__btn-next-svg">
                      <use xlinkHref="image/icon/sprite.svg#icon-next"></use>
                    </svg>
                  </div>
                  <div className="player__btn-repeat _btn-icon">
                    <svg className="player__btn-repeat-svg">
                      <use xlinkHref="image/icon/sprite.svg#icon-repeat"></use>
                    </svg>
                  </div>
                  <div className="player__btn-shuffle _btn-icon">
                    <svg className="player__btn-shuffle-svg">
                      <use xlinkHref="image/icon/sprite.svg#icon-shuffle"></use>
                    </svg>
                  </div>
                </div>

                <div className="player__track-play track-play">
                  <div className="track-play__contain">
                    <div className="track-play__image">
                      <svg className="track-play__svg">
                        <use xlinkHref="image/icon/sprite.svg#icon-note"></use>
                      </svg>
                    </div>
                    <div className="track-play__author">
                      <a className="track-play__author-link" href="http://"
                        >Ты та...</a>
                    </div>
                    <div className="track-play__album">
                      <a className="track-play__album-link" href="http://">Баста</a>
                    </div>
                  </div>

                  <div className="track-play__like-dis">
                    <div className="track-play__like _btn-icon">
                      <svg className="track-play__like-svg">
                        <use xlinkHref="image/icon/sprite.svg#icon-like"></use>
                      </svg>
                    </div>
                    <div className="track-play__dislike _btn-icon">
                      <svg className="track-play__dislike-svg">
                        <use
                          xlinkHref="image/icon/sprite.svg#icon-dislike"
                        ></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bar__volume-block volume">
                <div className="volume__content">
                  <div className="volume__image">
                    <svg className="volume__svg">
                      <use xlinkHref="image/icon/sprite.svg#icon-volume"></use>
                    </svg>
                  </div>
                  <div className="volume__progress _btn">
                    <input
                      className="volume__progress-line _btn"
                      type="range"
                      name="range"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
