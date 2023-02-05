import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PaymentCard } from "src/paymentcards/paymentcard.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
@ObjectType()
export class Address {
    @PrimaryGeneratedColumn()
    @Field(type => Int)  
    addressID: number;

    @Column()
    @Field() 
    street: string;

    @Column()
    @Field() 
    city: string;

    @Column()
    @Field() 
    state: string;

    @Column()
    @Field(type => Int) 
    zipCode: number;

    @Column()
    @Field()
    country: string;

    @OneToMany(() => PaymentCard, paymentcard => paymentcard.address)
    @JoinColumn({
        referencedColumnName: "addressID"  // refers to key of other table
    })
    @Field(type => [PaymentCard], {nullable: true})
    paymentCards: PaymentCard[]
    
    @OneToMany(() => User, user => user.homeAddress)
    @Field(type => [User], {nullable: true})
    users: User[];
}