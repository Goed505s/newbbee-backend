import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsDateString } from "class-validator";
import { Fee } from "src/fees/fee.entity";

@InputType()
export class CreateBookingInput{
    @Field(type => Int)
    userID: number;

    @Field(type => Int, {nullable: true})
    paymentCardID: number;

    @Field(type => Int, {nullable: true})
    promotionID: number;

    @Field(type => [Int])
    feeIDs: number[];

    // @IsDateString()
    @Field()
    dateOfPurchase: string;

    @Field(type => Float)
    total: number;

    @Field(type => Float, {nullable: true})
    subTotal: number;
}