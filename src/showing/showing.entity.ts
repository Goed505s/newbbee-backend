import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsDateString } from "class-validator";
import { Movie } from "src/movie/movie.entity";
import { Theater } from "src/theater/theater.entity";
import { TheaterModule } from "src/theater/theater.module";
import { Ticket } from "src/ticket/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("showing")
@ObjectType()
export class Showing {
    @PrimaryGeneratedColumn()
    @Field(type => Int)  
    showingID: number;

    @Column()
    @Field(type => Int)
    movieID: number;

    @Field(type => Movie)
    @ManyToOne(() => Movie, movie => movie.showings)
    @JoinColumn({
        name: "movieID",
        referencedColumnName: "movieID",
    }) 
    movie: Movie

    @Column()
    @Field()
    @IsDateString()
    endTime: string; 

    @Column()
    @Field()
    @IsDateString()
    startTime: string; 

    @Column()
    @Field(type => Boolean)
    available: boolean;

    @Column()
    @Field(type => Int)
    theaterID: number;

    @Field(type => Theater)
    @ManyToOne(() => Theater, theater => theater.showings)
    @JoinColumn({
        name: "theaterID",
        referencedColumnName: "theaterID",
    }) 
    theater: Theater

    @OneToMany(() => Ticket, ticket => ticket.showing)
    @Field(() => [Ticket])
    tickets: Ticket[];
}