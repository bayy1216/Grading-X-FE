import {useQuery} from "@tanstack/react-query";
import {COURSES, DASHBOARD, EXAMS, MINUTE_10, MINUTE_5} from "@/const/data.ts";
import {useLocation} from "react-router-dom";
import {ExamsResponse} from "@/api/exam/exam.response.ts";
import {getExamsByCourseId} from "@/api/exam/exam.api.ts";
import {useEffect, useState} from "react";
import ExamResultBox from "@/components/result/ExamResultBox.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";

export default function CourseResultPage() {
  const location = useLocation();
  const courseId = parseInt(location.pathname.split("/")[3] || "0");

  const {data} = useQuery<ExamsResponse, Object, ExamsResponse, [_1: string, _2: string, _3: number, _4: string]>({
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


  return (
    <div className="flex flex-col items-start justify-start w-full h-full overflow-y-auto">
      <Tabs defaultValue="1" className="w-full">
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
      </Tabs>
      {selectedExamId && <ExamResultBox examId={selectedExamId}/>}
    </div>

  );
}
