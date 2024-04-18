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
  const changeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCourseRequest({...createCourseRequest, startDate: e.target.value});
  }
  const changeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCourseRequest({...createCourseRequest, endDate: e.target.value});
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
    if(!createCourseRequest.courseName || !createCourseRequest.startDate || !createCourseRequest.endDate){
      alert('입력 값을 확인해주세요.');
      return;
    }
    mutation.mutate(createCourseRequest);
  }

  const cancelClick = () => {
    navigate('/dashboard/course', {replace: true});
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Card className="mt-32 w-[350px]">
        <CardHeader>
          <CardTitle>Create Coures</CardTitle>
          <CardDescription>
            Make a new course.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input
                  name="courseName" placeholder="courseName"
                  value={createCourseRequest.courseName}
                  onChange={changeCourseName}
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-left">
                  시작일
                </Label>
                <Input
                  name="startDate" placeholder="startDate"
                  value={createCourseRequest.startDate}
                  onChange={changeStartDate}
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-left">
                  종료일
                </Label>
                <Input
                  name="endDate" placeholder="endDate"
                  value={createCourseRequest.endDate}
                  onChange={changeEndDate}
                  className="col-span-3"
                />
              </div>


            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={cancelClick}>Cancel</Button>
          <Button type="button" onClick={onButtonClick}>Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}