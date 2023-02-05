import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, Length, Max, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class UpdateFeeInput {

    @Field(() => Int, {nullable: true})
    feeID: number;

    @IsOptional()
    @Length(1,127)
    @Field({nullable: true})
    title: string; 

    @IsOptional()
    @Max(100.0)
    @Min(0.0)
    @Field(type => Float, {nullable: true})
    amount: number;

    @IsOptional()
    @IsBoolean()
    @Field(type => Boolean, {nullable: true})
    active: boolean;
}
