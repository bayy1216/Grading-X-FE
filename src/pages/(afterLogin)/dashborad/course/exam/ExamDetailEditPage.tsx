import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getExamDetailById, updateExamDetail} from "../../../../../api/exam/exam.api.ts";
import {COURSES, DASHBOARD, EXAMS, MINUTE_5} from "../../../../../const/data.ts";
import {ExamDetail} from "../../../../../api/exam/exam.response.ts";
import {ExamUpdateRequest} from "../../../../../api/exam/exam.request.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function ExamDetailEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // /dashboard/course/3/exam/4/edit 에서 4을 추출
  const examId = parseInt(location.pathname.split("/")[5] || "0");
  const courseId = parseInt(location.pathname.split("/")[3] || "0");


  const {data} = useQuery<ExamDetail, Object, ExamDetail, [_1: string, _2: number]>({
    queryKey: [EXAMS, examId],
    queryFn: getExamDetailById,
    staleTime: MINUTE_5,
  });

  const [updateExamDto, setUpdateExamDto] = useState<ExamUpdateRequest>({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      setUpdateExamDto({
        name: data.name,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUpdateExamDto((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const changeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateExamDto({...updateExamDto, startTime: e.target.value});
  }

  const changeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateExamDto({...updateExamDto, endTime: e.target.value});
  }

  const queryClient = useQueryClient();

  const handleSaveClick = async () => {
    if (!updateExamDto.name || !updateExamDto.description || !updateExamDto.startTime || !updateExamDto.endTime) {
      alert('입력 값을 확인해주세요.');
    }
    //2024-04-08T00:00:00.000Z 형식으로 변환
    const converted = {
      ...updateExamDto,
      startTime: new Date(updateExamDto.startTime).toISOString(),
      endTime: new Date(updateExamDto.endTime).toISOString(),
    }

    //TODO : updateExam
    await updateExamDetail(examId, converted);

    await queryClient.invalidateQueries({
      queryKey: [DASHBOARD, COURSES, courseId, EXAMS],
    });
    await queryClient.invalidateQueries({
      queryKey: [DASHBOARD, EXAMS, examId],
    });

    navigate(-1);
  }
  return (
    <>
      <form>
        <Input
          name="name"
          value={updateExamDto.name}
          onChange={handleInputChange}
        />
        <Input
          name="description"
          value={updateExamDto.description}
          onChange={handleInputChange}
        />

        <label>Start date</label>
        <input type="date" onChange={changeStartDate}/>
        <label>End date</label>
        <input type="date" onChange={changeEndDate}/>

      </form>
      <Button  onClick={handleSaveClick}>수정</Button>

    </>
  );
}