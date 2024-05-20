import {useQuery} from "@tanstack/react-query";
import {DASHBOARD, MINUTE_5, RESULT} from "@/const/data.ts";
import {ResultForInstructorResponse} from "@/api/result/result.response.ts";
import {getResultForInstructorByExamId} from "@/api/result/resut.api.ts";
import {Button} from "@/components/ui/button.tsx";

interface Props {
  examId: number;

}

export default function ExamResultBox({examId}: Props) {
  console.log(examId);

  const {data} = useQuery<ResultForInstructorResponse, Object, ResultForInstructorResponse, [_1: string, _2: string, _3: number]>({
    queryKey: [DASHBOARD, RESULT, examId],
    queryFn: getResultForInstructorByExamId,
    staleTime: MINUTE_5,
  });

  const results = data?.resultInstructorResponses ?? [];

  return (
    <div
      className="flex flex-col items-start justify-start
      w-full h-full overflow-y-auto"
    >
      <Button>
        <div>채점하기 </div>
      </Button>
      {results.length === 0 ?
          <div>
              결과가 없습니다.
          </div> :
          results.map((result) => (
            <div key={result.email}>
              <div>email : {result.email}</div>
              <div> score : {result.totalScore}</div>
              <div> total : {result.totalWeightage}</div>
              {result.gradingResponseList.map((grading) => (
                <div key={grading.answerId}>
                  <div>문제 : {grading.query}</div>
                  <div>답변 : {grading.answer}</div>
                  <div>점수 : {grading.score}</div>
                </div>
              ))}
            </div>
          ))
      }

    </div>
  );
}