import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ValidateUserDto } from './dto/validate-auth.dto';
import { isValid, parse } from '@telegram-apps/init-data-node';
import { ConfigService } from '@nestjs/config';
import { DRIZZLE } from '@/drizzle/drizzle.module'
import { DrizzleDB } from "@/drizzle/types/drizzle"
import { userTable } from '@/drizzle/schema/user.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  private readonly TELEGRAM_BOT_TOKEN: string

  constructor(@Inject(DRIZZLE) private db: DrizzleDB,private readonly configService: ConfigService) {
    this.TELEGRAM_BOT_TOKEN = this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN')
  }

  async validate(validateUserDto: ValidateUserDto) {
    console.log("User init data: ", validateUserDto)

    const initData = validateUserDto.initData

    const isInitDataValid = isValid(
      initData,
      this.TELEGRAM_BOT_TOKEN
    )

    if (!isInitDataValid) {
      throw new BadRequestException("Init data invalid")
    }

    const userTgId = parse(initData).user?.id

    if (!userTgId) {
      throw new BadRequestException("Dont user id in init data")
    }

    // сделаешь жоски поиск юзера и все остальное, это пример чисто
    const [user] = await this.db.selectDistinct().from(userTable).where(eq(userTable.initData, initData))

    if (!user) {
      //регистрация и тд
    }

    Logger.log("Успешная авторизация пользователя")
    return "то что надо"
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
