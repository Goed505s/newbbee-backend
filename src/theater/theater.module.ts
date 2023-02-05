import { forwardRef, Module } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { TheaterResolver } from './theater.resolver';
import { Theater } from './theater.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatModule } from 'src/seat/seat.module';
import { ShowingModule } from 'src/showing/showing.module';

@Module({
  imports: [TypeOrmModule.forFeature([Theater]), forwardRef(() => SeatModule), forwardRef(() => ShowingModule)],
  providers: [TheaterService, TheaterResolver],
  exports: [TheaterService]
})
export class TheaterModule {}
