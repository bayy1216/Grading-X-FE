import style from "./NavMenu.module.css";
import {Link, useLocation } from "react-router-dom";

export default function NavMenu() {
  // const [drawerOpen, setDrawerOpen] = useState(false);

  const location = useLocation();
  const onLogout = () => {
    console.log('logout');
  }
  return (
    <div className={style.container}>
      <div className={style.topHeader}>
        <Link to={'/dashboard/course'} className={style.link}>
          <h1>Dashboard</h1>
        </Link>
      </div>



      <div className={style.section}>Classes</div>
      <ul>
        <Link to={'/dashboard/course'} className={style.link}>
          {location.pathname.endsWith('course') ? <div className={style.current}>클래스 관리 ✓</div> :
            <li>클래스</li>}
        </Link>


      </ul>
      <div className={style.section}>Account</div>
      <ul>
        <Link to={'/dashboard/account'} className={style.link}>
          {location.pathname.endsWith('account') ? <div className={style.current}>계정 관리 ✓</div> :
            <li>계정</li>}
        </Link>
      </ul>
      <Link to={'/'} onClick={onLogout} className={style.link}>
        <div className={style.logout}>로그아웃</div>
      </Link>
    </div>
  )
}