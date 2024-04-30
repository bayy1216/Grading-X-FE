import {useState} from "react";
import {Member, MemberType} from "@/api/member/member.response.ts";
import {updateMemberInfo} from "@/api/member/member.api.ts";
import {MemberUpdateRequest} from "@/api/member/member.request.ts";
import {useMemberStore} from "@/store/member.store.ts";
import AccountEditCard from "@/components/account/AccountEditCard.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Separator} from "@/components/ui/separator.tsx";

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

  const cancelClick = () => {
    setEditedMember({
      ...member,
      password: ''
    });
  }

  return (
    <div className="flex flex-col">
      <Tabs defaultValue="account" className="w-full pl-8 pr-24 mt-12">
        <TabsList className="grid w-80 grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <Separator className="w-full mt-2 mb-4"/>
        <TabsContent value="account">
            <AccountEditCard
              editedMember={editedMember}
              handleInputChange={handleInputChange}
              handleMemberTypeChange={handleMemberTypeChange}
              saveClick={handleSaveClick}
              cancelClick={cancelClick}
              saveButtonDisabled={(!editedMember.name || !editedMember.email || !editedMember.password)}
            />
        </TabsContent>
      </Tabs>
    </div>
  );
}
