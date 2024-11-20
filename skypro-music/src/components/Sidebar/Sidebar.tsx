'use client';

//import { useAppDispatch } from "@/store/store";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import {useEffect} from "react";
import {getTrackCollections} from "@/API/trackAPI";
import {useRouter} from "next/navigation";
import Link from "next/link";
//import { LogoutState } from "@/store/features/authSlice";

export const Sidebar = () => {

    const router = useRouter();

    return (
        <div className={styles.mainSidebar}>
            <div className={styles.sidebarPersonal}>
                <p className={styles.sidebarPersonalName}>Sergey.Ivanov</p>
                <div className={styles.sidebarIcon}>
                    <svg>
                        <use xlinkHref="img/icon/sprite.svg#logout"></use>
                    </svg>
                </div>
            </div>
            <div className={styles.sidebarBlock}>
                <div className={styles.sidebarList}>
                    <div className={styles.sidebarItem}>
                        <div className={styles.sidebarLink} onClick={() => router.push(`/collections?id=2`)}>
                            <Image
                                className={styles.sidebarImg}
                                src="/img/playlist01.png"
                                alt="day's playlist"
                                width={250}
                                height={150}
                            />
                        </div>
                    </div>
                    <div className={styles.sidebarItem}>
                        <div className={styles.sidebarLink} onClick={() => router.push(`/collections?id=3`)}>
                            <Image
                                className={styles.sidebarImg}
                                src="/img/playlist02.png"
                                alt="day's playlist"
                                width={250}
                                height={150}
                            />
                        </div>
                    </div>
                    <div className={styles.sidebarItem}>
                        <div className={styles.sidebarLink} onClick={() => router.push(`/collections?id=4`)}>
                            <Image
                                className={styles.sidebarImg}
                                src="/img/playlist03.png"
                                alt="day's playlist"
                                width={250}
                                height={150}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
