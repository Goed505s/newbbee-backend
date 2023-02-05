import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Showing } from "src/showing/showing.entity";
import { Seat } from "src/seat/seat.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("theater")
@ObjectType()
export class Theater {
    @PrimaryGeneratedColumn()
    @Field(type => Int)  
    theaterID: number;

    @Column()
    @Field(type => Int)
    capacity: number;

    @Column()
    @Field(type => Boolean)
    available: boolean;

    @OneToMany(() => Showing, showing => showing.theater)
    @Field(() => [Showing])
    showings: Showing[];
    
    @OneToMany(() => Seat, seat => seat.theater)
    @Field(() => [Seat])
    seats: Seat[];
}