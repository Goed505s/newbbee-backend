import { forwardRef, Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { Booking } from './booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PaymentCardsModule } from 'src/paymentcards/paymentcards.module';
import { PromotionModule } from 'src/promotion/promotion.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { FeeModule } from 'src/fees/fee.module';
import { ShowingModule } from 'src/showing/showing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]), 
    forwardRef(() => UsersModule), 
    forwardRef(() => PaymentCardsModule),
    forwardRef(() => PromotionModule),
    forwardRef(() => TicketModule),
    forwardRef(() => FeeModule),
    forwardRef(() => ShowingModule)
  ],
  providers: [BookingService, BookingResolver],
  exports: [BookingService]
})
export class BookingModule {}
