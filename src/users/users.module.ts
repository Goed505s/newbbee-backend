import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentCardsModule } from 'src/paymentcards/paymentcards.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { StatusesModule } from 'src/statuses/statuses.module';
import { ReviewModule } from 'src/review/review.module';
import { BookingModule } from 'src/booking/booking.module';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  providers: [UsersService, UsersResolver],
  imports: [
    TypeOrmModule.forFeature([User]),
    AddressesModule,
    StatusesModule,
    ReviewModule,
    PaymentCardsModule,
    forwardRef(() => BookingModule),
    forwardRef(() => TicketModule)
  ],
  exports: [UsersService],
})
export class UsersModule {}
