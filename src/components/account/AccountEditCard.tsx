import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {isLoginMember, Member, MemberType, memberTypeToKo} from "@/api/member/member.response.ts";

interface Props {
  editedMember: Member & { password: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMemberTypeChange: (value: string) => void;
  cancelClick: () => void;
  saveClick: () => void;
}

export default function AccountEditCard({editedMember, handleInputChange, handleMemberTypeChange, cancelClick, saveClick}: Props) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Make changes to your profile here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-left">
                Name
              </Label>
              <Input
                name="name" placeholder="name"
                value={editedMember.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                name="email" placeholder="email"
                value={editedMember.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-left">
                password
              </Label>
              <Input
                name="password" placeholder="password"
                value={editedMember.password}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={cancelClick}>Cancel</Button>
        <Button type="button" onClick={saveClick}>Save changes</Button>
      </CardFooter>
    </Card>
  );
}