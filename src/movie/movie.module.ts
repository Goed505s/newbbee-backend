import { forwardRef, Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { ReviewModule } from 'src/review/review.module';
import { ShowingModule } from 'src/showing/showing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    forwardRef(() => ReviewModule),
    forwardRef(() => ShowingModule)
  ],
  providers: [MovieService, MovieResolver],
  exports: [MovieService]
})
export class MovieModule {}
