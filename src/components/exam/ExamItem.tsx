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
    </div>
  );
}