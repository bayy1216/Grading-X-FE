"use client";

import {useSelectedLayoutSegment} from "next/navigation";
import Link from "next/link";
import style from "@/app/(afterLogin)/dashboard/_component/navMenu.module.css";
import {useState} from "react";

export default function NavMenu() {
  const segment = useSelectedLayoutSegment();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const onLogout = () => {
    console.log('logout');
  }
  return (
    <div className={style.container}>
      <div className={style.topHeader}>
        <Link href={'/dashboard/class'} className={style.link}>
          <h1>Dashboard</h1>
        </Link>
      </div>



      <div className={style.section}>Classes</div>
      <ul>
        <Link href={'/dashboard/class'} className={style.link}>
          {segment === 'class' ? <div className={style.current}>클래스 관리 ✓</div> :
            <li>클래스</li>}
        </Link>


      </ul>
      <div className={style.section}>Account</div>
      <ul>
        <Link href={'/dashboard/account'} className={style.link}>
          {segment === 'account' ? <div className={style.current}>계정 관리 ✓</div> :
            <li>계정</li>}
        </Link>

      </ul>
      <Link href={'/'} onClick={onLogout} className={style.link}>
        <div className={style.logout}>로그아웃</div>
      </Link>
    </div>
  )
}