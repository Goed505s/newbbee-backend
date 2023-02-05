import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Address } from "src/addresses/address.entity";
import { Booking } from "src/booking/booking.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("paymentcard")
@ObjectType()
export class PaymentCard { // payment_card

    @PrimaryGeneratedColumn() 
    @Field(type => Int)  
    paymentCardID: number;

    @Column()
    @Field()
    cardType: string;

    @Column()
    @Field(type => Int)
    CVV: number;

    @Column()
    @Field(type => Int)
    expirationDate: number;

    @Column()
    @Field()
    holderName: string;

    @Column()
    @Field()
    number: string;

    @ManyToOne(() => User, (user) => user.paymentCards)
    @JoinColumn({
        name: "userID",
        referencedColumnName: "userID"
    })
    user: User; // foreign key

    @Column()
    @Field(type => Int)
    userID: number;

    @Column()
    @Field(type => Int)
    addressID: number;

    @ManyToOne(() => Address, (address) => address.paymentCards)
    @Field(type => Address, {nullable: true})
    @JoinColumn({
        name: "addressID",
        referencedColumnName: "addressID"
    })
    address: Address; // foreign key
    
    @OneToMany(() => Booking, booking => booking.paymentCard)
    @Field(() => [Booking])
    bookings: Booking[];
}   