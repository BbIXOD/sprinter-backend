import { ClassConstructor } from "class-transformer";
import { TransformInterceptor } from "../interceptors";
import { UseInterceptors } from "@nestjs/common";

export function TransformTo(dataDto: ClassConstructor<any>) {
  return UseInterceptors(new TransformInterceptor(dataDto));
}
