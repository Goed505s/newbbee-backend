import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { IsDateString } from "class-validator";
import { Booking } from "src/booking/booking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Promotion {
    @PrimaryGeneratedColumn()
    @Field(type => Int)  
    promotionID: number;

    @Column()
    @Field()
    title: string; 

    @Column()
    @Field()
    endDate: string; 

    @Column()
    @Field()
    startDate: string; 

    @Column()
    @Field(type => Boolean)
    active: boolean;

    @Column()
    @Field(type => Float)
    percentOff: number;

    @OneToMany(() => Booking, booking => booking.promotion)
    @Field(() => [Booking])
    bookings: Booking[];

    @Column()
    @Field()
    promoCode: string;
}
