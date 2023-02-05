import { ConsoleLogger, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Showing } from 'src/showing/showing.entity';
import { ShowingService } from 'src/showing/showing.service';
import { Seat } from 'src/seat/seat.entity';
import { SeatService } from 'src/seat/seat.service';
import { Repository } from 'typeorm';
import { CreateTheaterInput } from './dto/create-theater.input';
import { UpdateTheaterInput } from './dto/update-theater.input';
import { Theater } from './theater.entity';
import { CreateSeatInput } from 'src/seat/dto/create-seat.input';
import { Console } from 'console';

@Injectable()
export class TheaterService {

    constructor(
        @InjectRepository(Theater) 
        private theaterRepository: Repository<Theater>,
        @Inject(forwardRef(() => SeatService))
        private seatService: SeatService,
        @Inject(forwardRef(() => ShowingService)) 
        private showingService: ShowingService) {}

    createTheater(createTheaterInput: CreateTheaterInput): Promise<Theater> {
        const newTheater = this.theaterRepository.create(createTheaterInput);

        return this.theaterRepository.save(newTheater);
    }

    async updateTheater(
        updateTheaterInput: UpdateTheaterInput
    ): Promise<Theater> {
        const update = await this.theaterRepository.preload(updateTheaterInput);
        return this.theaterRepository.save(update);
    }

    async deleteTheater(id: number): Promise<Theater> {
        const toBeDeleted = await this.theaterRepository.findOneOrFail({
            where: [ {theaterID: id }]
        });
        await this.theaterRepository.remove(toBeDeleted);
        toBeDeleted.theaterID = id;  
        return toBeDeleted;
    }

    async deepDeleteTheater(id: number): Promise<Theater> {
        
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }
        const theaterToDelete = await this.theaterRepository.findOneOrFail({
            where: [ {theaterID: id}]
        });

        const seatsToDelete = await this.seatService.getSeatsByTheaterId(id);
        if (seatsToDelete)
        {
            await asyncForEach( seatsToDelete, async seat => {
                await this.seatService.deleteSeat(seat.seatID);
            });
        }

        await this.theaterRepository.delete(theaterToDelete.theaterID);
        theaterToDelete.theaterID = id;  
        return theaterToDelete;
    }

    async findAll(): Promise<Theater[]> {
        return this.theaterRepository.find(); // find() does select * from theater
    }

    async getTheaterById(id: number): Promise<Theater> {
        return this.theaterRepository.findOneOrFail({
            where: [ {theaterID: id }]
        });
    }
    
    async getShowingsByTheaterId(id: number): Promise<Showing[]> {
        return this.showingService.getShowingsByTheaterId(id);   
    }

    async getSeatsByTheaterId(id: number): Promise<Seat[]> {
        return this.seatService.getSeatsByTheaterId(id);   
    }

    async createTheaterByLayout(layout: string): Promise<Theater> {

        var row: number = 0;
        var column: number = 0;
        var width: number = 0;
        var height: number = 0;

        switch (layout) {
            case "square":
                width = 10;
                height = 10;
                break;
            case "tall":
                width = 8;
                height = 18;
                break;
            case "wide":
                width = 18;
                height = 8;
                break;
            case "huge":
                width = 20;
                height = 20;
                break;
            default:
                width = 10;
                height = 10;
                break;
        }

        var theaterInput: CreateTheaterInput = {
            available: true,
            capacity: width * height,
        };

        const theater = await this.createTheater(theaterInput);
        while (row < height)
        {
            while (column < width)
            {
                const rowName: string = String.fromCharCode(row + 65);
                const colName: string = (column + 1).toString();
                const seatLocation: string = rowName + colName;
                const createSeatInput: CreateSeatInput = {
                    theaterID: theater.theaterID,
                    location: seatLocation,
                }
                const seat = await this.seatService.createSeat(createSeatInput);
                column++;
            }
            row++;
            column = 0;
        }
        return theater;
    }
    
}