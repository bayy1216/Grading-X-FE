import {MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {isLoginMember, Member, MemberType, memberTypeToKo} from "../../api/member/member.response.ts";




type Props = {
  editedMember: Member & {password: string};
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMemberTypeChange: (e: SelectChangeEvent<MemberType>) => void;
};


export default function MemberEditInfo({editedMember, handleInputChange, handleMemberTypeChange}: Props) {
  return (
    <form>
      <TextField
        name="name"
        label="Name"
        value={editedMember.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={editedMember.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={editedMember.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Select
        value={editedMember.memberType}
        onChange={handleMemberTypeChange}
      >
        {Object.values(MemberType).filter(e => isLoginMember(e)).map((type) => (
          <MenuItem key={type} value={type}>{memberTypeToKo(type)}</MenuItem>
        ))}
      </Select>
    </form>
  );
}