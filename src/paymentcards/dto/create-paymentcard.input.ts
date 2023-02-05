import { Field, InputType, Int } from "@nestjs/graphql";
import { User } from "src/users/user.entity";
import { Entity } from "typeorm";

@Entity()
@InputType()
export class CreatePaymentCardInput {

    @Field()
    cardType: string;

    @Field(type => Int)
    CVV: number;

    @Field(type => Int)
    expirationDate: number;

    @Field()
    holderName: string;

    @Field()
    number: string;

    @Field(type => Int)
    userID: number;

    @Field(type => Int)
    addressID: number;
}

