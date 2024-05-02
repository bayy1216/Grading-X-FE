import {Question} from "@/api/question/question.response.ts";

interface Props {
  questions: Question;
}

export default function ExamQuestion({questions}: Props) {
  return (
    <div>
      <h1>ExamQuestion</h1>
      <h2>{questions.index}</h2>
      <h3>{questions.query}</h3>
      <h4>{questions.weightage}점</h4>
    </div>
  );

}