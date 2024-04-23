import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Question, QuestionsResponse} from "@/api/question/question.response.ts";
import {MINUTE_5, QUESTIONS} from "@/const/data.ts";
import {getQuestionsByExamId} from "@/api/question/question.api.ts";
import {useEffect, useState} from "react";
import ExamQuestionEditItem from "@/components/exam/ExamQuestionEditItem.tsx";
import {Button} from "@/components/ui/button.tsx";


const isChanged = (origin: Question, current: Question) => {
  return origin.weightage !== current.weightage || origin.query !== current.query || origin.index !== current.index;
}

export default function ExamQuestionEditPage() {
  const location = useLocation();
  const examId = parseInt(location.pathname.split("/")[5] || "0");
  const {data} = useQuery<QuestionsResponse, Object, QuestionsResponse, [_1: string, _2: number]>({
    queryKey: [QUESTIONS, examId],
    queryFn: getQuestionsByExamId,
    staleTime: MINUTE_5, // 5 minutes 동안 fresh data를 유지(fresh -> stale)
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    setQuestions(data?.questions?.sort((a, b) => a.index - b.index) || []);
  }, [data]);

  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (questions.length === 0) return;
    const isDirty = questions.some((q) => {
      const originQuestion = data?.questions?.find((oq) => oq.id === q.id);
      return originQuestion && isChanged(originQuestion, q);
    }) || questions.some((q) => q.id < 0);
    setDirty(isDirty);
  }, [questions]);

  const onQuestionChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const {name, value} = e.target;
    if(name === "weightage" && isNaN(Number(value))) return;

    const question = questions.find((q) => q.id === id);
    if (!question) return;
    const newQuestion = {
      ...question,
      [name]: name === "weightage" ? Number(value) : value,
    }


    setQuestions((prev) => {
      return prev.map((q) => {
        if (q.id === id) {
          return newQuestion;
        }
        return q;
      });
    });
  }
  const onChangeUp = (id: number) => {
    const question = questions.find((q) => q.id === id);
    if (!question) return;
    const qIndex = question.index;
    const changeQuestion = questions.find((q) => q.index === qIndex - 1);
    if (!changeQuestion) return;
    const exchangeQuestions = questions.map((q) => {
      if (q.id === id) {
        return {
          ...q,
          index: changeQuestion.index,
        }
      } else if (q.id === changeQuestion.id) {
        return {
          ...q,
          index: question.index,
        }
      }
      return q;
    });
    setQuestions(exchangeQuestions.sort((a, b) => a.index - b.index));

  }

  const onChangeDown = (id: number) => {
    const question = questions.find((q) => q.id === id);
    if (!question) return;
    const qIndex = question.index;
    const changeQuestion = questions.find((q) => q.index === qIndex + 1);
    if (!changeQuestion) return;
    const exchangeQuestions = questions.map((q) => {
      if (q.id === id) {
        return {
          ...q,
          index: changeQuestion.index,
        }
      } else if (q.id === changeQuestion.id) {
        return {
          ...q,
          index: question.index
        }
      }
      return q;
    });
    setQuestions(exchangeQuestions.sort((a, b) => a.index - b.index));
  }

  const onDelete = (id: number) => {
    setQuestions((prev) => {
      return prev.filter((q) => q.id !== id);
    });
  }

  const onAddQuestion = () => {
    setQuestions((prev) => {
      return [
        ...prev,
        {
          id: (prev.length + 1) * -1,
          index: prev.length + 1,
          weightage: 0,
          query: "",
        }
      ];
    });
  }

  const onQuestionSave = () => {
    const createQuestions = questions.filter((q) => q.id < 0);
    const updateQuestions = questions.filter((q) =>{
      const originQuestion = data?.questions?.find((oq) => oq.id === q.id);
      return originQuestion && isChanged(originQuestion, q);
    });
    console.log("createQuestions", createQuestions);
    console.log("updateQuestions", updateQuestions);
    return;
  }



  return (
    <div className="flex flex-row w-full h-full items-start justify-start overflow-y-auto relative">
      <div className="flex flex-col items-end justify-start h-full w-1/2 pr-4">
        {questions.map((question) => (
          <ExamQuestionEditItem
            key={question.id}
            question={question}
            onQuestionChange={(e) =>
              onQuestionChange(e, question.id)
            }
            onChangeUp={()=>onChangeUp(question.id)}
            onChangeDown={()=>onChangeDown(question.id)}
            onDelete={()=>onDelete(question.id)}
            isLast={questions.length === question.index}
          />
        ))}
      </div>
      <div className="sticky w-1/2 right-0 top-0 flex flex-col items-start justify-center h-full">
        <Button
          className="w-32 h-12 mb-4"
          onClick={onAddQuestion}
        >
          문제 추가
        </Button>
        <Button disabled={!dirty}
          className="w-32 h-12"
          onClick={onQuestionSave}
        >
          저장
        </Button>
      </div>
    </div>
  );
}