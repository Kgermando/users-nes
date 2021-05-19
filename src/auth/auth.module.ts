import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, CommonModule],
  controllers: [AuthController],
})
export class AuthModule {}
