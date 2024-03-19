import {Member} from "@/api/member/member.response";

export interface Course {
  id: number;
  courseName: string;
  startDate: string;
  endDate: string;
  member: Member;
}