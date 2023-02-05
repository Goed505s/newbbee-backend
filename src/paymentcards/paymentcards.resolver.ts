import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { Address } from 'src/addresses/address.entity';
import { Booking } from 'src/booking/booking.entity';
import { User } from 'src/users/user.entity';
import { CreatePaymentCardInput } from './dto/create-paymentcard.input';
import { UpdatePaymentCardInput } from './dto/update-paymentcard.input';
import { PaymentCard } from './paymentcard.entity';
import { PaymentCardsService } from './paymentcards.service';

@Resolver((of) => PaymentCard)
export class PaymentCardsResolver {
    constructor(private paymentCardsService: PaymentCardsService) {}

    @Query(returns => [PaymentCard])
    paymentcards(): Promise<PaymentCard[]> {
        return this.paymentCardsService.findAll();
    }

    @ResolveField(returns => Address)
    address(@Parent() paymentCard: PaymentCard): Promise<Address>
    {
        return this.paymentCardsService.getAddress(paymentCard.addressID);
    }

    @Mutation(returns => PaymentCard)
    createPaymentCard(@Args('createPaymentcardInput') createPaymentcardInput: CreatePaymentCardInput): Promise<PaymentCard> {
        return this.paymentCardsService.createPaymentCard(createPaymentcardInput);
    }

    @Query(returns => PaymentCard)
    getPaymentCardByID(@Args('id', {type: () => Int}) id: number): Promise<PaymentCard> {
        return this.paymentCardsService.getPaymentCardByID(id);
    }

    @Query(returns => [PaymentCard])
    getPaymentCardByUserID(@Args('id', {type: () => Int}) id: number): Promise<PaymentCard[]> {
        return this.paymentCardsService.getPaymentCardByUserID(id);
    }

    @Mutation(returns => PaymentCard)
    updatePaymentCard(@Args('updatePaymentCardInput',) updatePaymentCardInput: UpdatePaymentCardInput, )
    {
        return this.paymentCardsService.updatePaymentCard(updatePaymentCardInput);
    }

    @Mutation(returns => PaymentCard)
    deletePaymentCard(@Args('id', {type: () => Int}) id: number): Promise<PaymentCard> {
        return this.paymentCardsService.deletePaymentCard(id);
    }

    @ResolveField(returns => [Booking])
    bookings(@Parent() paymentCard: PaymentCard)
    {
        return this.paymentCardsService.getBookingsByPaymentCardId(paymentCard.paymentCardID);
    }
}
