import {Button} from "@mui/material";
import {useState} from "react";
import {CourseCreateRequest} from "../../api/course/course.request.ts";
import {createCourse} from "../../api/course/course.api.ts";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import {COURSES, DASHBOARD, MEMBER} from "../../const/data.ts";

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

  const queryClient = useQueryClient();
  const onButtonClick = async () => {
    await createCourse(createCourseRequest);
    await queryClient.invalidateQueries({
      queryKey: [MEMBER, DASHBOARD, COURSES],
    });

    navigate('/dashboard/course', {replace: true});
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
        <Button variant="contained" color="primary" onClick={onButtonClick}>Create a new course</Button>
      </div>
    </div>
  );
}