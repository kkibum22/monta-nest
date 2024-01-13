import { SetMetadata } from '@nestjs/common';
import { MemberRole } from 'src/members/entities/member-role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: MemberRole[]) => SetMetadata(ROLES_KEY, roles);
