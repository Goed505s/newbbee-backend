import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeeService } from 'src/fees/fee.service';
import { PaymentCard } from 'src/paymentcards/paymentcard.entity';
import { PaymentCardsService } from 'src/paymentcards/paymentcards.service';
import { Promotion } from 'src/promotion/promotion.entity';
import { PromotionService } from 'src/promotion/promotion.service';
import { CreateTicketInput } from 'src/ticket/dto/create-ticket.input';
import { Showing } from 'src/showing/showing.entity';
import { ShowingService } from 'src/showing/showing.service';
import { Ticket } from 'src/ticket/ticket.entity';
import { TicketService } from 'src/ticket/ticket.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';

@Injectable()
export class BookingService {
    constructor(@InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @Inject(forwardRef(() => PaymentCardsService)) private paymentCardsService: PaymentCardsService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    @Inject(forwardRef(() => PromotionService)) private promotionService: PromotionService,
    @Inject(forwardRef(() => TicketService)) private ticketService: TicketService,
    @Inject(forwardRef(() => FeeService)) private feeService: FeeService,
    @Inject(forwardRef(() => ShowingService)) private showingService: ShowingService) {}

    createBooking(createBookingInput: CreateBookingInput): Promise<Booking> {
        const newBooking = this.bookingRepository.create(createBookingInput);

        return this.bookingRepository.save(newBooking);
    }

    async findAll(): Promise<Booking[]> {
        return this.bookingRepository.find(); // find() does select * from booking
    }

    async getBookingById(id: number): Promise<Booking> {
        return this.bookingRepository.findOneOrFail({
            where: [ {bookingID: id }]
        });
    }

    async formatDate(date: string): Promise<String>
    {
        const newDate = new Date(date);
        return newDate.toISOString().substring(0,10);
    }

    async getBookingsByPaymentcardId(id: number): Promise<Booking[]> {
        return this.bookingRepository.find({
            where: [ {paymentCardID: id }]
        });
    }

    async getPaymentCardById(id: number): Promise<PaymentCard> {
        return this.paymentCardsService.getPaymentCardByID(id);
    }

    async getBookingsByUserId(id: number): Promise<Booking[]> {
        return this.bookingRepository.find({
            where: [ {userID: id }]
        });
    }

    async getUserById(id: number): Promise<User> {
        return this.usersService.getUserById(id);
    }

    async getBookingsByPromotionId(id: number): Promise<Booking[]> {
        return this.bookingRepository.find({
            where: [ {promotionID: id }]
        });
    }

    async getPromotionById(id: number): Promise<Promotion> {
        return this.promotionService.getPromotionById(id);
    }

    async getTicketsByBookingId(id: number): Promise<Ticket[]> {
        return this.ticketService.getTicketsByBookingId(id);   
    }

    async createBookingWithTickets(
        ticketInputs: CreateTicketInput[],
        createBookingInput: CreateBookingInput
    ): Promise<Booking> {

        var total = 0.0;
        var subtotal = 0.0;

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        // calculate sum of prices
        const calculateSubTotal = async () => {
            subtotal = 0.0;
            await asyncForEach(ticketInputs, async ticketInput => {
                const ticketType = await this.ticketService.getTicketTypeById(ticketInput.ticketTypeID).then();
                subtotal += ticketType.price;
            })
            return subtotal;
        }

        const calculateTotal = async () => {
            // calculate discounts + fees
            total = subtotal;
            if (createBookingInput[0].promotionID)
            {
                console.log("getting promotion");
                const promotion = await this.promotionService.getPromotionById(createBookingInput[0].promotionID);
                total -= (promotion.percentOff * 0.01) * (subtotal);
            }
            if (createBookingInput[0].feeIDs)
            {
                await asyncForEach( createBookingInput[0].feeIDs, async fee => {
                    const feePercentage = (await this.feeService.getFeesById(fee)).amount;
                    total += (feePercentage * 0.01) * (subtotal);
                })
            }
            return total;
        }

        await calculateSubTotal();
        await calculateTotal();
        
        createBookingInput[0].total = total;
        createBookingInput[0].subTotal = subtotal;
        const newBooking = await this.bookingRepository.save(await this.bookingRepository.create(createBookingInput));   
        console.log(newBooking);

        await asyncForEach(ticketInputs, async ticket => {
            ticket.bookingID = await newBooking[0].bookingID;
            console.log(await this.ticketService.createTicket(ticket));
        })

        return newBooking[0];
    }
    
    public async getBookingsByShowingId(id: number): Promise<Booking[]>
    {
        const tickets = this.ticketService.getTicketsByShowingId(id);
        var bookingIDs = new Array<number>;
        const bookingList = new Array<Booking>;

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        if ((await tickets).length < 1)
        {
            return null;
        }
        else
        {
            (await tickets).forEach( ticket => {
                bookingIDs.push(ticket.bookingID);
            })
            
            bookingIDs = Array.from(new Set(bookingIDs)); // filter array to contain only unique values
            await asyncForEach( bookingIDs, async bookingID => {
                bookingList.push(await this.getBookingById(bookingID));
            })
        }
        return bookingList;
    }

    async deepDeleteById(id: number): Promise<Booking> {
        const bookingToDelete = await this.bookingRepository.findOneOrFail({
            where: [ {bookingID: id}]
        });

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        const ticketsToDelete = await this.getTicketsByBookingId(id);
        await asyncForEach( ticketsToDelete, async ticket => {
            await this.ticketService.deleteTicketById(ticket.ticketID);
        });

        await this.bookingRepository.delete(bookingToDelete.bookingID);
        bookingToDelete.bookingID = id;  
        return bookingToDelete;
    }
}
