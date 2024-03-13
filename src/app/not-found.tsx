import Link from "next/link";
import style from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={style.container}>
      <div className={style.message}>이 페이지는 존재하지 않습니다. 다른 페이지를 검색해 보세요.</div>
      <div className={style.linkbox}>
        <Link href="/" className={style.link}>홈</Link>
      </div>

    </div>
  )
}