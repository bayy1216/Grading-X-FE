import {ResultForInstructorResponse} from "@/api/result/result.response.ts";
import {QueryFunction} from "@tanstack/react-query";
import {axiosClient} from "@/api/AxiosClient.ts";

export const getResultForInstructorByExamId: QueryFunction<ResultForInstructorResponse, [_1:string, _2:string, number]>
  = async ({queryKey}): Promise<ResultForInstructorResponse> => {
    const [_1, _2, examId] = queryKey;

    const response = await axiosClient.get(`/api/v1/result/${examId}/instructor`);
    return response.data;
  }