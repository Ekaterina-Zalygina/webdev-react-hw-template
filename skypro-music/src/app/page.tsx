// import Image from "next/image";
import styles from "./page.module.css";
import { Nav } from "@/components/Nav/Nav";
import { CenterBlock } from "@/components/CenterBlock/CenterBlock";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Bar } from "@/components/Bar/Bar";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav/>
          <CenterBlock/>
          <Sidebar/>
        </main>
        <Bar/>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
