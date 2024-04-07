import {Member} from "../member/member.response.ts";


export interface Course {
  id: number;
  courseName: string;
  startDate: string;
  endDate: string;
  instructor: Member;
}