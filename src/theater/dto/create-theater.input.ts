import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, Max } from "class-validator";

@InputType()
export class CreateTheaterInput {
    @IsNumber()
    @Max(300)
    @Field(type => Int)
    capacity: number;

    @Field(type => Boolean)
    available: boolean;
}