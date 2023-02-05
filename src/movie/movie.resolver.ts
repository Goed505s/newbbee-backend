import { Args, Float, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Review } from 'src/review/review.entity';
import { Showing } from 'src/showing/showing.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Resolver(of => Movie)
export class MovieResolver {
    constructor(private movieService: MovieService) {}

    @Query(returns => Movie)
    getMovieById(@Args('id', {type: () => Int}) id: number): Promise<Movie> {
        return this.movieService.getMovieById(id);
    }

    @Query(returns => [Movie])
    movies(): Promise<Movie[]> {
        return this.movieService.findAll();
    }

    @Query(returns => [Movie], {nullable: true})
    getUpcomingMovies(): Promise<Movie[]> {
        return this.movieService.findUpcoming();
    }

    @Mutation(returns => Movie)
    updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput): Promise<Movie> {
        return this.movieService.updateMovie(updateMovieInput);
    }

    @Mutation(returns => Movie)
    deleteMovieById(@Args('id', {type: () => Int}) id: number): Promise<Movie> {
        return this.movieService.deleteMovie(id);
    }

    @Mutation(returns => Movie)
    deepDeleteMovieById(@Args('id', {type: () => Int}) id: number): Promise<Movie> {
        return this.movieService.deepDeleteMovie(id);
    }    

    @Mutation(returns => Movie)
    createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput): Promise<Movie> {
        return this.movieService.createMovie(createMovieInput);
    }

    @ResolveField(returns => String, {nullable: true})
    releaseDate(@Parent() movie: Movie): Promise<string>
    {
        if (movie.releaseDate !== null)
        {
            return this.movieService.formatDate(movie);
        }
        else
        {
            return null;
        }
        
    }

    @ResolveField(returns => [Review])
    reviews(@Parent() movie: Movie)
    {
        return this.movieService.getReviewsByMovieId(movie.movieID);
    }
    
    @ResolveField(returns => [Showing])
    showings(@Parent() movie: Movie)
    {
        return this.movieService.getShowingsByMovieId(movie.movieID);
    }

    @ResolveField(returns => Boolean)
    nowShowing(@Parent() movie: Movie)
    {
        return this.movieService.getNowShowing(movie);
    }

    @ResolveField(returns => Float)
    averageRating(@Parent() movie: Movie)
    {
        return this.movieService.getAverageRating(movie.movieID);
    }

}
