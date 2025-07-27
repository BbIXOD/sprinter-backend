import { Expose } from "class-transformer";
import { Role } from "generated/prisma";

export class MembershipDto {
  @Expose()
  id: string;
  @Expose()
  userId: string;
  @Expose()
  boardId: string;
  @Expose()
  role: Role;
}
