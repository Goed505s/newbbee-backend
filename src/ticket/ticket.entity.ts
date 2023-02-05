import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { IsDateString } from "class-validator";
import { Booking } from "src/booking/booking.entity";
import { PaymentCard } from "src/paymentcards/paymentcard.entity";
import { Seat } from "src/seat/seat.entity";
import { Showing } from "src/showing/showing.entity";
import { TicketType } from "src/tickettype/tickettype.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("ticket")
@ObjectType()
export class Ticket {
    @PrimaryGeneratedColumn()
    @Field(type => Int)  
    ticketID: number;

    @Column()
    @Field(type => Int)
    ticketTypeID: number;

    @ManyToOne(() => TicketType, ticketType => ticketType.tickets)
    @JoinColumn({
        name: "ticketTypeID",
        referencedColumnName: "typeID",
    })
    @Field(type => TicketType)
    ticketType: TicketType

    @Column()
    @Field(type => Int)
    userID: number;

    @ManyToOne(() => User, user => user.tickets)
    @Field(type => User)
    @JoinColumn({
        name: "userID",
        referencedColumnName: "userID",
    }) 
    user: User

    @Column()
    @Field(type => Int)
    bookingID: number;

    @ManyToOne(() => Booking, booking => booking.tickets)
    @Field(type => Booking)
    @JoinColumn({
        name: "bookingID",
        referencedColumnName: "bookingID",
    }) 
    booking: Booking

    @Column()
    @Field(type => Int)
    seatID: number;

    @ManyToOne(() => Seat, seat => seat.tickets)
    @Field(type => Seat)
    @JoinColumn({
        name: "seatID",
        referencedColumnName: "seatID",
    }) 
    seat: Seat

    @Column()
    @Field(type => Int)
    showingID: number;

    @ManyToOne(() => Showing, showing => showing.tickets)
    @Field(type => Showing)
    @JoinColumn({
        name: "showingID",
        referencedColumnName: "showingID",
    }) 
    showing: Showing
}