import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingService } from 'src/booking/booking.service';
import { Movie } from 'src/movie/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { Theater } from 'src/theater/theater.entity';
import { TheaterService } from 'src/theater/theater.service';
import { Ticket } from 'src/ticket/ticket.entity';
import { TicketService } from 'src/ticket/ticket.service';
import { Repository } from 'typeorm';
import { CreateShowingInput } from './dto/create-showing.input';
import { UpdateShowingInput } from './dto/update-showing.input';
import { Showing } from './showing.entity';

@Injectable()
export class ShowingService {
    constructor(@InjectRepository(Showing) private showingRepository: Repository<Showing>,
    @Inject(forwardRef(() => MovieService)) private movieService: MovieService,
    @Inject(forwardRef(() => TheaterService)) private theaterService: TheaterService,
    @Inject(forwardRef(() => TicketService)) private ticketService: TicketService,
    @Inject(forwardRef(() => BookingService)) private bookingService: BookingService) {}

    createShowing(createShowingInput: CreateShowingInput): Promise<Showing> {
        const newShowing = this.showingRepository.create(createShowingInput);

        return this.showingRepository.save(newShowing);
    }

    async updateShowing(updateShowingInput: UpdateShowingInput): Promise<Showing> {
        const update = await this.showingRepository.preload(updateShowingInput);
        return this.showingRepository.save(update);
    }

    async deleteShowing(id: number): Promise<Showing> {
        const toBeDeleted = await this.showingRepository.findOneOrFail({
            where: [ {showingID: id }]
        });

        // for some reason, removing the entity removes it's id? so I'm resetting
        // it manually before returning it.
        await this.showingRepository.remove(toBeDeleted);
        toBeDeleted.showingID = id;  
        return toBeDeleted;
    }

    async deepDeleteShowing(id: number): Promise<Showing> {

        const showingToDelete = await this.showingRepository.findOneOrFail({
            where: [ {showingID: id}]
        });

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        const bookingsToDelete = await this.bookingService.getBookingsByShowingId(id);
        if (bookingsToDelete)
        {
            await asyncForEach( bookingsToDelete, async booking => {
                await this.bookingService.deepDeleteById(booking.bookingID);
            });
        }

        await this.showingRepository.remove(showingToDelete);
        showingToDelete.showingID = id;  
        return showingToDelete;
    }

    async findAll(): Promise<Showing[]> {
        return this.showingRepository.find(); // find() does select * from Showing
    }

    async getShowingById(id: number): Promise<Showing> {
        return this.showingRepository.findOneOrFail({
            where: [ {showingID: id }]
        });
    }


    async formatTime(date: string): Promise<String>
    {
        const newDate = new Date(date);
        return newDate.toISOString(); // return the whole thing
    }

    async getShowingsByMovieId(id: number): Promise<Showing[]> {
        return this.showingRepository.find({
            where: [ {movieID: id }]
        });
    }

    async getMovieById(id: number): Promise<Movie> {
        return this.movieService.getMovieById(id);
    }

    async getShowingsByTheaterId(id: number): Promise<Showing[]> {
        return this.showingRepository.find({
            where: [ {theaterID: id }]
        });
    }

    async getTheaterById(id: number): Promise<Theater> {
        return this.theaterService.getTheaterById(id);
    }

    async getTicketsByShowingId(id: number): Promise<Ticket[]> {
        return this.ticketService.getTicketsByShowingId(id);   
    }

    async getSeatAvailability(seatID: number, showingID: number): Promise<boolean>
    {
        const showingTickets = await this.ticketService.getTicketsByShowingId(showingID);
        var available = true;
        if (showingTickets)
        {
            showingTickets.forEach( ticket => {
                if (ticket.seatID === seatID)
                {
                    available = false;
                }
            })
        }
        return available;
    }

    
}
