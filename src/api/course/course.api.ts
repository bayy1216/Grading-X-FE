import {axiosClient} from "../AxiosClient.ts";

import { CoursesResponse} from "./course.response.ts";
import {CourseCreateRequest, CourseUpdateRequest} from "./course.request.ts";

export async function getCourses() : Promise<CoursesResponse>{
  const res = await axiosClient.get("/api/v1/course");
  return res.data;

}

export async function createCourse(request: CourseCreateRequest) : Promise<number>{
  const res = await axiosClient.post("/api/v1/course", {
    ...request
  });
  return res.data;
}

export async function getCourseDetail(courseId: number) : Promise<Course>{
  const res = await axiosClient.get(`/api/v1/course/${courseId}`);
  return res.data;
}


export async function updateCourse(request: CourseUpdateRequest) : Promise<number>{
  const res = await axiosClient.put("/api/v1/course", {
    ...request
  });
  return res.data;
}