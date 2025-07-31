import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { AuthModule } from '../modules/auth/auth.module'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({
			isGlobal: true
		}),
		AuthModule,
	],
})
export class CoreModule {}
