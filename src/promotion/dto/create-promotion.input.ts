import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsDateString, IsString, IsUppercase, Length, Max, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class CreatePromotionInput {
    @Field()
    @IsString()
    @Length(1,127)
    title: string; 

    @Length(10)
    @IsDateString()
    @Field()
    endDate: string; 

    @Length(10)
    @IsDateString()
    @Field()
    startDate: string; 

    @Field(type => Boolean)
    active: boolean;

    @Min(0.1)
    @Max(100.0) // free movie ticket!!
    @Field(type => Float)
    percentOff: number;

    @Length(6)
    @IsUppercase()
    @Column()
    @Field()
    promoCode: string;
}
