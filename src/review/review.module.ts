import { forwardRef, Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { Review } from './review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), forwardRef(() => UsersModule), forwardRef(() => MovieModule)],
  providers: [ReviewService, ReviewResolver],
  exports: [ReviewService]
})
export class ReviewModule {}
