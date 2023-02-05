import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, IsAlphanumeric, IsAscii, IsDateString, IsOptional, IsUppercase, IsUrl, Length } from "class-validator";

@InputType()
export class CreateMovieInput {

    @Length(1,256)
    @Field()
    title: string;

    @IsOptional()
    @Length(1,256)
    @Field({nullable: true})
    director: string;

    @IsOptional()
    @Length(1,256)
    @Field({nullable: true})
    producer: string;

    @Length(1,64)
    @Field()
    category: string;

    @IsOptional()
    @Length(1, 65000)
    @Field({nullable: true})
    synopsis: string;

    @IsOptional()
    @IsDateString()
    @Field({nullable: true})
    releaseDate: string;

    @IsOptional()
    @Length(1,5)
    @IsUppercase()
    @Field({nullable: true})
    rating: string;

    @IsUrl()
    @IsOptional()
    @Field({nullable: true})
    trailer: string;

    @IsOptional()
    @Length(1,256)
    @Field({nullable: true})
    imageRef: string;

    @IsOptional()
    @Length(1,1000)
    @Field({nullable: true})
    Cast: string;
}