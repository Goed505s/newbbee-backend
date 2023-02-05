import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Booking } from 'src/booking/booking.entity';
import { Seat } from 'src/seat/seat.entity';
import { Showing } from 'src/showing/showing.entity';
import { TicketType } from 'src/tickettype/tickettype.entity';
import { User } from 'src/users/user.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';

@Resolver(of => Ticket)
export class TicketResolver {
    constructor(private ticketService: TicketService) {}

    @Query(returns => Ticket)
    getTicketById(@Args('id', {type: () => Int}) id: number): Promise<Ticket> {
        return this.ticketService.getTicketById(id);
    }

    @Query(returns => [Ticket])
    getAllTickets(): Promise<Ticket[]> {
        return this.ticketService.findAll();
    }

    @Mutation(returns => Ticket)
    createTicket(@Args('createTicketInput')createTicketInput: CreateTicketInput): Promise<Ticket> {
        return this.ticketService.createTicket(createTicketInput);
    }

    @Mutation(returns => Ticket)
    deleteTicketById(@Args('id', {type: () => Int}) id: number): Promise<Ticket> {
        return this.ticketService.deleteTicketById(id);
    }

    @ResolveField(returns => User)
    user(@Parent() ticket: Ticket): Promise<User> {
        return this.ticketService.getUserById(ticket.userID);
    }

    @ResolveField(returns => Booking)
    booking(@Parent() ticket: Ticket): Promise<Booking> {
        return this.ticketService.getBookingById(ticket.bookingID);
    }

    @ResolveField(returns => Seat)
    seat(@Parent() ticket: Ticket)
    {
        return this.ticketService.getSeatById(ticket.seatID);
    }

    @ResolveField(returns => Showing)
    showing(@Parent() ticket: Ticket): Promise<Showing> {
        return this.ticketService.getShowingById(ticket.showingID);
    }

    @ResolveField(returns => TicketType)
    ticketType(@Parent() ticket: Ticket): Promise<TicketType> {
        return this.ticketService.getTicketTypeById(ticket.ticketTypeID);
    }
}
