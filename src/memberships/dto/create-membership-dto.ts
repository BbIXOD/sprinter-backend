import { Role } from "generated/prisma";

export class CreateMembershipDto {
  boardId: string;
  userId: string;
  role: Role;
}
