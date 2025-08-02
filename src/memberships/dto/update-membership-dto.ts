import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateMembershipDto } from "./create-membership-dto";

export class UpdateMembershipDto extends OmitType(PartialType(CreateMembershipDto), ['userId'] as const) {}
