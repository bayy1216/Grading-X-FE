import {ReactNode} from "react";
import style from '@/app/(beforeLogin)/_component/main.module.css';

type Props = { children: ReactNode, modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <div className={style.container}>
      {children}
      {modal}
    </div>
  )
}