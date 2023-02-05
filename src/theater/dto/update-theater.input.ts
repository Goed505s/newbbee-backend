import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, Max } from "class-validator";

@InputType()
export class UpdateTheaterInput {
    @Field(type => Int, {nullable: true})
    theaterID: number;

    @IsOptional()
    @IsNumber()
    @Max(300)
    @Field(type => Int, {nullable: true})
    capacity: number;

    @IsOptional()
    @Field(type => Boolean, {nullable: true})
    available: boolean;
}