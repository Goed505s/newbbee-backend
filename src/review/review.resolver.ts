import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/users/user.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Resolver(of => Review)
export class ReviewResolver {
    constructor(private reviewService: ReviewService) {}

    @Query(returns => Review)
    getReviewById(@Args('id', {type: () => Int}) id: number): Promise<Review> {
        return this.reviewService.getReviewById(id);
    }

    @Query(returns => [Review])
    getAllReviews(): Promise<Review[]> {
        return this.reviewService.findAll();
    }

    @Mutation(returns => Review)
    createReview(@Args('createReviewInput')createReviewInput: CreateReviewInput): Promise<Review> {
        return this.reviewService.createReview(createReviewInput);
    }
    
    @ResolveField(returns => User)
    author(@Parent() review: Review): Promise<User> {
        return this.reviewService.getUserById(review.authorID);
    }

    @ResolveField(returns => Movie)
    movie(@Parent() review: Review): Promise<Movie> {
        return this.reviewService.getMovieById(review.movieID);
    }
}
