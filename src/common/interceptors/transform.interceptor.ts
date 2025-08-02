import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly dataDto: ClassConstructor<any>) {}
  intercept(
    _: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return data;
        }
        if (Array.isArray(data)) {
          return data.map((item) =>
            plainToInstance(this.dataDto, item, {
              excludeExtraneousValues: true,
            }),
          );
        }
        return plainToInstance(this.dataDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
