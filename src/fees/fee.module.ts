import { forwardRef, Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeResolver } from './fee.resolver';
import { Fee } from './fee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fee]),
    forwardRef(() => BookingModule)
  ],
  providers: [FeeService, FeeResolver],
  exports: [FeeService]
})
export class FeeModule {}
