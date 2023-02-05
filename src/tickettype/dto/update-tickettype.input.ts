import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsAlphanumeric, IsNumber, IsOptional } from "class-validator";

@InputType()
export class UpdateTicketTypeInput {
    @Field(type => Int)
    ticketTypeID: number;

    @IsOptional()
    @IsAlphanumeric()
    @Field({nullable: true})
    type: string;

    @IsOptional()
    @IsNumber()
    @Field(type => Float, {nullable: true})
    price: number;
}