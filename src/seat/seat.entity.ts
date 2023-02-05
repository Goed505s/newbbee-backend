import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Theater } from "src/theater/theater.entity";
import { Ticket } from "src/ticket/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("seat")
@ObjectType()
export class Seat {
    @PrimaryGeneratedColumn()
    @Field(type => Int)  
    seatID: number;

    @Column()
    @Field()
    location: string;

    @Field(type => Theater, {nullable: true})
    @ManyToOne(() => Theater, theater => theater.seats) 
    @JoinColumn({
        name: "theaterID",
        referencedColumnName: "theaterID"
    })
    theater: Theater;

    @Column({nullable: true})
    @Field(type => Int, {nullable: true})
    theaterID: number;

    @Field(type => [Ticket], {nullable: true})
    @OneToMany(() => Ticket, ticket => ticket.seat) 
    @JoinColumn({
        name: "ticketID",
        referencedColumnName: "ticketID"
    })
    tickets: Ticket[];
}