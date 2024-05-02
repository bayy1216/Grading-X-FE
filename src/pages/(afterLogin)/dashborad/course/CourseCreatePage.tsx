import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {CourseCreateRequest} from "@/api/course/course.request.ts";
import {useMemberStore} from "@/store/member.store.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCourse} from "@/api/course/course.api.ts";
import {COURSES, DASHBOARD, MEMBER} from "@/const/data.ts";
import {Course, CoursesResponse} from "@/api/course/course.response.ts";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {format} from "date-fns";
import CalendarPicker from "@/components/common/CalendarPicker.tsx";
import {GreenButton} from "@/components/ui/GreenButton.tsx";


export default function CourseCreatePage() {
  const navigate = useNavigate();
  const [createCourseRequest, setCreateCourseRequest] = useState<CourseCreateRequest>({
    courseName: "",
    startDate: "",
    endDate: "",
  });
  const changeCourseName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCourseRequest({...createCourseRequest, courseName: e.target.value});
  }
  const changeStartDate = (date: Date | undefined) => {
    if (!date) return;
    setCreateCourseRequest({...createCourseRequest, startDate: format(date, "yyyy-MM-dd")});
  }
  const changeEndDate = (date: Date | undefined) => {
    if (!date) return;
    setCreateCourseRequest({...createCourseRequest, endDate: format(date, "yyyy-MM-dd")});
  }

  const memberStore = useMemberStore();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCourse,
    onSuccess: async (data) => {
      console.log('beforeSetData');
      queryClient.setQueryData([MEMBER, DASHBOARD, COURSES], (old: CoursesResponse) => {
        const newCourse : Course = {
          id: data,
          instructor : memberStore.data!!,
          ...createCourseRequest,
        }
        return {
          ...old,
          courseResponses: [...old.courseResponses, newCourse]
        }
      });
      console.log('success');
      navigate('/dashboard/course', {replace: true});
    },
    onError: (error) => {
      console.log(error);
    },

  });

  const onButtonClick = async () => {
    mutation.mutate(createCourseRequest);
  }

  const startDate = createCourseRequest.startDate === "" ? undefined : new Date(createCourseRequest.startDate);
  const endDate = createCourseRequest.endDate === "" ? undefined : new Date(createCourseRequest.endDate);

  const cancelClick = () => {
    navigate('/dashboard/course', {replace: true});
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Card className="mt-32 w-[350px]">
        <CardHeader>
          <CardTitle>강의 생성</CardTitle>
          <CardDescription>
            신규 강의를 생성합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-left">
                  강의명
                </Label>
                <Input
                  name="courseName" placeholder="강의명"
                  value={createCourseRequest.courseName}
                  onChange={changeCourseName}
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-left">
                  시작일
                </Label>
                <CalendarPicker
                  date={startDate}
                  onSelect={changeStartDate}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-left">
                  종료일
                </Label>

                <CalendarPicker
                  date={endDate}
                  onSelect={changeEndDate}
                />
              </div>

            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={cancelClick}>취소</Button>
          <GreenButton
            onClick={onButtonClick}
            disabled={mutation.isPending || !createCourseRequest.courseName || !createCourseRequest.startDate || !createCourseRequest.endDate}
          >
            생성
          </GreenButton>
        </CardFooter>
      </Card>
    </div>
  );
}