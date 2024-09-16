import styles from "./Sidebar.module.css"
import Image from "next/image";

export const Sidebar = () => {
    return (
        <div className={styles.mainSidebar}>
            <div className={styles.sidebarPersonal}>
              <p className={styles.sidebarPersonalName}>Sergey.Ivanov</p>
              <div className={styles.sidebarIcon}>
                <svg>
                  <use xlinkHref="image/icon/sprite.svg#logout"></use>
                </svg>
              </div>
            </div>
            <div className={styles.sidebarBlock}>
              <div className={styles.sidebarList}>
                <div className={styles.sidebarItem}>
                  <a className={styles.sidebarLink} href="#">
                    <Image
                      className={styles.sidebarImg}
                      src="/img/playlist01.png"
                      alt="day's playlist"
                      width={250} 
                      height={170}
                    />
                  </a>
                </div>
                <div className={styles.sidebarItem}>
                  <a className={styles.sidebarLink} href="#">
                    <Image
                      className={styles.sidebarImg}
                      src="/img/playlist02.png"
                      alt="day's playlist"
                      width={250} 
                      height={170}
                    />
                  </a>
                </div>
                <div className={styles.sidebarItem}>
                  <a className={styles.sidebarLink} href="#">
                    <Image
                      className={styles.sidebarImg}
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
    )
}