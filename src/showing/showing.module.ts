import { forwardRef, Module } from '@nestjs/common';
import { ShowingService } from './showing.service';
import { ShowingResolver } from './showing.resolver';
import { Showing } from './showing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from 'src/movie/movie.module';
import { TheaterModule } from 'src/theater/theater.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Showing]),
    forwardRef(() => MovieModule),
    forwardRef(() => TheaterModule),
    forwardRef(() => TicketModule),
    forwardRef(() => BookingModule)
  ],
  providers: [ShowingService, ShowingResolver],
  exports: [ShowingService]
})
export class ShowingModule {}
