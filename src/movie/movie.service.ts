import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/review/review.entity';
import { ReviewService } from 'src/review/review.service';
import { Showing } from 'src/showing/showing.entity';
import { ShowingService } from 'src/showing/showing.service';
import { Repository } from 'typeorm';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
    constructor(@InjectRepository(Movie) private moviesRepository: Repository<Movie>,
        @Inject(forwardRef(() => ReviewService)) private reviewService: ReviewService,
        @Inject(forwardRef(() => ShowingService)) private showingService: ShowingService) 
    {}

    async createMovie(createMovieInput: CreateMovieInput): Promise<Movie> {
        const newMovie = this.moviesRepository.create(createMovieInput);

        return this.moviesRepository.save(newMovie);
    }

    async updateMovie(updateMovieInput: UpdateMovieInput): Promise<Movie> {
        const update = await this.moviesRepository.preload(updateMovieInput);
        return this.moviesRepository.save(update);
    }

    async findAll(): Promise<Movie[]> {
       return this.moviesRepository.find();
    }

    async findUpcoming(): Promise<Movie[]> {
        const movies = await this.moviesRepository.find();
        return movies.filter(movie => {
            if (new Date(movie.releaseDate) > new Date())
            {
                return true;
            }
            else
            {
                return false;
            }
        })
     }

    async getMovieById(id: number): Promise<Movie> {
        return this.moviesRepository.findOneOrFail({
            where: [ {movieID: id }]
        });
    }

    async deleteMovie(id: number): Promise<Movie> {
        const toBeDeleted = await this.moviesRepository.findOneOrFail({
            where: [ {movieID: id }]
        });

        // for some reason, removing the entity removes it's id? so I'm resetting
        // it manually before returning it.
        await this.moviesRepository.remove(toBeDeleted);
        toBeDeleted.movieID = id;  
        return toBeDeleted;
    }

    async deepDeleteMovie(id: number): Promise<Movie> {

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        const movieToDelete = await this.moviesRepository.findOneOrFail({
            where: [ {movieID: id}]
        });

        const showingsToDelete = await this.showingService.getShowingsByMovieId(id);
        if (showingsToDelete)
        {
            await asyncForEach(showingsToDelete, async showing => {
                await this.showingService.deepDeleteShowing(showing.showingID);
            });
        }

        await this.moviesRepository.remove(movieToDelete);
        movieToDelete.movieID = id;  
        return movieToDelete;
    }

    async formatDate(movie: Movie): Promise<string> {
        const date = new Date(movie.releaseDate)
        // truncates to simple ISO format (no time)
        return date.toISOString().substring(0,10);
    }

    async getReviewsByMovieId(id: number): Promise<Review[]> {
        return this.reviewService.getReviewsByMovieId(id);   
    }
    
    async getShowingsByMovieId(id: number): Promise<Showing[]> {
        return this.showingService.getShowingsByMovieId(id);   
    }

    async getNowShowing(movie: Movie): Promise<Boolean> {
        const showingArray = await this.showingService.getShowingsByMovieId(movie.movieID);
        if (showingArray.length < 1) {
            return false;
        } else {
            return true;
        }
    }

    async getAverageRating(movieID: number): Promise<number>
    {
        const reviews = this.reviewService.getReviewsByMovieId(movieID);
        var length: number = (await reviews).length;
        if (length === 0)
        {
            return null;
        }
        else
        {
            var ratingSum: number = 0;
            (await reviews).forEach(review => {
                ratingSum += review.rating;
            })
            return (ratingSum / length) // averageReview
        }   
    }
}
