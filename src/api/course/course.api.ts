import {axiosClient} from "../AxiosClient.ts";

import {Course} from "./course.response.ts";

export async function getCourses() : Promise<Course[]>{
  const res = await axiosClient.get("/api/course");
  return res.data.courseResponses;

}