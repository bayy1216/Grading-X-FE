import {useLocation, useNavigate, } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {QuestionsResponse} from "@/api/question/question.response.ts";
import {MINUTE_5, QUESTIONS} from "@/const/data.ts";
import {getQuestionsByExamId} from "@/api/question/question.api.ts";
import ExamQuestion from "@/components/exam/ExamQuestion.tsx";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function GuestExamTakePage() {
  const location = useLocation();
  const nav = useNavigate();
  //exam/12에서 12 추출
  const examId = parseInt(location.pathname.split("/").pop() || "0");

  const {data, isError} = useQuery<QuestionsResponse, Object, QuestionsResponse, [_1: string, _2: number]>({
    queryKey: [QUESTIONS, examId],
    queryFn: getQuestionsByExamId,
    staleTime: MINUTE_5, // 5 minutes 동안 fresh data를 유지(fresh -> stale)
  });


  const questions = data?.questions;
  const [guestEmail, setGuestEmail] = useState<string>("");


  if (isError) {
    return (
      <div className="w-dvh h-dvh items-center justify-center flex flex-col">
        <div>에러가 발생했습니다.</div>
        <Button onClick={() => nav(-1)}>뒤로가기</Button>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-[1200px]">

        <div className="flex flex-col space-y-1.5 my-4">
          <Label htmlFor="name" className="text-left">
            응시 이메일
          </Label>
          <Input
            name="guestEmail" placeholder="응시 이메일"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            className="w-[400px]"
          />
        </div>
        <Separator className="mb-4"/>
        {questions?.map((question) => (
          <ExamQuestion questions={question} key={question.id}/>
        ))}
      </div>

    </div>
  );
}