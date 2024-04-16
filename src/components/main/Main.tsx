import styles from './main.module.css';
import {useMemberStore} from "../../store/member.store.ts";
import {Link, useNavigate} from "react-router-dom";
export default function Main() {
  const memberStore = useMemberStore();
  const navigate = useNavigate();

  const onDashboardClick = () => {
    if(memberStore.data === null) {
      navigate('/login');
    }else{
      navigate('/dashboard');
    }
  }


  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}></div>
        <div className={styles.headerRight}>

          <button onClick={onDashboardClick} className={styles.link}>
            dashboard
          </button>
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