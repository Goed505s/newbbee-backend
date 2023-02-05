import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaymentCard } from 'src/paymentcards/paymentcard.entity';
import { Promotion } from 'src/promotion/promotion.entity';
import { CreateTicketInput } from 'src/ticket/dto/create-ticket.input';
import { Ticket } from 'src/ticket/ticket.entity';
import { User } from 'src/users/user.entity';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { CreateBookingInput } from './dto/create-booking.input';

@Resolver(of => Booking)
export class BookingResolver {
    constructor(private bookingService: BookingService) {}

    @Query(returns => Booking)
    getBookingById(@Args('id', {type: () => Int}) id: number): Promise<Booking> {
        return this.bookingService.getBookingById(id);
    }

    @Query(returns => [Booking])
    GetAllBookings(): Promise<Booking[]> {
        return this.bookingService.findAll();
    }

    @Mutation(returns => Booking)
    createBooking(@Args('createBookingInput')createBookingInput: CreateBookingInput): Promise<Booking> {
        return this.bookingService.createBooking(createBookingInput);
    }

    @Mutation(returns => Booking)
    createBookingWithTickets (
        @Args('createTicketInputs', {type: () => [CreateTicketInput]})
            createTicketInputs: CreateTicketInput[],
        @Args('createBookingInput', {type: () => [CreateBookingInput]})
            createBookingInput: CreateBookingInput
    ): Promise<Booking> {
        return this.bookingService.createBookingWithTickets(createTicketInputs, createBookingInput);
    }
    
    @Mutation(returns => Booking)
    deepDeleteBookingById(@Args('id', {type: () => Int}) id: number): Promise<Booking> {
        return this.bookingService.deepDeleteById(id);
    }
    
    @ResolveField(returns => String)
    dateOfPurchase(@Parent() booking: Booking): Promise<String> {
        return this.bookingService.formatDate(booking.dateOfPurchase);
    }

    @ResolveField(returns => PaymentCard)
    paymentCard(@Parent() booking: Booking): Promise<PaymentCard> {
        return this.bookingService.getPaymentCardById(booking.paymentCardID);
    }

    @ResolveField(returns => User)
    user(@Parent() booking: Booking): Promise<User> {
        return this.bookingService.getUserById(booking.userID);
    }

    @ResolveField(returns => Promotion)
    promotion(@Parent() booking: Booking): Promise<Promotion> {
        return this.bookingService.getPromotionById(booking.promotionID);
    }

    @ResolveField(returns => [Ticket])
    tickets(@Parent() booking: Booking) {
        return this.bookingService.getTicketsByBookingId(booking.bookingID);
    }
}
