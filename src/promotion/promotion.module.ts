import { forwardRef, Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionResolver } from './promotion.resolver';
import { Promotion } from './promotion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion]), forwardRef(() => BookingModule)],
  providers: [PromotionService, PromotionResolver],
  exports: [PromotionService]
})
export class PromotionModule {}
