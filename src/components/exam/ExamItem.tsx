import style from './ExamItem.module.css';
import {Exam} from "../../api/exam/exam.response.ts";

type Props = {
  exam: Exam;
  onclick: () => void;
};


export default function ExamItem({exam, onclick}: Props){

  return (
    <div className={style.container} onClick={onclick}>
      <div className={style.leftWrapper}>
        <div className={style.title}>
          {exam.name}
        </div>
        <div className={style.data}>
          <div className={style.startTime}>
            {exam.startTime}
          </div>
          <div className={style.endTime}>
            {exam.endTime}
          </div>
        </div>
      </div>
      <div className={style.rightWrapper}>
        수정
        <button className={style.button}>
          <svg width={24} viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
            <g>
              <path
                d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
            </g>
          </svg>
        </button>
      </div>

    </div>
  );
}