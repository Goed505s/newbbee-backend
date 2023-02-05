import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateReviewInput {
    @Field(type => Int)
    authorID: number;

    @Field(type => Int)
    movieID: number;

    @Field(type => String)
    review: string

    @Field(type => Int)
    rating: number
}