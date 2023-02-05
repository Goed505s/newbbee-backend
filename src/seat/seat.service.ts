import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowingService } from 'src/showing/showing.service';
import { Theater } from 'src/theater/theater.entity';
import { TheaterService } from 'src/theater/theater.service';
import { Ticket } from 'src/ticket/ticket.entity';
import { TicketService } from 'src/ticket/ticket.service';
import { Repository } from 'typeorm';
import { CreateSeatInput } from './dto/create-seat.input';
import { Seat } from './seat.entity';

@Injectable()
export class SeatService {
    constructor(
        @InjectRepository(Seat) private seatRepository: Repository<Seat>,
        @Inject(forwardRef(() => TheaterService)) private theaterService: TheaterService,
        @Inject(forwardRef(() => TicketService)) private ticketService: TicketService,
        @Inject(forwardRef(() => ShowingService)) private showingService: ShowingService
        ) {}

    createSeat(createSeatInput: CreateSeatInput): Promise<Seat> {
        const newSeat = this.seatRepository.create(createSeatInput);

        return this.seatRepository.save(newSeat);
    }

    async deleteSeat(id: number): Promise<Seat> {
        const toBeDeleted = await this.seatRepository.findOneOrFail({
            where: [ {seatID: id }]
        });
        toBeDeleted.theaterID = null;
        await this.seatRepository.remove(toBeDeleted);
        toBeDeleted.seatID = id;  
        return toBeDeleted;
    }

    async findAll(): Promise<Seat[]> {
        return this.seatRepository.find(); // find() does select * from seat
    }

    async getSeatById(id: number): Promise<Seat> {
        return this.seatRepository.findOneOrFail({
            where: [ {seatID: id }]
        });
    }


    async getSeatsByTheaterId(id: number): Promise<Seat[]> {
        return this.seatRepository.find({
            where: [ {theaterID: id }]
        });
    }

    async getTheaterById(id: number): Promise<Theater> {
        return this.theaterService.getTheaterById(id);
    }

    async getTicketById(id: number): Promise<Ticket> {
        return this.ticketService.getTicketById(id);
    }

    async getAvailableSeats(showingID: number): Promise<Seat[]>
    {

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        const showing = await this.showingService.getShowingById(showingID);
        const theater = await this.theaterService.getTheaterById(showing.theaterID);
        const seats = await this.theaterService.getSeatsByTheaterId(theater.theaterID);
        const availableSeats: Seat[] = new Array<Seat>;
        await asyncForEach(seats, async seat => {
            const available = await this.showingService.getSeatAvailability(seat.seatID, showingID);
            if (available)
            {
                availableSeats.push(seat);
            }
        })
        return availableSeats;
    }
}
