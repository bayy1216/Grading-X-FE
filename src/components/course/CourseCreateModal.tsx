import {Button} from "@mui/material";
import {useState} from "react";
import {CourseCreateRequest} from "../../api/course/course.request.ts";
import {createCourse} from "../../api/course/course.api.ts";
import {Course} from "../../api/course/course.response.ts";
import {MemberType} from "../../api/member/member.response.ts";

type Props = {
  onCreate: (course : Course) => void;
}
export default function CourseCreateModal({onCreate}:Props) {
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
        <Button variant="contained" color="primary" onClick={
          async () => {
            const newId = await createCourse(createCourseRequest);
            const newCourse : Course = {
              id: newId,
              ...createCourseRequest,
              instructor: {
                email: "d",
                name: "d",
                memberType: MemberType.INSTRUCTOR
              }
            };
            onCreate(newCourse);
          }
        }>Create a new course</Button>
      </div>
    </div>
  );
}