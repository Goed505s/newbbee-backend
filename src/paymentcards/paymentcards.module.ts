import { forwardRef, Module } from '@nestjs/common';
import { PaymentCardsService } from './paymentcards.service';
import { PaymentCardsResolver } from './paymentcards.resolver';
import { PaymentCard } from './paymentcard.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesModule } from 'src/addresses/addresses.module';
import { BookingModule } from 'src/booking/booking.module';


@Module({
  imports: [AddressesModule, TypeOrmModule.forFeature([PaymentCard]), forwardRef(() => BookingModule)],
  providers: [PaymentCardsService, PaymentCardsResolver],
  exports: [PaymentCardsService]
})
export class PaymentCardsModule {}
