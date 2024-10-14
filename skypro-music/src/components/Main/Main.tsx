import { TrackType } from "@/TrackType";
import { CenterBlock } from "../CenterBlock/CenterBlock";
import { Nav } from "../Nav/Nav";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./Main.module.css";
import { SignUp } from "@/app/SignUp/SignUp";

// type props = {
//     setCurrentTrack: (track: TrackType) => void
// }

export const Main = () => {
  return (
    <main className={styles.main}>
      {/* <SignUp /> */}
      <Nav />
      <CenterBlock />
      <Sidebar />
    </main>
  );
};
