import {useQuery} from "@tanstack/react-query";
import {COURSES, DASHBOARD, EXAMS, MINUTE_10, MINUTE_5} from "@/const/data.ts";
import {useLocation} from "react-router-dom";
import {ExamsResponse} from "@/api/exam/exam.response.ts";
import {getExamsByCourseId} from "@/api/exam/exam.api.ts";
import {useEffect, useState} from "react";
import ExamResultBox from "@/components/result/ExamResultBox.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";
import {gradeHealthCheck, startGradeExam} from "@/api/result/resut.api.ts";

export default function CourseResultPage() {
  const location = useLocation();
  const courseId = parseInt(location.pathname.split("/")[3] || "0");

  const {data, refetch} = useQuery<ExamsResponse, Object, ExamsResponse, [_1: string, _2: string, _3: number, _4: string]>({
    queryKey: [DASHBOARD, COURSES, courseId, EXAMS],
    queryFn: getExamsByCourseId,
    staleTime: MINUTE_5,
    gcTime: MINUTE_10,
  });

  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);

  useEffect(() => {
    if (data != null && data.examContents.length > 0) {
      setSelectedExamId(data.examContents[0].id);
    }
  }, [data]);

  const handleExamClick = (examId: number) => {
    setSelectedExamId(examId);
  }

  /**
   * 채점하기 버튼 클릭시 호출되는 함수
   * 채점 시작 API 호출 후, 1초마다 채점여부를 확인하고, 채점이 완료되면 결과를 보여준다.
   */
  const handleGradeClick = async (examId: number) => {
    await startGradeExam(examId);
    //이후 1초마다 채점여부를 확인하고, 채점이 완료되면 결과를 보여준다.
    const intervalId = setInterval(async () => {
      const result = await gradeHealthCheck(examId);
      if (result) {
        clearInterval(intervalId);
        await refetch();
      }
    }, 1000);
  }


  return (
    <div className="flex flex-col items-start justify-start w-full h-full overflow-y-auto">
      <Tabs defaultValue={selectedExamId == null ? '0' : selectedExamId.toString()} className="w-full">
        <TabsList>
          {data?.examContents.map((exam) => (
            <TabsTrigger
              key={exam.id} value={exam.id.toString()}
              onClick={() => handleExamClick(exam.id)}
            >
              {exam.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {
          selectedExamId &&
            <Button onClick={()=>handleGradeClick(selectedExamId)}>
                <div>채점하기 </div>
            </Button>
        }
      </Tabs>
      {selectedExamId && <ExamResultBox examId={selectedExamId}/>}
    </div>

  );
}
