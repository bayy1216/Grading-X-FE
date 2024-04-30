import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {createExam} from "@/api/exam/exam.api.ts";
import {useQueryClient} from "@tanstack/react-query";
import {COURSES, DASHBOARD, EXAMS} from "@/const/data.ts";
import {ExamCreateRequest} from "@/api/exam/exam.request.ts";
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import CalendarWithTimePicker from "@/components/common/CalendarWithTimePicker.tsx";
import {GreenButton} from "@/components/ui/GreenButton.tsx";


export default function ExamCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  // /dashboard/course/3/exam/create 에서 3을 추출
  const courseId = parseInt(location.pathname.split("/")[3] || "0");

  const [createExamDto, setCreateExamDto] = useState<ExamCreateRequest>({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setCreateExamDto((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const changeStartDate = (date: Date | undefined) => {
    if (!date) return;
    setCreateExamDto({
      ...createExamDto,
      startTime: date.toISOString(),
    });
  }
  const changeEndDate = (date: Date | undefined) => {
    if (!date) return;
    setCreateExamDto({
      ...createExamDto,
      endTime:  date.toISOString(),
    });
  }
  const cancelClick = () => {
    navigate(-1);
  }

  const queryClient = useQueryClient();

  const handleSaveClick = async () => {
    const converted = {
      ...createExamDto,
      startTime: new Date(createExamDto.startTime).toISOString(),
      endTime: new Date(createExamDto.endTime).toISOString(),
    }

    await createExam(courseId, converted);
    await queryClient.invalidateQueries({
      queryKey: [DASHBOARD, COURSES, courseId, EXAMS],
    });
    navigate(-1);
  }

  const startDate = createExamDto.startTime ? new Date(createExamDto.startTime) : undefined;
  const endDate = createExamDto.endTime ? new Date(createExamDto.endTime) : undefined;
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Card className="mt-32 w-[350px]">
        <CardHeader>
          <CardTitle>시험 생성</CardTitle>
          <CardDescription>
            신규 시험를 생성합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-left">
                  시험 이름
                </Label>
                <Input
                  name="name" placeholder="시험 이름"
                  value={createExamDto.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description" className="text-left">
                  설명
                </Label>
                <Input
                  name="description" placeholder="설명"
                  value={createExamDto.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-left">
                  시작일
                </Label>
                <CalendarWithTimePicker
                  date={startDate}
                  onSelect={changeStartDate}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-left">
                  종료일
                </Label>
                <CalendarWithTimePicker
                  date={endDate}
                  onSelect={changeEndDate}
                />
              </div>

            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={cancelClick}>
            취소
          </Button>
          <GreenButton
            onClick={handleSaveClick}
            disabled={!createExamDto.name || !createExamDto.description || !createExamDto.startTime || !createExamDto.endTime}
          >
            생성
          </GreenButton>
        </CardFooter>
      </Card>
    </div>
  );
}