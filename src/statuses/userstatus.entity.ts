import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("userstatus")
@ObjectType()
export class UserStatus {

    @PrimaryGeneratedColumn() 
    statusID: number;

    @Column()
    status: string;

}