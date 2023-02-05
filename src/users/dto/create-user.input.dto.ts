import { Field, InputType, Int } from "@nestjs/graphql";
import { Contains, IsAlpha, IsAscii, IsBoolean, IsEmail, IsNumber, IsNumberString, IsOptional, IsPhoneNumber, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

@InputType()
export class CreateUserInput{

    @IsAlpha()
    @MinLength(1)
    @Field() 
    firstName: string;

    @IsAlpha()
    @MinLength(1)
    @Field()
    lastName: string;

    @IsEmail()
    @Field()
    email: string;

    @IsNumberString()
    @MaxLength(10)
    @MinLength(9)
    @Field()
    phoneNumber: string;

    @MinLength(8)
    @Field()
    password: string;

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