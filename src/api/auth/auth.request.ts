import {MemberType} from "../member/member.response.ts";

export interface LoginEmailRequest {
  email: string;
  password: string;
}

export interface SignUpEmailRequest {
  email: string;
  password: string;
  name: string;
  memberType: MemberType;
}