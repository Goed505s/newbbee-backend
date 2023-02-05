import { forwardRef, Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatResolver } from './seat.resolver';
import { Seat } from './seat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheaterModule } from 'src/theater/theater.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { ShowingModule } from 'src/showing/showing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seat]),
    forwardRef(() => TheaterModule),
    forwardRef(() => TicketModule),
    forwardRef(() => ShowingModule)
  ],
  providers: [SeatService, SeatResolver],
  exports: [SeatService]
})
export class SeatModule {}
