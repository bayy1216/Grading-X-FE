export interface MemberUpdateRequest {
  email: string;
  name: string;
  password: string;
  memberType: 'INSTRUCTOR' | 'STUDENT';
}