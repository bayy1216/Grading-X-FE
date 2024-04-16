import {Outlet, useNavigate} from "react-router-dom";
import NavMenu from "../../../components/dashboard/NavMenu.tsx";
import style from "./DashBoardLayout.module.css";
import {useEffect, useState} from "react";
import {useMemberStore} from "../../../store/member.store.ts";
import {getMemberInfo} from "../../../api/member/member.api.ts";
import secureLocalStorage from "react-secure-storage";

export default function DashboardLayout() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const memberStore = useMemberStore();

  /**
   * 로그인이 안되어있다면 정보 불러오기 시도 후, 로그인 페이지로 이동
   */
  useEffect(() => {
    if(secureLocalStorage.getItem('accessToken') === null) {
      nav('/login');
      return;
    }
    if(memberStore.data == null) {
      getMemberInfo().then((member) => {
        memberStore.setData(member);
        setIsLoading(false);
      }).catch(() => {
        nav('/login');
      });
    }else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.leftWrapper}>
        <NavMenu/>
      </div>
      <div className={style.rightWrapper}>
        <Outlet />
      </div>
    </div>
  );
}