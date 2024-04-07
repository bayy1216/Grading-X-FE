export interface Member {
  email: string;
  name: string;
  memberType: MemberType;
}

const MemberType = {
  INSTRUCTOR: 'INSTRUCTOR',
  STUDENT: 'STUDENT',
  GUEST: 'GUEST',
} as const;

export function isLoginMember(memberType: MemberType): boolean {
  return memberType !== MemberType.GUEST;
}

export function memberTypeToKo(memberType: MemberType): string {
  switch (memberType) {
    case MemberType.INSTRUCTOR:
      return '교수자';
    case MemberType.STUDENT:
      return '학생';
    case MemberType.GUEST:
      return '게스트';
    default:
      throw new Error('Invalid MemberType');
  }
}

type MemberType = typeof MemberType[keyof typeof MemberType];

export { MemberType };