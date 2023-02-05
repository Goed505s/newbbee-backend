import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsBoolean, Length, Max, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class CreateFeeInput {
    @Length(1,127)
    @Field()
    title: string; 

    @Max(100.0)
    @Min(0.0)
    @Field(type => Float)
    amount: number;

    @IsBoolean()
    @Field(type => Boolean)
    active: boolean;
}
