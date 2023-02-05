import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsAlphanumeric, IsOptional, Max, Min, MaxLength } from "class-validator";

@InputType()
export class UpdateAddressInput {
    @Field(type => Int)
    addressID: number;

    @IsOptional()
    @MaxLength(255)
    @Field({nullable: true}) 
    street: string;

    @IsOptional()
    @MaxLength(255)
    @Field({nullable: true}) 
    city: string;

    @IsOptional()
    @IsAlpha()
    @Field({nullable: true}) 
    state: string;

    @IsOptional()
    @Max(100000)
    @Min(9999)
    @Field(type => Int, {nullable: true}) 
    zipCode: number;

    @IsOptional()
    @Field({nullable: true})
    country: string;
}