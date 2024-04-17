import {useState} from "react";
import {CourseCreateRequest} from "@/api/course/course.request.ts";
import {createCourse} from "@/api/course/course.api.ts";
import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {COURSES, DASHBOARD, MEMBER} from "@/const/data.ts";
import {Course, CoursesResponse} from "@/api/course/course.response.ts";
import {useMemberStore} from "@/store/member.store.ts";
import {Button} from "@/components/ui/button.tsx";

export default function CourseCreateModal() {
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
    mutation.mutate(createCourseRequest);
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create a new course</h2>
        <label>Course name</label>
        <input type="text" onChange={changeCourseName}/>
        <label>Start date</label>
        <input type="date" onChange={changeStartDate}/>
        <label>End date</label>
        <input type="date" onChange={changeEndDate}/>
        <br/>
        <Button onClick={onButtonClick}>Create a new course</Button>
      </div>
    </div>
  );
}