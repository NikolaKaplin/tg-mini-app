import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DrizzleModule } from '@/drizzle/drizzle.module';

@Module({
  imports: [ConfigModule, ScheduleModule.forRoot(), DrizzleModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
