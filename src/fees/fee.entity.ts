import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Booking } from "src/booking/booking.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("fee")
@ObjectType()
export class Fee {
    @PrimaryGeneratedColumn()
    @Field(type => Int)  
    feeID: number;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field(type => Float)
    amount: number;

    @Column()
    @Field(type => Boolean)
    active: boolean;

    @ManyToMany(() => Booking, (booking) => booking.fees)
    bookings: Booking[]
}
