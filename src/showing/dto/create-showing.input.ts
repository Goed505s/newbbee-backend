import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsDateString } from "class-validator";

@InputType()
export class CreateShowingInput {
    @Field(type => Int)
    movieID: number;

    @IsDateString()
    @Field()
    endTime: string; 

    @IsDateString()
    @Field()
    startTime: string; 

    @Field(type => Boolean)
    available: boolean

    @Field(type => Int)
    theaterID: number;
}