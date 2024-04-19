import {Question} from "@/api/question/question.response.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

interface Props {
  question: Question;
  onQuestionChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUp : (id:number) => void;
  onChangeDown : (id:number) => void;
}
export default function ExamQuestionEditItem({question, onQuestionChange, onChangeUp, onChangeDown}: Props) {
  return (
    <div className="flex flex-col border m-2 p-2">
      {question.id} {question.index}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="query" className="text-left">
          문제
        </Label>
        <Input
          name="query" placeholder="문제"
          value={question.query}
          onChange={onQuestionChange}
          className="col-span-3"
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="weightage" className="text-left">
          배점
        </Label>
        <Input
          name="weightage" placeholder="배점"
          value={question.weightage}
          onChange={onQuestionChange}
          className="col-span-3"
        />
      </div>
      <div className="flex flex-row">
        <button onClick={() => onChangeUp(question.id)}>Up</button>
        <button onClick={() => onChangeDown(question.id)}>Down</button>
      </div>
    </div>
  );


}