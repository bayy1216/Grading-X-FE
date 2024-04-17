import {useState} from "react";
import MemberCard from "../../../../components/account/MemberCard.tsx";
import { Member, MemberType} from "@/api/member/member.response.ts";
import {updateMemberInfo} from "@/api/member/member.api.ts";
import {MemberUpdateRequest} from "@/api/member/member.request.ts";
import {useMemberStore} from "@/store/member.store.ts";
import {MemberEditDialog} from "@/components/account/MemberEditDialog.tsx";

const initialMember: Member = {
  name: "",
  email: "",
  memberType: "INSTRUCTOR",

}

export default function AccountPage() {

  const memberStore = useMemberStore();
  const member = memberStore.data || initialMember;


  const [editedMember, setEditedMember] = useState({
    ...member,
    password: ''
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setEditedMember((prevMember) => ({
      ...prevMember,
      [name]: value
    }));
  };
  const handleMemberTypeChange = (value: string) => {
    const memberType = value as MemberType;
    setEditedMember((prevMember) => ({
      ...prevMember,
      memberType
    }));
  };


  /**
   * 수정된 회원 정보를 서버에 API 전송
   */
  const handleSaveClick = () => {
    if (!editedMember.name || !editedMember.email || !editedMember.password) {
      alert('입력 값을 확인해주세요.');
      return;
    }
    const request: MemberUpdateRequest = {
      name: editedMember.name,
      email: editedMember.email,
      password: editedMember.password,
      memberType: editedMember.memberType as 'INSTRUCTOR' | 'STUDENT'
    }
    updateMemberInfo(request).then((_) => {
      memberStore.setData(editedMember);
    });
  };

  return (
    <>
      <MemberCard member={member}/>
      <MemberEditDialog
        editedMember={editedMember}
        handleInputChange={handleInputChange}
        handleMemberTypeChange={handleMemberTypeChange}
        saveClick={handleSaveClick}
      />
    </>
  );
}
