import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Review } from "src/review/review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Showing } from "src/showing/showing.entity";

@Entity()
@ObjectType()
export class Movie {
    @PrimaryGeneratedColumn()
    @Field(type => Int)  
    movieID: number;

    @Column()
    @Field()
    title: string;

    @Column({nullable: true})
    @Field({nullable: true})
    director: string;

    @Column({nullable: true})
    @Field({nullable: true})
    producer: string;

    @Column()
    @Field()
    category: string;

    @Column({nullable: true})
    @Field({nullable: true})
    synopsis: string;

    @Column({nullable: true})
    @Field({nullable: true},)
    releaseDate: string;

    @Column({nullable: true})
    @Field({nullable: true})
    rating: string;

    @Column({nullable: true})
    @Field({nullable: true})
    trailer: string;

    @Column({nullable: true})
    @Field({nullable: true})
    Cast: string;

    @Column({nullable: true})
    @Field({nullable: true})
    imageRef: string;

    @OneToMany(() => Review, review => review.movie)
    @Field(() => [Review])
    reviews: Review[];

    @OneToMany(() => Showing, showing => showing.movie)
    @Field(() => [Showing])
    showings: Showing[];

    @Field(() => Boolean)
    nowShowing: boolean;

    @Field(() => Float, {nullable: true})
    averageRating: number;
}