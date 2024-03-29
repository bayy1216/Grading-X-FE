import styles from './main.module.css';
import {Link} from "react-router-dom";
export default function Main() {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}></div>
        <div className={styles.headerRight}>

          <Link to={'/dashboard/course'} className={styles.link}>
            dashboard
          </Link>
          <Link to={'/login'} className={styles.link}>
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