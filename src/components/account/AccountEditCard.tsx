import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {isLoginMember, Member, MemberType, memberTypeToKo} from "@/api/member/member.response.ts";
import {GreenButton} from "@/components/ui/GreenButton.tsx";

interface Props {
  editedMember: Member & { password: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMemberTypeChange: (value: string) => void;
  cancelClick: () => void;
  saveClick: () => void;
}

export default function AccountEditCard({editedMember, handleInputChange, handleMemberTypeChange, cancelClick, saveClick}: Props) {
  return (
    <Card className="w-[850px]">
      <CardHeader>
        <CardTitle>프로필 편집</CardTitle>
        <CardDescription>
          회원 정보를 수정합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row justify-between items-center">
              <Label htmlFor="name" className="text-left w-80">
                닉네임
              </Label>
              <Input
                name="name" placeholder="닉네임"
                value={editedMember.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <Label htmlFor="email" className="text-left w-80">
                이메일
              </Label>
              <Input
                name="email" placeholder="이메일"
                value={editedMember.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <Label htmlFor="password" className="text-left w-80">
                비밀번호
              </Label>
              <Input
                name="password" placeholder="비밀번호"
                value={editedMember.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-row justify-between items-center">
                <Label htmlFor="framework" className="text-left w-80">
                  유형
                </Label>
                <Select
                  value={editedMember.memberType}
                  onValueChange={handleMemberTypeChange}
                >
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select"/>
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {Object.values(MemberType).filter(e => isLoginMember(e)).map((type) => (
                      <SelectItem key={type} value={type}>{memberTypeToKo(type)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={cancelClick}>
          취소
        </Button>
        <div className="w-2"/>
        <GreenButton onClick={saveClick}>
          저장
        </GreenButton>
      </CardFooter>
    </Card>
  );
}