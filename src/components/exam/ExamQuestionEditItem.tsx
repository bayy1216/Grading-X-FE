import {QuestionEdit} from "@/api/question/question.response.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ChevronDown, ChevronUp, Plus, Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

interface Props {
  question: QuestionEdit
  onQuestionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUp: (id: number) => void;
  onChangeDown: (id: number) => void;
  onDelete: (id: number) => void;
  onKeywordAdd: (id: number) => void;
  onKeywordChange: (id: number, value: string, keywordIndex: number) => void;
  onKeywordDelete: (id: number, keywordIndex: number) => void;
  onAnswerChange: (id: number, value: string) => void;
  isLast: boolean;
}

export default function ExamQuestionEditItem({
                                               question,
                                               onQuestionChange,
                                               onChangeUp,
                                               onChangeDown,
                                               onDelete,
                                               isLast,
                                               onAnswerChange,
                                               onKeywordAdd,
                                               onKeywordChange,
                                               onKeywordDelete,
                                             }: Props) {

  return (
    <div className="bg-[#ffffff] flex flex-col m-2 p-4 w-[600px] rounded-[6px]">
      <div className="flex flex-row">
        <div className="flex-1">
          문제 {question.index}
        </div>

        <Button disabled={question.index === 1}
                variant="outline" size="icon"
                onClick={() => onChangeUp(question.id)}
        >
          <ChevronUp className="h-4 w-4"/>
        </Button>

        <Button disabled={isLast}
                variant="outline" size="icon"
                onClick={() => onChangeDown(question.id)}
        >
          <ChevronDown className="h-4 w-4"/>
        </Button>
        <Button
          variant="outline" size="icon"
          onClick={() => onDelete(question.id)}
        >
          <Trash className="h-4 w-4"/>
        </Button>
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
      <div className="mt-2 flex flex-col space-y-1.5">
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
      <div className="mt-4 flex flex-col space-y-1.5">
        <div className="flex flex-row justify-between items-center">
          <Label htmlFor="answer" className="text-left">
            정답
          </Label>
        </div>
        <div className="flex flex-row">
          <Input
            name="answer" placeholder="정답"
            value={question.answer}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            className="col-span-3"
          />

        </div>
      </div>
      <div className="mt-4 flex flex-col space-y-1.5">
        <div className="flex flex-row justify-between items-center">
          <Label htmlFor="keyword" className="text-left">
            키워드
          </Label>
          <Button
            onClick={() => onKeywordAdd(question.id)}
            variant="ghost" size="icon"
          >
            <Plus className="h-4 w-4"/>
          </Button>
        </div>
        {question.keywords.map((keyword, index) => (
          <div className="flex flex-row" key={index}>
            <Input
              name="keyword" placeholder="키워드"
              value={keyword}
              onChange={(e) => onKeywordChange(question.id, e.target.value, index)}
              className="col-span-3"
            />
            <Button
              onClick={() => onKeywordDelete(question.id, index)}
              variant="outline" size="icon" className="ml-2"
            >
              <Trash className="h-4 w-4"/>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}