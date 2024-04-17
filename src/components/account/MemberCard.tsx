import {Member, memberTypeToKo} from "@/api/member/member.response.ts";
type Props = {
  member: Member;
};


export default function MemberCard({member}:Props) {
  return (
    <>
      <div>{member.name}</div>
      <div>{member.email}</div>
      <div>{memberTypeToKo(member.memberType)}</div>
    </>
  );
}