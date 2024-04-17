import style from './ExamItem.module.css';
import {Exam} from "../../api/exam/exam.response.ts";
import dayjs from "dayjs";

type Props = {
  exam: Exam;
  onclick: () => void;
};


export default function ExamItem({exam, onclick}: Props){

  const startTime = dayjs(exam.startTime).format('YYYY-MM-DD HH:mm');
  const endTime = dayjs(exam.endTime).format('YYYY-MM-DD HH:mm');
  return (
    <div className={style.container} onClick={onclick}>
      <div className={style.leftWrapper}>
        <div className={style.title}>
          {exam.name}
        </div>
        <div className={style.data}>
          <div className={style.startTime}>
            {startTime}
          </div>
          <div className={style.endTime}>
            {endTime}
          </div>
        </div>
      </div>
    </div>
  );
}