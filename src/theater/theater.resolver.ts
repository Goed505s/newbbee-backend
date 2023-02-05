import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Showing } from 'src/showing/showing.entity';
import { Seat } from 'src/seat/seat.entity';
import { CreateTheaterInput } from './dto/create-theater.input';
import { UpdateTheaterInput } from './dto/update-theater.input';
import { Theater } from './theater.entity';
import { TheaterService } from './theater.service';

@Resolver(of => Theater)
export class TheaterResolver {
    constructor(private theaterService: TheaterService) {}

    @Query(returns => Theater)
    getTheaterById(@Args('id', {type: () => Int}) id: number): Promise<Theater> {
        return this.theaterService.getTheaterById(id);
    }

    @Query(returns => [Theater])
    theaters(): Promise<Theater[]> {
        return this.theaterService.findAll();
    }

    @Mutation(returns => Theater)
    updateTheater(@Args('updateTheaterInput')updateTheaterInput: UpdateTheaterInput): Promise<Theater> {
        return this.theaterService.updateTheater(updateTheaterInput);
    }

    @Mutation(returns => Theater)
    deleteTheaterById(@Args('id', {type: () => Int}) id: number): Promise<Theater> {
        return this.theaterService.deleteTheater(id);
    }

    @Mutation(returns => Theater)
    deepDeleteTheaterById(@Args('id', {type: () => Int}) id: number): Promise<Theater> {
        return this.theaterService.deepDeleteTheater(id);
    }

    @Mutation(returns => Theater)
    createTheater(@Args('createTheaterInput')createTheaterInput: CreateTheaterInput): Promise<Theater> {
        return this.theaterService.createTheater(createTheaterInput);
    }

    @Mutation(returns => Theater)
    createTheaterByLayout(
        @Args('layout')layout: string, 
        ): Promise<Theater> {
        return this.theaterService.createTheaterByLayout(layout);
    }

    @ResolveField(returns => [Showing])
    showings(@Parent() theater: Theater)
    {
        return this.theaterService.getShowingsByTheaterId(theater.theaterID);
    }
    
    @ResolveField(returns => [Seat])
    seats(@Parent() theater: Theater)
    {
        return this.theaterService.getSeatsByTheaterId(theater.theaterID);
    }
}
