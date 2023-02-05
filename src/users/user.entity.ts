import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PaymentCard } from "src/paymentcards/paymentcard.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { userInfo } from "os";
import { Address } from "src/addresses/address.entity";
import { Review } from "src/review/review.entity";
import { Booking } from "src/booking/booking.entity";
import { Ticket } from "src/ticket/ticket.entity";

@Entity()
@ObjectType()
export class User {
    @Column()
    @PrimaryGeneratedColumn()
    @Field(type => Int) // field decorator defines how GraphQL reads this field  
    userID: number;

    @Column()
    @Field() // the field decorator knows some types implicitly, like string
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    phoneNumber: string;

    @Column()
    @Field()
    password: string;

    @Column()
    @Field(type => Boolean)
    admin?: boolean;

    @Column()
    @Field(type => Boolean)
    promotion: boolean;

    @OneToMany(() => PaymentCard, paymentCard => paymentCard.user)
    @JoinColumn({
        referencedColumnName: "userID"  // refers to key of other table
    })
    @Field(type => [PaymentCard], {nullable: true})
    paymentCards: PaymentCard[];
    
    @Column()
    @Field(type => Int)
    userStatusID: number;

    @Field(type => String)
    userStatus: String

    @Column({nullable: true})
    @Field(type => Int, {nullable: true})
    homeAddressID: number;

    @ManyToOne(() => Address, address => address.users)
    @JoinColumn({
        name: "homeAddressID",
        referencedColumnName: "addressID",
    }) 
    @Field(type => Address, {nullable: true})
    homeAddress: Address

    @Column({nullable: true})
    @Field(type => Int, {nullable: true})
    verificationToken: number;

    @OneToMany(() => Review, review => review.author)
    @Field(() => [Review])
    reviews: Review[];
    
    @OneToMany(() => Booking, booking => booking.user)
    @Field(() => [Booking])
    bookings: Booking[];

    @OneToMany(() => Ticket, ticket => ticket.user)
    @Field(() => [Ticket])
    tickets: Ticket[];
}