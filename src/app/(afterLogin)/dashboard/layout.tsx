import {ReactNode} from "react";
import style from '@/app/(afterLogin)/dashboard/layout.module.css'
import NavMenu from "@/app/(afterLogin)/dashboard/_component/NavMenu";

type Props = {children: ReactNode}

export default function MainPageLayout({children} : Props){
  return (
    <div className={style.container}>
      <div className={style.leftWrapper}>
        <NavMenu/>
      </div>
      <div className={style.rightWrapper}>
        <div className={style.topHeader}></div>
        <div className={style.content}>
          {children}
        </div>
      </div>

    </div>
  )
}