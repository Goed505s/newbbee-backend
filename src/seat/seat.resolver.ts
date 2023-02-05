import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Theater } from 'src/theater/theater.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { CreateSeatInput } from './dto/create-seat.input';
import { Seat } from './seat.entity';
import { SeatService } from './seat.service';

@Resolver(of => Seat)
export class SeatResolver {
    constructor(private seatService: SeatService) {}

    @Query(returns => Seat)
    getSeatById(@Args('id', {type: () => Int}) id: number): Promise<Seat> {
        return this.seatService.getSeatById(id);
    }

    @Query(returns => [Seat])
    getAllSeats(): Promise<Seat[]> {
        return this.seatService.findAll();
    }

    @Query(returns => [Seat])
    getAvailableSeats(
        @Args('showingID', {type: () => Int}) showingID: number
    ): Promise<Seat[]> {
        return this.seatService.getAvailableSeats(showingID);
    }

    @Mutation(returns => Seat)
    createSeat(@Args('createSeatInput')createSeatInput: CreateSeatInput): Promise<Seat> {
        return this.seatService.createSeat(createSeatInput);
    }

    @ResolveField(returns => Theater)
    theater(@Parent() seat: Seat): Promise<Theater> {
        return this.seatService.getTheaterById(seat.theaterID);
    }

}
