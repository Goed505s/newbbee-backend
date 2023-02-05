import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Ticket } from "src/ticket/ticket.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("tickettype")
@ObjectType()
export class TicketType {
    @PrimaryGeneratedColumn()
    @Field(type => Int)  
    typeID: number;

    @Column()
    @Field()
    type: string;

    @Column()
    @Field(type => Float)
    price: number;

    @OneToOne(() => Ticket, ticket => ticket.ticketType)
    @Field(() => [Ticket])
    tickets: Ticket[];
}