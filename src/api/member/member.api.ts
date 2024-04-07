import {Member} from "./member.response.ts";
import {MemberUpdateRequest} from "./member.request.ts";
import {axiosClient} from "../AxiosClient.ts";

export async function getMemberInfo(): Promise<Member> {
  const response = await axiosClient.get("/api/v1/member");
  return response.data;
}

export async function updateMemberInfo(request: MemberUpdateRequest): Promise<void> {
  await axiosClient.put("/api/v1/member", {
    ...request
  });
  return;
}

export async function signOut(): Promise<void> {
  await axiosClient.delete("/api/v1/member");
  return;
}