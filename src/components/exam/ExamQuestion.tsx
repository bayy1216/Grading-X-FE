import {Question} from "@/api/question/question.response.ts";
import {Input} from "@/components/ui/input.tsx";

interface Props {
  questions: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

export default function ExamQuestion({questions, answer, onAnswerChange}: Props) {
  return (
    <div>
      <h1>ExamQuestion</h1>
      <h2>{questions.index}</h2>
      <h3>{questions.query}</h3>
      <h4>{questions.weightage}점</h4>
      <Input value={answer} onChange={(e) => onAnswerChange(e.target.value)}/>
    </div>
  );

}