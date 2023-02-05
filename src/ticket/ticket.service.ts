import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/booking/booking.entity';
import { BookingService } from 'src/booking/booking.service';
import { Seat } from 'src/seat/seat.entity';
import { SeatService } from 'src/seat/seat.service';
import { Showing } from 'src/showing/showing.entity';
import { ShowingService } from 'src/showing/showing.service';
import { TicketType } from 'src/tickettype/tickettype.entity';
import { TickettypeService } from 'src/tickettype/tickettype.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketService {
    constructor(@InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    @Inject(forwardRef(() => UsersService))private usersService: UsersService,
    @Inject(forwardRef(() => BookingService))private bookingService: BookingService,
    @Inject(forwardRef(() => SeatService))private seatService: SeatService,
    @Inject(forwardRef(() => ShowingService))private showingService: ShowingService,
    @Inject(forwardRef(() => TickettypeService))private ticketTypeService: TickettypeService) {}

    createTicket(createTicketInput: CreateTicketInput): Promise<Ticket> {
        const newTicket = this.ticketRepository.create(createTicketInput);

        return this.ticketRepository.save(newTicket);
    }

    async findAll(): Promise<Ticket[]> {
        return this.ticketRepository.find(); // find() does select * from Ticket
    }

    async getTicketById(id: number): Promise<Ticket> {
        return this.ticketRepository.findOneOrFail({
            where: [ {ticketID: id }]
        });
    }

    async deleteTicketById(id: number): Promise<Ticket> {
        const toBeDeleted = await this.ticketRepository.findOneOrFail({
            where: [ {ticketID: id }]
        });
        await this.ticketRepository.remove(toBeDeleted);
        toBeDeleted.ticketID = id;  
        return toBeDeleted;
    }

    async getTicketsByUserId(id: number): Promise<Ticket[]> {
        return this.ticketRepository.find({
            where: [ {userID: id }]
        });
    }

    async getUserById(id: number): Promise<User> {
        return this.usersService.getUserById(id);
    }

    async getTicketsByBookingId(id: number): Promise<Ticket[]> {
        return this.ticketRepository.find({
            where: [{bookingID: id}]
        });
        /*
        return this.ticketRepository.find({
            where: [ {bookingID: id }]
        });
        */
    }

    async getBookingById(id: number): Promise<Booking> {
        return this.bookingService.getBookingById(id);
    }

    async getTicketsByShowingId(id: number): Promise<Ticket[]> {
        return this.ticketRepository.find({
            where: [{showingID: id}]
        });
        /*
        return this.ticketRepository.find({
            where: [ {bookingID: id }]
        });
        */
    }

    async getSeatById(id: number): Promise<Seat> {
        return this.seatService.getSeatById(id);
    }

    async getShowingById(id: number): Promise<Showing> {
        return this.showingService.getShowingById(id);
    }

    async getTicketsByTicketTypeId(id: number): Promise<Ticket[]> {
        return this.ticketRepository.find({
            where: [{ticketTypeID: id}]
        });
    }

    async getTicketTypeById(id: number): Promise<TicketType> {
        return this.ticketTypeService.getTicketTypeById(id);
    }

    async getTicketsBySeatId(id: number): Promise<Ticket[]> {
        return this.ticketRepository.find({
            where: [ {seatID: id}] 
        });
    }
}
