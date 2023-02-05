import { Field, InputType, Int } from "@nestjs/graphql";
import { IsDateString, IsOptional, IsUppercase, IsUrl, Length } from "class-validator";

@InputType()
export class UpdateMovieInput {

    @Field(()=> Int)
    movieID: number;

    @IsOptional()
    @Length(1,256)
    @Field({nullable: true})
    title: string;

    @IsOptional()
    @Length(1,256)
    @Field({nullable: true})
    director: string;

    @IsOptional()
    @Length(1,256)
    @Field({nullable: true})
    producer: string;

    @IsOptional()   
    @Length(1,64)
    @Field({nullable: true})
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

    @IsOptional()
    @IsUrl()
    @Field({nullable: true})
    trailer: string;

    @IsOptional()
    @Field({nullable: true})
    imageRef: string;

    @IsOptional()
    @Length(1,1000)
    @Field({nullable: true})
    Cast: string;
}