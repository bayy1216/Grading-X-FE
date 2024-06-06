import {useQuery} from "@tanstack/react-query";
import {DASHBOARD, MINUTE_5, RESULT} from "@/const/data.ts";
import {Result, ResultForInstructorResponse} from "@/api/result/result.response.ts";
import {getResultForInstructorByExamId} from "@/api/result/resut.api.ts";
import {useEffect, useState} from "react";

interface Props {
  examId: number;
  forceUpdateFlag: boolean;
}

export default function ExamResultBox({examId, forceUpdateFlag}: Props) {

  const {data, refetch} = useQuery<ResultForInstructorResponse, Object, ResultForInstructorResponse, [_1: string, _2: string, _3: number]>({
    queryKey: [DASHBOARD, RESULT, examId],
    queryFn: getResultForInstructorByExamId,
    staleTime: MINUTE_5,
  });

  const results = data?.resultInstructorResponses ?? [];

  useEffect(() => {
    if(forceUpdateFlag){
      refetch();
    }
  }, [forceUpdateFlag]);


  return (
    <div
      className="flex flex-col items-start justify-start
      w-full h-full overflow-y-auto"
    >
      {results.length === 0 ?
        <div>
          결과가 없습니다.
        </div> :
        <>
          <div className="flex flex-row pr-20 pl-20 w-full border">
            <div className="flex-[2]">
              이메일
            </div>
            <div className="flex-[1]">
              점수
            </div>
            <div className="flex-[1]">
              총점
            </div>
            <div className="flex-[1]"/>
          </div>
          {
            results.map((result) => (
              <AnswerItem key={result.email} result={result}/>
            ))
          }
        </>

      }

    </div>
  );
}


interface AnswerItemProps {
  result: Result;
}

function AnswerItem({result}: AnswerItemProps) {


  const [selected, setSelected] = useState<boolean>(false);

  const onClick = () => {
    setSelected(!selected);
  }
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between pr-20 pl-20 w-full">
        <div className="flex-[2]">{result.email}</div>
        <div className="flex-[1]">{result.totalScore}</div>
        <div className="flex-[1]">{result.totalWeightage}</div>
        <button className="flex-[1]" onClick={onClick}>답안 보기</button>

      </div>

      {selected && result.gradingResponseList.map((grading) => (
        <div key={grading.answerId} className="p-2 border-2 m-1">
          <div>문제 : {grading.query}</div>
          <div>답변 : {grading.answer}</div>
          <div>점수 : {grading.score}</div>
        </div>
      ))}
    </div>
  );
}