import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsAlphanumeric, IsNumber } from "class-validator";

@InputType()
export class CreateTicketTypeInput {

    @IsAlphanumeric()
    @Field()
    type: string;

    @IsNumber()
    @Field(type => Float)
    price: number;
}