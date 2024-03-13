import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.introduction}>
        <div>Automate Your exam questions</div>
        <div>
          Manage your own exam questions and save time
        </div>
      </div>
    </main>
  );
}
