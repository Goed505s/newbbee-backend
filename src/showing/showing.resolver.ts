import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Movie } from 'src/movie/movie.entity';
import { Theater } from 'src/theater/theater.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { CreateShowingInput } from './dto/create-showing.input';
import { UpdateShowingInput } from './dto/update-showing.input';
import { Showing } from './showing.entity';
import { ShowingService } from './showing.service';

@Resolver(of => Showing)
export class ShowingResolver {
    constructor(private showingService: ShowingService) {}

    @Query(returns => Showing)
    getShowingById(@Args('id', {type: () => Int}) id: number): Promise<Showing> {
        return this.showingService.getShowingById(id);
    }

    @Query(returns => [Showing])
    getAllShowings(): Promise<Showing[]> {
        return this.showingService.findAll();
    }

    @Mutation(returns => Showing)
    createShowing(@Args('createShowingInput')createShowingInput: CreateShowingInput): Promise<Showing> {
        return this.showingService.createShowing(createShowingInput);
    }

    @Mutation(returns => Showing)
    updateShowing(@Args('updateShowingInput') updateShowingInput: UpdateShowingInput): Promise<Showing> {
        return this.showingService.updateShowing(updateShowingInput);
    }

    @Mutation(returns => Showing)
    deleteShowingById(@Args('id', {type: () => Int}) id: number): Promise<Showing> {
        return this.showingService.deleteShowing(id);
    }

    @Mutation(returns => Showing)
    deepDeleteShowingById(@Args('id', {type: () => Int}) id: number): Promise<Showing> {
        return this.showingService.deepDeleteShowing(id);
    }

    @ResolveField(returns => String)
    startTime(@Parent() showing: Showing): Promise<String> {
        return this.showingService.formatTime(showing.startTime);
    }

    @ResolveField(returns => String)
    endTime(@Parent() showing: Showing): Promise<String> {
        return this.showingService.formatTime(showing.endTime);
    }

    @ResolveField(returns => Movie)
    movie(@Parent() showing: Showing): Promise<Movie> {
        return this.showingService.getMovieById(showing.movieID);
    }

    @ResolveField(returns => Theater)
    theater(@Parent() showing: Showing): Promise<Theater> {
        return this.showingService.getTheaterById(showing.theaterID);
    }

    @ResolveField(returns => [Ticket])
    tickets(@Parent() showing: Showing): Promise<Ticket[]> {
        return this.showingService.getTicketsByShowingId(showing.showingID);
    }

    @Query(returns => Boolean)
    isSeatAvailable(
        @Args('seatID', {type: () => Int}) seatID: number,
        @Args('showingID', {type: () => Int}) showingID: number,
    ): Promise<boolean>
    {
        return this.showingService.getSeatAvailability(seatID, showingID);
    }
}
