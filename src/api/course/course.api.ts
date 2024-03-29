import {axiosClient} from "../AxiosClient.ts";

export async function getCourses() {
  const res = await axiosClient.post("/course/getCourses");
  return res.data;
}