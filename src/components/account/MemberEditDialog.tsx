import {isLoginMember, Member, MemberType, memberTypeToKo} from "@/api/member/member.response.ts";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";





type Props = {
  editedMember: Member & { password: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMemberTypeChange: (value: string) => void;
  saveClick: () => void;
};


export function MemberEditDialog({editedMember, handleInputChange, handleMemberTypeChange, saveClick}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              name="name" placeholder="name"
              value={editedMember.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              name="email" placeholder="email"
              value={editedMember.email}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
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
        <DialogClose>
          <Button type="button" onClick={saveClick}>Save changes</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}