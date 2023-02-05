import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Movie } from "src/movie/movie.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("review")
@ObjectType()
export class Review {
    @PrimaryGeneratedColumn()
    @Field(type => Int)  
    reviewID: number;

    @Column()
    @Field(type => Int)
    authorID: number;

    @ManyToOne(() => User, user => user.reviews)
    @JoinColumn({
        name: "authorID",
        referencedColumnName: "userID",
    }) 
    @Field(type => User)
    author: User

    @Column()
    @Field(type => Int)
    movieID: number;

    @ManyToOne(() => Movie, movie => movie.reviews)
    @JoinColumn({
        name: "movieID",
        referencedColumnName: "movieID",
    }) 
    @Field(type => Movie)
    movie: Movie

    @Column()
    @Field(type => String)
    review: string

    @Column()
    @Field(type => Int)
    rating: number
}