import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { IsDateString } from "class-validator";
import { Fee } from "src/fees/fee.entity";
import { PaymentCard } from "src/paymentcards/paymentcard.entity";
import { Promotion } from "src/promotion/promotion.entity";
import { Ticket } from "src/ticket/ticket.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("booking")
@ObjectType()
export class Booking {
    @PrimaryGeneratedColumn()
    @Field(type => Int)  
    bookingID: number;

    @Column()
    @Field(type => Int)
    userID: number;

    @ManyToOne(() => User, user => user.bookings)
    @Field(type => User)
    @JoinColumn({
        name: "userID",
        referencedColumnName: "userID",
    }) 
    user: User

    @Column({nullable: true})
    @Field(type => Int, {nullable: true})
    paymentCardID: number;

    @ManyToOne(() => PaymentCard, paymentCard => paymentCard.bookings)
    @Field(type => PaymentCard, {nullable: true})
    @JoinColumn({
        name: "paymentCardID",
        referencedColumnName: "paymentCardID",
    }) 
    paymentCard: PaymentCard

    @Column({nullable: true})
    @Field(type => Int, {nullable: true})
    promotionID: number;

    @ManyToOne(() => Promotion, promotion => promotion.bookings)
    @Field(type => Promotion, {nullable: true})
    @JoinColumn({
        name: "promotionID",
        referencedColumnName: "promotionID",
    }) 
    promotion: Promotion

    @Column()
    @Field()
    @IsDateString()
    dateOfPurchase: string;

    @Column()
    @Field(type => Float)
    total: number;

    @Column({nullable: true})
    @Field(type => Float, {nullable: true})
    subTotal: number;

    @OneToMany(() => Ticket, ticket => ticket.booking)
    @Field(() => [Ticket])
    tickets: Ticket[];

    @ManyToMany(() => Fee, (fee) => fee.bookings)
    @Field(() => [Fee])
    fees: Fee[];
}