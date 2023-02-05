import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsAlpha, IsAscii, IsBoolean, IsEmail, IsNumber, IsNumberString, IsOptional, IsPhoneNumber, Matches, Max, MaxLength, Min, MinLength } from "class-validator";
import { CreateUserInput } from "./create-user.input.dto";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput){

    @Field(() => Int)
    userID: number;

    @IsOptional()
    @IsAlpha()
    @MinLength(1)
    @Field({nullable: true})
    firstName: string;

    @IsOptional()
    @IsAlpha()
    @MinLength(1)
    @Field({nullable: true})
    lastName: string;

    @IsOptional()
    @IsEmail()
    @Field({nullable: true})
    email: string;

    @IsOptional()
    @IsNumberString()
    @MaxLength(10)
    @MinLength(9)
    @Field({nullable: true})
    phoneNumber: string;

    @IsOptional()
    @MinLength(8)
    @Field({nullable: true})
    password: string;

    @IsOptional()
    @IsOptional()
    @IsBoolean()
    @Field(type => Boolean, {nullable: true})
    admin: boolean;

    @IsOptional()
    @IsBoolean()
    @Field(type => Boolean, {nullable: true})
    promotion: boolean;

    @IsOptional()
    @IsNumber()
    @Field(type => Int, {nullable: true})
    userStatusID: number;

    @IsOptional()
    @IsNumber()
    @Field(type => Int, {nullable: true})
    homeAddressID: number;

    @IsOptional()
    @IsNumber()
    @Max(9999)
    @Min(0)
    @Field(type => Int, {nullable: true})
    verificationToken: number;

}