import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentCard } from 'src/paymentcards/paymentcard.entity';
import { Address } from 'src/addresses/address.entity';
import { AddressesService } from 'src/addresses/addresses.service';
import { StatusesService } from 'src/statuses/statuses.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input.dto';
import { UpdateUserInput } from './dto/update-user.input.dto';
import { User } from './user.entity';
import { PaymentCardsService } from 'src/paymentcards/paymentcards.service';
import { GlobalCrypto } from 'util/globalCrypto';
import { ReviewService } from 'src/review/review.service';
import { Review } from 'src/review/review.entity';
import { BookingService } from 'src/booking/booking.service';
import { Booking } from 'src/booking/booking.entity';
import { TicketService } from 'src/ticket/ticket.service';
import { Ticket } from 'src/ticket/ticket.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
                private paymentcardsService: PaymentCardsService,
                private addressesService: AddressesService,
                private statusesService: StatusesService,
                @Inject(forwardRef(() => BookingService)) private bookingService: BookingService,
                @Inject(forwardRef(() => ReviewService)) private reviewService: ReviewService,
                @Inject(forwardRef(() => TicketService)) private ticketService: TicketService) {}

    async getUserById(id: number): Promise<User> {
        return this.usersRepository.findOneOrFail({
            where: [ {userID: id }]
        });
    }

    async getAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.usersRepository.findOneOrFail({
            where: [ {email: email }],
        });
    }

    async getPaymentCards(userID: number): Promise<PaymentCard[]> {
        return this.paymentcardsService.getPaymentCardByUserID(userID);
    }
    
    async getAddress(addressID: number): Promise<Address> {
        return this.addressesService.getAddressById(addressID);
    }

    async getStatus(statusID: number): Promise<string> {
        return (await this.statusesService.getStatusById(statusID)).status;        
    }

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        if (createUserInput.userStatusID === null) {
            createUserInput.userStatusID = 0;
        }
        // Hashes the password using node's Crypto API
        createUserInput.password = GlobalCrypto.hashString(createUserInput.password);
        const newUser = this.usersRepository.create(createUserInput);
        return this.usersRepository.save(newUser);
    }

    async updateUser(
        updateUserInput: UpdateUserInput
    ): Promise<User> {
        // Hashes the user's new password using Node's crypto API
        console.log(updateUserInput);
        if (updateUserInput.password)
        {
            updateUserInput.password = GlobalCrypto.hashString(updateUserInput.password);
        }
        const update = await this.usersRepository.preload(updateUserInput);
        return this.usersRepository.save(update);
    }

    async getReviewsByUserId(id: number): Promise<Review[]> {
        return this.reviewService.getReviewsByUserId(id);  
    } 
    async getBookingsByUserId(id: number): Promise<Booking[]> {
        return this.bookingService.getBookingsByUserId(id);   
    }

    async getTicketsByUserId(id: number): Promise<Ticket[]> {
        return this.ticketService.getTicketsByUserId(id);   
    }
}
