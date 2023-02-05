import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movie/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReviewInput } from './dto/create-review.input';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
    constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>, 
    @Inject(forwardRef(() => UsersService))private usersService: UsersService,
    @Inject(forwardRef(() => MovieService))private movieService: MovieService) {}

    createReview(createReviewInput: CreateReviewInput): Promise<Review> {
        const newReview = this.reviewRepository.create(createReviewInput);

        return this.reviewRepository.save(newReview);
    }

    async findAll(): Promise<Review[]> {
        return this.reviewRepository.find(); // find() does select * from Review
    }

    async getReviewById(id: number): Promise<Review> {
        return this.reviewRepository.findOneOrFail({
            where: [ {reviewID: id }]
        });
    }

    async getReviewsByUserId(id: number): Promise<Review[]> {
        return this.reviewRepository.find({
            where: [ {authorID: id }]
        });
    }

    async getUserById(id: number): Promise<User> {
        return this.usersService.getUserById(id);
    }

    async getReviewsByMovieId(id: number): Promise<Review[]> {
        return this.reviewRepository.find({
            where: [ {movieID: id }]
        });
    }

    async getMovieById(id: number): Promise<Movie> {
        return this.movieService.getMovieById(id);
    }
}
