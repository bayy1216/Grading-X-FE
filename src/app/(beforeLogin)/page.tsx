import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}></div>
        <div className={styles.headerRight}>

          <Link href={'/dashboard/course'} className={styles.link}>
            dashboard
          </Link>
          <Link href={'/login'} className={styles.link}>
            로그인
          </Link>
        </div>
      </div>
      <div className={styles.introduction}>
        <div>Automate Your exam questions</div>
        <div>
          Manage your own exam questions and save time
        </div>
      </div>
    </main>
  );
}
