import { IsString } from "class-validator";

export class ValidateUserDto{
    @IsString()
    initData!: string;
}