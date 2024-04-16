import style from "./NavMenu.module.css";
import {Link, useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import {logout} from "../../api/auth/auth.api.ts";
import {useQueryClient} from "@tanstack/react-query";
import {MEMBER} from "../../const/data.ts";
import {useMemberStore} from "../../store/member.store.ts";

export default function NavMenu() {
  // const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const memberStore = useMemberStore();

  const onLogout = () => {
    console.log('logout');
    secureLocalStorage.removeItem('accessToken');
    secureLocalStorage.removeItem('refreshToken');
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({
      queryKey: [MEMBER]
    });
    logout().then(() => {
      memberStore.setData(null);
    });
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
          {location.pathname.includes('course') ? <div className={style.current}>클래스 관리 ✓</div> :
            <li>클래스</li>}
        </Link>


      </ul>
      <div className={style.section}>Account</div>
      <ul>
        <Link to={'/dashboard/account'} className={style.link}>
          {location.pathname.includes('account') ? <div className={style.current}>계정 관리 ✓</div> :
            <li>계정</li>}
        </Link>
      </ul>
      <Link to={'/'} onClick={onLogout} className={style.link}>
        <div className={style.logout}>로그아웃</div>
      </Link>
    </div>
  )
}