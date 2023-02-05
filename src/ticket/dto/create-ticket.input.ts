import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsDateString, IsNumber, IsOptional } from "class-validator";

@InputType()
export class CreateTicketInput{
    @Field(type => Int)
    ticketTypeID: number;

    @Field(type => Int)
    userID: number;

    @Field(type => Int)
    bookingID: number;

    @Field(type => Int)
    seatID: number;

    @Field(type => Int)
    showingID: number;
}