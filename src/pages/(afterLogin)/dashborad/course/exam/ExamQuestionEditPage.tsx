import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Question, QuestionsResponse} from "@/api/question/question.response.ts";
import {MINUTE_5, QUESTIONS} from "@/const/data.ts";
import {getQuestionsByExamId} from "@/api/question/question.api.ts";
import {useEffect, useState} from "react";
import ExamQuestionEditItem from "@/components/exam/ExamQuestionEditItem.tsx";

export default function ExamQuestionEditPage() {
  const location = useLocation();
  const examId = parseInt(location.pathname.split("/")[5] || "0");
  const { data} = useQuery<QuestionsResponse,Object, QuestionsResponse, [_1:string, _2: number]>({
    queryKey: [QUESTIONS, examId],
    queryFn: getQuestionsByExamId,
    staleTime: MINUTE_5, // 5 minutes 동안 fresh data를 유지(fresh -> stale)
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    setQuestions(data?.questions?.sort((a, b) => a.index - b.index) || []);
  }, [data]);

  const onQuestionChange = (e:React.ChangeEvent<HTMLInputElement>, id:number) => {
    const {name, value} = e.target;
    const question = questions.find((q) => q.id === id);
    if (!question) return;
    const newQuestion = {
      ...question,
      [name]: value,
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
  const onChangeUp = (id:number) => {
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
      }else if(q.id === changeQuestion.id){
        return {
          ...q,
          index: question.index,
        }
      }
      return q;
    });
    setQuestions(exchangeQuestions.sort((a, b) => a.index - b.index));

  }

  const onChangeDown = (id:number) => {
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
      }else if(q.id === changeQuestion.id){
        return {
          ...q,
          index: question.index
        }
      }
      return q;
    });
    setQuestions(exchangeQuestions.sort((a, b) => a.index - b.index));
  }


  return (
    <div className="flex flex-col items-start justify-start w-full h-full">
      {questions.map((question) => (
        <ExamQuestionEditItem
          key={question.id}
          question={question}
          onQuestionChange={(e) =>
            onQuestionChange(e, question.id)
          }
          onChangeUp={onChangeUp}
          onChangeDown={onChangeDown}
        />
      ))}
    </div>
  );
}