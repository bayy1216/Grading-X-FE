import style from "./page.module.css"

type Props = {
  params: {
    examId: string;
  }
};


export default function Page({params}: Props) {
  return (
    <div className={style.container}>
      <h1>Exam {params.examId}</h1>

    </div>
  );
}