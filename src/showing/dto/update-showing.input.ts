import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsDateString, IsOptional } from "class-validator";

@InputType()
export class UpdateShowingInput {

    @Field(type => Int)
    showingID: number;

    @IsOptional()
    @Field(type => Int, {nullable: true})
    movieID: number;

    @IsOptional()
    @IsDateString()
    @Field({nullable: true})
    endTime: string; 

    @IsOptional()
    @IsDateString()
    @Field({nullable: true})
    startTime: string; 

    @IsOptional()
    @Field(type => Boolean, {nullable: true})
    available: boolean

    @IsOptional()
    @Field(type => Int, {nullable: true})
    theaterID: number;
}