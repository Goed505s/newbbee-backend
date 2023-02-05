import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { Entity } from "typeorm";

@InputType()
export class CreateSeatInput {
    @Field()
    location: string;

    @IsNumber()
    @Field(type => Int, {nullable: true})
    theaterID: number;
}