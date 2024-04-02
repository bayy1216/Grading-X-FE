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

type MemberType = typeof MemberType[keyof typeof MemberType];

export { MemberType };