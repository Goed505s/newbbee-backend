import { forwardRef, Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { Ticket } from './ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { BookingModule } from 'src/booking/booking.module';
import { SeatModule } from 'src/seat/seat.module';
import { ShowingModule } from 'src/showing/showing.module';
import { TickettypeModule } from 'src/tickettype/tickettype.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), forwardRef(() => UsersModule), forwardRef(() => BookingModule), forwardRef(() => SeatModule), forwardRef(() => ShowingModule), forwardRef(() => TickettypeModule)],
  providers: [TicketService, TicketResolver],
  exports: [TicketService]
})
export class TicketModule {}
