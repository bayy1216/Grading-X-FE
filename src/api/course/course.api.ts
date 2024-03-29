import {axiosClient} from "../AxiosClient.ts";

export async function getCourses() {
  const res = await axiosClient.get("/api/course");
  return res.data;
}