import { Int, Query, Resolver, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { PaymentCard } from 'src/paymentcards/paymentcard.entity';
import { Address } from 'src/addresses/address.entity';
import { CreateUserInput } from './dto/create-user.input.dto';
import { UpdateUserInput } from './dto/update-user.input.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Review } from 'src/review/review.entity';
import { Booking } from 'src/booking/booking.entity';
import { Ticket } from 'src/ticket/ticket.entity';

/*
 * Resolvers are a GraphQL structure that handle API requests defined 
 * in the schema.
 * With NestJS, they don't actually handle the business logic, they 
 * simply interpret the request and call the service layer. 
 */
@Resolver((of) => User)
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(returns => User) 
    getUserByID(@Args('id', {type: () => Int}) id: number): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @Query(returns => [User])
    getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Query(returns => User)
    getUserByEmail(@Args('email', {type: () => String}) email: string): Promise<User> {
        return this.usersService.getUserByEmail(email);
    }

    @ResolveField(returns => [PaymentCard])
    paymentCards(@Parent() user: User): Promise<PaymentCard[]> {
        return this.usersService.getPaymentCards(user.userID); // not too sure about () here 
    }
    
    @Mutation(returns => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
        return this.usersService.createUser(createUserInput);
    }

    @Mutation(returns => User)
    updateUser(
        @Args('updateUserInput',) updateUserInput: UpdateUserInput, )
    {
        return this.usersService.updateUser(updateUserInput);
    }

    @ResolveField(returns => Address)
    homeAddress(@Parent() user: User): Promise<Address>
    {
        if (user.homeAddressID === null)
        {
            return null;
            
        }
        else
        {
            return this.usersService.getAddress(user.homeAddressID);
        }
        
    }

    @ResolveField(returns => String)
    userStatus(@Parent() user: User): Promise<string>
    {
        if (user.userStatusID !== null)
        {
            return this.usersService.getStatus(user.userStatusID);
        }
        else
        {
            return null;
        }
        
    }

    @ResolveField(returns => [Review])
    reviews(@Parent() user: User)
    {
        return this.usersService.getReviewsByUserId(user.userID);
    }
    
    @ResolveField(returns => [Booking])
    bookings(@Parent() booking: Booking)
    {
        return this.usersService.getBookingsByUserId(booking.userID);
    }

    @ResolveField(returns => [Ticket])
    seats(@Parent() user: User)
    {
        return this.usersService.getTicketsByUserId(user.userID);
    }
}
