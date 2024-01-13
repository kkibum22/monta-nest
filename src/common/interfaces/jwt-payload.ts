import { MemberRole } from 'src/members/entities/member-role.enum';

export interface JWTPayload {
  sub: string;
  email: string;
  role: MemberRole;
}
