import {axiosClient} from "../AxiosClient.ts";

import {Course} from "./course.response.ts";
import {CourseCreateRequest} from "./course.request.ts";

export async function getCourses() : Promise<Course[]>{
  const res = await axiosClient.get("/api/v1/course");
  return res.data.courseResponses;

}

export async function createCourse(request: CourseCreateRequest) : Promise<number>{
  const res = await axiosClient.post("/api/v1/course", {
    ...request
  });
  return res.data;
}