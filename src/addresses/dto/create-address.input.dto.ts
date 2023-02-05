import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsAlphanumeric, IsOptional, Max, Min, MaxLength } from "class-validator";

@InputType()
export class CreateAddressInput {
    @MaxLength(255)
    @Field() 
    street: string;

    @MaxLength(255)
    @Field() 
    city: string;

    @IsAlpha()
    @Field() 
    state: string;

    @Max(100000)
    @Min(9999)
    @Field(type => Int) 
    zipCode: number;

    @IsOptional()
    @Field({nullable: true})
    country: string;

}