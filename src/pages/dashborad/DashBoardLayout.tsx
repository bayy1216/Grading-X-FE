import {Outlet, useNavigate} from "react-router-dom";
import NavMenu from "../../components/dashboard/NavMenu.tsx";
import style from "./DashBoardLayout.module.css";
import {MemberContext} from "../Router.tsx";
import {useContext} from "react";

export default function DashboardLayout() {
  const {member, isError } = useContext(MemberContext);
  const nav = useNavigate();
  /**
   * context.member가 null이면 로딩중이므로 Loading...을 반환한다.
   * context.isError가 true이면 로그인 페이지로 이동한다.
   */
  if(isError) {
    nav('/login');
  }
  if(!member) {
    return <div>Loading...Layout</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.leftWrapper}>
        <NavMenu/>
      </div>
      <div className={style.rightWrapper}>
        <Outlet/>
      </div>
    </div>
  );
}