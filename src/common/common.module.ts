import { Global, Module } from '@nestjs/common';
import { JwtStrategy } from './strategies';
import { JwtAuthGuard } from './guards';

@Global()
@Module({
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class CommonModule {}
