import {useContext, useState} from "react";
import {MemberContext} from "../../Router.tsx";
import {Box, Button, Container, Grid, SelectChangeEvent} from '@mui/material';
import MemberCard from "../../../components/account/MemberCard.tsx";
import {MemberType} from "../../../api/member/member.response.ts";
import {updateMemberInfo} from "../../../api/member/member.api.ts";
import {MemberUpdateRequest} from "../../../api/member/member.request.ts";
import MemberEditInfo from "../../../components/account/MemberEditInfo.tsx";

export default function AccountPage() {
  const {member, changeLoginFlag } = useContext(MemberContext);
  if(!member) {
    return <div>Loading Account...</div>;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState({
    ...member,
    password: ''
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedMember((prevMember) => ({
      ...prevMember,
      [name]: value
    }));
  };
  const handleMemberTypeChange = (e: SelectChangeEvent<MemberType>) => {
    const value = e.target.value as MemberType;
    setEditedMember((prevMember) => ({
      ...prevMember,
      memberType: value
    }));
  };


  /**
   * 수정된 회원 정보를 서버에 API 전송
   */
  const handleSaveClick = () => {
    if(!editedMember.name || !editedMember.email || !editedMember.password) {
      alert('입력 값을 확인해주세요.');
      return;
    }
    setIsEditing(false);
    const request : MemberUpdateRequest = {
      name: editedMember.name,
      email: editedMember.email,
      password: editedMember.password,
      memberType: editedMember.memberType as 'INSTRUCTOR' | 'STUDENT'
    }
    updateMemberInfo(request).then(changeLoginFlag);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            {isEditing ? (
              <MemberEditInfo
                editedMember={editedMember}
                handleInputChange={handleInputChange}
                handleMemberTypeChange={handleMemberTypeChange}
              />
            ) : (
              <MemberCard member={member} />
            )}
          </Grid>
        </Grid>
        <Box mt={3}>
          {isEditing ? (
            <Button variant="contained" color="primary" onClick={handleSaveClick}>저장</Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleEditClick}>회원정보 수정</Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}