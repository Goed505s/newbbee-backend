import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsDateString, IsOptional, IsString, IsUppercase, Length, Max, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class UpdatePromotionInput {

    @Field(type => Int)
    promotionID: number;

    @IsOptional()
    @IsString()
    @Length(1,127)
    @Field({nullable: true})
    title: string; 

    @IsOptional()
    @Length(10)
    @IsDateString()
    @Field({nullable: true})
    endDate: string; 

    @IsOptional()
    @Length(10)
    @IsDateString()
    @Field({nullable: true})
    startDate: string; 

    @IsOptional()
    @Field(type => Boolean, {nullable: true})
    active: boolean;

    @IsOptional()
    @Min(0.1)
    @Max(100.0) // free movie ticket!!
    @Field(type => Float, {nullable: true})
    percentOff: number;

    @IsOptional()
    @Length(6)
    @IsUppercase()
    @Column()
    @Field({nullable: true})
    promoCode: string;
}
