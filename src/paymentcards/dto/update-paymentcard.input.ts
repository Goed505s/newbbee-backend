import { Field, InputType, Int } from "@nestjs/graphql";
import { User } from "src/users/user.entity";
import { Entity } from "typeorm";

@Entity()
@InputType()
export class UpdatePaymentCardInput {

    @Field(type => Int)
    paymentCardID: number;

    @Field({nullable: true})
    cardType: string;

    @Field(type => Int, {nullable: true})
    CVV: number;

    @Field(type => Int, {nullable: true})
    expirationDate: number;

    @Field({nullable: true})
    holderName: string;

    @Field({nullable: true})
    number: string;

    @Field(type => Int, {nullable: true})
    userID: number;

    @Field(type => Int, {nullable: true})
    addressID: number;
}

