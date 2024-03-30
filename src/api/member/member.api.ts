import {Member, MemberType} from "./member.response.ts";
import {MemberUpdateRequest} from "./member.request.ts";

export async function getMemberInfo(): Promise<Member> {
  return {
    email: "das@test.com",
    name: "John Doe",
    memberType: MemberType.INSTRUCTOR,
  };
}

export async function updateMemberInfo(requset: MemberUpdateRequest){
  console.log(requset);
  return;
}

export async function signOut(){
  return;
}