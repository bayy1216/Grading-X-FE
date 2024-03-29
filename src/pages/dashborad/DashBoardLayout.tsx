import {Outlet} from "react-router-dom";
import NavMenu from "../../components/dashboard/NavMenu.tsx";
import style from "./DashBoardLayout.module.css";

export default function DashboardLayout() {
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