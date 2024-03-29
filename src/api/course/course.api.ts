// import {axiosClient} from "../AxiosClient.ts";

import {Course} from "./course.response.ts";

export async function getCourses() : Promise<Course[]>{
  // const res = await axiosClient.get("/api/course");
  // return res.data;
  return [
    {
      id: 1,
      courseName: "ReactJS",
      startDate: "2021-01-01",
      endDate: "2021-01-30",
      member: {
        email: "test@example.com",
        name: "John Doe",
        memberType: "INSTRUCTOR",
      },
    },
    {
      id: 2,
      courseName: "VueJS",
      startDate: "2021-02-01",
      endDate: "2021-02-28",
      member: {
        email: "test2far1@example.com",
        name: "Jane Doe",
        memberType: "INSTRUCTOR",
      },
    },
  ];
}